import axios from "axios";
import { BASE_URL } from "../index";

async function changePassword(token, currentPassword, newPassword, proxy) {
  try {
    const json = JSON.stringify({
      password: currentPassword,
      new_password: newPassword,
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

export default changePassword;
