import axios from "axios";
import { arrayBufferToString } from "../helper";
import { sendLogs } from "../helper/electron-bridge";
import { toastSuccess, toastWarning } from "../toaster";

export const BASE_URL = "https://discord.com/api/v9/";
export const IMAGE_API = "https://picsum.photos/50/50";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getProxy = (proxyArr) => {
  const indIndex = randomIntFromInterval(0, proxyArr?.length || 0);
  let proxySplit = proxyArr[indIndex]?.split(":");
  const [host, port, username, password] = proxySplit;
  const proxy = {
    host: host,
    port: port,
    auth: {
      username: username,
      password: password,
    },
  };
  return proxy;
};

export const discordServerInviteAPI = async (inviteCode, token, proxy) =>
  await axios({
    url: `${BASE_URL}invites/${inviteCode}`,
    headers: { Authorization: token },
    method: "post",
    data: JSON.stringify({}),
    proxy,
  });

export const discordServerInviteReactAPI = async (
  proxyString,
  channelId,
  messageId,
  emoji,
  token
) => {
  const proxyArr = proxyString["value"]?.split("\n");
  for (let index = 0; index < proxyArr.length; index++) {
    try {
      const response = await axios({
        url: `${BASE_URL}channels/${channelId}/messages/${messageId}/reactions/${emoji}/%40me`,
        method: "put",
        proxy: getProxy(proxyArr),
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        return response;
      }
    } catch (error) {
      return null;
    }
  }
};

export const discordServerAcceptRuleAPI = async (
  guildId,
  token,
  acceptRules,
  inviteCode,
  proxyString
) => {
  const proxyArr = proxyString["value"]?.split("\n");
  for (let index = 0; index < proxyArr.length; index++) {
    const proxy = getProxy(proxyArr);
    try {
      const inviteResponse = await discordServerInviteAPI(
        inviteCode,
        token,
        proxy
      );
      if (inviteResponse.status === 200) {
        toastSuccess(
          `${inviteResponse.data.guild.name} server joined successfully`
        );
        const acceptresponse = await axios({
          url: `${BASE_URL}guilds/${guildId}/requests/@me`,
          method: "put",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          data: acceptRules,
          proxy: proxy,
        });
        if (acceptresponse.status === 201) {
          return acceptresponse;
        }
      }
    } catch (error) {
      return null;
    }
  }
};

export const directDiscordJoinAPI = async (
  proxy,
  inviteCode,
  token,
  settingObj
) => {
  try {
    const inviteResponse = await discordServerInviteAPI(
      inviteCode,
      token,
      proxy
    );
    if (inviteResponse.status === 200) {
      const tkn =
        token.substring(0, 4) + "## ##" + token.charAt(token.length() - 1);
      toastSuccess(`Joined the ${inviteResponse.data.guild.name} server`);
      const log = `Joined the ${inviteResponse.data.guild.name} server with ${tkn}`;
      sendLogs(log);
      if (settingObj.isReact) {
        const serverReactResponse = await axios({
          url: `${BASE_URL}channels/${settingObj.channelId}/messages/${settingObj.messageId}/reactions/${settingObj.emojiValue}/%40me`,
          method: "put",
          proxy,
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        });
        if (serverReactResponse.status === 201) {
          const log = `Direct join Reaction added successfully  with ${tkn}`;
          sendLogs(log);
          toastSuccess("Reaction added successfully");
        }
      }
      if (settingObj.isAcceptRule) {
        const acceptServerRulResponse = await axios({
          url: `${BASE_URL}guilds/${inviteResponse.data.guild.id}/requests/@me`,
          method: "put",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          data: settingObj.rules,
          proxy,
        });
        if (
          acceptServerRulResponse !== null &&
          acceptServerRulResponse === 201
        ) {
          const log = `Direct join Rules accepted successfully ${tkn}`;
          sendLogs(log);
          toastSuccess("Rules accepted successfully");
        }
      }
    } else {
      toastWarning("Something went wrong while accepting rules");
    }
    return inviteResponse;
  } catch (error) {
    return null;
  }
};

export const generateRandomAvatar = async (api = IMAGE_API) => {
  const arrayBuffer = await fetch(api).then(function (response) {
    return response.arrayBuffer();
  });
  const str = arrayBufferToString(arrayBuffer, "base64");
  return "data:image/jpeg;base64," + str;
};
