import axios from "axios";

// const base_url = "http://127.0.0.1:5000";
const base_url = "http://178.79.152.181:5000";

export const mintTransaction = async (data) => {
  return await axios.post(`${base_url}/mint`, data);
};

export const getMintData = async (data) => {
  try {
    return await axios.post(`${base_url}/mintdata`, data);
  } catch (e) {
    return e;
  }
};
export const connectToBlockchain = async (data) => {
  try {
    return await axios.post(`${base_url}/connect`, data);
  } catch (e) {
    return e;
  }
};
export const getTransactionStatus = async (data) => {
  try {
    return await axios.post(`${base_url}/status`, data);
  } catch (e) {
    return e;
  }
};
export const getWalletData = async (data) => {
  try {
    return await axios.post(`${base_url}/wallet`, data);
  } catch (e) {
    return e;
  }
};
