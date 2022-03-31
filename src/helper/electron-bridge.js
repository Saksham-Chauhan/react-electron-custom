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

const readArrayOfJson = (array) => ipcRenderer.send("read-array", array);

const updateNotAvailable = (callback) =>
  ipcRenderer.on("update:not-avail", () => callback());

const fetchNetworkSpeed = () => ipcRenderer.invoke("get-speed");

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


const debuggerChannnel=() => ipcRenderer.on("debugger",(_,logs) => console.log("Logs",logs))

module.exports = {
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
  fetchNetworkSpeed,
  decodeUser,
  authUser,
  logoutUser,
  auth,
  readArrayOfJson,debuggerChannnel
};
