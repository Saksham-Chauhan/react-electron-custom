import { discordServerInviteAPI } from "../index";

async function massInviteJoiner(inviteCode, token, proxy) {
  try {
    const response = await discordServerInviteAPI(inviteCode, token, proxy);
    return response;
  } catch (error) {
    throw new Error(
      "Something went wrong on Mass invite joiner" + error.message
    );
  }
}

export default massInviteJoiner;
