import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClaimerDiscordAccountList,
  fetchIJKeywordList,
  fetchInviteJoinerListState,
  fetchTempStorageState,
  setModalState,
  setTempStorage,
} from "../../features/counterSlice";
import {
  InviteJoinerKeywordSection,
  InviteJoinerLeftSection,
  InviteJoinerLogSection,
  InviteJoinerSettingSection,
  InviteJoinerTopSection,
} from "../../pages-component";

function InviteJoiner() {
  const dispatch = useDispatch();
  const keywordList = useSelector(fetchIJKeywordList);
  const claimerAccountList = useSelector(fetchInviteJoinerListState);
  const tempStorage = useSelector(fetchTempStorageState);

  useEffect(() => {
    return () => {
      dispatch(setTempStorage({}));
    };
  }, [dispatch]);
  console.log(claimerAccountList);
  /**
   * function handle modal state
   **/
  const handleOpenModal = () => {
    dispatch(setModalState("inviteJoinerAccount"));
  };

  return (
    <div className="page-section">
      <div className="left-container">
        <InviteJoinerLeftSection
          {...{ handleOpenModal, claimerAccountList, tempStorage }}
        />
      </div>
      <div className="right-container invite-joiner">
        <InviteJoinerTopSection />
        <div className="page-padding-section">
          <div className="linkopener-flex-wrapper">
            <div className="linkopner-left-section invite-joiner">
              <InviteJoinerSettingSection />
              <div className="flex-keyword-channel invite-joiner">
                <InviteJoinerKeywordSection {...{ keywordList }} />
                <InviteJoinerLogSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteJoiner;
