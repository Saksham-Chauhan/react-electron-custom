import React, { useState } from "react";
import "./styles.css";
import {
  setTwitterChromeUser,
  setTwitterClaimerGroup,
  fetchClaimerGroupList,
  fetchChromeUserListState,
  fetchTwitterChromeUserState,
  fetchTwitterClaimerGroupState,
} from "../../../features/counterSlice";
import {
  addNewApiInList,
  removeApiFromList,
} from "../../../features/logic/twitter";
import { toastWarning } from "../../../toaster";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import back from "../../../assests/images/back.svg";
import { twiiterApiSchema } from "../../../validation";
import { useDispatch, useSelector } from "react-redux";
import { AppInputField, AppSpacer } from "../../../component";
import { TwitterPageTopSection } from "../../../pages-component";
import { validationChecker } from "../../../hooks/validationChecker";
import { getClaimerValue, makeClaimerSelectOption } from "../../../helper";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../constant";

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
  const selectedChrome = useSelector(fetchTwitterChromeUserState);
  const selectedClaimer = useSelector(fetchTwitterClaimerGroupState);
  let navigate = useNavigate();
  const [twitterApi, setTwitterApi] = useState({
    apiName: "",
    apiKey: "",
    apiSecret: "",
    accessToken: "",
    accessSecret: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTwitterApi((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = () => {
    const result = validationChecker(twiiterApiSchema, twitterApi);
    if (result) {
      dispatch(addNewApiInList(twitterApi));
      setTwitterApi({
        apiName: "",
        apiKey: "",
        apiSecret: "",
        accessToken: "",
        accessSecret: "",
      });
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
        <div onClick={handleScreen} className="twitter-setting-page-back btn">
          <img src={back} alt="" />
          <span>Twitter Page</span>
        </div>
        <AppSpacer spacer={30} />
        <div className="twitter-secting-col">
          <div>
            <h3>Keys</h3>
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
              name="apiName"
              value={twitterApi?.apiName}
              onChange={handleChange}
              placeholderText="Enter API Name"
            />
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
              name="apiKey"
              value={twitterApi?.apiKey}
              onChange={handleChange}
              placeholderText="Enter API Key"
            />
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
              name="apiSecret"
              value={twitterApi?.apiSecret}
              onChange={handleChange}
              placeholderText="Enter API Secret"
            />
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
              name="accessToken"
              value={twitterApi?.accessToken}
              onChange={handleChange}
              placeholderText="Enter Access Token"
            />
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
              name="accessSecret"
              value={twitterApi?.accessSecret}
              onChange={handleChange}
              placeholderText="Enter Access Token Secret"
            />
            <AppSpacer spacer={15} />
            <div className="setting-twitter-flex full">
              <div onClick={handleSubmit} className="btn">
                <span>Save Token</span>
              </div>
            </div>
            <AppSpacer spacer={15} />
            <div className="api-keys-scroll-acrea">
              {apiList.map((api, index) => (
                <div key={api["id"]} className="api-list-item">
                  <span>{api["apiName"]}</span>
                  <UseAnimations
                    onClick={() => handleApiDelete(api, index)}
                    animation={trash2}
                    strokeColor="#B60E0E"
                    size={25}
                    wrapperStyle={{ cursor: "pointer" }}
                  ></UseAnimations>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>Claimer</h3>
            <AppInputField
              fieldTitle=""
              hideLabel={true}
              isCustomLabel={true}
              onChange={handleClaimerSelect}
              placeholderText={
                claimerList.length > 0 ? "Enter Token Group" : "Add Token Group"
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
            <h3>Chrome User</h3>
            <AppInputField
              fieldTitle=""
              hideLabel={true}
              isCustomLabel={true}
              selectOptions={chromeList}
              onChange={handleUserSelect}
              onMenuOpen={handleChromeMenuOpen}
              placeholderText={
                chromeList.length > 0 ? "Select Chrome User" : "Add Chrome User"
              }
              value={chromeList.filter((d) => d["id"] === selectedChrome["id"])}
              isSelect={claimerList.length > 0 ? true : false}
              disabled={claimerList.length > 0 ? false : true}
              navigate={
                claimerList.length > 0 ? () => {} : handleChromeMenuOpen
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingScreen;
