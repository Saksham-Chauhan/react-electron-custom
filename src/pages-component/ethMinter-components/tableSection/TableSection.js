import React from "react";
import "./style.css";
import play from "../../../assests/images/play.svg";
import trash2 from "react-useanimations/lib/trash2";
import edit from "../../../assests/images/edit.svg";
import UseAnimations from "react-useanimations";
import stop from "../../../assests/images/stop.svg";
import {
  fetchNftSettingDelaytate,
  fetchNftSettingRPCState,
  fetchNftWalletListState,
  setEditStorage,
  setModalState,
} from "../../../features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  editTaskInGroup,
  removeTaskFromList,
} from "../../../features/logic/nft";
import { sendLogs } from "../../../helper/electron-bridge";
import { handleMinting } from "../../../helper/nft-minter";

const TableSection = ({ list = [] }) => {
  const dispatch = useDispatch();
  const walletList = useSelector(fetchNftWalletListState);
  const rpcURL = useSelector(fetchNftSettingRPCState);
  const delay = useSelector(fetchNftSettingDelaytate);

  const handleDeleteTask = (task) => {
    const log = `Delete the Minter task with id -> ${task.id}`;
    sendLogs(log);
    dispatch(removeTaskFromList(task));
  };

  const handleEditTaskStatus = (task) => {
    dispatch(editTaskInGroup(task));
  };

  const handleTaskPlay = (task) => {
    if (task.status !== "success" && task.status !== "running") {
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
      <div className="table-header-parent">
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
  return (
    <div className="table-header body">
      <div>{index + 1}</div>
      <div className="d-flex">
        <div className="task-address">{row?.contractAddress}</div>...
      </div>
      <div>{row?.gasPriceMethod}</div>
      <div>{row?.walletName} </div>
      <div style={{ color: getTaskStatusColor(row?.status) }}>
        {row?.status}
      </div>
      <div>
        {row?.status === "running" || row?.status === "pending" ? (
          <img src={stop} alt="stop" />
        ) : (
          <img
            src={play}
            onClick={() =>
              onPlay({
                ...row,
                wallet: wallet.length > 0 ? { ...wallet[0] } : {},
              })
            }
            alt=""
          />
        )}
        <img onClick={() => onEdit(row)} src={edit} alt="" />
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
    case "running":
      return appTheme ? "var(--lightMode-status)" : "var(--status)";
    case "pending":
      return "var(--delete)";
    case "error":
      return "var(--delete)";
    case "Idle":
      return appTheme ? "var(--lightMode-text-color)" : "";
    case "success":
      return appTheme ? "var(--lightMode-complete)" : "#1186db";
    default:
      return "var(--primary)";
  }
};
