const { ipcRenderer } = window.require("electron");
const jwt = window.require("jsonwebtoken");

const minimizeApp = () => ipcRenderer.send("minimize");

const closeApp = () => ipcRenderer.send("close");

const maximizeApp = () => ipcRenderer.send("maximize");

const errorToaster = (callback) =>
  ipcRenderer.on("error", (_, err) => callback(err));

const checkForUpdates = () => {
  ipcRenderer.send("checkForUpdates");
};

const updateProgress = (callback) =>
  ipcRenderer.on("update:pogress", (_, progress) => callback(progress));

const downloadingStart = (callback) =>
  ipcRenderer.on("update:downloading", (_, data) => callback(data));

const sendLogs = (log) => ipcRenderer.send("add-log", log);
const exportLogs = () => ipcRenderer.send("export-log-report");
const readArrayOfJson = (array) => ipcRenderer.send("read-array", array);

const updateNotAvailable = (callback) =>
  ipcRenderer.on("update:not-avail", () => callback());

// Spoof IPC
const startSpoofer = (spoof) => ipcRenderer.send("start-spoofer", spoof);

const stopSpoofer = (spoof) => ipcRenderer.send("stop-spoofer", spoof);

const toggleSpoofer = (spoof) => ipcRenderer.send("toggle-spoofer", spoof);

const deleteSpoofer = (spoof) => ipcRenderer.send("delete-spoofer", spoof);

const spooferToaster = (callback) =>
  ipcRenderer.on("spoofer-toaster", (_, data) => callback(data));

const launchSpoofer = (spoof) => ipcRenderer.send("launch-spoofer", spoof);

// TWITTER IPC
const getTweets = (consumerKey, consumerSecret, userHandler) =>
  ipcRenderer.invoke("fetchTweets", {
    consumerKey,
    consumerSecret,
    userHandler,
  });

// PROXY IPC
const proxyTester = (proxy) => ipcRenderer.send("proxy-tester", proxy);

const proxyTestResultListener = (callback) =>
  ipcRenderer.on("proxy-test-result", (_, res) => callback(res));

// LOGIN IPC
const authUser = () =>
  ipcRenderer.invoke("authenticate-user").then((user) => user);
const logoutUser = () => ipcRenderer.send("logout-user");
const auth = () => ipcRenderer.send("auth");
const decodeUser = (encodeString) =>
  jwt.verify(encodeString, process.env.REACT_APP_JWT_SECRET_KEY);

const debuggerChannnel = () =>
  ipcRenderer.on("debugger", (_, logs) => console.log("Logs", logs));

const interceptorFound = (callback) =>
  ipcRenderer.on("interceptor-tool-found", (_, interceptor) =>
    callback(interceptor)
  );
const checkForURL = (value) => {
  ipcRenderer.send("get-server-avatar", value);
};

const getURL = (callback) => {
  ipcRenderer.on("url-is", (_, url) => callback(url));
};

// LO IPC
const startLinkOpenerMonitor = (data) =>
  ipcRenderer.send("start-linkOpener-monitor", data);
const stopLinkOpenerMonitor = (id) =>
  ipcRenderer.send("stop-linkOpener-monitor", id);

const startInviteJoinerMonitor = (data) =>
  ipcRenderer.send("start-inviteJoiner-monitor", data);

const stopInviteJoinerMonitor = (id) =>
  ipcRenderer.send("stop-inviteJoiner-monitor", id);

const updateStatusLOmonitor = (callback) =>
  ipcRenderer.on("update-status", (_, res) => callback(res));

const webhookNotificationListener = (callback) =>
  ipcRenderer.on("webhook-status", (_, status) => callback(status));

// Giveaway Joiner
const startGiveawayJoiner = (data) =>
  ipcRenderer.send("start-giveaway-joiner", data);

const stopGiveawayJoiner = (id) => ipcRenderer.send("stop-giveaway-joiner", id);

const updateGiveawayJoinerStatus = (callback) =>
  ipcRenderer.on("giveaway-joiner-status", (_, res) => callback(res));

// XP-FARMER
const startXpFarmer = (value) => {
  ipcRenderer.send("run-xp-server", value);
};
const stopXpFarmer = (value) => {
  ipcRenderer.send("stop-xp-server", value);
};
const errorInProxy = (callback) => {
  ipcRenderer.on("no-proxy", (e_, data) => callback(data));
};

// FOR SERVER AND CHANNEL ID
const fetchServer = (value) => {
  ipcRenderer.send("fetch_server", value);
};

const fetchedServer = (callback) =>
  ipcRenderer.once("fetched-server", (e, data) => callback(data));

const fetchChannel = (value) => {
  ipcRenderer.send("fetch_channel", value);
};

const fetchedChannel = (callback) =>
  ipcRenderer.once("fetched-channel", (_, data) => callback(data));

// CAPTCHA RESOLVER
const addCaptchaResolver = (captcha) =>
  ipcRenderer.send("add-captcha", captcha);
const captchaResolverListener = (callback) =>
  ipcRenderer.on("captcha-response", (_, data) => callback(data));

module.exports = {
  errorInProxy,
  updateGiveawayJoinerStatus,
  startGiveawayJoiner,
  stopGiveawayJoiner,
  fetchChannel,
  fetchedChannel,
  fetchedServer,
  fetchServer,
  stopXpFarmer,
  startXpFarmer,
  getURL,
  checkForURL,
  interceptorFound,
  minimizeApp,
  closeApp,
  maximizeApp,
  getTweets,
  startSpoofer,
  stopSpoofer,
  toggleSpoofer,
  deleteSpoofer,
  spooferToaster,
  errorToaster,
  launchSpoofer,
  proxyTester,
  proxyTestResultListener,
  updateNotAvailable,
  checkForUpdates,
  decodeUser,
  authUser,
  logoutUser,
  auth,
  readArrayOfJson,
  debuggerChannnel,
  updateProgress,
  downloadingStart,
  sendLogs,
  exportLogs,
  startLinkOpenerMonitor,
  updateStatusLOmonitor,
  stopLinkOpenerMonitor,
  startInviteJoinerMonitor,
  stopInviteJoinerMonitor,
  webhookNotificationListener,
  addCaptchaResolver,
  captchaResolverListener,
};
