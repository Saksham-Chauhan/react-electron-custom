const { ipcRenderer } = window.require("electron");
const minimizeApp = () => ipcRenderer.send("minimize");
const closeApp = () => ipcRenderer.send("close");
const maximizeApp = () => ipcRenderer.send("maximize");

module.exports = { minimizeApp, closeApp, maximizeApp };
