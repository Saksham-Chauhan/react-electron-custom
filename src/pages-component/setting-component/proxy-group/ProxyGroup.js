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

  const handleOpenModal = () => {
    dispatch(setModalState("proxyGroup"));
  };

  const handleEditGroup = (group) => {
    dispatch(setEditStorage(group));
    handleOpenModal();
  };

  const handleImportProxy = (e) => {
    const json = window.require(e.target.files[0].path);
    const groups = Object.keys(json);
    const proxies = Object.values(json);
    for (let i = 0; i < groups.length; i++) {
      const tempStr = proxies[i].join("\n");
      dispatch(readProxyFromFile({ name: groups[i], tokenArr: tempStr }));
    }
  };

  const handleExportProxy = () => {
    downloadLogs(proxyList, "proxy");
  };

  const handleDeleteGroup = (group) => {
    dispatch(deleteProxyGroup(group));
  };
  const btnClass = appTheme
    ? "import-file-btn btn lightModeSidebar "
    : "import-file-btn btn";

  return (
    <div className="claimer-group-outer">
      <div className="claimer-flex">
        <Tooltip {...{ id: "export-proxy", text: "Export Proxies groups" }} />
        <h3 className={appTheme ? "lightMode_color" : ""}>Proxies</h3>
        <Tooltip {...{ id: "import-proxy", text: "Import Proxies groups" }} />
        <div className="claimer-btns">
          <div className={btnClass} data-tip data-for="import-proxy">
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
            className={btnClass}
            data-tip
            data-for="export-proxy"
          >
            <img src={exportIcon} alt="" />
          </div>
          <div onClick={handleOpenModal} className={btnClass}>
            <img src={plus} alt="" />
          </div>
        </div>
      </div>
      <AppSpacer spacer={14} />
      <div
        className={
          appTheme
            ? "claimer-group-list-scroll-list lightBg"
            : "claimer-group-list-scroll-list"
        }
      >
        {proxyList.map((group) => (
          <div key={group["id"]} className="claimer-group-list-item">
            <span className={appTheme ? "lightMode_color" : ""}>
              {group["groupName"]}
            </span>
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
