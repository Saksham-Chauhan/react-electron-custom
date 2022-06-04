const electron = require("electron");
const UserAgent = require("user-agents");

const session = electron.session;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

class SpooferInstance {
  constructor(id, url, proxyList, isImage) {
    this.id = id;
    this.proxyList = proxyList || [];
    this.proxyCounter = 0;
    this.proxyHostPort = this.getProxyHostPort(this.proxyList[0]);
    this.proxy = this.getProxyData(this.proxyList[0]);
    this.url = url;
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

  deleteBrowser() {
    if (this.isLaunched) {
      this.win?.destroy();
      this.isDeleted = true;
    } else {
      this.isDeleted = true;
    }
  }

  clearCookie() {
    if (this.isLaunched) {
      // TODO => Logging in log file
      console.log(this.win.getTitle());
      console.log(this.win.webContents.session);
      this.win.reload();
    }
  }

  getProxyData(proxy) {
    if (proxy) {
      const [host, port, user, pass] = proxy.split(":");
      if (proxy.split(":").length > 2) {
        return {
          host,
          port,
          user,
          pass,
        };
      }
      return {
        host,
        port,
      };
    }
  }

  getProxyHostPort(proxy) {
    if (proxy) {
      const [ip, port] = proxy.split(":");
      return ip + ":" + port;
    }
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  proxyRotater() {
    this.deleteBrowser();
    if (this.numberOfRetry < this.proxyList.length) {
      if (this.proxyCounter < this.proxyList.length) {
        this.proxyCounter = this.randomInt(0, this.proxyList?.length - 1 || 0);
      } else {
        this.proxyCounter = 0;
      }
      const currentProxy = this.proxyList[this.proxyCounter];
      this.proxyHostPort = this.getProxyHostPort(currentProxy);
      this.proxy = this.getProxyData(currentProxy);
      const log = "Proxy rotater used new proxy" + this.proxyHostPort;
      console.log(log);
      ipcMain.emit("add-log", log);
      this.numberOfRetry += 1;
      this.launchBrowser(true);
    } else {
      this.deleteBrowser();
      this.sendStatus("Stopped");
      this.win = null;
      console.log("Exceed the number of retry.");
    }
  }

  // LAUNCH BROWSER
  async launchBrowser(isShow = false) {
    this.isLaunched = true;
    this.win = new BrowserWindow({
      width: 500,
      height: 500,
      resizable: true,
      fullscreenable: false,
      title: this.displayTitle(),
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
        this.proxyRotater();
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

  // # TOGGLE BROWSER
  toggleBrowser() {
    const win = this.win;
    if (win !== null) {
      if (!win.isVisible()) {
        win.show();
        this.sendStatus("Opened");
      } else {
        win.hide();
        this.sendStatus("Closed");
      }
    } else {
      this.mainWin.webContents.send("error", "Instance Not created");
    }
  }

  // Set Title
  displayTitle() {
    return `${
      this.proxyHostPort == null ? "Local IP" : this.proxyHostPort
    } - taskId-${this.id}`;
  }

  closeBrowser() {
    if (this.win !== null) {
      this.win.close();
      this.sendStatus("Stopped");
    }
  }

  sendStatus(msg) {
    if (this.mainWin) {
      try {
        this.mainWin.webContents.send("spoofer-toaster", {
          status: msg,
          id: this.id,
        });
      } catch (error) {
        this.deleteBrowser();
      }
    }
  }
}

module.exports = SpooferInstance;
