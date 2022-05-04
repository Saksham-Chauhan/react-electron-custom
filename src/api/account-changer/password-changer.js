import axios from "axios";
import { BASE_URL } from "../index";

async function changePassword(token, currentPassword, newPassword, proxy) {
  try {
    const json = JSON.stringify({
      password: currentPassword,
      new_password: newPassword,
    });

    const res = await axios.patch(`${BASE_URL}/users/@me`, json, {
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

export default changePassword;
