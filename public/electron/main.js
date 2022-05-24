const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const _ = require("lodash");
const path = require("path");
const axios = require("axios");
const isDev = require("electron-is-dev");
const Tesseract = require("tesseract.js");
const { autoUpdater } = require("electron-updater");
const currentProcesses = require("current-processes");
const bytenode = require("bytenode");

(async () => {
  try {
    bytenode.compileFile({
      filename: `${path.join(__dirname, "/script/manager/spoof-manager.js")}`,
      output: `${path.join(__dirname, "/script/manager/spoof-manager.jsc")}`,
    });
    bytenode.runBytecodeFile(
      `${path.join(__dirname, "/script/manager/spoof-manager.jsc")}`
    );
    bytenode.compileFile({
      filename: `${path.join(__dirname, "/helper/fetchTweet.js")}`,
      output: `${path.join(__dirname, "/helper/fetchTweet.jsc")}`,
    });
    bytenode.runBytecodeFile(
      `${path.join(__dirname, "/helper/fetchTweet.jsc")}`
    );
    bytenode.compileFile({
      filename: `${path.join(__dirname, "/auth.js")}`,
      output: `${path.join(__dirname, "/auth.jsc")}`,
    });
    bytenode.runBytecodeFile(`${path.join(__dirname, "/auth.jsc")}`);

    bytenode.compileFile({
      filename: `${path.join(
        __dirname,
        "/script/manager/giveawayJoiner-manager.js"
      )}`,
      output: `${path.join(
        __dirname,
        "/script/manager/giveawayJoiner-manager.jsc"
      )}`,
    });

    bytenode.runBytecodeFile(
      `${path.join(__dirname, "/script/manager/giveawayJoiner-manager.jsc")}`
    );

    bytenode.compileFile({
      filename: `${path.join(
        __dirname,
        "/script/manager/xp-farmer-manager.js"
      )}`,
      output: `${path.join(
        __dirname,
        "/script/manager/xp-farmer-manager.jsc"
      )}`,
    });
    bytenode.runBytecodeFile(
      `${path.join(__dirname, "/script/manager/xp-farmer-manager.jsc")}`
    );
    bytenode.compileFile({
      filename: `${path.join(__dirname, "/script/manager/log-manager.js")}`,
      output: `${path.join(__dirname, "/script/manager/log-manager.jsc")}`,
    });
    bytenode.runBytecodeFile(
      `${path.join(__dirname, "/script/manager/log-manager.jsc")}`
    );
    bytenode.compileFile({
      filename: `${path.join(
        __dirname,
        "/script/manager/linkOpener-manager.js"
      )}`,
      output: `${path.join(
        __dirname,
        "/script/manager/linkOpener-manager.jsc"
      )}`,
    });
    bytenode.runBytecodeFile(
      `${path.join(__dirname, "/script/manager/linkOpener-manager.jsc")}`
    );
    bytenode.compileFile({
      filename: `${path.join(
        __dirname,
        "/script/manager/inviteJoiner-manager.js"
      )}`,
      output: `${path.join(
        __dirname,
        "/script/manager/inviteJoiner-manager.jsc"
      )}`,
    });
    bytenode.runBytecodeFile(
      `${path.join(__dirname, "/script/manager/inviteJoiner-manager.jsc")}`
    );
  } catch (e) {
    console.log(e);
  }
})();

const auth = require("./auth.jsc");
const { fetchTweets } = require("./helper/fetchTweet.jsc");
const spooferManager = require("./script/manager/spoof-manager");
const InviteJoinerManager = require("./script/manager/inviteJoiner-manager.jsc");
const linkOpernerManager = require("./script/manager/linkOpener-manager.jsc");
const logManager = require("./script/manager/log-manager.jsc");
const giveawayJoiner = require("./script/manager/giveawayJoiner-manager.jsc");
const xpFarmerManager = require("./script/manager/xp-farmer-manager.jsc");

const ObjectsToCsv = require("objects-to-csv");
const { download } = require("electron-dl");
const str2ab = require("string-to-arraybuffer");
const richPresence = require("discord-rich-presence")("938338403106320434");

const DEBUGGER_CHANNEL = "debugger";
const SCAN_PROCESS_INTERVAL = 3 * 60 * 1000;

let win = null;
let mainWindow = null;
let splash = null;

const INTERCEPTOR_TOOLS = [
  "pyrit",
  "reaver",
  "wifite",
  "charles",
  "fiddler",
  "fern-pro",
  "cowpatty",
  "wireshark",
  "airgeddon",
  "wepdecrypt",
  "aircrack-ng",
  "cloudcracker",
];

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
    urls: [auth.redirectUrl],
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
      await dialog.showMessageBox(null, options);
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
          url: "https://discord.gg/vSSezmnv2H", // TODO => Check this invite link
        },
      ],
    });
  } catch (err) {
    console.log("Error in Discord RPC Wrapper", err.message);
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
      devTools: !isDev ? false : true,
      webviewTag: true,
    },
    titleBarStyle: "customButtonsOnHover",
  });

  if (isDev) mainWindow.webContents.openDevTools();

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

ipcMain.on("close", () => {
  const win = mainWindow || global.mainWin;
  try {
    if (win) {
      win.close();
    }
  } catch (error) {
    console.log("Something went wrong on closing app", error);
  }
  if (app.isQuitting) {
    win.hide();
  }
});

ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});

ipcMain.on("minimize", () => {
  try {
    const win = mainWindow || global.mainWin;
    if (win) {
      win.minimize();
    }
  } catch (error) {
    console.log("Something went wrong on minimizing app", error);
  }
});

ipcMain.on("maximize", () => {
  const win = mainWindow || global.mainWin;
  if (!win.isMaximized()) {
    win.maximize();
  } else {
    win.unmaximize();
  }
});

ipcMain.on("close", () => {
  mainWindow = null;
});

app.on("activate", () => {
  const win = mainWindow || global.mainWin;
  if (win === null) {
    createWindow();
  } else {
    win.show();
  }
});

app.on("window-all-closed", function () {
  spooferManager.deleteAllSpoofer();
  logManager.saveLogs();
  app.quit();
});

const shouldNotQuit = app.requestSingleInstanceLock();

if (!shouldNotQuit) {
  console.log("Other app has focus lock");
  app.quit();
}
app.on("ready", () => {
  createWindow();
  logManager.initLogs();
  global.mainWin = mainWindow;
});

const updateCheck = () => {
  autoUpdater.autoDownload = false;

  autoUpdater.checkForUpdates();
  const updateMessage = (message, err = null) => {
    if (err) {
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

  const notavailable = () => {
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
  currentProcesses.get((_, processes) => {
    const sorted = _.sortBy(processes, "cpu");
    for (let i = 0; i < sorted.length; i += 1) {
      if (INTERCEPTOR_TOOLS.includes(sorted[i].name.toLowerCase())) {
        const win = mainWindow || global.mainWin;
        if (win) {
          win.webContents.send(
            "interceptor-tool-found",
            sorted[i].name.toLowerCase()
          );
        }
        process.kill(sorted[i].pid);
      }
    }
    app.quit();
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
      }, SCAN_PROCESS_INTERVAL);
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

ipcMain.handle("imageText", async (_, url) => {
  const {
    data: { text },
    // TODO=> FIX BINARY ISSUE IN PRODUCTION
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

const debugSendToIpcRenderer = (log) => {
  const win = mainWindow || global.mainWin;

  if (win) {
    win.webContents.send(DEBUGGER_CHANNEL, log);
  }
};

ipcMain.on("read-array", async (event, array) => {
  const fileName = +new Date();
  const csv = new ObjectsToCsv(array);
  const data = await csv.toString();
  const str = str2ab(data);
  const url = `data:text/csv;base64,${new Buffer.from(str).toString("base64")}`;
  await downloadCsvFileDialog(`${fileName}.csv`, url);
});

const downloadCsvFileDialog = async (fileName, url) => {
  const options = {
    buttons: ["Yes", "No"],
    defaultId: 0,
    title: "Kyro",
    message: `Do you want to download ${fileName}`,
    detail: "New generated password csv along with username",
  };
  const dialogResult = await dialog.showMessageBox(mainWindow, options);
  if (dialogResult.response === 0) {
    await download(mainWindow, url, {
      saveAs: true,
    });
  }
};

// LOG IPC EVENT
ipcMain.on("add-log", (e, log) => {
  const logMsg = log || e;
  logManager.logMessage(logMsg);
});

ipcMain.on("export-log-report", (_, data) => {
  logManager.sendLogs();
});

// ACC CHANGER IPC
ipcMain.on("get-server-avatar", async (event, code) => {
  let url;
  var config = {
    method: "get",
    url: `https://discord.com/api/v9/invites/${code}`,
  };
  try {
    const res = await axios(config);
    url = `https://cdn.discordapp.com/icons/${res.data.guild.id}/${res.data.guild.icon}.png`;
  } catch (e) {
    console.log(e);
  }
  mainWindow.webContents.send("url-is", url);
});

// LO IPC EVENTS
ipcMain.on("start-linkOpener-monitor", (_, data) => {
  linkOpernerManager.addMonitor(data);
});
ipcMain.on("stop-linkOpener-monitor", (_, id) => {
  linkOpernerManager.stopMonitor(id);
});

ipcMain.on("start-inviteJoiner-monitor", (_, data) => {
  InviteJoinerManager.addMonitor(data);
});
ipcMain.on("stop-inviteJoiner-monitor", (_, id) => {
  InviteJoinerManager.stopMonitor(id);
});

// GIVEAWAY JOINER
ipcMain.on("start-giveaway-joiner", (_, data) => {
  giveawayJoiner.addMonitor(data);
});
ipcMain.on("stop-giveaway-joiner", (_, id) => {
  giveawayJoiner.stopMonitor(id);
});

// XP FARMER IPC

ipcMain.on("run-xp-server", (_, data) => {
  xpFarmerManager.addFarmer(data);
});

ipcMain.on("stop-xp-server", (_, data) => {
  xpFarmerManager.stopFarmer(data);
});

// ACCOUNT CHANGER IPC
ipcMain.on("fetch_server", async (_, token) => {
  try {
    const res = await axios.get(`https://discord.com/api/users/@me/guilds`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (res.status === 200 || res.status === 204) {
      mainWindow.webContents.send("fetched-server", res.data);
    }
  } catch (e) {
    mainWindow.webContents.send("fetched-server", {
      error: e.message,
      badRQ: true,
    });
  }
});

ipcMain.on("fetch_channel", async (_, data) => {
  try {
    const res = await axios.get(
      `https://discord.com/api/v9/guilds/${data.id}/channels`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: data.token,
        },
      }
    );
    mainWindow.webContents.send("fetched-channel", res.data);
  } catch (e) {
    mainWindow.webContents.send("fetched-channel", e.message);
  }
});
