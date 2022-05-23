import { discordServerInviteAPI } from "../index";

async function massInviteJoiner(inviteCode, token, proxy) {
  try {
    return await discordServerInviteAPI(inviteCode, token, proxy);
  } catch (error) {
    return error;
  }
}

export default massInviteJoiner;
