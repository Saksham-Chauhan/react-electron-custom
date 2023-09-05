const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const electron = require("electron");
const _ = require("lodash");
const path = require("path");
const isDev = require("electron-is-dev");

const { autoUpdater } = require("electron-updater");
const currentProcesses = require("current-processes");
const bytenode = require("bytenode");
// const { Client } = require("discord.js-selfbot-v13");

// const selfClient = new Client({});

(async () => {
  try {
    bytenode.compileFile({
      filename: `${path.join(__dirname, "/auth.js")}`,
      output: `${path.join(__dirname, "/auth.jsc")}`,
    });
    bytenode.runBytecodeFile(`${path.join(__dirname, "/auth.jsc")}`);

    bytenode.compileFile({
      filename: `${path.join(__dirname, "/script/manager/log-manager.js")}`,
      output: `${path.join(__dirname, "/script/manager/log-manager.jsc")}`,
    });
    bytenode.runBytecodeFile(
      `${path.join(__dirname, "/script/manager/log-manager.jsc")}`
    );
  } catch (e) {
    console.log(e);
  }
})();

const auth = require("./auth.jsc");
const logManager = require("./script/manager/log-manager.jsc");

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
    devTools: true,
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
      details: "Playing Mirror Bot",
      state: `v:${app.getVersion()}`,
      startTimestamp: Date.now(),
      largeImageKey: "mirror_logo",
      largeImageText: "@getMirrorBot",
      smallImageKey: "emoji",
      smallImageText: "Mirror Bot",
      instance: true,
      buttons: [
        { label: "Twitter", url: "https://twitter.com/mirrorbot" },
        {
          label: "Discord",
          url: "https://discord.gg/vSSezmnv2H",
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
      devTools: true,
      webviewTag: true,
    },
    titleBarStyle: "customButtonsOnHover",
  });

  if (isDev) mainWindow.webContents.openDevTools();
  else mainWindow?.webContents?.openDevTools();

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
    mainWindow.webContents.openDevTools();
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
  try {
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
  } catch (error) {
    console.log(error, "in update");
  }
};

/**
 * function scan current running process
 */
function scanProcesses() {
  let flag = false;
  currentProcesses.get((event, processes) => {
    const sorted = _.sortBy(processes, "cpu");
    for (let i = 0; i < sorted.length; i += 1) {
      if (INTERCEPTOR_TOOLS.includes(sorted[i].name.toLowerCase())) {
        flag = true;
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
    if (flag) app.quit();
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

// Debug channel
const debugSendToIpcRenderer = (log) => {
  const win = mainWindow || global.mainWin;
  if (win) {
    win.webContents.send(DEBUGGER_CHANNEL, log);
  }
};
