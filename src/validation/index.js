import joi from "joi";

export const oneClickAddGmailSchema = joi.object({
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .label("Enter email address"),
  password: joi
    .string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .label("Enter password"),
  recoveryEmail: joi
    .string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .label("Enter Recovery email address"),
  securityAnswer: joi.string().required().label("Enter security answer"),
  proxy: joi.optional(),
  status: joi.optional(),
  score: joi.optional(),
  id: joi.optional(),
});

export const genNewAcccountSchema = joi.object({
  site: joi.string().required().label("Select site"),
  proxy: joi.string().required().label("Select proxy"),
  amount: joi
    .string()
    .required()
    .pattern(new RegExp("^[0-9]{1,30}$"))
    .label("Enter account number"),
  mobile: joi.optional(),
  profile: joi.string().required().label("Select profile"),
  id: joi.optional(),
});

export const addProxyGroupSchema = joi.object({
  id: joi.optional(),
  proxyList: joi.array(),
  groupName: joi.string().required().label("Enter group name"),
  proxies: joi.optional(),
});

export const spooferSchema = joi.object({
  url: joi.optional(),
  proxyName: joi.string().required().label("Select Proxy"),
  quantity: joi.number().required().min(1).label("Enter quantity value"),
  delay: joi.optional(),
  disableImages: joi.optional(),
  id: joi.optional(),
  status: joi.optional(),
  proxyValue: joi.optional(),
});

export const discordAccountSchema = joi.object({
  accountName: joi.string().required().label("Enter Account name"),
  discordToken: joi
    .string()
    .required()
    .pattern(new RegExp("/[a-zA-Z0-9.-]{40,}/"))
    .label("Enter valid token"),
  id: joi.optional(),
});

export const twiiterApiSchema = joi.object({
  apiKey: joi.string().required().label("Enter API key"),
  apiSecret: joi.string().required().label("Enter API Secret"),
  accessToken: joi.string().required().label("Enter Access token"),
  accessSecret: joi.string().required().label("Enter Access secret"),
});
