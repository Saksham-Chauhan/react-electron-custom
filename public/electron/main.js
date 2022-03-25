const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const ping = require("ping");
const auth = require("./auth");
const isDev = require("electron-is-dev");
const Tesseract = require("tesseract.js");
const NetworkSpeed = require("network-speed");
const fetchTweets = require("./helper/fetchTweet");
const { autoUpdater } = require("electron-updater");
const currentProcesses = require("current-processes");
const spooferManager = require("./script/manager/spoof-manager");
const richPresence = require("discord-rich-presence")("938338403106320434");
const testNetworkSpeed = new NetworkSpeed();
const _ = require("lodash");

let win = null;
let mainWindow = null;
let splash = null;

// AUTH WINDOW CREATION
function createAuthWindow() {
  destroyAuthWin();
  win = new BrowserWindow({
    width: 550,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
    },
    transparent: true,
    frame: false,
    devTools: false,
  });
  win.loadURL(auth.getAuthenticationURL());
  const {
    session: { webRequest },
  } = win.webContents;
  const filter = {
    urls: [auth.redirect_uri],
  };
  webRequest.onBeforeRequest(filter, async ({ url }) => {
    try {
      await auth.loadTokens(url);
      await auth.login();
      if (!mainWindow) return;
      mainWindow.reload();
      return destroyAuthWin();
    } catch (error) {
      destroyAuthWin();

      const options = {
        type: "question",
        defaultId: 2,
        title: "Login Error",
        message: "Login Failed",
        detail: "You are not allowed to login",
      };
      dialog.showMessageBox(null, options, (response, checkboxChecked) => {});
    }
  });
  win.on("authenticated", () => {
    destroyAuthWin();
  });
  win.on("closed", () => {
    win = null;
  });
}
function destroyAuthWin() {
  if (!win) return;
  win.close();
  win = null;
}

// MAIN WINDOW CREATOR
function createWindow() {
  try {
    richPresence.updatePresence({
      details: "Playing Kyro Tools",
      state: `v:${app.getVersion()}`,
      startTimestamp: Date.now(),
      largeImageKey: "kyros_logo",
      largeImageText: "@getKyroTools",
      smallImageKey: "emoji",
      smallImageText: "Kyro Tools",
      instance: true,
      buttons: [
        { label: "Twitter", url: "https://twitter.com/KyroTools" },
        {
          label: "Discord",
          url: "https://discord.gg/vSSezmnv2H",
        },
      ],
    });
  } catch (err) {
    console.log("Error in Disocrd RPC Wrapper", err.message);
  }
  mainWindow = new BrowserWindow({
    width: 1402,
    height: 800,
    resizable: true,
    frame: false,
    show: false,
    backgroundColor: "var(--app-bg)",
    icon: path.resolve(__dirname, "images", "logo.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      // devTools: !isDev ? false : true,
      webviewTag: true,
    },
    titleBarStyle: "customButtonsOnHover",
  });
  if (isDev) {
    mainWindow.webContents.openDevTools();
  } else {
    console.log(`This is Build Product ${app.getVersion()}`);
  }

  splash = new BrowserWindow({
    width: 700,
    height: 390,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });
  splash.loadURL(
    isDev
      ? `file://${path.join(__dirname, "../splash.html")}`
      : `file://${path.join(__dirname, "../../build/splash.html")}`
  );
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000/"
      : `file://${path.join(__dirname, "../../build/index.html")}`
  );
  mainWindow.once("ready-to-show", () => {
    splash.destroy();
    mainWindow.show();
  });
}

// IPC NECESSARY EVENTS
ipcMain.on("auth", () => {
  createAuthWindow();
});

ipcMain.handle("authenticate-user", (_, __) => {
  return auth.getCurrentUser();
});

ipcMain.on("logout-user", () => {
  auth.logout();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("close", () => {
  try {
    let tempMainWindow = mainWindow || global.mainWin;
    if (tempMainWindow) {
      tempMainWindow.close();
    }
  } catch (error) {
    console.log("Something went wroung on minizing app", error);
  }
});

ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});

ipcMain.on("minimize", () => {
  try {
    let tempMainWindow = mainWindow || global.mainWin;
    if (tempMainWindow) {
      tempMainWindow.minimize();
    }
  } catch (error) {
    console.log("Something went wroung on minizing app", error);
  }
});

ipcMain.on("maximize", () => {
  let tempMainWindow = mainWindow || global.mainWin;
  if (!tempMainWindow.isMaximized()) {
    tempMainWindow.maximize();
  } else {
    tempMainWindow.unmaximize();
  }
});

ipcMain.on("close", () => {
  mainWindow = null;
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

app.on("window-all-closed", function () {
  spooferManager.deleteAllSpoofer();
  app.quit();
});

const shouldNotQuit = app.requestSingleInstanceLock();

if (!shouldNotQuit) {
  console.log("Other app has focus lock");
  app.quit();
}
app.on("ready", () => {
  createWindow();
  global.mainWin = mainWindow;
});

const updateCheck = () => {
  autoUpdater.autoDownload = false;

  autoUpdater.checkForUpdates();
  const updateMessage = (message, err = null) => {
    if (err) {
      console.log(err);
      sendUpdateMessage("update:anerror");
      return;
    }
    sendUpdateMessage(message);
  };
  const available = (info) => {
    updateMessage("update:avail");
    setTimeout(() => {
      sendUpdateMessage("update:showModal", info);
    }, 700);
  };
  autoUpdater.on("update-available", available);
  const notavailable = (info) => {
    updateMessage("update:not-avail");
    ipcMain.emit("update:ADecision", "event", "ignore");
  };
  autoUpdater.on("update-not-available", notavailable);

  const anerror = (err) => {
    updateMessage("update:anerror", err);
    ipcMain.emit("update:ADecision", "event", "ignore");
    ipcMain.emit("update:installDecision", "event", "ignore");
  };
  autoUpdater.on("error", anerror);

  const progression = (progressObj) => {
    const percent = Math.trunc(progressObj.percent);
    sendUpdateMessage("update:pogress", percent);
    if (progressObj.percent === "100")
      autoUpdater.removeListener("download-progress", progression);
  };
  autoUpdater.on("download-progress", progression);
  ipcMain.once("update:ADecision", (e, decision) => {
    const actualDecision = decision || e;
    if (actualDecision === "ignore") {
      autoUpdater.removeListener("update-available", available);
      autoUpdater.removeListener("update-not-available", notavailable);
      autoUpdater.removeListener("error", anerror);
      autoUpdater.removeListener("download-progress", progression);
    } else {
      autoUpdater.downloadUpdate();
      sendUpdateMessage("update:downloading");
    }
  });
  ipcMain.once("update:installDecision", (e, decision) => {
    const actualDecision = decision || e;
    if (actualDecision === "ignore") {
      autoUpdater.removeListener("update-available", available);
      autoUpdater.removeListener("update-not-available", notavailable);
      autoUpdater.removeListener("error", anerror);
      autoUpdater.removeListener("download-progress", progression);
    } else {
      autoUpdater.quitAndInstall();
      app.quit();
    }
  });
  const installation = () => {
    sendUpdateDownloaded();
  };
  autoUpdater.on("update-downloaded", installation);
};

/**
 * function scan current running process
 */
function scanProcesses() {
  currentProcesses.get((err, processes) => {
    const sorted = _.sortBy(processes, "cpu");
    for (let i = 0; i < sorted.length; i += 1) {
      if (
        sorted[i].name.toLowerCase() === "charles" ||
        sorted[i].name.toLowerCase() === "wireshark" ||
        sorted[i].name.toLowerCase() === "fiddler"
      ) {
        app.quit();
      }
    }
  });
}

/**
 * function check is process running
 */
function checkProcesses(starting = false) {
  if (process.env.NODE_ENV === "development") return;
  try {
    if (starting) {
      setInterval(() => {
        scanProcesses();
      }, 3 * 60 * 1000);
    } else {
      scanProcesses();
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * helper function that show modal on app
 */
async function sendUpdateMessage(message, info = null) {
  mainWindow.webContents.send(message, info);
  if (message === "update:avail") {
    setTimeout(async () => {
      const options = {
        buttons: ["Yes", "No"],
        defaultId: 0,
        title: "New Kyro Update",
        message: "Would you like to download the new  Kyro update?",
        detail:
          "Please note that if you click No, the new update will still be installed after you quit Kyro.",
      };
      const dialogResult = await dialog.showMessageBox(mainWindow, options);
      if (dialogResult.response === 0) {
        ipcMain.emit("update:ADecision", "download");
      } else {
        ipcMain.emit("update:ADecision", "ignore");
        mainWindow.webContents.send("update:reset");
      }
    }, 1200);
  }
}

async function sendUpdateDownloaded() {
  mainWindow.webContents.send("update:downloaded");
  setTimeout(async () => {
    const options = {
      buttons: ["Yes", "No"],
      defaultId: 0,
      title: "New ",
      message:
        "An updated version of Kyro has been downloaded. Would you like to quit and install now?",
      detail:
        "Please note that if you click No, the new update will still be installed after you quit  Kyro.",
    };
    const dialogResult = await dialog.showMessageBox(mainWindow, options);
    if (dialogResult.response === 0) {
      ipcMain.emit("update:installDecision", "install");
    } else {
      ipcMain.emit("update:installDecision", "ignore");
      mainWindow.webContents.send("update:reset");
    }
  }, 1200);
}

// Auto updater IPC event
ipcMain.on("checkForUpdates", () => {
  checkProcesses();
  updateCheck();
});

//Twitter section IPC
ipcMain.handle(
  "fetchTweets",
  (e, { consumerKey, consumerSecret, userHandler }) => {
    return fetchTweets(consumerKey, consumerSecret, userHandler);
  }
);
ipcMain.handle("imageText", async (event, url) => {
  const {
    data: { text },
  } = await Tesseract.recognize(url, "eng");
  return text;
});

// Spoofer IPC
ipcMain.on("start-spoofer", (_, data) => {
  spooferManager.addSpoofer(data);
  spooferManager.startSpoofer(data.id);
});

ipcMain.on("stop-spoofer", (_, data) => {
  spooferManager.stopSpoofer(data.id);
});

ipcMain.on("toggle-spoofer", (_, data) => {
  spooferManager.toggleSpoofer(data.id);
});

ipcMain.on("delete-spoofer", (_, data) => {
  spooferManager.deleteSpoofer(data.id);
});

ipcMain.on("launch-spoofer", (_, data) => {
  spooferManager.addSpoofer(data);
  spooferManager.startSpoofer(data.id);
  spooferManager.toggleSpoofer(data.id);
});

// proxy IPC
const proxyTester = async (proxy) => {
  let res = await ping.promise.probe(proxy);
  if (res["time"] !== "unknown") {
    return res;
  } else {
    return null;
  }
};

ipcMain.on("proxy-tester", async (event, data) => {
  const { proxy } = data;
  let proxyArr = proxy.split(":");
  if (proxyArr.length === 4) {
    let proxyWithPort = proxyArr[0];
    const response = await proxyTester(proxyWithPort);
    event.sender.send("proxy-test-result", {
      ...data,
      status: response !== null ? response["avg"] : "Bad",
    });
  }
});

// NEWTORK SPEED
async function getNetworkDownloadSpeed() {
  const baseUrl = "https://eu.httpbin.org/stream-bytes/500000";
  const fileSizeInBytes = 500000;
  const speed = await testNetworkSpeed.checkDownloadSpeed(
    baseUrl,
    fileSizeInBytes
  );
  return speed.kbps;
}

async function getNetworkUploadSpeed() {
  const options = {
    hostname: "www.google.com",
    port: 80,
    path: "/catchers/544b09b4599c1d0200000289",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const fileSizeInBytes = 2000000;
  const speed = await testNetworkSpeed.checkUploadSpeed(
    options,
    fileSizeInBytes
  );
  return speed.kbps;
}

ipcMain.handle("get-speed", async () => {
  const download = await getNetworkDownloadSpeed();
  const upload = await getNetworkUploadSpeed();
  return { download, upload };
});
