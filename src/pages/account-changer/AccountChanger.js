import React from "react";
import { useSelector } from "react-redux";
import { AppSpacer } from "../../component";
import { fetchSelectedAccChangerCard } from "../../features/counterSlice";
import {
  AccountChangeLeftSection,
  AccountChangerTableSection,
  AccountChangerTopBtnsWrapper,
  AccountChangerTopSection,
} from "../../pages-component";
import "./style.css";

const AccountChanger = () => {
  const selectedCard = useSelector(fetchSelectedAccChangerCard);

  return (
    <div className="page-section">
      <div className="left-container">
        <AccountChangeLeftSection {...{ selectedCard }} />
      </div>
      <div className="right-container">
        <AccountChangerTopSection {...{ selectedCard }} />
        <AppSpacer spacer={20} />
        <div className="acc-changer-padding">
          <AccountChangerTopBtnsWrapper />
          <AppSpacer spacer={20} />
          <AccountChangerTableSection {...{ selectedCard }} />
        </div>
      </div>
    </div>
  );
};
export default AccountChanger;
