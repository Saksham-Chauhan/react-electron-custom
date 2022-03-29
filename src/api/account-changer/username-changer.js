import axios from "axios";
import { BASE_URL } from "../index";

async function changeUsername(token, password, proxy) {
  try {
    const json = JSON.stringify({
      username: "mynewname",
      password: password,
    });
    let res = await axios.patch(`${BASE_URL}users/@me`, json, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        proxy: proxy,
      },
    });
    return res;
  } catch (error) {
    throw new Error(
      "Something went wrong on changing username" + error.message
    );
  }
}
export default changeUsername;
