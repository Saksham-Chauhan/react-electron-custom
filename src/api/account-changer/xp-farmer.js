import axios from "axios";

async function xpFarmer(proxy, channelID, token) {
  try {
    const res = await axios.post(`http://192.168.29.101:5000/get-response`, {
      token: token,
      proxy: proxy,
      channel_id: channelID,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export default xpFarmer;
