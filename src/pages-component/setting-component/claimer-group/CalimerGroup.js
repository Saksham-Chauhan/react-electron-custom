import React from "react";
import "./styles.css";
import {
  setModalState,
  setEditStorage,
  fetchClaimerGroupList,
  fetchThemsState,
  fetchTwitterClaimerGroupState,
} from "../../../features/counterSlice";
import {
  readTokenGroupFromFile,
  deleteClaimerGroupFromList,
} from "../../../features/logic/setting";
import { downloadLogs } from "../../../helper";
import { toastWarning } from "../../../toaster";
import { AppSpacer, Tooltip } from "../../../component";
import edit from "../../../assests/images/edit.svg";
import UseAnimations from "react-useanimations";
import plus from "../../../assests/images/plus.svg";
import trash2 from "react-useanimations/lib/trash2";
import exportIcon from "../../../assests/images/export.svg";
import importIcon from "../../../assests/images/import.svg";
import { useDispatch, useSelector } from "react-redux";

function CalimerGroup() {
  const dispatch = useDispatch();
  const list = useSelector(fetchClaimerGroupList);
  const appTheme = useSelector(fetchThemsState);
  const usedGroup = useSelector(fetchTwitterClaimerGroupState);

  const handleOpenModal = () => {
    dispatch(setModalState("clamerOnboardingScreen"));
  };

  const handleEdit = (group) => {
    dispatch(setEditStorage(group));
    dispatch(setModalState("claimerGroup"));
  };

  const handleDelete = (group) => {
    if (usedGroup.id === group.id) {
      toastWarning("Token in use on Twitter Page");
    } else {
      dispatch(deleteClaimerGroupFromList(group));
    }
  };

  const handleImportTokenGroup = (e) => {
    const json = window.require(e.target.files[0].path);
    const groups = Object.keys(json);
    const Tokens = Object.values(json);
    for (let i = 0; i < groups.length; i++) {
      const tempStr = Tokens[i].join("\n");
      dispatch(readTokenGroupFromFile({ name: groups[i], tokenArr: tempStr }));
    }
  };
  const handleExportTokenGroup = () => {
    if (list.length > 0) {
      downloadLogs(list, "token");
    } else toastWarning("No token group to export!!");
  };
  const btnClass = appTheme
    ? "import-file-btn btn lightModeSidebar "
    : "import-file-btn btn";

  return (
    <div className=" claimer-group-outer ">
      <div className="claimer-flex">
        <Tooltip {...{ id: "import", text: "Import Token groups" }} />
        <Tooltip {...{ id: "export", text: "Export Token groups" }} />
        <h3 className={appTheme ? "lightMode_color" : ""}>Discord Tokens</h3>
        <div className="claimer-btns">
          <div className={btnClass} data-tip data-for="import">
            <img src={importIcon} alt="imp" />
            <input
              onChange={handleImportTokenGroup}
              id="token-group-import-btn"
              type="file"
              accept=".json"
            />
            <label htmlFor="token-group-import-btn" />
          </div>
          <div
            onClick={handleExportTokenGroup}
            className={btnClass}
            data-tip
            data-for="export"
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
        {list.map((group) => (
          <div key={group["id"]} className="claimer-group-list-item">
            <span className={appTheme ? "lightMode_color" : ""}>
              {group["name"]}
            </span>
            <div className="claimer-group-item-action">
              <img src={edit} alt="edit" onClick={() => handleEdit(group)} />
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
