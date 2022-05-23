import axios from "axios";
import { BASE_URL } from "../index";

async function changeUsername(token, password, proxy, username) {
  try {
    const json = JSON.stringify({
      username: username,
      password: password,
    });
    return await axios.patch(`${BASE_URL}/users/@me`, json, {
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
export default changeUsername;
