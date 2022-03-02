export const ProxyRegExp =
  /^\w+.\w+.\w+.\w+:\d{4,}:?[a-zA-Z0-9._-]+:?[a-zA-Z0-9._-]+/;
export const UrlRegexp =
  /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:~+#-]*[\w@?^=%&~+#-])/;

export const TweetHandlerRegExp = /^@?(\w){1,15}$/;

export const discordTokenRegExp = /[a-zA-Z0-9.-_]{40,}/;
