import React from "react";
import { connect } from "react-redux";
import { discordTokenRegExp } from "../../constant/regex";
import {
  fetchDiscordAccountList,
  fetchIJChannelList,
  fetchIJMonitorState,
  fetchInviteJoinerLogState,
  fetchIsInviteJoinerModalState,
  fetchSafeModeDelayState,
  fetchSelctedInviteProxyGroup,
  fetchSelectedClaimerGroupState,
  fetchSelectedClaimerTokenInviteJoiner,
  setModalState,
} from "../../features/counterSlice";
import { addLogInList } from "../../features/logic/discord-account";
import { makeLogText, makeStrOfArr } from "../../helper";
import {
  InviteJoinerKeywordSection,
  InviteJoinerLeftSection,
  InviteJoinerLogSection,
  InviteJoinerSettingSection,
  InviteJoinerTopSection,
} from "../../pages-component";
import helper from "../twitter/utils/feature-tweets/helper";
import { checkDiscordInvite } from "../link-opener/utils";
import { discordServerInviteAPI } from "../../api";
import { toastInfo } from "../../toaster";

const { Client } = window.require("discord.js-selfbot");

class InviteJoiner extends React.Component {
  monitor = new Client();
  token = "";
  constructor(props) {
    super(props);
    this.state = {
      keywordList: [],
      selectedClaimerGroup: {},
      selectedProxyGroup: {},
    };
  }

  checkingMessage(content, channelID, msgID) {
    const { keywordList, selectedClaimerGroup, selectedProxyGroup } =
      this.state;
    if (makeStrOfArr(keywordList).includes(channelID)) {
      let isInviteLink = checkDiscordInvite(content);
      let inviteCode = helper.isDiscordInvite(content);
      if (inviteCode && isInviteLink) {
        const proxyArr = selectedProxyGroup["value"]?.split("\n");
        for (let index = 0; index < proxyArr.length; index++) {
          let proxySplit = proxyArr[index]?.split(":");
          const proxy = {
            host: proxySplit[0],
            port: proxySplit[1],
            auth: {
              username: proxySplit[2],
              password: proxySplit[3],
            },
          };
          let tokenArray = selectedClaimerGroup["value"]?.split("\n");
          tokenArray.forEach(async (token) => {
            await this.sleep();
            try {
              const info = await discordServerInviteAPI(
                inviteCode,
                token,
                proxy
              );
              if (info.status === 200) {
                let result = `Joined ${info.data.guild.name} server 🥳 `;
                this.props.handleSendLog(result, msgID);
                console.log("Joined the server", info.data.guild);
              }
            } catch (err) {
              console.log("Error in joining server", err.message);
            }
          });
        }
      }
    }
  }

  componentDidMount() {
    const { ijMonitorState } = this.props;
    try {
      this.monitor.on("ready", () => {
        console.log("Invite joiner is Ready..");
        toastInfo("Invite joiner is ready!!");
      });
      this.monitor.on("message", async (message) => {
        let content = message.content;
        let channelID = message.channel.id;
        let msgID = message.id;
        this.checkingMessage(content, channelID, msgID);
      });
      if (ijMonitorState) {
        console.log("Already Opened so don't open Again");
      }
    } catch (error) {
      console.log("Error in Link Opener", error.message);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      keywordList,
      ijMonitorState,
      selectedToken,
      selectedClaimerGroup,
      selectedProxyGroup,
    } = this.props;
    if (
      prevProps.ijMonitorState !== ijMonitorState ||
      selectedToken !== prevProps.selectedToken
    ) {
      if (ijMonitorState) {
        console.log("Starting monitor...");
        if (discordTokenRegExp.test(selectedToken["discordToken"])) {
          this.monitor.login(selectedToken["discordToken"]);
        }
        this.setState({ keywordList: keywordList });
        this.setState({ selectedClaimerGroup: selectedClaimerGroup });
        this.setState({ selectedProxyGroup: selectedProxyGroup });
      } else {
        console.log("Destroyng monitor...");
        this.monitor.destroy();
        window.location.reload();
        console.log("After destroying", this.monitor.user);
      }
    } else if (keywordList !== prevProps.keywordList) {
      this.setState({ keywordList: keywordList });
    } else if (selectedClaimerGroup !== prevProps.selectedClaimerGroup) {
      this.setState({ selectedClaimerGroup: selectedClaimerGroup });
    } else if (prevProps.selectedProxyGroup !== selectedProxyGroup) {
      this.setState({ selectedProxyGroup: selectedProxyGroup });
    }
  }

  doSomething = () => {
    this.monitor.destroy();
    console.log(this.monitor);
  };

  sleep() {
    const { safeDelayIJtime } = this.props;
    return new Promise((resolve) => {
      setTimeout(resolve, Number(safeDelayIJtime));
    });
  }

  render() {
    const {
      logList,
      keywordList,
      accountList,
      selectedToken,
      isMonitorStart,
      ijMonitorState,
      handleOpenModal,
      selectedClaimerGroup,
    } = this.props;

    return (
      <div className="page-section">
        <div className="left-container">
          <InviteJoinerLeftSection
            {...{ handleOpenModal, accountList, selectedToken }}
          />
        </div>
        <div className="right-container invite-joiner">
          <InviteJoinerTopSection {...{ logList, selectedToken }} />
          <div className="page-padding-section">
            <div className="linkopener-flex-wrapper">
              <div className="linkopner-left-section invite-joiner">
                <InviteJoinerSettingSection
                  {...{
                    ijMonitorState,
                    accountList,
                    keywordList,
                    selectedToken,
                    isMonitorStart,
                    selectedClaimerGroup,
                  }}
                />
                <div className="flex-keyword-channel invite-joiner">
                  <InviteJoinerKeywordSection {...{ keywordList }} />
                  <InviteJoinerLogSection
                    logList={Object.keys(logList).map((key) => logList[key])}
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
        addLogInList({ key: "IJ", log: makeLogText(content), id: msgID })
      ),
  };
};

const mapStateToProps = (state) => {
  return {
    keywordList: fetchIJChannelList(state),
    accountList: fetchDiscordAccountList(state),
    ijMonitorState: fetchIJMonitorState(state),
    logList: fetchInviteJoinerLogState(state),
    selectedToken: fetchSelectedClaimerTokenInviteJoiner(state),
    isMonitorStart: fetchIsInviteJoinerModalState(state),
    selectedClaimerGroup: fetchSelectedClaimerGroupState(state),
    selectedProxyGroup: fetchSelctedInviteProxyGroup(state),
    safeDelayIJtime: fetchSafeModeDelayState(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteJoiner);
