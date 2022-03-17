import React from "react";
import "./styles.css";
import {
  ChannelSection,
  KeywordSection,
  LinkOpenerSetting,
  LinkOpenerLogSection,
  LinkOpenerTopSection,
  LinkOpenerLeftSection,
  LinkOpenerAdditionalSetting,
} from "../../pages-component";
import {
  setModalState,
  fetchLOChannelList,
  fetchLOKeywordList,
  fetchLOSettingState,
  fetchLOchromeUserState,
  fetchDiscordAccountList,
  fetchLinkOpenerLogState,
  fetchSelectedMinitorTokenLinkOpener,
} from "../../features/counterSlice";
import { connect } from "react-redux";
import sound from "../../assests/audio/sound.mp3";
import { makeLogText, makeStrOfArr } from "../../helper";
import { discordTokenRegExp } from "../../constant/regex";
import { addLogInList } from "../../features/logic/discord-account";
import { checkOptions, containsKeyword, testUrlRegex } from "./utils";
import { toastInfo } from "../../toaster";
import { linkOpenerWebhook } from "../../helper/webhook";

const { Client } = window.require("discord.js-selfbot");
const open = window.require("open");

class LinkOpener extends React.PureComponent {
  monitor = new Client();
  constructor(props) {
    super(props);
    this.state = {
      settingOption: {},
      keywordLIST: [],
      channelLIST: [],
      selectedChrome: {},
      isStart: true,
      webhookSetting: {},
      webhookList: [],
    };
  }

  playSound() {
    let ring = new Audio(sound);
    ring.play();
  }

  async checkSettingOption(content, channelID, msgID) {
    const { isStart, webhookSetting, webhookList } = this.state;
    if (isStart) {
      const { settingOption, channelLIST, keywordLIST, selectedChrome } =
        this.state;
      let channel = channelLIST;
      let keyword = keywordLIST;
      if (makeStrOfArr(channel).includes(channelID)) {
        if (testUrlRegex(content)) {
          let flag = containsKeyword(makeStrOfArr(keyword), content);
          if (keyword.length === 0 || flag) {
            if (checkOptions(settingOption, content)) {
              if (settingOption.playSound) {
                this.playSound();
              }
              if (selectedChrome !== null) {
                if (Object.keys(selectedChrome).length > 0) {
                  await open(content, {
                    app: {
                      name: open.apps.chrome,
                      arguments: [
                        `--profile-directory=${selectedChrome["value"]}`,
                      ],
                    },
                  });
                }
              } else {
                await open(content, {
                  app: {
                    name: open.apps.chrome,
                  },
                });
              }
              this.props.handleSendLog(content, msgID);
              if (webhookSetting?.linkOpener) {
                await linkOpenerWebhook(content, webhookList[0]);
              }
            }
          }
        }
      }
    }
  }

  componentDidMount() {
    const { settingOption } = this.props;
    try {
      this.monitor.on("ready", () => {
        console.log("Link opener is Ready..");
        toastInfo("Link opener is ready!!");
      });
      this.monitor.on("message", async (message) => {
        let content = message.content;
        let channelID = message.channel.id;
        let msgID = message.id;
        this.checkSettingOption(content, channelID, msgID);
      });
      if (settingOption?.linkOpenerState) {
        console.log("Already Opened so don't open Again");
      } else {
        console.log("Destroying if previous client is open");
        this.monitor.destroy();
      }
    } catch (error) {
      console.log("Error in Link Opener", error.message);
    }
  }
  componentDidUpdate(prevProps) {
    const {
      selectedMonitorToken,
      settingOption,
      keywordList,
      channelList,
      selectedChrome,
      webhookSetting,
      webhookList,
    } = this.props;
    if (
      selectedMonitorToken !== prevProps.selectedMonitorToken ||
      settingOption !== prevProps.settingOption
    ) {
      if (
        settingOption.linkOpenerState !==
        prevProps.settingOption.linkOpenerState
      ) {
        const { discordToken } = selectedMonitorToken;
        this.setState({
          settingOption: settingOption,
          channelLIST: channelList,
          keywordLIST: keywordList,
          selectedChrome: selectedChrome,
          isStart: true,
        });
        this.setState({ webhookSetting: webhookSetting });
        this.setState({ webhookList: webhookList });
        if (settingOption?.linkOpenerState) {
          if (discordTokenRegExp.test(discordToken)) {
            this.monitor.login(discordToken);
          }
        } else {
          console.log("Destroying monitor...");
          this.monitor.destroy();
          if (this.monitor.user !== null) {
            this.setState({ isStart: false });
          }
        }
      } else if (prevProps.settingOption !== settingOption) {
        this.setState({ settingOption: settingOption });
      } else if (prevProps.keywordList !== keywordList) {
        this.setState({ keywordLIST: keywordList });
      } else if (prevProps.channelList !== channelList) {
        this.setState({ channelLIST: channelList });
      } else if (prevProps.selectedChrome !== selectedChrome) {
        this.setState({ selectedChrome: selectedChrome });
      } else if (prevProps.webhookSetting !== webhookSetting) {
        this.setState({ webhookSetting: webhookSetting });
      } else if (prevProps.webhookList !== webhookList) {
        this.setState({ webhookList: webhookList });
      }
    }
  }

  render() {
    const {
      logList,
      accountList,
      keywordList,
      channelList,
      settingOption,
      handleOpenModal,
      selectedMonitorToken,
    } = this.props;

    return (
      <div className="page-section">
        <div className="left-container">
          <LinkOpenerLeftSection
            {...{
              handleOpenModal,
              accountList,
              selectedMonitorToken,
              settingOption,
            }}
          />
        </div>
        <div className="right-container">
          <LinkOpenerTopSection {...{ logList }} />
          <div className="page-padding-section">
            <div className="linkopener-flex-wrapper">
              <div className="linkopner-left-section">
                <LinkOpenerSetting
                  {...{
                    selectedMonitorToken,
                    settingOption,
                    accountList,
                  }}
                />
                <div className="flex-keyword-channel">
                  <ChannelSection {...{ channelList }} />
                  <KeywordSection {...{ keywordList }} />
                </div>
              </div>
              <div className="linkopner-right-section">
                <LinkOpenerAdditionalSetting {...{ settingOption }} />
                <div className="linkopener-right-logs">
                  <LinkOpenerLogSection
                    list={Object.keys(logList).map((key) => logList[key])}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleOpenModal: () => dispatch(setModalState("discordAccount")),
    handleSendLog: (content, msgID) =>
      dispatch(
        addLogInList({ key: "LO", log: makeLogText(content), id: msgID })
      ),
  };
};

const mapStateToProps = (state) => {
  return {
    keywordList: fetchLOKeywordList(state),
    channelList: fetchLOChannelList(state),
    logList: fetchLinkOpenerLogState(state),
    settingOption: fetchLOSettingState(state),
    accountList: fetchDiscordAccountList(state),
    selectedChrome: fetchLOchromeUserState(state),
    selectedMonitorToken: fetchSelectedMinitorTokenLinkOpener(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkOpener);
