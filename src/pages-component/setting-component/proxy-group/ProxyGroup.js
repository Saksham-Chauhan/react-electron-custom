import React from "react";
import {
  deleteProxyGroup,
  readProxyFromFile,
} from "../../../features/logic/proxy";
import {
  setModalState,
  setEditStorage,
  fetchProxyGroupList,
  fetchThemsState,
} from "../../../features/counterSlice";
import { downloadLogs } from "../../../helper";
import { AppSpacer, Tooltip } from "../../../component";
import UseAnimations from "react-useanimations";
import edit from "../../../assests/images/edit.svg";
import trash2 from "react-useanimations/lib/trash2";
import plus from "../../../assests/images/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import exportIcon from "../../../assests/images/export.svg";
import importIcon from "../../../assests/images/import.svg";
function ProxyGroup() {
  const dispatch = useDispatch();
  const proxyList = useSelector(fetchProxyGroupList);
  const appTheme = useSelector(fetchThemsState);

  const theme = {
    btnClass: appTheme
      ? "import-file-btn btn light-mode-sidebar"
      : "import-file-btn btn",
    textColor: appTheme ? "lightMode_color" : "",
    claimerGropScroll: appTheme
      ? "claimer-group-list-scroll-list light-bg"
      : "claimer-group-list-scroll-list",
  };

  const handleOpenModal = () => {
    dispatch(setModalState("proxyOnboardingScreen"));
  };

  const handleEditGroup = (group) => {
    dispatch(setEditStorage(group));
    dispatch(setModalState("proxyGroup"));
  };
  const handleImportProxy = (e) => {
    const json = window.require(e.target.files[0].path);
    const groups = Object.keys(json);
    const proxies = Object.values(json);
    for (let i = 0; i < groups.length; i++) {
      const tempStr = proxies[i].join("\n");
      let flag = true;
      for (let j = 0; j < proxyList.length; j++) {
        if (proxyList[j].groupName === groups[i]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        dispatch(readProxyFromFile({ name: groups[i], tokenArr: tempStr }));
      }
    }
  };

  const handleExportProxy = () => {
    downloadLogs(proxyList, "proxie");
  };

  const handleDeleteGroup = (group) => {
    dispatch(deleteProxyGroup(group));
  };

  return (
    <div className="claimer-group-outer">
      <div className="claimer-flex">
        <Tooltip {...{ id: "export-proxy", text: "Export Proxy Groups" }} />
        <h3 className={theme.textColor}>Proxy Group</h3>
        <Tooltip {...{ id: "import-proxy", text: "Import Proxy Groups" }} />
        <div className="claimer-btns">
          <div className={theme.btnClass} data-tip data-for="import-proxy">
            <img src={importIcon} alt="" />
            <input
              onChange={handleImportProxy}
              id="proxy-group-import-btn"
              type="file"
              accept=".json"
            />
            <label htmlFor="proxy-group-import-btn" />
          </div>
          <div
            onClick={handleExportProxy}
            className={theme.btnClass}
            data-tip
            data-for="export-proxy"
          >
            <img src={exportIcon} alt="" />
          </div>
          <div onClick={handleOpenModal} className={theme.btnClass}>
            <img src={plus} alt="" />
          </div>
        </div>
      </div>
      <AppSpacer spacer={14} />
      <div className={theme.claimerGropScroll}>
        {proxyList.map((group) => (
          <div key={group["id"]} className="claimer-group-list-item">
            <span className={theme.textColor}>{group["groupName"]}</span>
            <div className="claimer-group-item-action">
              <img
                src={edit}
                alt="edit"
                onClick={() => handleEditGroup(group)}
              />
              <UseAnimations
                onClick={() => handleDeleteGroup(group)}
                animation={trash2}
                strokeColor="#B60E0E"
                size={22}
                wrapperStyle={{ cursor: "pointer", paddingBottom: "3px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProxyGroup;
