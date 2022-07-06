import axios from "axios";
import { BASE_URL } from "../index";

async function checkToken({ token, proxy, solution = null }) {
  try {
    return await axios.get(`${BASE_URL}/users/@me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      proxy: proxy,
    });
  } catch (error) {
    return error;
  }
}
export default checkToken;
