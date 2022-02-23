import React from "react";
import "./OneClick.css";
import { AppSpacer } from "../../component";
import { AppDivider } from "../../component";
import { OneClick } from "../../pages-component";
import { InputGroup } from "../../pages-component";
import { OneClickBody } from "../../pages-component";
import wifi from "../../assests/sidebarImage/wifi.svg";

const Connected = false;

const oneClickPage = () => {
  return (
    <div className="oneClick">
      <AppSpacer spacer={10} />
      <OneClick title="One_Click" />
      <AppDivider />
      <AppSpacer spacer={10} />
      <InputGroup />
      <AppSpacer spacer={5} />
      <OneClickBody />
      <div className="wifi">
        <img src={wifi} alt="wifi" />
        {Connected ? (
          <p>Connected</p>
        ) : (
          <p style={{ color: "red" }}>Not Connected</p>
        )}
      </div>
    </div>
  );
};

export default oneClickPage;
