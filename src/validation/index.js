import joi from "joi";

export const addProxyGroupSchema = joi.object({
  id: joi.optional(),
  proxyList: joi.array(),
  groupName: joi.string().required().label("Enter group name"),
  proxies: joi.optional(),
  type: joi.optional(),
  createdAt: joi.optional(),
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
  createdAt: joi.optional(),
});

export const discordAccountSchema = joi.object({
  accountName: joi.string().required().label("Enter Account Name"),
  discordToken: joi.optional(),
  id: joi.optional(),
  createdAt: joi.optional(),
});

export const twiiterApiSchema = joi.object({
  apiName: joi.string().required().label("Enter API Name"),
  apiKey: joi.string().required().label("Enter API Key"),
  apiSecret: joi.string().required().label("Enter API Secret"),
});

export const claimerGroupSchema = joi.object({
  name: joi.string().required().label("Enter Name"),
  claimerToken: joi.string().required().label("email:username:password:token"),
  claimerList: joi.array(),
  id: joi.optional(),
  createdAt: joi.optional(),
});

export const nftGroupSchema = joi.object({
  minterTitle: joi.string().required().label("Enter group name"),
  minterType: joi.string().required().label("Select type"),
  minterList: joi.optional(),
  id: joi.optional(),
});

export const nftTaskSchema = (isRequired) => {
  const userSchemaKeys = {
    status: joi.optional(),
    walletName: joi.optional(),
    walletID: joi.string().required().label("Select wallet"),
    gasPriceMethod: joi.string().required().label("Select gas method"),
    functionName: joi.string().required().label("Enter function name"),
    functionParam: joi.string().required().label("Enter function param"),
    transactionCost: joi.number().required().label("Enter transaction cost"),
    contractAddress: joi.string().required().label("Enter contract address"),
  };
  if (isRequired) {
    userSchemaKeys.maxPriorityFee = joi
      .number()
      .required()
      .label("Enter max priority Fee");
    userSchemaKeys.maxFee = joi.number().required().label("Enter max  Fee");
  }
  return joi.object(userSchemaKeys);
};

export const nftWalletSchema = joi.object({
  walletNickName: joi.string().required().label("Enter nick name"),
  walletPrivateKey: joi.string().required().label("Enter wallet private key"),
  walletPublicKey: joi.string().required().label("Enter wallet public key"),
  walletBalance: joi.optional(),
});
