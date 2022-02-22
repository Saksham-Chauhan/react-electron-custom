const axios = require("axios");
const url = require("url");
const jwt = require("jsonwebtoken");
// FOR PRODUCTION CREDENTIALS
const bot_token = "OTM4MzM4NDAzMTA2MzIwNDM0.Yfo1vA.RA9WBRV-R6CpsTUqt6OVlGtUIXg";
const client_id = "938338403106320434";
const client_secret = "L74jCftmysbzbqpy08i8O_QegPvo8NRb";
const guildId = "936538800027467816";
const redirect_uri = "http://localhost/callback/*";
let accessToken = null;


function getAccessToken() {
  return accessToken;
}
function getAuthenticationURL() {
  return `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=email%20identify`;
}

async function loadTokens(callbackURL) {
  const urlParts = url.parse(callbackURL, true);
  const query = urlParts.query;
  const payload = new URLSearchParams();
  payload.append("client_id", client_id);
  payload.append("client_secret", client_secret);
  payload.append("grant_type", "authorization_code");
  payload.append("redirect_uri", redirect_uri);
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
let user = null;

function getCurrentUser() {
  if (user) {
    return jwt.sign(user, "123Jwt");
  }
  return user;
}

function logout() {
  user = null;
}
async function login() {
  let options = {
    method: "GET",
    url: "https://discordapp.com/api/users/@me",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  let res = await axios(options);
  const userData = res.data;

  options = {
    method: "GET",
    url: `https://discordapp.com/api/guilds/${guildId}/members/${userData.id}`,
    headers: {
      Authorization: `Bot ${bot_token}`,
    },
  };
  res = await axios(options);
  const roles_id = res.data.roles;
  userData.joined_at = res.data.joined_at;

  options = {
    method: "GET",
    url: `https://discordapp.com/api/guilds/${guildId}/roles`,
    headers: {
      Authorization: `Bot ${bot_token}`,
    },
  };
  res = await axios(options);
  const roles = [];
  for (const role of res.data) {
    if (roles_id.includes(role.id)) {
      roles.push(role.name);
    }
  }
  userData.roles = roles;

  userData.avatar = userData.avatar
    ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
    : "https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png";
  user = userData;
}

module.exports = {
  getAccessToken,
  getAuthenticationURL,
  loadTokens,
  login,
  getCurrentUser,
  logout,redirect_uri
};