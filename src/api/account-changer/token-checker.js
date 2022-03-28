import axios from "axios";
import { BASE_URL } from "../index";

async function checkToken(token) {
  let res = await axios.get(`${BASE_URL}users/@me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return res;
}
export default checkToken;
