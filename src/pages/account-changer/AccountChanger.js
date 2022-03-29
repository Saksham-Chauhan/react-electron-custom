import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppSpacer } from "../../component";
import { fetchSelectedAccChangerCard } from "../../features/counterSlice";
import { searchingFunction } from "../../hooks/searchFunction";
import {
  AccountChangeLeftSection,
  AccountChangerTableSection,
  AccountChangerTopBtnsWrapper,
  AccountChangerTopSection,
} from "../../pages-component";
import "./style.css";

const AccountChanger = () => {
  const selectedCard = useSelector(fetchSelectedAccChangerCard);
  const [search, setSearch] = useState("");
  const [tempList, setTempList] = useState([]);

  useEffect(() => {
    if (selectedCard["list"].length > 0) {
      setTempList([...selectedCard["list"]]);
    } else setTempList([]);
  }, [selectedCard]);

  const handleSearching = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length > 0) {
      const result = searchingFunction(value, tempList, "ACC_GEN");
      if (result.length > 0) {
        setTempList([...result]);
      } else setTempList([]);
    } else setTempList([...selectedCard["list"]]);
  };

  return (
    <div className="page-section">
      <div className="left-container">
        <AccountChangeLeftSection {...{ selectedCard }} />
      </div>
      <div className="right-container">
        <AccountChangerTopSection {...{ selectedCard }} />
        <AppSpacer spacer={20} />
        <div className="acc-changer-padding">
          <AccountChangerTopBtnsWrapper {...{ search, handleSearching }} />
          <AppSpacer spacer={20} />
          <AccountChangerTableSection {...{ selectedCard }} />
        </div>
      </div>
    </div>
  );
};
export default AccountChanger;
