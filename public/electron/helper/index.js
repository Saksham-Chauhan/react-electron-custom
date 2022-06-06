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

function getProxyData(proxy) {
  if (proxy) {
    const [host, port, user, pass] = proxy.split(":");
    if (proxy.split(":").length > 2) {
      return {
        host,
        port,
        user,
        pass,
      };
    }
    return {
      host,
      port,
    };
  }
}

function getProxyHostPort(proxy) {
  if (proxy) {
    const [ip, port] = proxy.split(":");
    return ip + ":" + port;
  }
}

function displayTitle(proxyHostPort, id) {
  return `${
    proxyHostPort == null ? "Local IP" : this.proxyHostPort
  } - taskId-${id}`;
}

module.exports = {
  getRandomParsedProxy,
  randomInt,
  getEncryptedToken,
  getProxyData,
  getProxyHostPort,
  displayTitle,
};
