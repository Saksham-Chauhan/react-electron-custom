const { ipcRenderer } = window.require("electron");
const minimizeApp = () => ipcRenderer.send("minimize");
const closeApp = () => ipcRenderer.send("close");
const maximizeApp = () => ipcRenderer.send("maximize");
const errorToaster = (callback) =>
  ipcRenderer.on("error", (_, err) => callback(err));
// Spoof IPC
const startSpoofer = (spoof) => ipcRenderer.send("start-spoofer", spoof);

const stopSpoofer = (spoof) => ipcRenderer.send("stop-spoofer", spoof);

const toggleSpoofer = (spoof) => ipcRenderer.send("toggle-spoofer", spoof);

const deleteSpoofer = (spoof) => ipcRenderer.send("delete-spoofer", spoof);

const spooferToaster = (callback) =>
  ipcRenderer.on("spoofer-toaster", (_, data) => callback(data));

// TWITTER IPC
const getTweets = (consumerKey, consumerSecret, userHandler) =>
  ipcRenderer.invoke("fetchTweets", {
    consumerKey,
    consumerSecret,
    userHandler,
  });

const checkForUpdates = () => {
  ipcRenderer.send("checkForUpdates");
}

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
  checkForUpdates
};
