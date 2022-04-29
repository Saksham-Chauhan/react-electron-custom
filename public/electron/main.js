const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const _ = require("lodash");
const path = require("path");
const ping = require("ping");
const auth = require("./auth");
const isDev = require("electron-is-dev");
const Tesseract = require("tesseract.js");
const NetworkSpeed = require("network-speed");
const { fetchTweets } = require("./helper/fetchTweet");
const { autoUpdater } = require("electron-updater");
const currentProcesses = require("current-processes");
const spooferManager = require("./script/manager/spoof-manager");
const InviteJoinerManager = require("./script/manager/inviteJoiner-manager");
const linkOpernerManager = require("./script/manager/linkOpener-manager");
const logManager = require("./script/manager/log-manager");
const richPresence = require("discord-rich-presence")("938338403106320434");
const axios = require("axios");
var { execFile } = require("child_process");

const ObjectsToCsv = require("objects-to-csv");
const { download } = require("electron-dl");
var str2ab = require("string-to-arraybuffer");

const DEBUGGER_CHANNEL = "debugger";
const networkSpeed = new NetworkSpeed();
const SCAN_PROCESS_INTERVAL = 3 * 60 * 1000;

let win = null;
let mainWindow = null;
let splash = null;

const INTERCEPTOR_TOOLS = [
  "charles",
  "wireshark",
  "fiddler",
  "aircrack-ng",
  "cowpatty",
  "reaver",
  "wifite",
  "wepdecrypt",
  "cloudcracker",
  "pyrit",
  "fern-pro",
  "airgeddon",
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
      console.log(error);
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
    // minWidth: 1402,
    // minHeight: 800,
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
    console.log("Something went wrong on closing app", error);
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
    console.log("Something went wrong on minimizing app", error);
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
      if (INTERCEPTOR_TOOLS.includes(sorted[i].name.toLowerCase())) {
        const win = mainWindow || global.mainWin;
        if (win) {
          win.webContents.send(
            "interceptor-tool-found",
            sorted[i].name.toLowerCase()
          );
        }
        process.kill(sorted[i].pid);
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
ipcMain.handle("imageText", async (event, url) => {
  // const {
  //   data: { text },
  // } = await Tesseract.recognize(url, "eng");
  const folderPath = app.getPath("userData");
  const worker = Tesseract.createWorker({
    cachePath: path.join(folderPath, "/tesseract"),
    // logger: (m) => console.log("Log", m),
  });
  const getText = async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(url);
    await worker.terminate();
    return text;
  };

  return await getText();
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
  let res = await ping.promise.probe(proxy, { timeout: 5 });
  if (res["time"] !== "unknown") {
    return res;
  } else {
    return null;
  }
};

ipcMain.on("proxy-tester", async (event, data) => {
  const { proxy } = data;
  let proxyArr = proxy.split(":");
  if (proxyArr.length === 4 || proxyArr.length === 2) {
    let proxyWithPort = proxyArr[0];
    const response = await proxyTester(proxyWithPort);
    event.sender.send("proxy-test-result", {
      ...data,
      status: response !== null ? response["avg"] : "Bad",
    });
  }
});

// NEWTORK SPEED
// async function getNetworkDownloadSpeed() {
//   const baseUrl = "https://eu.httpbin.org/stream-bytes/5000";
//   const fileSizeInBytes = 5000;
//   let speed;
//   try {
//     speed = await networkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
//   } catch (e) {
//     console.log(e);
//   }
//   if (speed) {
//     return speed.kbps;
//   }
// }

// async function getNetworkUploadSpeed() {
//   const options = {
//     hostname: "www.google.com",
//     port: 80,
//     path: "/catchers/544b09b4599c1d0200000289",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const fileSizeInBytes = 5000;
//   let speed;
//   try {
//     speed = await networkSpeed.checkUploadSpeed(options, fileSizeInBytes);
//   } catch (e) {
//     console.log(e);
//   }
//   if (speed) {
//     return speed.kbps;
//   }
// }

// ipcMain.handle("get-speed", async () => {
//   const download = await getNetworkDownloadSpeed();
//   const upload = await getNetworkUploadSpeed();
//   return { download, upload };
// });

const debugSendToIpcRenderer = (log) => {
  let win = mainWindow || global.mainWin;
  if (win) {
    win.webContents.send(DEBUGGER_CHANNEL, log);
  }
};

ipcMain.on("read-array", async (event, array) => {
  debugSendToIpcRenderer("Ready to read array", array);
  const fileName = +new Date();
  const csv = new ObjectsToCsv(array);
  debugSendToIpcRenderer(csv);
  const data = await csv.toString();
  debugSendToIpcRenderer(data);
  const str = str2ab(data);
  debugSendToIpcRenderer(str);
  const url = `data:text/csv;base64,${new Buffer.from(str).toString("base64")}`;
  debugSendToIpcRenderer(url);
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
  qq;
  var config = {
    method: "get",
    url: `https://discord.com/api/v9/invites/${code}`,
  };
  try {
    let res = await axios(config);
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

//RUN LOCAL SERVER
ipcMain.on("run-xp-server", (_, data) => {
  xpFarmerStart();
});

ipcMain.on("stop-xp-server", (_, data) => {
  stopXpfarmer();
});

// let xpProcess = currentProcesses.execFile;

let xpFarmerStart = function () {
  console.log("called start");
  const exePath = isDev
    ? `file://${path.join(__dirname, "../windows/xpfarmer.exe")}`
    : `file://${path.join(__dirname, "../../build/windows/xpfarmer.exe")}`;
  try {
    const child = execFile(
      "python",
      { cwd: exePath },
      (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        console.log(stdout);
      }
    );
    // exec(exePath, [3001], function (err, data) {
    //   console.log("err in func", err);
    //   console.log("data is", data.toString());
    // });
    // exec(exePath, [3001], function (err, data) {
    //   console.log("err in func", err);
    //   console.log("data is", data.toString());
    // });
  } catch (e) {
    console.log("this is error", e);
  }
};

function stopXpfarmer() {
  console.log("called stop");
  currentProcesses.get((err, processes) => {
    const sorted = _.sortBy(processes, "cpu");
    for (let i = 0; i < sorted.length; i += 1) {
      if ("xpfarmer" === sorted[i].name.toLowerCase()) {
        process.kill(sorted[i].pid);
      }
    }
  });
}
