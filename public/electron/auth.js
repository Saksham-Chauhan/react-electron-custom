const axios = require("axios");
const url = require("url");
const jwt = require("jsonwebtoken");

// PROD CREDS. TODO => Pass it with .env file
const botToken = "OTM4MzM4NDAzMTA2MzIwNDM0.Yfo1vA.RA9WBRV-R6CpsTUqt6OVlGtUIXg";
const clientId = "938338403106320434";
const clientSecret = "L74jCftmysbzbqpy08i8O_QegPvo8NRb";
const guildId = "936538800027467816";
const redirectUrl = "http://localhost/callback/*";
let accessToken = null;
let user = null;

function getAccessToken() {
  return accessToken;
}
function getAuthenticationURL() {
  return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=email%20identify`;
}

async function loadTokens(callbackURL) {
  const urlParts = url.parse(callbackURL, true);
  const query = urlParts.query;
  const payload = new URLSearchParams();
  payload.append("client_id", clientId);
  payload.append("client_secret", clientSecret);
  payload.append("grant_type", "authorization_code");
  payload.append("redirect_uri", redirectUrl);
  payload.append("code", query.code);
  payload.append(
    "scope",
    "identify guilds guilds.join gdm.join rpc email connections"
  );
  const options = {
    method: "POST",
    url: "https://discord.com/api/oauth2/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    data: payload,
  };
  const response = await axios(options);
  accessToken = response.data.access_token;
}

function getCurrentUser() {
  if (user) {
    return jwt.sign(user, "123Jwt");
  }
  return user;
}

function logout() {
  user = null;
}

async function getUserData() {
  try {
    const res = await axios({
      method: "GET",
      url: "https://discordapp.com/api/users/@me",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (res.data.id !== null || res.data.id !== undefined) {
      return res.data;
    }
    return res.status;
  } catch (err) {
    console.log("Something went wrong while accessing @me library");
  }
}

async function getUserGuildData(userData) {
  try {
    const res = await axios({
      method: "GET",
      url: `https://discordapp.com/api/guilds/${guildId}/members/${userData.id}`,
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    });
    if (res.data.roles !== null || res.data.roles !== undefined) {
      return res.data;
    }
    return res.status;
  } catch (err) {
    console.log(
      "Something went wrong while accessing member guild roles library"
    );
  }
}

async function getGuildRoles() {
  try {
    const res = await axios({
      method: "GET",
      url: `https://discordapp.com/api/guilds/${guildId}/roles`,
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    });
    // TODO => Check what else are we taking from here?
    // TODO => OPTIMZE CODE LIKE-> (!!res.data.id)
    if (res.data.id !== null || res.data.id !== undefined) {
      return res.data;
    }
    return res.status;
  } catch (err) {
    console.log("Something went wrong while accessing guild roles library");
  }
}

async function login() {
  const userData = await getUserData();
  const userGuildData = await getUserGuildData(userData);
  const guildRoles = await getGuildRoles();

  const userRoles = userGuildData.roles;
  const roles = [];
  for (const role of guildRoles) {
    if (
      userRoles.includes(role.id) &&
      role.name.toLowerCase().includes("beta")
    ) {
      roles.push(role.name);
    }
  }

  userData.joined_at = userGuildData.joined_at;
  userData.roles = roles;
  userData.avatar = userData.avatar
    ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
    : "https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png";
  user = userData; // TODO => Check if we can simply return object with required values
}

module.exports = {
  getAccessToken,
  getAuthenticationURL,
  loadTokens,
  login,
  getCurrentUser,
  logout,
  redirectUrl,
};
