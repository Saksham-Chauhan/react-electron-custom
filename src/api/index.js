import axios from "axios";
import { arrayBufferToString } from "../helper";
import { sendLogs } from "../helper/electron-bridge";
import { toastSuccess, toastWarning } from "../toaster";

export const BASE_URL = "https://discord.com/api/v9";
export const IMAGE_API = "https://picsum.photos/50/50";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getProxy = (proxyArr) => {
  const randomIndex = randomIntFromInterval(0, proxyArr?.length || 0);
  const [host, port, username, password] = proxyArr[randomIndex]?.split(":");
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
    url: `${BASE_URL}/invites/${inviteCode}`,
    headers: { Authorization: token },
    method: "POST",
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
        url: `${BASE_URL}/channels/${channelId}/messages/${messageId}/reactions/${emoji}/%40me`,
        method: "PUT",
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
          url: `${BASE_URL}/guilds/${guildId}/requests/@me`,
          method: "PUT",
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
  proxyGroup,
  inviteCode,
  token,
  settingObj
) => {
  try {
    const proxyArr = proxyGroup["value"]?.split("\n");
    for (let index = 0; index < proxyArr.length; index++) {
      const proxy = getProxy(proxyArr);
      const inviteResponse = await discordServerInviteAPI(
        inviteCode,
        token,
        proxy
      );
      if (inviteResponse.status === 200) {
        const tkn =
          token.substring(0, 4) + "## ##" + token.charAt(token.length() - 1);
        toastSuccess(`Joined ${inviteResponse.data.guild.name} server successfully`);
        sendLogs(`Joined ${inviteResponse.data.guild.name} server with ${tkn}`);
        if (!settingObj.isReact && !settingObj.isAcceptRule) break;
        if (settingObj.isReact) {
          const serverReactResponse = await axios({
            url: `${BASE_URL}/channels/${settingObj.reactSetting.channelId}/messages/${settingObj.reactSetting.messageId}/reactions/${settingObj.reactSetting.emojiValue}/%40me`,
            method: "PUT",
            proxy,
            headers: {
              authorization: token,
              "Content-Type": "application/json",
            },
          });
          if (serverReactResponse.status === 201) {
            sendLogs(`Direct join Reaction added successfully  with ${tkn}`);
            toastSuccess("Reaction added successfully");
          }
        }
        if (settingObj.isAcceptRule) {
          const acceptServerRulResponse = await axios({
            url: `${BASE_URL}/guilds/${settingObj.acceptRule.guildID}/requests/@me`,
            method: "PUT",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            data: settingObj.acceptRule.acceptRuleValue,
            proxy,
          });
          if (
            acceptServerRulResponse !== null &&
            acceptServerRulResponse === 201
          ) {
            sendLogs(`Direct join Rules accepted successfully ${tkn}`);
            toastSuccess("Rules accepted successfully");
          }
        }
      } else {
        toastWarning("Something went wrong while accepting rules");
      }
    }
  } catch (error) {
    return null;
  }
};

// TODO => What made you do fetch instead of axios at the end of program?
export const generateRandomAvatar = async (api = IMAGE_API) => {
  const arrayBuffer = await fetch(api).then(function (response) {
    return response.arrayBuffer();
  });
  const str = arrayBufferToString(arrayBuffer, "base64");
  return "data:image/jpeg;base64," + str;
};
