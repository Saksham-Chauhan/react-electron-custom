import axios from "axios";
import { BASE_URL } from "../index";

async function tokenChanger(proxy, email, password) {
  try {
    const json = JSON.stringify({
      login: email,
      password: password,
    });
    let res = await axios.post(`${BASE_URL}auth/login`, json, {
      headers: {
        "Content-Type": "application/json",
      },
      proxy: proxy,
    });
    return res;
  } catch (error) {
    return error;
  }
}
export default tokenChanger;