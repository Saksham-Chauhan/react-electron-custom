// TODO => Check if this can be passed directly = Proxy destructing
// TODO => Handle edge case for proxy less than claimer number
import axios from "axios";
import { arrayBufferToString } from "../helper";
import { toastSuccess, toastWarning } from "../toaster";

export const BASE_URL = "https://discord.com/api/v9/";
export const IMAGE_API = "https://picsum.photos/50/50";

const getProxy = (proxyArr, index) => {
  let proxySplit = proxyArr[index]?.split(":");
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
        proxy: getProxy(proxyArr, index),
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 204) {
        console.log("Successfully reacted in server");
        return response;
      }
    } catch (error) {
      console.log("Something went wrong while reacting");
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
    let proxySplit = proxyArr[index].split(":");
    const [host, port, username, password] = proxySplit;
    const proxy = {
      host: host,
      port: port,
      auth: {
        username: username,
        password: password,
      },
    };
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
      console.log("Error on accept srever rule", error.message);
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
      let proxySplit = proxyArr[index]?.split(":");
      const [host, port, username, password] = proxySplit;
      const proxy = {
        host: host,
        port: port,
        auth: {
          username: username,
          password: password,
        },
      };
      const inviteResponse = await discordServerInviteAPI(
        inviteCode,
        token,
        proxy
      );
      if (inviteResponse.status === 200) {
        toastSuccess(`Joined the ${inviteResponse.data.guild.name} server`);
        if (settingObj.isReact) {
          const serverReactResponse = await axios({
            url: `${BASE_URL}channels/${settingObj.reactSetting.channelId}/messages/${settingObj.reactSetting.messageId}/reactions/${settingObj.reactSetting.emojiValue}/%40me`,
            method: "put",
            proxy,
            headers: {
              authorization: token,
              "Content-Type": "application/json",
            },
          });
          if (serverReactResponse.status === 201) {
            toastSuccess("Reaction added successfully");
          }
        }
        if (settingObj.isAcceptRule) {
          const acceptServerRulResponse = await axios({
            url: `${BASE_URL}guilds/${settingObj.acceptRule.guildID}/requests/@me`,
            method: "put",
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

export const generateRandomAvatar = async (api = IMAGE_API) => {
  const arrayBuffer = await fetch(api).then(function (response) {
    return response.arrayBuffer();
  });
  const str = arrayBufferToString(arrayBuffer, "base64");
  return "data:image/jpeg;base64," + str;
};
