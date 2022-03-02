const path = require("path");
const electron = require("electron");
const UserAgent = require("user-agents");

const ipcMain = electron.ipcMain;
const session = electron.session;
const BrowserWindow = electron.BrowserWindow;

class SpooferInstance {
  constructor(id, url, proxyList, mainWin) {
    this.id = id;
    this.proxyList = proxyList;
    this.proxyCounter = 0;
    this.proxyHostPort = this.getProxyHostPort(this.proxyList[0]);
    this.proxy = this.getProxyData(this.proxyList[0]);
    this.url = url;
    this.win = null;
    this.status = "";
    this.isLaunched = false;
    this.isDeleted = false;
    this.mainWin = mainWin;
    this.userAgent = new UserAgent(/Chrome/, { deviceCategory: "desktop" })
      .toString()
      .replace(/\|"/g, "");

    // # initalize instance
    this.init();
  }

  init() {
    this.setStatus("Not Launch");
    this.sendToaster("Created");

    // # LAUNCH BROWSER BUT LET IT STAY HIDDEN
    ipcMain.on(`launchBrowser taskId-${this.id}`, (evt) => {
      if (!this.isLaunched && !this.isDeleted) {
        this.launchBrowser();
        this.mainWin.webContents.send(`launchBrowser taskId-${this.id} hide`);
      }
    });

    // # LAUNCH ALL BROWSER BUT LET IT STAY HIDDEN
    ipcMain.on(`launch-all-instance`, (evt) => {
      if (!this.isLaunched && !this.isDeleted) {
        this.launchBrowser();
        this.mainWin.webContents.send(`launchBrowser taskId-${this.id} hide`);
      }
    });
  }

  deleteBrowser() {
    if (this.isLaunched) {
      this.win.destroy();
      this.isDeleted = true;
    } else {
      this.isDeleted = true;
    }
  }
  clearCookie() {
    if (this.isLaunched) {
      console.log(this.win.getTitle());
      console.log(this.win.webContents.session);
      this.win.reload();
    }
  }

  getProxyData(proxy) {
    if (proxy) {
      const splitProxy = proxy.split(":");
      if (splitProxy.length > 2) {
        return {
          host: splitProxy[0],
          port: splitProxy[1],
          user: splitProxy[2],
          pass: splitProxy[3],
        };
      }

      return {
        host: splitProxy[0],
        port: splitProxy[1],
      };
    }
  }

  getProxyHostPort(proxy) {
    if (proxy) {
      const splitProxy = proxy.split(":");
      const final = splitProxy[0] + ":" + splitProxy[1];
      return final;
    }
  }

  // LAUNCH BROWSER
  launchBrowser() {
    this.setStatus("Open");
    this.isLaunched = true;
    this.win = new BrowserWindow({
      width: 500,
      height: 500,
      resizable: true,
      fullscreenable: false,
      title: this.displayTitle(),
      icon: path.resolve(__dirname, "img", "icon-win.ico"),
      show: false,
      parent: this.mainWin,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        session,
        partition: `persist:task_id_${this.id}`,
      },
    });

    // # load using proxy or not
    if (this.proxy) {
      this.win.webContents.session
        .setProxy(
          {
            proxyRules: this.proxyHostPort,
          },
          () => {}
        )
        .then(() => {
          this.win.loadURL(this.url, {
            userAgent: this.userAgent,
          });
        })
        .catch((e) => {
          if (this.proxyCounter < this.proxyList.length) {
            this.proxyCounter++;
          } else {
            this.proxyCounter = 0;
          }
          const currentProxy = this.proxyList[this.proxyCounter];
          this.proxyHostPort = this.getProxyHostPort(currentProxy);
          this.proxy = this.getProxyData(currentProxy);
          console.log("Error In Setting Proxy", e, currentProxy);
          this.launchBrowser();
          return;
        });

      this.win.webContents.on(
        "login",
        (event, authenticationResponseDetails, authInfo, callback) => {
          if (authInfo.isProxy) {
            event.preventDefault();
            callback(this.proxy.user, this.proxy.pass); //supply credentials to server
          }
        }
      );
    } else {
      this.win.loadURL(this.url, {
        userAgent: this.userAgent,
      });
    }
    this.win.setMenu(null);

    // # Fixed title not showing
    this.win.on("page-title-updated", (evt, title) => {
      evt.preventDefault();
      // # update title when title update
      this.mainWin.webContents.send(
        `browserTask taskId-${this.id} SetTitle`,
        title
      );
      // # if title change, notify user
    });

    this.win.on("closed", () => {
      this.sendToaster("Close");
      this.win = null;
    });
  }

  // # TOGGLE BROWSER
  toggleBrowser() {
    const win = this.win;
    if (win !== null) {
      if (!win.isVisible()) {
        win.show();
        this.setStatus("Open");
        this.sendToaster("Open");
      } else {
        win.hide();
        this.setStatus("Close");
        this.sendToaster("Close");
      }
    } else {
      this.sendToaster("Not created");
    }
  }

  // # set title
  displayTitle() {
    return `${
      this.proxyHostPort == null ? "Local IP" : this.proxyHostPort
    } - taskId-${this.id}`;
  }

  closeBrowser() {
    console.log("Closing...");
    this.win?.close();
    this.sendToaster("Stopped");
    console.log("Closed!!");
  }

  setStatus(status) {
    this.status = status;
    this.mainWin.webContents.send(
      `browserTask taskId-${this.id} SetStatus`,
      status
    );
  }

  sendToaster(msg) {
    this.mainWin.webContents.send("spoofer-toaster", {
      status: msg,
      id: this.id,
    });
  }
}

module.exports = SpooferInstance;
