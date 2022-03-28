import axios from "axios";
import { BASE_URL } from "../index";

async function changeActivity(token, message) {
  try {
    const json = JSON.stringify({
      custom_status: {
        text: `${message}`,
      },
    });

    let res = await axios.patch(`${BASE_URL}users/@me/settings`, json, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    throw new Error(
      "Something went wrong on chnaging activity" + error.message
    );
  }
}
export default changeActivity;
