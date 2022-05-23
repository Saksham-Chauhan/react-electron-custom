import axios from "axios";
import { BASE_URL } from "../index";

async function changeAvatar(token, image, proxy) {
  try {
    const json = JSON.stringify({
      avatar: image,
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

export default changeAvatar;
