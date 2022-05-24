import React, { useState } from "react";
import "./styles.css";
import {
  fetchThemsState,
  setTwitterChromeUser,
  setTwitterClaimerGroup,
  fetchClaimerGroupList,
  fetchChromeUserListState,
  fetchTwitterClaimerGroupState,
} from "../../../features/counterSlice";
import {
  addNewApiInList,
  removeApiFromList,
} from "../../../features/logic/twitter";
import { useNavigate } from "react-router-dom";
import { toastWarning } from "../../../toaster";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import back from "../../../assests/images/back.svg";
import { twiiterApiSchema } from "../../../validation";
import { useDispatch, useSelector } from "react-redux";
import { AppInputField, AppSpacer } from "../../../component";
import { getTweets } from "../../../helper/electron-bridge";
import { TwitterPageTopSection } from "../../../pages-component";
import { defaultChromeUser, RoutePath } from "../../../constant";
import { validationChecker } from "../../../hooks/validationChecker";
import { getClaimerValue, makeClaimerSelectOption } from "../../../helper";
import LabelWithTooltip from "../../../component/tooltip-label/LabelWithTooltip";

function SettingScreen({
  handleScreen,
  latestTweetList,
  apiList,
  rotaterIndex,
  twitterSetting,
}) {
  const dispatch = useDispatch();
  const chromeList = useSelector(fetchChromeUserListState);
  const claimerList = useSelector(fetchClaimerGroupList);
  const selectedClaimer = useSelector(fetchTwitterClaimerGroupState);
  const appTheme = useSelector(fetchThemsState);

  const theme = {
    textClass: appTheme ? "lightMode_color" : "",
    settingPageBack: appTheme
      ? "twitter-setting-page-back btn light-mode-sidebar"
      : "twitter-setting-page-back btn",
    apiScrollArea: appTheme
      ? "api-keys-scroll-acrea light-mode-sidebar"
      : "api-keys-scroll-acrea",
    backGrounnd: appTheme ? "btn light-mode-sidebar" : "",
  };

  let navigate = useNavigate();
  const [twitterApi, setTwitterApi] = useState({
    apiName: "",
    apiKey: "",
    apiSecret: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTwitterApi((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = async () => {
    const result = validationChecker(twiiterApiSchema, twitterApi);
    if (result) {
      try {
        const response = await getTweets(
          twitterApi.apiKey,
          twitterApi.apiSecret,
          "KodersHQ"
        );
        if (Object.keys(response).length > 0) {
          dispatch(addNewApiInList(twitterApi));
          setTwitterApi({
            apiName: "",
            apiKey: "",
            apiSecret: "",
          });
        }
      } catch (error) {
        console.log("Error while testing twitter API", error);
      }
    }
  };

  const handleApiDelete = (api, index) => {
    if (!twitterSetting?.twitterMonitor) {
      dispatch(removeApiFromList(api));
    } else {
      if (rotaterIndex !== index) {
        dispatch(removeApiFromList(api));
      } else toastWarning("API in use!!!!");
    }
  };

  const handleUserSelect = (data) => {
    dispatch(setTwitterChromeUser(data));
  };

  const handleClaimerSelect = (data) => {
    dispatch(setTwitterClaimerGroup(data));
  };

  const handleChromeMenuOpen = () => {
    if (chromeList.length === 0) {
      navigate(RoutePath.setting, { replace: true });
    }
  };

  const handleClaimerMenuOpen = () => {
    if (claimerList.length === 0) {
      navigate(RoutePath.setting, { replace: true });
    }
  };

  return (
    <div>
      <TwitterPageTopSection
        subText={`${Object.keys(latestTweetList).length || 0} tweets`}
        title="Twitter Settings"
      />
      <AppSpacer spacer={20} />
      <div className="twitter-setting-page-inner">
        <div onClick={handleScreen} className={theme.settingPageBack}>
          <img src={back} alt="" />
          <span>Twitter Page</span>
        </div>
        <AppSpacer spacer={30} />
        <div className="twitter-secting-col">
          <div>
            <div className="d-flex">
              <h3 className={theme.textClass}>Twitter API</h3>
              <LabelWithTooltip toolTopText="Multiple API keys would enable rotation" />
            </div>
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
              name="apiName"
              value={twitterApi?.apiName}
              onChange={handleChange}
              placeholderText="Enter API Name"
              submit={handleSubmit}
              submitFlag={true}
            />
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
              name="apiKey"
              value={twitterApi?.apiKey}
              onChange={handleChange}
              placeholderText="Enter API Key"
              submit={handleSubmit}
              submitFlag={true}
            />
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
              name="apiSecret"
              value={twitterApi?.apiSecret}
              onChange={handleChange}
              placeholderText="Enter API Secret"
              submit={handleSubmit}
              submitFlag={true}
            />
            <AppSpacer spacer={15} />
            <div className="setting-twitter-flex full">
              <div
                onClick={handleSubmit}
                className={theme.backGrounnd}
                style={{ cursor: "pointer" }}
              >
                <span>Add Key</span>
              </div>
            </div>
            <AppSpacer spacer={15} />
            <div className={theme.apiScrollArea}>
              {apiList.map((api, index) => (
                <div key={api["id"]} className="api-list-item">
                  <span>{api["apiName"]}</span>
                  <UseAnimations
                    onClick={() => handleApiDelete(api, index)}
                    animation={trash2}
                    strokeColor="#B60E0E"
                    size={25}
                    wrapperStyle={{ cursor: "pointer" }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="d-flex">
              <h3 className={theme.textClass}>Discord Accounts</h3>
              <LabelWithTooltip
                toolTopText="For invite joiner"
                labelText="invite"
                text={false}
              />
            </div>
            <AppInputField
              fieldTitle=""
              hideLabel={true}
              isCustomLabel={true}
              onChange={handleClaimerSelect}
              placeholderText={
                claimerList.length > 0
                  ? "Select Discord Accounts"
                  : "Add Discord Accounts"
              }
              selectOptions={makeClaimerSelectOption(claimerList)}
              value={getClaimerValue(claimerList, selectedClaimer)}
              onMenuOpen={handleClaimerMenuOpen}
              isSelect={claimerList.length > 0 ? true : false}
              disabled={claimerList.length > 0 ? false : true}
              navigate={
                claimerList.length > 0 ? () => {} : handleClaimerMenuOpen
              }
            />
          </div>
          <div>
            <div className="d-flex">
              <h3 className={theme.textClass}>Chrome User</h3>
              <LabelWithTooltip
                labelText="link"
                text={false}
                toolTopText="For link opener"
              />
            </div>
            <AppInputField
              defaultValue={defaultChromeUser}
              fieldTitle=""
              hideLabel={true}
              isCustomLabel={true}
              selectOptions={chromeList}
              onChange={handleUserSelect}
              onMenuOpen={handleChromeMenuOpen}
              placeholderText={
                chromeList.length > 0 ? "Select Chrome User" : "Add Chrome User"
              }
              isSelect={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingScreen;
