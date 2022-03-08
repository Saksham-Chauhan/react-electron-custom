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
  type: joi.optional(),
});

export const spooferSchema = joi.object({
  url: joi.optional(),
  proxyName: joi.string().required().label("Select Proxy"),
  quantity: joi.number().required().min(1).label("Enter quantity value"),
  disableImages: joi.optional(),
  id: joi.optional(),
  status: joi.optional(),
  proxyValue: joi.optional(),
  isDisableImage: joi.optional(),
});

export const discordAccountSchema = joi.object({
  accountName: joi.string().required().label("Enter Account name"),
  discordToken: joi.optional(),
  id: joi.optional(),
});

export const twiiterApiSchema = joi.object({
  apiName: joi.string().required().label("Enter API Name"),
  apiKey: joi.string().required().label("Enter API key"),
  apiSecret: joi.string().required().label("Enter API Secret"),
  accessToken: joi.string().label("Enter Access token"),
  accessSecret: joi.string().label("Enter Access secret"),
});

export const claimerGroupSchema = joi.object({
  name: joi.string().required().label("Enter Name"),
  claimerToken: joi.string().required().label("Enter Claimer Token"),
  claimerList: joi.array(),
  id: joi.optional(),
});
