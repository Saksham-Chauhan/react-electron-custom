const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const currentProcesses = require("current-processes");
const { autoUpdater } = require("electron-updater");
const _ = require("lodash");
const auth = require("./auth");
let win = null;
let mainWindow = null;

// AUTH WINDOW CREATION
// function createAuthWindow() {
//   destroyAuthWin();
//   win = new BrowserWindow({
//     width: 550,
//     height: 800,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: false,
//     },
//     transparent: true,
//     frame: false,
//     devTools: false,
//   });
//   win.loadURL(auth.getAuthenticationURL());
//   const {
//     session: { webRequest },
//   } = win.webContents;
// const filter = {
//   urls: [auth.redirect_uri],
// };
// webRequest.onBeforeRequest(filter, async ({ url }) => {
//   try {
//     await auth.loadTokens(url);
//     await auth.login();
//     if (!mainWindow) return;
//     mainWindow.reload();
//     return destroyAuthWin();
//   } catch (error) {
//     destroyAuthWin();

//     const options = {
//       type: "question",
//       defaultId: 2,
//       title: "Login Error",
//       message: "Login Failed",
//       detail: "You are not allowed to login",
//     };
//       dialog.showMessageBox(null, options, (response, checkboxChecked) => {});
//     }
//   });
//   win.on("authenticated", () => {
//     destroyAuthWin();
//   });
//   win.on("closed", () => {
//     win = null;
//   });
// }
// function destroyAuthWin() {
//   if (!win) return;
//   win.close();
//   win = null;
// }

// MAIN WINDOW CREATOR
function createWindow() {
  //   try {
  //     richPresence.updatePresence({
  //       details: "Developing The Kyro Tools",
  //       state: `V${app.getVersion()}`,
  //       startTimestamp: Date.now(),
  //       largeImageKey: "logo",
  //       largeImageText: "@getKyroTools",
  //       smallImageKey: "hearteyes",
  //       smallImageText: "Kyro Tools",
  //       instance: true,
  //       buttons: [{ label: "TWITTER", url: "https://twitter.com/KyroTools" }],
  //     });
  //   } catch (err) {
  //     console.log("Error in Disocrd RPC Wrapper", err.message);
  //   }
  mainWindow = new BrowserWindow({
    width: 1340,
    height: 800,
    resizable: true,
    frame: false,
    backgroundColor: "var(--main-bg)",
    icon: path.resolve(__dirname, "img", "logo.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      // devTools: false,
      webviewTag: true,
    },
    titleBarStyle: "customButtonsOnHover",
  });
  if (isDev) {
    mainWindow.webContents.openDevTools();
  } else {
    console.log(`This is Build Product ${app.getVersion()} Version`);
  }

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000/"
      : `file://${path.join(__dirname, "../../build/index.html")}`
  );
}

// IPC NECESSARY EVENTS

// ipcMain.on("logout", () => {
//   auth.logout();
// });

// ipcMain.on("auth", () => {
//   createAuthWindow();
// });

// ipcMain.handle("get-user", () => {
//     return auth.getCurrentUser();
//   });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("close", () => {
  mainWindow.close();
});

ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});
ipcMain.on("minimize", () => {
  mainWindow.minimize();
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

// AUTO UPDATER

// for update to work we have to add publish key in package.json file
// so that updater can use that value detect update available or not

// Channel need to Add Listener in React App
// update:anerror update:showModal update:downloading update:not-avail update:progress update:reset

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
        console.log("fuck out of here");
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
