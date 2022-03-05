import React from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";
import test from "../../../assests/images/chemistry.svg";
import searchIcon from "../../../assests/images/search.svg";
import exportIcon from "../../../assests/images/export.svg";
import importIcon from "../../../assests/images/import.svg";
import {
  deleteProxyGroup,
  removeBadProxy,
} from "../../../features/logic/proxy";
import { toastWarning } from "../../../toaster";
import { handleExportLogs } from "../../../helper";
import { proxyTester } from "../../../helper/electron-bridge";
import { setEditStorage, setModalState } from "../../../features/counterSlice";

function ProxyTopBtnsWrapper({ search, handleSearching, tempData }) {
  const dispatch = useDispatch();

  const handleDeleteGroup = () => {
    if (Object.keys(tempData).length > 0) {
      dispatch(deleteProxyGroup());
    } else toastWarning("Select proxy group");
  };

  const handleEditGroup = () => {
    if (Object.keys(tempData).length > 0) {
      dispatch(setEditStorage(tempData));
      dispatch(setModalState("proxyGroup"));
    } else toastWarning("Select proxy group");
  };

  const handleTestproxy = () => {
    if (Object.keys(tempData).length > 0) {
      tempData["proxyList"].forEach((proxy) => {
        proxyTester(proxy);
      });
    } else toastWarning("Select proxy group");
  };

  const handleRemoveBadProxy = () => {
    if (Object.keys(tempData).length > 0) {
      dispatch(removeBadProxy());
    } else toastWarning("Select proxy group");
  };

  const handleExportProxy = () => {
    if (Object.keys(tempData).length > 0) {
      if (tempData["proxyList"].length > 0) {
        let obj = {};
        obj["proxies"] = tempData["proxyList"];
        handleExportLogs(JSON.stringify(obj), "application/json");
      } else toastWarning("Nothing to Import");
    } else toastWarning("Select proxy group");
  };

  return (
    <div className="page-top-btns-wrapper">
      <div className="page-left-container">
        <div className="page-top-search-container">
          <img src={searchIcon} alt="search-icon" />
          <input
            value={search}
            onChange={handleSearching}
            placeholder="Search"
            type="search"
          />
        </div>
        <div onClick={handleTestproxy} className="icon-btn-wrapper btn">
          <img src={test} alt="" />
        </div>
        <div onClick={handleEditGroup} className="icon-btn-wrapper btn">
          <img src={edit} alt="" />
        </div>
        <div onClick={handleDeleteGroup} className="icon-btn-wrapper btn">
          <img src={trash} alt="" />
        </div>
      </div>
      <div className="page-right-container">
        <div onClick={handleRemoveBadProxy} className="remove-btn btn">
          <img src={trash} alt="" />
          <span>Remove Bad Proxies</span>
        </div>
        <div className="icon-btn-wrapper btn">
          <img src={importIcon} alt="" />
        </div>
        <div onClick={handleExportProxy} className="icon-btn-wrapper btn">
          <img src={exportIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ProxyTopBtnsWrapper;
