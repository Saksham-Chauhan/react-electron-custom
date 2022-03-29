import axios from "axios";
import { BASE_URL } from "../index";

async function changePassword(token, current_pass, new_pass, proxy) {
  try {
    const json = JSON.stringify({
      password: current_pass,
      new_password: new_pass,
    });

    let res = await axios.patch(`${BASE_URL}users/@me`, json, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        proxy: proxy,
      },
    });
    return res;
  } catch (error) {
    throw new Error(
      "Something went wrong on changing password" + error.message
    );
  }
}

export default changePassword;
