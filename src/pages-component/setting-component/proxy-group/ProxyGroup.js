import React from "react";
import {
  deleteProxyGroup,
  readProxyFromFile,
} from "../../../features/logic/proxy";
import {
  setModalState,
  setEditStorage,
  fetchProxyGroupList,
} from "../../../features/counterSlice";
import { downloadLogs } from "../../../helper";
import { AppSpacer } from "../../../component";
import UseAnimations from "react-useanimations";
import edit from "react-useanimations/lib/edit";
import trash2 from "react-useanimations/lib/trash2";
import plus from "../../../assests/images/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import exportIcon from "../../../assests/images/export.svg";
import importIcon from "../../../assests/images/import.svg";

function ProxyGroup() {
  const dispatch = useDispatch();
  const proxyList = useSelector(fetchProxyGroupList);

  const handleOpenModal = () => {
    dispatch(setModalState("proxyGroup"));
  };

  const handleEditGroup = (group) => {
    dispatch(setEditStorage(group));
    handleOpenModal();
  };

  const handleImportProxy = (e) => {
    const { files } = e.target;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const proxyStr = event.target.result;
      const fileName = files[0].name.split(".")[0];
      dispatch(readProxyFromFile({ name: fileName, tokenArr: proxyStr }));
    };
    reader.readAsText(files[0]);
  };

  const handleExportProxy = () => {
    downloadLogs(proxyList, "proxy");
  };

  const handleDeleteGroup = (group) => {
    dispatch(deleteProxyGroup(group));
  };

  return (
    <div className="claimer-group-outer">
      <div className="claimer-flex">
        <h3>Proxy Group</h3>
        <div className="claimer-btns">
          <div className="import-file-btn btn">
            <img src={importIcon} alt="" />
            <input
              onChange={handleImportProxy}
              id="proxy-group-import-btn"
              type="file"
              accept=".txt"
            />
            <label htmlFor="proxy-group-import-btn" />
          </div>
          <div onClick={handleExportProxy} className="btn">
            <img src={exportIcon} alt="" />
          </div>
          <div onClick={handleOpenModal} className="btn">
            <img src={plus} alt="" />
          </div>
        </div>
      </div>
      <AppSpacer spacer={14} />
      <div className="claimer-group-list-scroll-list">
        {proxyList.map((group) => (
          <div key={group["id"]} className="claimer-group-list-item">
            <span>{group["groupName"]}</span>
            <div className="claimer-group-item-action">
              <UseAnimations
                onClick={() => handleEditGroup(group)}
                animation={edit}
                strokeColor="#ffff"
                size={20}
                wrapperStyle={{ cursor: "pointer" }}
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
