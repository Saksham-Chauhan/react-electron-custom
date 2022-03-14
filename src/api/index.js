import axios from "axios";
import { toastSuccess } from "../toaster";

const DISCORD_SERVER_INVITE = "https://discord.com/api/v9/invites/";

export const discordServerInviteAPI = async (inviteCode, token, proxy) =>
  await axios({
    url: `${DISCORD_SERVER_INVITE}${inviteCode}`,
    headers: { Authorization: token },
    method: "post",
    data: JSON.stringify({}),
    proxy: proxy,
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
        url: `https://discord.com/api/v9/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/%40me`,
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
          url: `https://discord.com/api/v9/guilds/${guild_id}/requests/@me`,
          method: "put",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          data: accept_rule,
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

// https://discord.com/api/v9/guilds/232740312194351106/requests/@me
//{"version":"2021-01-21T16:21:06.817000+00:00","form_fields":[{"field_type":"TERMS","label":"Read and agree to the server rules","values":["Be respectful to others, do not use homophobic language, racial slurs, and avoid doxxing or leaking personal information.","Do not post explicitly sexual, gore or otherwise disturbing content and avoid sensitive topics, such as politics or religion.","Do not impersonate anyone and do not exclude anyone. Everyone is welcome.","Respect authority, and do not troll moderators on duty.","Read the <#232740312194351106> channel. Further you acknowledge the following use of your user-data: http://radka.dev/disclaimer"],"required":true,"response":true}]}
