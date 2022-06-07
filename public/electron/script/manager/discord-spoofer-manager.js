const DiscordSpooferProcess = require("../process/discord-spoof-process");

class DiscordManager {
  constructor() {
    this.bots = {};
  }

  addSpoofer(data) {
    console.log(data);
    const {
      id,
      isDisableImage = false,
      proxyGroup: { value },
      claimerGroup,
    } = data;
    this.bots[id] = new DiscordSpooferProcess(
      id,
      value.split("\n") || [],
      isDisableImage,
      claimerGroup.value.split("\n")
    );
  }
}

module.exports = new DiscordManager();
