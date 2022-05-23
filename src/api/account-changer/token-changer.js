import axios from "axios";
import { BASE_URL } from "../index";

async function tokenChanger(email, password, proxy) {
  try {
    const json = JSON.stringify({
      login: email,
      password: password,
    });
    return await axios.post(`${BASE_URL}/auth/login`, json, {
      headers: {
        "Content-Type": "application/json",
      },
      proxy: proxy,
    });
  } catch (error) {
    return error;
  }
}
export default tokenChanger;
