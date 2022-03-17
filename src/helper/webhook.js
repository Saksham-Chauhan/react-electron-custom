import axios from "axios";

async function webhookHandler(webhook, user, title, content) {
  let embed = {
    embeds: [
      {
        title: "Kyros tool",
        description: title + "\t\t\t\t\t" + content,
        url: "https://www.twitter.com/home",
        color: 857138,
        footer: {
          icon_url:
            "https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png",
          text: "Twitter monitor Webhook",
        },
        thumbnail: {
          url: "https://www.twitter.com/home",
        },
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
        url: "https://www.koders.in/",
        color: 857138,
        thumbnail: {
          url: avatarProfile,
        },
        author: {
          name: `Test webhook by ${userName}`,
          icon_url: avatarProfile,
        },
      },
    ],
  };

  return await axios.post(webhook, embed);
};

export const inviteJoinerTest = async (
  webhook,
  userName,
  avatarProfile,
  serverName
) => {
  let embed = {
    embeds: [
      {
        title: "Kyros tool",
        description: `${serverName} server joined successfully`,
        url: "https://www.koders.in/",
        color: 857138,
        thumbnail: {
          url: "https://www.twitter.com/home",
        },
        // author: {
        //   name: `Invite joiner monitor ${userName}`,
        //   icon_url: avatarProfile,
        // },
      },
    ],
  };
  await axios.post(process.env.REACT_APP_IJ_WEBHOOK, embed);
  await axios.post(webhook, embed);
};

export const loggedUserWebhook = async (title, webhook) => {
  let embed = {
    embeds: [
      {
        title: "Kyros tool",
        description: title,
        url: "https://www.koders.in/",
        color: 857138,
        thumbnail: {
          url: "https://www.twitter.com/home",
        },
        // author: {
        //   name: `Invite joiner monitor ${userName}`,
        //   icon_url: avatarProfile,
        // },
      },
    ],
  };
  await axios.post(process.env.REACT_APP_LOG_STATUS_WEBHOOK, embed);
  await axios.post(webhook, embed);
};

export const linkOpenerWebhook = async (link, webhook) => {
  let embed = {
    embeds: [
      {
        title: "Kyros tool",
        description: `${link} link opened`,
        url: "https://www.koders.in/",
        color: 857138,
        thumbnail: {
          url: "https://www.twitter.com/home",
        },
        // author: {
        //   name: `Invite joiner monitor ${userName}`,
        //   icon_url: avatarProfile,
        // },
      },
    ],
  };
  await axios.post(process.env.REACT_APP_LO_WEBHOOK, embed);
  await axios.post(webhook, embed);
};
