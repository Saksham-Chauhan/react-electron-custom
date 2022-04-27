import React, { useEffect, useState } from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { AppSpacer } from "../../component";
import {
  SpooferTopSection,
  SpooferTableSection,
  SpooferTopBtnsWrraper,
} from "../../pages-component";
import { searchingFunction } from "../../hooks/searchFunction";
import { fetchSpoofTableList } from "../../features/counterSlice";
function Spoofer() {
  const [search, setSearch] = useState("");
  const list = useSelector(fetchSpoofTableList);
  const [tableList, setTableList] = useState([]);
  useEffect(() => {
    if (list.length > 0) {
      setTableList([...list]);
    } else setTableList([]);
  }, [list]);

  const handleSearching = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length > 0) {
      const result = searchingFunction(value, list, "SPOOF");
      if (result.length > 0) {
        setTableList([...result]);
      } else setTableList([]);
    } else setTableList([...list]);
  };

  return (
    <div className="spoofer-page-outer-section">
      <SpooferTopSection {...{ tableList }} />
      <div className="spoofer-page-inner-section">
        <AppSpacer spacer={30} />
        <SpooferTopBtnsWrraper {...{ tableList, search, handleSearching }} />
        <AppSpacer spacer={20} />
        <SpooferTableSection {...{ tableList }} />
      </div>
    </div>
  );
}

export default Spoofer;
