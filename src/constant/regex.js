export const ProxyRegExp =
  /^\w+.\w+.\w+.\w+:\d{4,}:?[a-zA-Z0-9._-]+:?[a-zA-Z0-9._-]+/;
export const UrlRegexp =
  /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:~+#-]*[\w@?^=%&~+#-])/;

export const TweetHandlerRegExp = /^@?(\w){1,15}$/;

export const discordTokenRegExp = /^[0-9A-Za-z_.-]+$/;

export const channelRegexExp = /[0-9]{15,}/;

export const webhoookRegExp =
  /^.*(discord|discordapp)\.com\/api\/webhooks\/([\d]+)\/([a-zA-Z0-9_-]+)$/;

export const chromeRegExp = /^[a-zA-Z0-9-_]+$/;

export const discordInvideCode =
  /(https:\/\/)?(www\.)?(((discord(app)?)?\.com\/invite)|((discord(app)?)?\.gg))\/(?<invite>.+)/;

export const discordJoinedAtRegex = /\d{4}-\d{2}/;

export const inviteJoinerEmojiRegex = /[0-9a-fA-F]/;

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex = /[a-zA-Z0-9._-]+/;

export const usernameRegex = /[a-zA-Z0-9._-]+/;
