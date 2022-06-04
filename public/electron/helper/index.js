const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomParsedProxy = (proxyArray) => {
  const [host, port, username, password] =
    proxyArray[randomInt(0, proxyArray.length - 1)]?.split(":");
  return {
    host,
    port,
    auth: {
      username,
      password,
    },
  };
};
const getEncryptedToken = (token) => {
  console.log(token);
  return token.slice(0, 4) + "#### ####" + token.slice(-6);
};

module.exports = { getRandomParsedProxy, randomInt, getEncryptedToken };
