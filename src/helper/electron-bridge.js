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
const testApi = async (data) => {
  return await ipcRenderer.invoke("test-api", data);
};

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

// DISCORD IPC  discord-spoofer-toaster
const addDiscordSpoofer = (data) =>
  ipcRenderer.send("start-discord-spoofer", data);
const updateDiscordSpooferStatus = (callback) =>
  ipcRenderer.on("discord-spoofer-toaster", (_, res) => callback(res));
const deleteDiscordSpoofer = (id) =>
  ipcRenderer.send("stop-discord-spoofer", id);

// MASS GIVEAWAY JOINER
const updateMassGiveawayJoinerStatus = (callback) =>
  ipcRenderer.on("mass-giveaway-joiner-status", (_, res) => callback(res));

const startMassGiveawayJoiner = (data) =>
  ipcRenderer.send("start-mass-giveaway-joiner", data);

const stopMassGiveawayJoiner = (id) =>
  ipcRenderer.send("stop-mass-giveaway-joiner", id);

// GIVEAWAY CHECKER
const startGiveawayChecker = (data) => {
  ipcRenderer.send("start-giveaway-checker", data);
};
const stopGiveawayChecker = (data) => {
  ipcRenderer.send("stop-giveaway-checker", data);
};
const updateStatusGiveawayChecker = (callback) => {
  ipcRenderer.on("update-gc-status", (_, data) => callback(data));
};

export {
  auth,
  getURL,
  testApi,
  sendLogs,
  authUser,
  closeApp,
  decodeUser,
  exportLogs,
  logoutUser,
  fetchServer,
  maximizeApp,
  checkForURL,
  minimizeApp,
  stopSpoofer,
  proxyTester,
  startSpoofer,
  errorInProxy,
  fetchChannel,
  stopXpFarmer,
  errorToaster,
  fetchedServer,
  toggleSpoofer,
  startXpFarmer,
  deleteSpoofer,
  launchSpoofer,
  fetchedChannel,
  spooferToaster,
  updateProgress,
  checkForUpdates,
  readArrayOfJson,
  interceptorFound,
  downloadingStart,
  debuggerChannnel,
  addDiscordSpoofer,
  updateNotAvailable,
  stopGiveawayJoiner,
  addCaptchaResolver,
  startGiveawayJoiner,
  stopGiveawayChecker,
  startGiveawayChecker,
  deleteDiscordSpoofer,
  updateStatusLOmonitor,
  stopLinkOpenerMonitor,
  stopMassGiveawayJoiner,
  startLinkOpenerMonitor,
  startMassGiveawayJoiner,
  proxyTestResultListener,
  stopInviteJoinerMonitor,
  captchaResolverListener,
  startInviteJoinerMonitor,
  updateDiscordSpooferStatus,
  updateGiveawayJoinerStatus,
  webhookNotificationListener,
  updateStatusGiveawayChecker,
  updateMassGiveawayJoinerStatus,
};
