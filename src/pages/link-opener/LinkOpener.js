import React from "react";
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
} from "../../features/counterSlice";

function LinkOpener() {
  const dispatch = useDispatch();
  const keywordList = useSelector(fetchLOKeywordList);
  const channelList = useSelector(fetchLOChannelList);
  const accountList = useSelector(fetchDiscordAccountList);
  const selctedMonitorToken = useSelector(fetchSelectedMinitorTokenLinkOpener);

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
