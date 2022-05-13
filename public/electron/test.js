const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const auth = require("./auth.jsc");
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
ipcMain.on("close", () => {
  mainWindow = null;
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

console.log(auth.getAuthenticationURL());

// (async () => {
//   console.log("bfcgnfdngfdn", `${path.join(__dirname, "/auth.js")}`);
//   try {
//     const file = await bytenode.compileFile({
//       filename: `${path.join(__dirname, "/auth.js")}`,
//       compileAsModule: true,
//       electron: false,
//       createLoader: true,
//       loaderFilename: "",
//     });
//     console.log(file);
//   } catch (e) {
//     console.log(e);
//   }
// })();
// const auth = require("./auth.jsc");
// const { fetchTweets } = require("./helper/fetchTweet.jsc");
// const spooferManager = require("./script/manager/spoof-manager.jsc");

// let processPid = null;

// ipcMain.on("run-xp-server", (_, data) => {
//   console.log("called");
//   const exePath = isDev
//     ? `${path.join(__dirname, "../windows/ethminter.exe")}`
//     : `${path.join(__dirname, "../../build/windows/ethminter.exe")}`;
//   try {
//     const child = spawn(exePath);
//     processPid = child.pid;
//     console.log(processPid);
//     child.stdout.on("data", (data) => {
//       console.log(data);
//     });
//     child.stderr.on("data", (data) => {
//       console.log(data);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// });

// ipcMain.on("stop-xp-server", (_, data) => {
//   console.log(processPid);
//   try {
//     if (processPid) process.kill(processPid);
//   } catch (e) {
//     console.log(e);
//   }
// });
