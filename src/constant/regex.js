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
