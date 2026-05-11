import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

async function test() {
  try {
    const res = await axios.get("https://twitter154.p.rapidapi.com/user/details", {
      params: { username: "elonmusk" },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
      },
    });
    console.log("Twitter154 Status:", res.status);
    console.log("Data:", Object.keys(res.data));
  } catch (e) {
    console.log("Twitter154 Error:", e.response?.status, e.response?.data || e.message);
  }
}
test();
