import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



/* -------- YOUTUBE FULL CHANNEL DATA -------- */
app.get("/api/youtube/:channelName", async (req, res) => {
  try {
    const q = req.params.channelName;

    // 1️⃣ Search channel by name
    const searchRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q,
          type: "channel",
          maxResults: 1,
          key: process.env.YT_API_KEY,
        },
      }
    );

    const channelId = searchRes.data.items[0]?.snippet?.channelId;
    if (!channelId) throw "Channel not found";

    // 2️⃣ Fetch FULL channel data
    const channelRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet,statistics,brandingSettings,topicDetails,contentDetails",
          id: channelId,
          key: process.env.YT_API_KEY,
        },
      }
    );

    const c = channelRes.data.items[0];

    res.json({
      success: true,
      data: {
        id: c.id,
        title: c.snippet.title,
        description: c.snippet.description,
        handle: c.snippet.customUrl,
        publishedAt: c.snippet.publishedAt,
        country: c.snippet.country,

        thumbnails: c.snippet.thumbnails,
        banner: c.brandingSettings?.image?.bannerExternalUrl,

        subscribers: Number(c.statistics.subscriberCount),
        views: Number(c.statistics.viewCount),
        videos: Number(c.statistics.videoCount),

        topics: c.topicDetails?.topicCategories || [],
        keywords: c.brandingSettings?.channel?.keywords || "",

        uploadsPlaylist:
          c.contentDetails.relatedPlaylists.uploads,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "YouTube API failed",
    });
  }
});






//twitter
app.get("/api/xstats/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });

    const user = response.data.data;

    return res.json({
      success: true,
      data: {
        username: user.username,
        name: user.name,
        followers: user.public_metrics.followers_count,
        following: user.public_metrics.following_count,
        tweets: user.public_metrics.tweet_count,
      },
    });
  } catch (error) {
    console.error(" X API Error:", error?.response?.data);

    return res.status(error?.response?.status || 500).json({
      success: false,
      message: error?.response?.data || "X API request failed",
    });
  }
});

//insta
app.get("/instagram/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const url =
      "https://instagram-public-bulk-scraper.p.rapidapi.com/v1/user_info";

    const response = await axios.get(url, {
      params: { username_or_id: username },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "instagram-public-bulk-scraper.p.rapidapi.com",
      },
    });

    const user = response.data.data;

    return res.json({
      success: true,
      data: {
        username: user.username,
        full_name: user.full_name,
        profile_pic: user.hd_profile_pic_url_info?.url || user.profile_pic_url,
        followers: user.follower_count,
        following: user.following_count,
        media_count: user.media_count,
      },
    });
  } catch (error) {
    console.log(
      " Instagram API Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Instagram API failed",
      details: error.response?.data || error.message,
    });
  }
});

//start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
