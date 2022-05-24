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
    if (row["id"] === id)
      return status ? { ...row, status, active } : { ...row, active };
    return row;
  });
  dispatch(appendTaskInTable(tempOptionList));
};

export const resetTaskState = () => (dispatch, getState) => {
  const currentList = fetchTaskTableListState(getState());
  const tempOptionList = [...currentList].map((row) => {
    return { ...row, status: "Idle", active: false };
  });
  dispatch(appendTaskInTable(tempOptionList));
};
