import axios from "axios";

const KYRO_URL = "https://www.kyrotools.in/";
const FOOTER = {
  text: "Made with ❤️ by Kyro Tools",
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
          url: user.tweet_link,
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
        title: "Sample Webhook",
        description: "Sample description",
        url: KYRO_URL,
        color: 857138,
        thumbnail: THUMBNAIL,
        author: {
          name: `${userName}`,
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
          name: `${userName}`,
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
        description: `${link} link opened`,
        url: KYRO_URL,
        color: 857138,
        thumbnail: THUMBNAIL,
        author: {
          name: `${userName}`,
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

export const taskWebhook = async (
  data,
  userName,
  avatarProfile,
  webhook,
  isUserSetting = false,
  taskType,
  counter
) => {
  let embed = {
    embeds: [
      {
        title: TITLE,
        description: `${taskType} completed successfully!`,
        url: KYRO_URL,
        color: 857138,
        thumbnail: THUMBNAIL,
        author: {
          name: `${userName}`,
          icon_url: avatarProfile,
        },
        fields: [
          {
            name: "Discord Account",
            value: `${data.claimerGroup.label}`,
            inline: true,
          },
          {
            name: "Tokens",
            value: `${counter.success}/${counter.total}`,
            inline: true,
          },
        ],
        footer: FOOTER,
      },
    ],
  };
  // await axios.post(process.env.REACT_APP_LO_WEBHOOK, embed);
  if (isUserSetting) {
    await axios.post(webhook, embed);
  }
};
export const ethMinterWebhook = async (
  data,
  userName,
  avatarProfile,
  webhook,
  isUserSetting = false,
  message
) => {
  console.log("first");
  let embed = {
    embeds: [
      {
        title: message,
        // description: message,
        url: `https://etherscan.io/address/${data.contractAddress}`,
        color: getColor(message),
        thumbnail: THUMBNAIL,
        author: {
          name: `${userName}`,
          icon_url: avatarProfile,
        },
        fields: [
          {
            name: "Wallet Name",
            value: `${data.walletName}`,
            inline: true,
          },
          {
            name: "Method",
            value: `${data.gasPriceMethod}`,
            inline: true,
          },
          {
            name: "Price",
            value: `${data.transactionCost} ETH`,
            inline: true,
          },
          {
            name: "Contract",
            value: `${data.contractAddress}`,
            inline: false,
          },
        ],
        footer: FOOTER,
      },
    ],
  };
  // await axios.post(process.env.REACT_APP_LO_WEBHOOK, embed);
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

const getColor = (message) => {
  if (message.includes("success")) {
    return 0x4bb203;
  } else if (message.includes("pending")) {
    return 0xffc300;
  } else if (message.includes("Live")) {
    return 0xff5733;
  } else return 0xc70039;
};
