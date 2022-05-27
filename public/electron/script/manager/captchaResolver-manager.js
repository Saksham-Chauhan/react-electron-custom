const CaptchaResolverProcess = require("../process/captchaResolver-process");

class CaptchaManager {
  constructor() {
    this.bots = {};
  }
  addCaptcha(data) {
    const {
      taskObj: { id },
    } = data;
    this.bots[id] = new CaptchaResolverProcess(data);
  }
}

module.exports = new CaptchaManager();
