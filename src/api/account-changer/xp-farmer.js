import axios from "axios";

async function xpFarmer(proxy, channelID, token) {
  try {
    const json = JSON.stringify({
      token: token,
      proxy: proxy,
      channel_id: channelID,
    });
    const res = await axios.post(
      `http://192.168.29.101:5000/get-response`,
      json
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export default xpFarmer;
