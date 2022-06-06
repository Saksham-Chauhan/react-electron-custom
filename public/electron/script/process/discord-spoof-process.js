const electron = require("electron");
const UserAgent = require("user-agents");
const {
  getProxyHostPort,
  getProxyData,
  displayTitle,
} = require("../../helper");

const session = electron.session;
const BrowserWindow = electron.BrowserWindow;

// token passowrd
class DiscordSpooferInstance {
  constructor(id, proxyList, isImage) {
    this.id = id;
    this.proxyList = proxyList || [];
    this.proxyCounter = 0;
    this.proxyHostPort = getProxyHostPort(this.proxyList[0]);
    this.proxy = getProxyData(this.proxyList[0]);
    this.url = "https://discord.com/login";
    this.win = null;
    this.isLaunched = false;
    this.isDeleted = false;
    this.mainWin = global.mainWin;
    this.isImage = isImage;
    this.maxNumberOfRetry = 10;
    this.numberOfRetry = 0;
    this.userAgent = new UserAgent(/Chrome/, { deviceCategory: "desktop" })
      .toString()
      .replace(/\|"/g, "");

    // # initalize instance
    this.init();
  }

  init() {
    this.sendStatus("Running");
  }

  async launchBrowser(isShow = false) {
    this.isLaunched = true;
    this.win = new BrowserWindow({
      width: 500,
      height: 500,
      resizable: true,
      fullscreenable: false,
      title: displayTitle(this.proxyHostPort, this.id),
      show: isShow,
      parent: this.mainWin,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        session,
        partition: `persist:task_id_${this.id}`,
        images: !this.isImage,
      },
    });
    // load using proxy or not
    if (this.proxy) {
      this.win.webContents.session.setProxy(
        {
          proxyRules: this.proxyHostPort,
        },
        () => {}
      );
      this.win
        .loadURL(this.url, {
          userAgent: this.userAgent,
        })
        .catch((err) => {
          console.log("Error while loading url", err);
        });
      this.win.webContents.on("did-fail-load", function () {
        console.log("Proxy rotater is called");
        // this.proxyRotater();
      });
      this.win.webContents.on("login", (event, _, authInfo, callback) => {
        if (authInfo.isProxy) {
          event.preventDefault();
          callback(this.proxy.user, this.proxy.pass); //supply credentials to server
        }
      });
    } else {
      this.win.loadURL(this.url, {
        userAgent: this.userAgent,
      });
    }
    this.win.setMenu(null);

    this.win.on("closed", () => {
      this.sendStatus("Stopped");
      this.win = null;
    });
  }

  sendStatus(msg) {
    if (this.mainWin) {
      try {
        this.mainWin.webContents.send("discord-spoofer-toaster", {
          status: msg,
          id: this.id,
        });
      } catch (error) {
        this.deleteBrowser();
      }
    }
  }
}

module.exports = DiscordSpooferInstance;
