import axios from "axios";
import { BASE_URL } from "../index";

async function checkToken(token) {
  try {
    let res = await axios.get(`${BASE_URL}users/@me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    throw new Error("Something went wrong on checking token " + error.message);
  }
}
export default checkToken;
