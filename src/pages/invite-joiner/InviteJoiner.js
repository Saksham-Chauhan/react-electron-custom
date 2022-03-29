import React from "react";
import { connect } from "react-redux";
import { discordTokenRegExp } from "../../constant/regex";
import {
  setModalState,
  fetchIJChannelList,
  fetchIJMonitorState,
  fetchWebhookListState,
  fetchLoggedUserDetails,
  fetchDiscordAccountList,
  fetchSafeModeDelayState,
  fetchWebhookSettingState,
  fetchInviteJoinerLogState,
  fetchSelctedInviteProxyGroup,
  fetchIsInviteJoinerModalState,
  fetchSelectedClaimerGroupState,
  fetchSelectedMinitorTokenLinkOpener,
  fetchSelectedClaimerTokenInviteJoiner,
  setSelectedClaimerTokenIJ,
} from "../../features/counterSlice";
import { addLogInList } from "../../features/logic/discord-account";
import { makeLogText, makeStrOfArr } from "../../helper";
import {
  InviteJoinerTopSection,
  InviteJoinerLogSection,
  InviteJoinerLeftSection,
  InviteJoinerKeywordSection,
  InviteJoinerSettingSection,
} from "../../pages-component";
import helper from "../twitter/utils/feature-tweets/helper";
import { checkDiscordInvite } from "../link-opener/utils";
import { discordServerInviteAPI } from "../../api";
import { toastInfo, toastWarning } from "../../toaster";
import { inviteJoinerTest } from "../../helper/webhook";
import { NoAccountAlertModal } from "../../modals";

const { Client } = window.require("discord.js-selfbot");

class InviteJoiner extends React.PureComponent {
  monitor = new Client();
  token = "";
  constructor(props) {
    super(props);
    this.state = {
      keywordList: [],
      selectedClaimerGroup: {},
      selectedProxyGroup: {},
      isStart: true,
      webhookSetting: {},
      webhookList: [],
    };
  }

  async checkingMessage(content, channelID, msgID) {
    const { isStart } = this.state;
    const { user } = this.props;
    if (isStart) {
      const {
        keywordList,
        selectedClaimerGroup,
        selectedProxyGroup,
        webhookSetting,
        webhookList,
      } = this.state;
      if (makeStrOfArr(keywordList).includes(channelID)) {
        let isInviteLink = checkDiscordInvite(content);
        let inviteCode = helper.isDiscordInvite(content);
        if (inviteCode && isInviteLink) {
          let tokenArray = selectedClaimerGroup["value"]?.split("\n");
          for (let i = 0; i < tokenArray.length; i++) {
            const token = tokenArray[i];
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
              await this.sleep();

              try {
                const info = await discordServerInviteAPI(
                  inviteCode,
                  token,
                  proxy
                );
                if (info.status === 200) {
                  let result = `Joined ${info.data.guild.name} server 🥳 `;
                  const date = new Date().toUTCString();
                  this.props.handleSendLog(result, msgID, date);
                  console.log("Joined the server", info.data.guild.name, index);
                  if (!!webhookList[0]) {
                    await inviteJoinerTest(
                      webhookList[0],
                      user.username,
                      user.avatar,
                      info.data.guild.name,
                      webhookSetting?.inviteJoiner
                    );
                  } else {
                    await inviteJoinerTest(
                      "",
                      user.username,
                      user.avatar,
                      info.data.guild.name,
                      false
                    );
                  }
                  break;
                }
              } catch (err) {
                console.log("Error in joining server", err.message);
                toastWarning(`Error in joininig server ${err.message}`);
              }
            }
          }
        }
      }
    }
  }

  componentDidMount() {
    const { ijMonitorState, accountList } = this.props;
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
    if (accountList.length === 0) {
      this.props.resetSelectedToken();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      keywordList,
      ijMonitorState,
      selectedToken,
      selectedClaimerGroup,
      selectedProxyGroup,
      webhookSetting,
      webhookList,
      accountList,
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
        this.setState({ isStart: true });
        this.setState({ webhookSetting: webhookSetting });
        this.setState({ webhookList: webhookList });
      } else {
        console.log("Destroyng monitor...");
        this.monitor.destroy();
        if (this.monitor.user !== null) {
          this.setState({ isStart: false });
        }
      }
    } else if (keywordList !== prevProps.keywordList) {
      this.setState({ keywordList: keywordList });
    } else if (selectedClaimerGroup !== prevProps.selectedClaimerGroup) {
      this.setState({ selectedClaimerGroup: selectedClaimerGroup });
    } else if (prevProps.selectedProxyGroup !== selectedProxyGroup) {
      this.setState({ selectedProxyGroup: selectedProxyGroup });
    } else if (
      prevProps.webhookSetting?.inviteJoiner !== webhookSetting?.inviteJoiner
    ) {
      this.setState({ webhookSetting: webhookSetting });
    } else if (prevProps.webhookList !== webhookList) {
      this.setState({ webhookList: webhookList });
    } else if (
      prevProps.accountList.length !== accountList.length &&
      accountList.length === 0
    ) {
      this.props.resetSelectedToken();
    }
  }

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
          {accountList.length === 0 && (
            <NoAccountAlertModal
              buttonPress={handleOpenModal}
              buttonText="Create Discord Account"
              modalTitle="No Account"
            />
          )}
          <InviteJoinerTopSection {...{ logList, selectedToken }} />
          <div className="page-padding-section">
            <div className="linkopener-flex-wrapper">
              <div className="linkopner-left-section invite-joiner">
                <InviteJoinerSettingSection
                  {...{
                    ijMonitorState,
                    accountList,
                    keywordList,
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
    handleSendLog: (content, msgID, date) =>
      dispatch(
        addLogInList({
          key: "IJ",
          log: makeLogText(content),
          id: msgID,
          createdAt: date,
        })
      ),
    resetSelectedToken: () => dispatch(setSelectedClaimerTokenIJ({})),
  };
};

const mapStateToProps = (state) => {
  return {
    user: fetchLoggedUserDetails(state),
    keywordList: fetchIJChannelList(state),
    logList: fetchInviteJoinerLogState(state),
    webhookList: fetchWebhookListState(state),
    ijMonitorState: fetchIJMonitorState(state),
    accountList: fetchDiscordAccountList(state),
    safeDelayIJtime: fetchSafeModeDelayState(state),
    webhookSetting: fetchWebhookSettingState(state),
    isMonitorStart: fetchIsInviteJoinerModalState(state),
    selectedProxyGroup: fetchSelctedInviteProxyGroup(state),
    selectedToken: fetchSelectedClaimerTokenInviteJoiner(state),
    selectedClaimerGroup: fetchSelectedClaimerGroupState(state),
    selectedMonitorToken: fetchSelectedMinitorTokenLinkOpener(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteJoiner);
