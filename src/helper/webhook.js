import axios from "axios";

const KYRO_URL = "https://www.kyrotools.in/";
const FOOTER = {
  text: "Made with ❤️ by Koders",
};
const TITLE = "Kyro Tools";
const THUMBNAIL = {
  url: "https://cdn.discordapp.com/attachments/540447710239784971/953925375149355008/Kyros_logo.png",
};

async function webhookHandler(webhook, user, title, content) {
  let embed = {
    embeds: [
      {
        title: TITLE,
        description: title + "\t\t\t\t\t" + content,
        url: KYRO_URL,
        color: 857138,
        footer: FOOTER,
        thumbnail: THUMBNAIL,
        author: {
          name: `New Tweet By ${user.name}`,
          url: "https://www.twitter.com/home",
          icon_url: user.profile_url,
        },
      },
    ],
  };
  await axios.post(process.env.REACT_APP_TWITTER_WEBHOOK, embed);
  await axios.post(webhook, embed);
}
export default webhookHandler;

export const webhookTest = async (webhook, userName, avatarProfile) => {
  let embed = {
    embeds: [
      {
        title: "Webhook Testing",
        description: "Webhook test successfully",
        url: KYRO_URL,
        color: 857138,
        thumbnail: THUMBNAIL,
        author: {
          name: `Test webhook by ${userName}`,
          icon_url: avatarProfile,
        },
        footer: FOOTER,
      },
    ],
  };
  return await axios.post(webhook, embed);
};

export const inviteJoinerTest = async (
  webhook,
  userName,
  avatarProfile,
  serverName,
  isUserSetting = false
) => {
  let embed = {
    embeds: [
      {
        title: TITLE,
        description: `${serverName} server joined successfully`,
        url: KYRO_URL,
        color: 857138,
        thumbnail: THUMBNAIL,
        footer: FOOTER,
        author: {
          name: `Invite joined by ${userName}`,
          icon_url: avatarProfile,
        },
      },
    ],
  };
  await axios.post(process.env.REACT_APP_IJ_WEBHOOK, embed);
  if (isUserSetting) {
    await axios.post(webhook, embed);
  }
};

export const loggedUserWebhook = async (
  title,
  webhook,
  isUserSetting = false
) => {
  let embed = {
    embeds: [
      {
        title: TITLE,
        description: title,
        url: KYRO_URL,
        color: 857138,
        thumbnail: THUMBNAIL,
        footer: FOOTER,
      },
    ],
  };
  await axios.post(process.env.REACT_APP_LOG_STATUS_WEBHOOK, embed);
  if (isUserSetting) {
    await axios.post(webhook, embed);
  }
};

export const linkOpenerWebhook = async (
  link,
  userName,
  avatarProfile,
  webhook,
  isUserSetting = false
) => {
  let embed = {
    embeds: [
      {
        title: TITLE,
        description: `${link} Link Opened`,
        url: KYRO_URL,
        color: 857138,
        thumbnail: THUMBNAIL,
        author: {
          name: `Link opened by ${userName}`,
          icon_url: avatarProfile,
        },
        footer: FOOTER,
      },
    ],
  };
  await axios.post(process.env.REACT_APP_LO_WEBHOOK, embed);
  if (isUserSetting) {
    await axios.post(webhook, embed);
  }
};

export const interceptorWebhook = async (title) => {
  let embed = {
    embeds: [
      {
        title: TITLE,
        description: title,
        url: KYRO_URL,
        color: 857138,
        thumbnail: THUMBNAIL,
        footer: FOOTER,
      },
    ],
  };
  await axios.post(process.env.REACT_APP_INTERCEPTOR_WEBHOOK, embed);
};
