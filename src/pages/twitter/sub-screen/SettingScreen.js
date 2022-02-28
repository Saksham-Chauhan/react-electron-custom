import React from "react";
import back from "../../../assests/images/back.svg";
import "./styles.css";
import { TwitterPageTopSection } from "../../../pages-component";
import { AppInputField, AppSpacer } from "../../../component";
function SettingScreen({ handleScreen }) {
  return (
    <div>
      <TwitterPageTopSection title="Twitter Settings " />
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
              placeholderText="Enter API Key"
            />
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
              placeholderText="Enter API Secret"
            />
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
              placeholderText="Enter Access Token"
            />
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
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
              <div className="btn">
                <span>Save Token</span>
              </div>
            </div>
          </div>
          <div>
            <h3>Claimer</h3>
            <AppInputField
              hideLabel={true}
              isCustomLabel={true}
              fieldTitle=""
              placeholderText="Enter Claimer Group"
            />
            <AppSpacer spacer={15} />
            <div className="setting-twitter-flex full">
              <div className="btn">
                <span>Save Token</span>
              </div>
            </div>
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
            <AppSpacer spacer={15} />
            <div className="setting-twitter-flex full">
              <div className="btn">
                <span>Save Chrome user</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingScreen;
