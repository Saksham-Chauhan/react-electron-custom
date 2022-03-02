import React, { useState } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import back from "../../../assests/images/back.svg";
import { twiiterApiSchema } from "../../../validation";
import { AppInputField, AppSpacer } from "../../../component";
import { TwitterPageTopSection } from "../../../pages-component";
import { addNewApiInList } from "../../../features/logic/twitter";
import { validationChecker } from "../../../hooks/validationChecker";

function SettingScreen({ handleScreen, latestTweetList }) {
  const dispatch = useDispatch();
  const [twitterApi, setTwitterApi] = useState({
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
    }
  };

  return (
    <div>
      <TwitterPageTopSection
        subText={`${Object.keys(latestTweetList).length || 0} tweets`}
        title="Twitter Settings"
      />
      <AppSpacer spacer={30} />
      <div className="twitter-setting-page-inner">
        <div onClick={handleScreen} className="twitter-setting-page-back btn">
          <img src={back} alt="" />
          <span>Twitter Page</span>
        </div>
        <AppSpacer spacer={50} />
        <div className="twitter-secting-col">
          <div>
            <h3>Keys</h3>
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
            <div className="setting-twitter-flex">
              <div className="btn">
                <span>Import Key</span>
              </div>
              <div className="btn">
                <span>Export Key</span>
              </div>
            </div>
            <AppSpacer spacer={15} />
            <div className="setting-twitter-flex full">
              <div onClick={handleSubmit} className="btn">
                <span>Save Token</span>
              </div>
            </div>
          </div>
          <div>
            <h3>Claimer</h3>
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              isSelect={true}
              fieldTitle=""
              placeholderText="Enter Claimer Group"
            />
          </div>
          <div>
            <h3>Chrome Users</h3>
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
              isSelect={true}
              placeholderText="Select Chrome Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingScreen;
