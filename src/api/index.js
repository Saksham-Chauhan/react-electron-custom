import axios from "axios";
import { arrayBufferToString } from "../helper";
import { toastSuccess, toastWarning } from "../toaster";

export const BASE_URL = "https://discord.com/api/v9/";

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
  channel_id,
  message_id,
  emoji,
  token
) => {
  const proxyArr = proxyString["value"]?.split("\n");
  for (let index = 0; index < proxyArr.length; index++) {
    let proxySplit = proxyArr[index]?.split(":");
    try {
      const response = await axios({
        url: `${BASE_URL}channels/${channel_id}/messages/${message_id}/reactions/${emoji}/%40me`,
        method: "put",
        proxy: {
          host: proxySplit[0],
          port: proxySplit[1],
          auth: {
            username: proxySplit[2],
            password: proxySplit[3],
          },
        },
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 204) {
        console.log("Reacted in server");
        return response;
      }
    } catch (error) {
      console.log("Error in reacting server invite");
      return null;
    }
  }
};

export const discordServerAcceptRuleAPI = async (
  guild_id,
  token,
  accept_rule,
  inviteCode,
  proxyString
) => {
  const proxyArr = proxyString["value"]?.split("\n");
  for (let index = 0; index < proxyArr.length; index++) {
    let proxySplit = proxyArr[index].split(":");
    const proxy = {
      host: proxySplit[0],
      port: proxySplit[1],
      auth: {
        username: proxySplit[2],
        password: proxySplit[3],
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
        console.log("Server  joined", inviteResponse.data);
        const acceptresponse = await axios({
          url: `${BASE_URL}guilds/${guild_id}/requests/@me`,
          method: "put",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          data: accept_rule,
          proxy,
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
      const proxy = {
        host: proxySplit[0],
        port: proxySplit[1],
        auth: {
          username: proxySplit[2],
          password: proxySplit[3],
        },
      };
      console.log(token, proxy);
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
            toastSuccess("Reacted to the server");
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
            toastSuccess("Accept the server rule 🥳");
          }
        }
      } else {
        toastWarning("Error in joining server");
      }
    }
  } catch (error) {
    return null;
  }
};

export const generateRandomAvatar = async (
  api = "https://picsum.photos/50/50"
) => {
  const arrayBuffer = await fetch(api).then(function (response) {
    return response.arrayBuffer();
  });
  const str = arrayBufferToString(arrayBuffer, "base64");
  return "data:image/jpeg;base64," + str;
};
