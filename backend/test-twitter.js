import axios from "axios";
async function test() {
  try {
    const pubUrl = `https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=elonmusk`;
    const pubRes = await axios.get(pubUrl);
    console.log("Syndication Data:", pubRes.data);
  } catch (e) {
    console.log("Syndication Error:", e.message);
  }
}
test();
