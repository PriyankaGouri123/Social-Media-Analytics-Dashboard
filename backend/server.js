import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Validate critical environment variables
const requiredEnvVars = [
  "YT_API_KEY",
  "RAPID_API_KEY",
  "BEARER_TOKEN",
];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(`[WARNING] Missing environment variable: ${envVar}`);
  }
});

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Root Health Check Route
app.get("/", (req, res) => {
  res.json({ message: "Analytics API is running smoothly!" });
});



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

    const channelId = searchRes.data.items?.[0]?.snippet?.channelId;
    if (!channelId) throw new Error("Channel not found");

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

    const c = channelRes.data.items?.[0];
    if (!c) throw new Error("Channel details not found");

    // 3️⃣ Fetch top 5 videos for this channel
    const videosRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          channelId: channelId,
          order: "viewCount",
          type: "video",
          maxResults: 5,
          key: process.env.YT_API_KEY,
        },
      }
    );

    res.json({
      success: true,
      data: {
        id: c?.id,
        title: c?.snippet?.title,
        description: c?.snippet?.description,
        handle: c?.snippet?.customUrl,
        publishedAt: c?.snippet?.publishedAt,
        country: c?.snippet?.country,

        thumbnails: c?.snippet?.thumbnails,
        banner: c?.brandingSettings?.image?.bannerExternalUrl,

        subscribers: Number(c?.statistics?.subscriberCount || 0),
        views: Number(c?.statistics?.viewCount || 0),
        videos: Number(c?.statistics?.videoCount || 0),

        topics: c?.topicDetails?.topicCategories || [],
        keywords: c?.brandingSettings?.channel?.keywords || "",

        uploadsPlaylist: c?.contentDetails?.relatedPlaylists?.uploads,
      },
      videos: videosRes.data.items?.map((v) => ({
        id: v?.id?.videoId,
        title: v?.snippet?.title,
        thumbnail: v?.snippet?.thumbnails?.high?.url,
        publishedAt: v?.snippet?.publishedAt,
      })) || [],
    });
  } catch (err) {
    console.error("YouTube API Error:", err.message);
    res.status(500).json({
      success: false,
      message: "YouTube API failed to fetch data",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
});
// X (Twitter) - Reliable real-time data extraction
app.get("/api/xstats/:username", async (req, res) => {
  const username = req.params.username.replace("@", "");

  try {
    // Strategy 1: Attempt official API (Only works if user has a 'Project' setup)
    const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics,description,profile_image_url,verified,created_at,location`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
    });

    const user = response.data?.data;
    if (user) {
      return res.json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          name: user.name,
          description: user.description || "",
          location: user.location || "",
          profile_pic: user.profile_image_url || "",
          followers: user.public_metrics?.followers_count || 0,
          following: user.public_metrics?.following_count || 0,
          tweets: user.public_metrics?.tweet_count || 0,
          favorites: 0, // Not provided by basic v2 user object
          verified: user.verified || false,
          created_at: user.created_at || "",
        },
      });
    }
  } catch (err) {
    console.warn("Official X API failed. Attempting High-Reliability Public Proxy...");
  }

  // Strategy 2: High-Reliability Public Proxy (FxTwitter) - Keyless & Real-time
  try {
    const proxyUrl = `https://api.fxtwitter.com/${username}`;
    const proxyRes = await axios.get(proxyUrl);
    
    if (proxyRes.data && proxyRes.data.user) {
      const u = proxyRes.data.user;
      return res.json({
        success: true,
        data: {
          id: u.id,
          username: u.screen_name,
          name: u.name,
          description: u.description || "",
          location: u.location || "Global",
          profile_pic: u.avatar_url?.replace("_normal", ""), // Get high-res image
          banner: u.banner_url || "",
          followers: u.followers || 0,
          following: u.following || 0,
          tweets: u.tweets || 0,
          favorites: u.likes || 0,
          verified: u.verification?.verified || false,
          created_at: u.joined || "",
        },
      });
    }
    
    throw new Error("Profile not found on X");
  } catch (proxyErr) {
    console.error("X Data Fetch Error:", proxyErr.message);
    res.status(500).json({
      success: false,
      message: "Failed to connect to X servers. The account may not exist or is currently restricted.",
      error: process.env.NODE_ENV === "development" ? proxyErr.message : undefined
    });
  }
});

//insta
app.get("/api/instagram/:username", async (req, res) => {
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

    const rawResponse = response.data;

    // Deep search for the user object
    let user = rawResponse.data?.user || rawResponse.data || rawResponse.user || rawResponse;

    // If we're still stuck in a 'data' wrapper, go one level deeper
    if (user?.user) user = user.user;
    if (user?.data) user = user.data;

    // Log the structure for debugging (internal)
    console.log(
      "Instagram user keys found:",
      user ? Object.keys(user) : []
    );

    // Comprehensive extraction with all known field names
    const followers =
      user?.follower_count ??
      user?.edge_followed_by?.count ??
      user?.followers ??
      user?.followers_count ??
      0;

    const following =
      user?.following_count ??
      user?.edge_follow?.count ??
      user?.following ??
      user?.following_count ??
      0;

    const mediaCount =
      user?.media_count ??
      user?.edge_owner_to_timeline_media?.count ??
      user?.posts ??
      0;

    // Extract recent posts with extra resilience
    const timelineMedia = user.edge_owner_to_timeline_media || user.edge_owner_to_timeline_media || {};
    const mediaEdges = timelineMedia.edges || user.recent_posts || [];

    const recentPosts = Array.isArray(mediaEdges) ? mediaEdges.map(edge => {
      const node = edge.node || edge;
      return {
        id: node.id,
        shortcode: node.shortcode,
        display_url: node.display_url,
        thumbnail: node.thumbnail_src || node.display_url,
        likes: node.edge_liked_by?.count ?? node.edge_media_preview_like?.count ?? node.likes ?? 0,
        comments: node.edge_media_to_comment?.count ?? node.comments ?? 0,
        caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || node.caption || "",
        is_video: node.is_video,
        video_view_count: node.video_view_count || 0
      };
    }) : [];

    return res.json({
      success: true,
      data: {
        username: user?.username || username,
        full_name: user?.full_name || user?.name || username,
        biography: user?.biography || user?.bio || "",
        external_url: user?.external_url || user?.website || "",
        is_private: user?.is_private ?? false,
        is_verified: user?.is_verified ?? false,
        profile_pic: user?.hd_profile_pic_url_info?.url || user?.profile_pic_url || user?.profile_image_url || "",
        followers: Number(followers),
        following: Number(following),
        media_count: Number(mediaCount),
        recent_posts: recentPosts
      },
    });
  } catch (error) {
    console.error("Instagram API Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Instagram API failed to fetch data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// 404 Route Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API Route not found",
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
