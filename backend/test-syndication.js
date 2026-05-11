import axios from "axios";

async function test() {
  try {
    const res = await axios.get("https://syndication.twitter.com/srv/timeline-profile/screen-name/elonmusk");
    console.log("Syndication HTML length:", res.data.length);
    // extract json from html: <script id="__NEXT_DATA__" type="application/json">
    const match = res.data.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/);
    if (match) {
      const json = JSON.parse(match[1]);
      const user = json.props.pageProps.user;
      console.log("Followers:", user.followers_count);
    } else {
      console.log("No JSON found");
    }
  } catch (e) {
    console.log("Syndication HTML Error:", e.response?.status, e.message);
  }
}
test();
