import axios from "axios";
async function test() {
  try {
    const res = await axios.get("https://api.fxtwitter.com/elonmusk");
    console.log("FxTwitter Full User Data:", JSON.stringify(res.data.user, null, 2));
  } catch (e) {
    console.log("FxTwitter Error:", e.response?.status, e.message);
  }
}
test();
