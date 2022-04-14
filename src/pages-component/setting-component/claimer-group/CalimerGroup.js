import React from "react";
import "./styles.css";
import {
  setModalState,
  setEditStorage,
  fetchClaimerGroupList,
} from "../../../features/counterSlice";
import {
  readTokenGroupFromFile,
  deleteClaimerGroupFromList,
} from "../../../features/logic/setting";
import { downloadLogs } from "../../../helper";
import { toastWarning } from "../../../toaster";
import { AppSpacer } from "../../../component";
import edit from "react-useanimations/lib/edit";
import UseAnimations from "react-useanimations";
import plus from "../../../assests/images/plus.svg";
import trash2 from "react-useanimations/lib/trash2";
import exportIcon from "../../../assests/images/export.svg";
import importIcon from "../../../assests/images/import.svg";
import { useDispatch, useSelector } from "react-redux";

function CalimerGroup() {
  const dispatch = useDispatch();
  const list = useSelector(fetchClaimerGroupList);

  const handleOpenModal = () => {
    dispatch(setModalState("claimerGroup"));
  };

  const handleEdit = (group) => {
    dispatch(setEditStorage(group));
    handleOpenModal();
  };

  const handleDelete = (group) => {
    dispatch(deleteClaimerGroupFromList(group));
  };

  const handleImportTokenGroup = (e) => {
    const { files } = e.target;
    const reader = new FileReader();
    reader.onload = (event) => {
      const tknStr = event.target.result;
      const fileName = files[0].name.split(".")[0];
      dispatch(readTokenGroupFromFile({ name: fileName, tokenArr: tknStr }));
    };
    reader.readAsText(files[0]);
  };

  const handleExportTokenGroup = () => {
    if (list.length > 0) {
      downloadLogs(list, "token");
    } else toastWarning("No token group to export!!");
  };

  return (
    <div className="claimer-group-outer">
      <div className="claimer-flex">
        <h3>Token Group</h3>
        <div className="claimer-btns">
          <div className="import-file-btn btn">
            <img src={importIcon} alt="" />
            <input
              onChange={handleImportTokenGroup}
              id="token-group-import-btn"
              type="file"
              accept=".txt"
            />
            <label htmlFor="token-group-import-btn" />
          </div>
          <div onClick={handleExportTokenGroup} className="btn">
            <img src={exportIcon} alt="" />
          </div>
          <div onClick={handleOpenModal} className="btn">
            <img src={plus} alt="" />
          </div>
        </div>
      </div>
      <AppSpacer spacer={14} />
      <div className="claimer-group-list-scroll-list">
        {list.map((group) => (
          <div key={group["id"]} className="claimer-group-list-item">
            <span>{group["name"]}</span>
            <div className="claimer-group-item-action">
              <UseAnimations
                onClick={() => handleEdit(group)}
                animation={edit}
                strokeColor="#ffff"
                size={20}
                wrapperStyle={{ cursor: "pointer" }}
              />
              <UseAnimations
                onClick={() => handleDelete(group)}
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

export default CalimerGroup;
