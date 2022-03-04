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
import { useDispatch, useSelector } from "react-redux";
import { makeLogText, makeStrOfArr } from "../../helper";
import { addLogInList } from "../../features/logic/discord-account";
import { checkOptions, containsKeyword, testUrlRegex } from "./utils";

const { Client } = window.require("discord.js-selfbot");
const open = window.require("open");

function LinkOpener() {
  const dispatch = useDispatch();
  const keywordList = useSelector(fetchLOKeywordList);
  const channelList = useSelector(fetchLOChannelList);
  const logList = useSelector(fetchLinkOpenerLogState);
  const settingOption = useSelector(fetchLOSettingState);
  const accountList = useSelector(fetchDiscordAccountList);
  const selectedMonitorToken = useSelector(fetchSelectedMinitorTokenLinkOpener);
  const selectedChrome = useSelector(fetchLOchromeUserState);

  const playSound = () => {
    let ring = new Audio(sound);
    ring.play();
  };

  useEffect(() => {
    let monitor = new Client();
    try {
      monitor.on("ready", (msg) => {
        console.log("Link opener is Ready..");
      });

      monitor.on("message", async (message) => {
        let content = message.content;
        if (makeStrOfArr(channelList).includes(message.channel.id)) {
          if (testUrlRegex(content)) {
            let flag = containsKeyword(makeStrOfArr(keywordList), content);
            if (keywordList.length === 0 || flag) {
              if (checkOptions(settingOption, content)) {
                dispatch(
                  addLogInList({ key: "LO", log: makeLogText(content) })
                );
                if (settingOption.playSound) {
                  playSound();
                }
                if (Object.keys(selectedChrome).length > 0) {
                  await open(content, {
                    app: {
                      name: "google chrome",
                      arguments: [
                        `--profile-directory=${selectedChrome["value"]}`,
                      ],
                    },
                  });
                } else {
                  await open(content, {
                    app: {
                      name: "google chrome",
                    },
                  });
                }
              }
            }
          }
        }
      });
      if (settingOption?.linkOpenerState) {
        monitor.login(selectedMonitorToken["discordToken"]);
      } else {
        console.log("Destroying  monitor...");
        monitor.destroy();
      }
    } catch (error) {
      console.log("Error in Link Opener", error);
    }
  }, [
    keywordList,
    channelList,
    settingOption,
    selectedMonitorToken,
    selectedChrome,
    dispatch,
  ]);

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

export default LinkOpener;
