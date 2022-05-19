const path = require("path");
const electron = require("electron");
const UserAgent = require("user-agents");

const session = electron.session;
const BrowserWindow = electron.BrowserWindow;

class SpooferInstance {
  constructor(id, url, proxyList, mainWin, isImage) {
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
    this.isImage = isImage;
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

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  proxyRotater() {
    this.deleteBrowser();
    if (this.proxyCounter < this.proxyList.length) {
      this.proxyCounter = this.randomInt(0, this.proxyList?.length - 1 || 0);
    } else {
      this.proxyCounter = 0;
    }
    const currentProxy = this.proxyList[this.proxyCounter];
    this.proxyHostPort = this.getProxyHostPort(currentProxy);
    this.proxy = this.getProxyData(currentProxy);
    console.log("Proxy rotater used new proxy", this.proxyHostPort);
    this.launchBrowser(true);
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
      icon: path.resolve(__dirname, "img", "icon-win.ico"),
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

    // # load using proxy or not
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
          return this.proxyRotater();
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

      // # if title change, notify user
    });

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

  // # set title
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
