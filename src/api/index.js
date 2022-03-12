import axios from "axios";

const DISCORD_SERVER_INVITE = "https://discord.com/api/v9/invites/";

export const discordServerInviteAPI = async (inviteCode, token) =>
  await axios({
    url: `${DISCORD_SERVER_INVITE}${inviteCode}`,
    headers: { authorization: token },
  });

export const discordServerInviteReactAPI = async (
  proxyString,
  channel_id,
  message_id,
  emoji,
  token
) => {
  const proxyArr = proxyString["value"].split("\n");
  for (let index = 0; index < proxyArr.length; index++) {
    let proxySplit = proxyArr[index].split(":");
    try {
      const response = await axios({
        url: `https://discord.com/api/v9/channels/${channel_id}/messages/${message_id}/reactions/${emoji}/%40me`,
        method: "PUT",
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
        return response;
      }
    } catch (error) {
      console.log("Error in reacting server invite");
      return null;
    }
  }
};
