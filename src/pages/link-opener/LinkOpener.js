import React, { useEffect } from "react";
import "./styles.css";
import {
  ChannelSection,
  KeywordSection,
  LinkOpenerSetting,
  LinkOpenerLeftSection,
  LinkOpenerLogSection,
  LinkOpenerTopSection,
} from "../../pages-component";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalState,
  fetchLOChannelList,
  fetchLOKeywordList,
  fetchDiscordAccountList,
  fetchSelectedMinitorTokenLinkOpener,
  fetchLOSettingState,
} from "../../features/counterSlice";
import { checkOptions, containsKeyword, testUrlRegex } from "./utils";
const { Client } = window.require("discord.js-selfbot");
function LinkOpener() {
  const dispatch = useDispatch();
  const keywordList = useSelector(fetchLOKeywordList);
  const channelList = useSelector(fetchLOChannelList);
  const settingOption = useSelector(fetchLOSettingState);
  const accountList = useSelector(fetchDiscordAccountList);
  const selctedMonitorToken = useSelector(fetchSelectedMinitorTokenLinkOpener);
  let monitor = React.useMemo(() => new Client(), []);

  useEffect(() => {
    try {
      monitor.on("ready", () => {
        console.log("Link opener monitor is ready");
      });

      monitor.on("message", async (message) => {
        let content = message.content;
        if (channelList.includes(message.channel.id)) {
          console.log("Channel Id matched");
          if (testUrlRegex(content)) {
            console.log("Valid URL");
            let flag = containsKeyword(keywordList, content);
            // check messages contain monitor keyword or bypass if no keyword has to monitor
            if (keywordList.length === 0 || flag) {
              console.log("Keyword found");

              if (checkOptions(settingOption, content)) {
                // if (options.sound) {
                //   // console.log("Play Notifications sound");
                //   playSound();
                // }
                // here we open the link on browser

                // open(content, {
                //   app: [
                //     "chrome",
                //     // `--profile-directory=${selectedChromeProfiles}`,
                //   ],
                // });

                //adding to logs
                console.log(content);
              }
            }
          }
        }
      });
      // if (selectedMonitorTokenLO) monitor.login(selectedMonitorTokenLO);
    } catch (error) {
      console.log("Error in ILink Opener", error);
    }
  }, [monitor, keywordList, channelList, settingOption]);

  /**
   * function handle modal state
   **/
  const handleOpenModal = () => {
    dispatch(setModalState("discordAccount"));
  };

  return (
    <div className="page-section">
      <div className="left-container">
        <LinkOpenerLeftSection
          {...{ handleOpenModal, accountList, selctedMonitorToken }}
        />
      </div>
      <div className="right-container">
        <LinkOpenerTopSection />
        <div className="page-padding-section">
          <div className="linkopener-flex-wrapper">
            <div className="linkopner-left-section">
              <LinkOpenerSetting />
              <div className="flex-keyword-channel">
                <ChannelSection {...{ channelList }} />
                <KeywordSection {...{ keywordList }} />
              </div>
            </div>
            <div className="linkopner-right-section">
              <LinkOpenerLogSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkOpener;
