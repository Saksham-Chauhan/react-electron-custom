import React from "react";
import "./OneClick.css";
import { AppSpacer, AppDivider } from "../../component";
import { OneClick, InputGroup, OneClickBody } from "../../pages-component";

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
    </div>
  );
};

export default oneClickPage;
