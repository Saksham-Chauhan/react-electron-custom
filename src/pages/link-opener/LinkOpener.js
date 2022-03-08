import React, { useEffect } from "react";
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
  fetchLinkOpenerLogState,
  fetchDiscordAccountList,
  fetchSelectedMinitorTokenLinkOpener,
  fetchLOchromeUserState,
} from "../../features/counterSlice";
import sound from "../../assests/audio/sound.mp3";
import { useDispatch, useSelector, connect } from "react-redux";
import { makeLogText, makeStrOfArr } from "../../helper";
import { addLogInList } from "../../features/logic/discord-account";
import { checkOptions, containsKeyword, testUrlRegex } from "./utils";
import { discordTokenRegExp } from "../../constant/regex";
import { toastWarning } from "../../toaster";

const { Client } = window.require("discord.js-selfbot");
const open = window.require("open");

//       monitor.on("message", async (message) => {
//         let content = message.content;
//         console.log(content);
//         if (makeStrOfArr(channelList).includes(message.channel.id)) {
//           if (testUrlRegex(content)) {
//             let flag = containsKeyword(makeStrOfArr(keywordList), content);
//             if (keywordList.length === 0 || flag) {
//               if (checkOptions(settingOption, content)) {
//                 message.reply("Called many time");
//                 dispatch(
//                   addLogInList({ key: "LO", log: makeLogText(content) })
//                 );
//                 if (settingOption.playSound) {
//                   playSound();
//                 }
//                 if (Object.keys(selectedChrome).length > 0) {
//                   await open(content, {
//                     app: {
//                       name: "google chrome",
//                       arguments: [
//                         `--profile-directory=${selectedChrome["value"]}`,
//                       ],
// //                     },
//                   });
//                 } else {
//                   await open(content, {
//                     app: {
//                       name: "google chrome",
//                     },
//                   });
//                 }
//               }
//             }
//           }
//         }
// });

class LinkOpener extends React.PureComponent {
  monitor = new Client();
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
    };
  }
  playSound() {
    let ring = new Audio(sound);
    ring.play();
  }
  componentDidMount() {
    const { settingOption, keywordList, channelList, selectedChrome } =
      this.props;
    try {
      this.monitor.on("ready", () => {
        console.log("Link opener is Ready..");
      });
      this.monitor.on("message", async (message) => {
        let content = message.content;
        if (makeStrOfArr(channelList).includes(message.channel.id)) {
          if (testUrlRegex(content)) {
            let flag = containsKeyword(makeStrOfArr(keywordList), content);
            if (keywordList.length === 0 || flag) {
              if (checkOptions(settingOption, content)) {
                if (settingOption.playSound) {
                  this.playSound();
                }
                console.log("MESSAGE", content);
                this.props.handleSendLog(content);
                // message.reply("I think that not going to work ");
              }
            }
          }
        }
      });
      if (settingOption?.linkOpenerState) {
        console.log("Already Opened so don't open Again");
      }
    } catch (error) {
      console.log("Error in Link Opener", error.message);
    }
  }
  componentDidUpdate(prevProps) {
    const { selectedMonitorToken, settingOption } = this.props;
    if (
      selectedMonitorToken !== prevProps.selectedMonitorToken ||
      settingOption.linkOpenerState !== prevProps.settingOption.linkOpenerState
    ) {
      if (
        settingOption.linkOpenerState !==
        prevProps.settingOption.linkOpenerState
      ) {
        const { discordToken } = selectedMonitorToken;
        if (settingOption?.linkOpenerState) {
          console.log("Starting  monitor...");
          if (discordTokenRegExp.test(discordToken)) {
            this.monitor.login(discordToken);
          }
        } else {
          console.log("Destroy monitor...");
          this.monitor.destroy();
          console.log("After destroying", this.monitor.user);
        }
      }
    }
  }

  render() {
    const {
      accountList,
      selectedMonitorToken,
      settingOption,
      keywordList,
      channelList,
      logList,
      handleOpenModal,
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
          <LinkOpenerTopSection />
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
                  <LinkOpenerLogSection list={logList} />
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
    handleSendLog: (content) =>
      dispatch(addLogInList({ key: "LO", log: makeLogText(content) })),
  };
};

const mapStateToProps = (state, ownProps) => {
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
// OTI5OTc4MTU4OTE5MzMxODcx.Yh9ZcQ.5XDN3rDvJ_e1GpWjnqgzUyoBSAw
