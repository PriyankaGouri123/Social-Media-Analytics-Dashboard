import axios from "axios";
async function test() {
  try {
    const res = await axios.get("https://api.fxtwitter.com/elonmusk");
    console.log("FxTwitter Data Keys:", Object.keys(res.data));
    if (res.data.user) {
      console.log("User Name:", res.data.user.name);
      console.log("Followers:", res.data.user.followers_count);
    }
  } catch (e) {
    console.log("FxTwitter Error:", e.response?.status, e.message);
  }
}
test();
