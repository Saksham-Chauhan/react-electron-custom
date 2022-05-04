import React from "react";
import "./style.css";
import {
  editTaskInGroup,
  removeTaskFromList,
} from "../../../features/logic/nft";
import {
  setModalState,
  setEditStorage,
  fetchNftSettingRPCState,
  fetchNftWalletListState,
  fetchNftSettingDelaytate,
  fetchThemsState,
} from "../../../features/counterSlice";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import play from "../../../assests/images/play.svg";
import edit from "../../../assests/images/edit.svg";
import stop from "../../../assests/images/stop.svg";
import lightModePlay from "../../../assests/images/lightMode_play.svg";
import { useDispatch, useSelector } from "react-redux";
import { sendLogs } from "../../../helper/electron-bridge";
import { handleMinting } from "../../../helper/nft-minter";

const TableSection = ({ list = [] }) => {
  const dispatch = useDispatch();
  const rpcURL = useSelector(fetchNftSettingRPCState);
  const delay = useSelector(fetchNftSettingDelaytate);
  const walletList = useSelector(fetchNftWalletListState);

  const appTheme = useSelector(fetchThemsState);
  const theme = {
    tableHeader: appTheme
      ? "table-header-parent light-mode-sidebar"
      : "table-header-parent",
  };

  const handleDeleteTask = (task) => {
    const log = `Delete the Minter task with id -> ${task.id}`;
    sendLogs(log);
    dispatch(removeTaskFromList(task));
  };

  const handleEditTaskStatus = (task) => {
    dispatch(editTaskInGroup(task));
  };

  const handleTaskPlay = (task) => {
    if (task.status !== "Success" && task.status !== "Monitoring") {
      let log;
      try {
        handleMinting(task, rpcURL, handleEditTaskStatus, true, delay);
        log = `Start minting the task with id -> ${task.id}`;
      } catch (e) {
        log = `Error in minting the task with id -> ${task.id}`;
      }
      sendLogs(log);
    }
  };

  const handleTaskEdit = (task) => {
    dispatch(setEditStorage(task));
    dispatch(setModalState("nftTaskModal"));
  };

  return (
    <div className="minter-table padding-horizontal">
      <div className={theme.tableHeader}>
        <div className="table-header">
          <div>#</div>
          <div>Contract</div>
          <div>Mode</div>
          <div>Wallet</div>
          <div>Status </div>
          <div>Action </div>
        </div>
      </div>
      <div className="minter-table-scroll">
        {list?.map((row, index) => {
          return (
            <MinterTableRow
              onDelete={handleDeleteTask}
              key={row["id"]}
              onEdit={handleTaskEdit}
              {...{ row, index }}
              onPlay={handleTaskPlay}
              wallet={walletList?.filter((w) => w.id === row?.walletID)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TableSection;

const MinterTableRow = ({ row, index, onDelete, onPlay, onEdit, wallet }) => {
  const appTheme = useSelector(fetchThemsState);
  return (
    <div
      className={
        appTheme
          ? "table-header-lightmode table-header body"
          : "table-header body"
      }
    >
      <div style={{ color: appTheme ? "var(--lightMode-tableColor)" : "" }}>
        {index + 1}
      </div>
      <div className="d-flex">
        <div
          style={{ color: appTheme ? "var(--lightMode-tableColor)" : "" }}
          className="task-address"
        >
          {row?.contractAddress}
        </div>
        ...
      </div>
      <div style={{ color: appTheme ? "var(--lightMode-tableColor)" : "" }}>
        {row?.gasPriceMethod === "manual" ? "Manual" : "Rapid"}
      </div>
      <div style={{ color: appTheme ? "var(--lightMode-tableColor)" : "" }}>
        {row?.walletName}{" "}
      </div>
      <div
        style={{
          color:
            row?.status === "Idle" && appTheme
              ? "var(--lightMode-tableColor)"
              : getTaskStatusColor(row?.status),
        }}
      >
        {row?.status}
      </div>
      <div>
        {row?.status === "Monitoring" || row?.status === "Pending" ? (
          <img src={stop} alt="stop" />
        ) : (
          <img
            src={appTheme ? lightModePlay : play}
            onClick={() =>
              onPlay({
                ...row,
                wallet: wallet.length > 0 ? { ...wallet[0] } : {},
              })
            }
            alt=""
          />
        )}
        <img onClick={() => onEdit(row)} src={edit} alt="" className="edit" />
        <UseAnimations
          wrapperStyle={{ cursor: "pointer" }}
          animation={trash2}
          strokeColor="#B60E0E"
          size={25}
          onClick={() => onDelete(row)}
        />
      </div>
    </div>
  );
};

const getTaskStatusColor = (status, appTheme) => {
  switch (status) {
    case "Monitoring":
      return appTheme ? "var(--lightMode-status)" : "var(--status)";
    case "Pending":
      return "var(--delete)";
    case "error":
      return "var(--delete)";
    case "Idle":
      return appTheme ? "var(--lightMode-text-color)" : "";
    case "Success":
      return appTheme ? "var(--lightMode-complete)" : "#1186db";
    default:
      return "var(--primary)";
  }
};
