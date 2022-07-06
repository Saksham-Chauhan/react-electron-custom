import { sleep } from "..";
import {
  getMintData,
  getTransactionStatus,
  getWalletData,
  mintTransaction,
} from "../../api/eth-minter";
import { sendWebhook } from "../../features/logic/setting";
import { toastSuccess, toastWarning } from "../../toaster";
import { sendLogs } from "../electron-bridge";

//RETURN FORM DATA
export const getConnectFormData = (data) => {
  const formData = new FormData();
  formData.append("url", data);
  return formData;
};

export const getWalletFormData = (data, url) => {
  const formData = new FormData();
  formData.append("url", url);
  formData.append("private_key", data.walletPrivateKey);
  formData.append("public_key", data.walletPublicKey);
  return formData;
};

export const getMintFormData = (data, url, apiKey) => {
  const formData = new FormData();
  formData.append("func_params", data.functionParam);
  formData.append("func_name", data.functionName);
  formData.append("contract_address", data.contractAddress);
  formData.append("url", url);
  formData.append("api_key", apiKey);
  return formData;
};

export const getTransactionMintingFormData = (data, url) => {
  const formData = new FormData();
  formData.append("public_key", data.wallet.walletPublicKey);
  formData.append("private_key", data.wallet.walletPrivateKey);
  formData.append("contract_address", data.contractAddress);
  formData.append("value", data.transactionCost);
  formData.append("method", data.gasPriceMethod);
  formData.append("url", url);
  formData.append("data", data.re_data);
  if (data.gasPriceMethod === "manualPrice") {
    formData.append("max_fee", data.maxFee);
    formData.append("max_priority_fee", data.maxPriorityFee);
  }
  return formData;
};

export const getStatusFormData = (hash, url) => {
  const formData = new FormData();
  formData.append("url", url);
  formData.append("txn_hash", hash);
  return formData;
};

// API CALL HANDLERS
export const handleFetchWallet = async (
  data,
  url,
  dispatchResponse,
  refresh = false
) => {
  const obj = { ...data };
  const formData = getWalletFormData(data, url);
  try {
    const res = await getWalletData(formData);
    if (res.status === 200) {
      if (!refresh) toastSuccess("Wallet fetched successfully.");
      obj["walletBalance"] = res.data.result.balance;
      dispatchResponse(obj);
      return true;
    } else {
      toastWarning(res.data.result.error);
      return false;
    }
  } catch (e) {
    if (!e?.response?.data?.error) {
      toastWarning("Error in fetching wallet");
    }
    toastWarning(e.response.data.error);
    return false;
  }
};

export const handleGetMintdata = async (
  data,
  url,
  apiKey,
  dispatchResponse
) => {
  const formData = getMintFormData(data, url, apiKey);
  const res = await getMintData(formData);
  try {
    if (res.status === 200) {
      toastSuccess("Task added successfully.");
      const result = res.data.result;
      data["re_data"] = result.data;
      data["functionName"] = result.func_name;
      data["functionParam"] = result.func_params.toString();
      dispatchResponse(data);
    } else {
      toastWarning(res.response.data.error);
      return res;
    }
  } catch (e) {
    if (!e?.response?.data?.error) {
      toastWarning("Can't create task.");
    }
    toastWarning(e.response.data.error);
    return e;
  }
  return res;
};

export const getStatus = async (
  task,
  hash,
  url,
  dispatchResponse,
  flag = true,
  delay,
  webhook
) => {
  const formData = getStatusFormData(hash, url);
  sendLogs(`Fetching transaction status for transaction hash: ${hash}`);
  try {
    const res = await getTransactionStatus(formData);
    if (res.status === 200) {
      const mintStatus = res.data.result.status;
      if (mintStatus === "Pending") {
        let obj = { ...task };
        obj["status"] = mintStatus;
        if (flag) {
          dispatchResponse(obj);
          sendWebhook(
            webhook.task,
            webhook.type,
            `Transaction Pending`,
            webhook.setting,
            webhook.user,
            webhook.webhookList
          );
        }
        await sleep(delay);
        getStatus(task, hash, url, dispatchResponse, false, delay);
        await sleep(delay);
      } else {
        sendWebhook(
          webhook.task,
          webhook.type,
          `Transaction ${mintStatus}`,
          webhook.setting,
          webhook.user,
          webhook.webhookList
        );
        task["status"] = mintStatus;
        sendLogs(
          `Transaction hash [${hash}] returned ${mintStatus}. Minting process ends.`
        );
        dispatchResponse(task);
      }
    }
  } catch (e) {
    toastWarning("Error while fetching transaction status.");
    task["status"] = "Error";
    sendLogs(`Error: ${e.message}`);
    dispatchResponse(task);
  }
};

export const handleMinting = async (
  data,
  url,
  dispatchResponse,
  flag = true,
  delay,
  webhook
) => {
  await sleep(delay);
  let obj = { ...data };
  obj["status"] = "Monitoring";
  if (flag) dispatchResponse(obj);
  const formData = getTransactionMintingFormData(data, url);
  try {
    const res = await mintTransaction(formData);
    if (res.status === 200) {
      const hash = res.data.result.txn_hash;
      sendLogs(
        `Transaction send to blockchain, transaction hash received: ${hash}`
      );
      getStatus(data, hash, url, dispatchResponse, true, delay);
    }
    return true;
  } catch (e) {
    if (e.response.data.error === "Sale Not Live") {
      if (flag) {
        toastWarning("Sale Not Live");
        sendWebhook(
          webhook.task,
          webhook.type,
          `Sale Not Live`,
          webhook.setting,
          webhook.user,
          webhook.webhookList
        );
      }
      sendLogs(`Sale not live for contract address: ${data.contractAddress}`);
      handleMinting(data, url, dispatchResponse, false, delay, webhook);
    } else {
      sendWebhook(
        webhook.task,
        webhook.type,
        `Transaction Error`,
        webhook.setting,
        webhook.user,
        webhook.webhookList
      );
      let temp = { ...data };
      temp["status"] = "Error";
      dispatchResponse(temp);
      if (e.response.data.error.includes("insufficient funds"))
        toastWarning("Gas Estimation Error");
      else toastWarning(e.response.data.error);
      sendLogs(`Error: ${e.message}`);
      sendWebhook();
    }
    return true;
  }
};
