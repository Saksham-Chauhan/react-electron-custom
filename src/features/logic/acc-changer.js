import { generateId } from "../../helper";
import { appendTaskInTable, fetchTaskTableListState } from "../counterSlice";

export const addDataInTableList = (obj) => (dispatch, getState) => {
  const currentList = fetchTaskTableListState(getState());
  const tempObj = { ...obj };
  tempObj["id"] = generateId();
  dispatch(appendTaskInTable([tempObj, ...currentList]));
};

export const deleteDataFromTableList = (deletedRow) => (dispatch, getState) => {
  const currentList = fetchTaskTableListState(getState());
  const tempOptionList = [...currentList].filter(
    (obj) => obj["id"] !== deletedRow["id"]
  );
  dispatch(appendTaskInTable(tempOptionList));
};

export const deleteAllTableRow = () => (dispatch, getState) => {
  dispatch(appendTaskInTable([]));
};

export const updateStatusOfTableRow = (obj, status) => (dispatch, getState) => {
  const currentList = fetchTaskTableListState(getState());
  const tempOptionList = [...currentList].map((row) => {
    if (row["id"] === obj["id"]) return { ...row, status };
    return row;
  });
  dispatch(appendTaskInTable(tempOptionList));
};

export const updatePasswordChangerStatus = (obj) => (dispatch, getState) => {
  const currentList = fetchTaskTableListState(getState());
  const tempOptionList = [...currentList].map((row) => {
    if (row["id"] === obj["id"]) return obj;
    return row;
  });
  dispatch(appendTaskInTable(tempOptionList));
};

export const updateTaskState = (data) => (dispatch, getState) => {
  const { id, status, active } = data;
  const currentList = fetchTaskTableListState(getState());
  const tempOptionList = [...currentList].map((row) => {
    if (row["id"] === id) {
      if (row["changerType"] !== "discordSpoofer") {
        return status ? { ...row, status, active } : { ...row, active };
      } else {
        const obj = { ...row };
        const words = status.split(":");
        if (words.length === 2) {
          obj["isOpen"] += 1;
          if (obj["isOpen"] === parseInt(words[1])) {
            return { ...obj, status: `Closed`, active: false, isOpen: 0 };
          } else {
            return { ...obj, status: `${obj["isOpen"]}/${words[1]} Closed` };
          }
        } else {
          return { ...row, status, active };
        }
      }
    }

    return row;
  });
  dispatch(appendTaskInTable(tempOptionList));
};

export const resetTaskState = () => (dispatch, getState) => {
  const currentList = fetchTaskTableListState(getState());
  const tempOptionList = [...currentList].map((row) => {
    if (row["changerType"] !== "discordSpoofer") {
      return { ...row, status: "Idle", active: false };
    } else {
      return { ...row, status: "Idle", active: false, isOpen: 0 };
    }
  });
  dispatch(appendTaskInTable(tempOptionList));
};
