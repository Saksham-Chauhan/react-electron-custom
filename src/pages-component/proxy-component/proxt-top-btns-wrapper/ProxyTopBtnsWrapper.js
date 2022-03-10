import React from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import test from "../../../assests/images/chemistry.svg";
import add from "../../../assests/images/plus.svg";
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
import {
  openAddNewProxyModal,
  setEditStorage,
  setModalState,
} from "../../../features/counterSlice";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import edit from "react-useanimations/lib/edit";

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

  const handleAddNewProxy = () => {
    if (Object.keys(tempData).length > 0) {
      dispatch(openAddNewProxyModal(tempData));
      dispatch(setModalState("proxyGroup"));
    } else toastWarning("Select proxy group");
  };

  const handleImportProxy = (e) => {
    const { files } = e.target;
    console.log(files, e);
    // const reader = new FileReader();
    // reader.onload = async (e) => {
    //   const text = e.target.result;
    //   console.log(text);
    //   // alert(text)
    // };
    // reader.readAsText(filePath);
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
        <div onClick={handleAddNewProxy} className="icon-btn-wrapper btn">
          <img src={add} alt="" />
        </div>
        <div onClick={handleTestproxy} className="icon-btn-wrapper btn">
          <img src={test} alt="" />
        </div>
        <div onClick={handleEditGroup} className="icon-btn-wrapper btn">
          <UseAnimations
            animation={edit}
            strokeColor="#fff"
            size={25}
          ></UseAnimations>
        </div>
        <div onClick={handleDeleteGroup} className="icon-btn-wrapper btn">
          <UseAnimations
            animation={trash2}
            strokeColor="#B60E0E"
            size={25}
          ></UseAnimations>
        </div>
      </div>
      <div className="page-right-container">
        <div onClick={handleRemoveBadProxy} className="remove-btn btn">
          <UseAnimations
            animation={trash2}
            strokeColor="#B60E0E"
            size={27}
            wrapperStyle={{ paddingBottom: "2px" }}
          ></UseAnimations>
          <span>Remove Bad Proxies</span>
        </div>
        <div className="icon-btn-wrapper import-file-btn btn">
          <img src={importIcon} alt="" />
          <input
            onChange={handleImportProxy}
            id="proxy-import-btn"
            type="file"
            accept=".̀json"
          />
          <label htmlFor="proxy-import-btn" />
        </div>
        <div onClick={handleExportProxy} className="icon-btn-wrapper btn">
          <img src={exportIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ProxyTopBtnsWrapper;
