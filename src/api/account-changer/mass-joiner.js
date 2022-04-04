import { discordServerInviteAPI } from "../index";

async function massInviteJoiner(inviteCode, token, proxy) {
  try {
    const response = await discordServerInviteAPI(inviteCode, token, proxy);
    return response;
  } catch (error) {
    return error;
  }
}

export default massInviteJoiner;
