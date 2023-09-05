const { app, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { download } = require("electron-dl");

const logFile = "mirror.log";
const WAIT_INTERVAL = 20000;
const MAX_FILE_SIZE = 1000000;

class LogManager {
  constructor() {
    this.logString = [];
    this.folderPath = path.join(app.getPath("userData"), "/Logs");
    this.currentLogFile = null;
  }

  saveLogs() {
    const logString = this.logString.map((log) => `${log}\n`).join("");
    fs.appendFileSync(`${this.folderPath}/${this.currentLogFile}`, logString);
    this.logString = [];
  }

  logMessage(log) {
    this.logString.push(`[${new Date().toLocaleString()}] - ${log}`);
  }

  checkFileSize() {
    const filePath = `${this.folderPath}/${logFile}`;
    if (fs.existsSync(filePath)) {
      const fileSizeInBytes = fs.statSync(filePath).size;
      return fileSizeInBytes < MAX_FILE_SIZE;
    }
  }
  initLogs() {
    if (!fs.existsSync(this.folderPath)) {
      fs.mkdirSync(this.folderPath);
    }
    const logFiles = fs.readdirSync(this.folderPath);
    if (logFiles.length > 0) {
      this.lastLogFile = logFiles[logFiles.length - 1];
      if (this.checkFileSize()) {
        this.currentLogFile = this.lastLogFile;
        console.log(
          "Last file doesn't overflow its maximum size so, dont create a new one"
        );
      } else {
        for (let i = 0; i < logFiles.length; i++) {
          fs.rmSync(`${this.folderPath}/${logFiles[i]}`);
        }
        this.currentLogFile = logFile;
        console.log("Creating a new log file for the day");
        fs.appendFileSync(`${this.folderPath}/${logFile}`, "");
      }
    } else {
      this.currentLogFile = logFile;
      fs.appendFileSync(`${this.folderPath}/${logFile}`, "");
    }
    this.startLogSession();
  }

  sendLogs() {
    fs.readFile(
      `${this.folderPath}/${this.currentLogFile}`,
      async (err, data) => {
        if (!err) {
          const win = global.mainWin;
          if (win) {
            const options = {
              buttons: ["Download", "Cancel"],
              title: "Mirror Bot Log File Downloader",
              message: `Do you want to download ${this.currentLogFile}?`,
            };
            const dialogResult = await dialog.showMessageBox(win, options);
            if (dialogResult.response === 0) {
              const url = `data:text/log;base64,${new Buffer.from(
                data
              ).toString("base64")}`;
              await download(win, url, {
                saveAs: true,
              });
            }
          }
        }
      }
    );
  }

  startLogSession() {
    setInterval(() => {
      this.saveLogs();
    }, WAIT_INTERVAL);
  }
}

module.exports = new LogManager();
