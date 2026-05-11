import axios from "axios";
async function test() {
  try {
    const res = await axios.get("https://api.fxtwitter.com/i/user/elonmusk");
    console.log("FxTwitter Data:", JSON.stringify(res.data, null, 2));
  } catch (e) {
    console.log("FxTwitter Error:", e.response?.status, e.message);
  }
}
test();
