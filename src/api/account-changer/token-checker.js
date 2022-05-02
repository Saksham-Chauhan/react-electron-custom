import axios from "axios";
import { BASE_URL } from "../index";

async function checkToken(token, proxy) {
  try {
    let res = await axios.get(`${BASE_URL}users/@me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      proxy: proxy,
    });
    return res;
  } catch (error) {
    return error;
  }
}
export default checkToken;
