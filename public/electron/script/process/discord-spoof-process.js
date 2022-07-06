const puppeteer = require("puppeteer");
const UserAgent = require("user-agents");
const { getProxyData, randomInt } = require("../../helper");

const SIZE = 700;
const url = "https://discord.com/login";
const emailClass = "input[type='text']";
const btnClass = "button[type='submit']";
const passClass = "input[type='password']";

class DiscordSpooferInstance {
  constructor(id, proxyList, tokenList, email, password) {
    this.id = id;
    this.counter = 0;
    this.maxCounter = tokenList;
    this.email = email;
    this.browser = null;
    this.isDeleted = false;
    this.password = password;
    this.proxyList = proxyList || [];
    this.mainWin = global.mainWin;
    this.proxy = getProxyData(this.proxyList[0]);
    this.userAgent = new UserAgent(/Chrome/, { deviceCategory: "desktop" })
      .toString()
      .replace(/\|"/g, "");

    // # initalize instance
    this.init();
  }

  init() {
    this.sendStatus("Running", true);
    this.launchBrowser();
  }

  async launchBrowser() {
    const proxy = this.proxyList[randomInt(0, this.proxyList.length - 1)];
    if (proxy) {
      const [host, port, user, pass] = proxy.split(":");
      try {
        this.browser = await puppeteer.launch({
          headless: false,
          args: [
            `--window-size=${SIZE},${SIZE}`,
            `--proxy-server=http://${host}:${port}`,
          ],
        });
        const page = await this.browser.newPage();
        await page.setUserAgent(this.userAgent);
        await page.setViewport({ height: SIZE, width: SIZE });
        await page.authenticate({ password: pass, username: user });
        await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 1 * 60 * 1000,
        });
        const emailField = await page.waitForSelector(emailClass);
        const passField = await page.waitForSelector(passClass);
        const btn = await page.waitForSelector(btnClass);
        await page.waitForTimeout(1000);
        await emailField.type(this.email, { delay: 100 });
        await page.waitForTimeout(1000);
        await passField.type(this.password, { delay: 100 });
        await page.waitForTimeout(1000);
        await btn.click();
      } catch (error) {
        console.log(
          "Something went wrong on launching puppeteer",
          error.message
        );
        this.deleteBrowser();
      }
      this.browser.on("disconnected", this.deleteBrowser.bind(this));
    } else this.sendStatus("Proxy Not Found", false);
  }

  async deleteBrowser() {
    if (!this.isDeleted) {
      this.isDeleted = true;
      this.sendStatus(`Closed:${this.maxCounter}`, false);
      await this.browser.close();
    }
  }

  sendStatus(msg, active) {
    if (this.mainWin) {
      try {
        this.mainWin.webContents.send("discord-spoofer-toaster", {
          status: msg,
          id: this.id,
          active,
        });
      } catch (error) {
        this.deleteBrowser();
      }
    }
  }
}

module.exports = DiscordSpooferInstance;
