import React, { useEffect, useState } from "react";
import "./style.css";
import {
  AccountChangerTopSection,
  AccountChangerTableSection,
  AccountChangerTopBtnsWrapper,
} from "../../pages-component";
import { useSelector } from "react-redux";
import { AppSpacer } from "../../component";
import { searchingFunction } from "../../hooks/searchFunction";
import { fetchTaskTableListState } from "../../features/counterSlice";

const AccountChanger = () => {
  const [search, setSearch] = useState("");
  const [tempList, setTempList] = useState([]);
  const accChangerList = useSelector(fetchTaskTableListState);

  useEffect(() => {
    if (accChangerList?.length > 0) {
      setTempList([...accChangerList]);
    } else setTempList([]);
  }, [accChangerList]);

  const handleSearching = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length > 0) {
      const result = searchingFunction(value, tempList, "ACC_GEN");
      if (result.length > 0) {
        setTempList([...result]);
      } else setTempList([]);
    } else setTempList([...accChangerList]);
  };

  return (
    <div className="spoofer-page-outer-section">
      <AccountChangerTopSection list={tempList} />
      <div className="spoofer-page-inner-section">
        <AppSpacer spacer={30} />
        <AccountChangerTopBtnsWrapper
          {...{ search, handleSearching, tempList }}
        />
        <AppSpacer spacer={20} />
        <AccountChangerTableSection list={tempList} />
      </div>
    </div>
  );
};
export default AccountChanger;
