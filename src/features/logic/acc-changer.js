import { generateId } from "../../helper";
import { appendTaskInTable, fetchTaskTableListState } from "../counterSlice";

export const addDataInTableList = (obj) => (dispatch, getState) => {
  const currentList = fetchTaskTableListState(getState());
  let tempObj = { ...obj };
  tempObj["id"] = generateId();
  let combiner = [tempObj, ...currentList];
  dispatch(appendTaskInTable(combiner));
};

export const deleteDataFromTableList = (deletedRow) => (dispatch, getState) => {
  const currentList = fetchTaskTableListState(getState());
  let tempOptionList = [...currentList];
  tempOptionList = [...tempOptionList].filter(
    (obj) => obj["id"] !== deletedRow["id"]
  );
  dispatch(appendTaskInTable(tempOptionList));
};

export const deleteAllTableRow = () => (dispatch, getState) => {
  dispatch(appendTaskInTable([]));
};

export const updateStatusOfTableRow = (obj, status) => (dispatch, getState) => {
  const currentList = fetchTaskTableListState(getState());
  let tempOptionList = [...currentList];
  tempOptionList = [...tempOptionList].map((row) => {
    if (row["id"] === obj["id"]) {
      let data = { ...row };
      data["status"] = status;
      return data;
    }
    return row;
  });
  dispatch(appendTaskInTable(tempOptionList));
};

export const updatePasswordChangerStatus = (obj) => (dispatch, getState) => {
  const currentList = fetchTaskTableListState(getState());
  let tempOptionList = [...currentList];
  tempOptionList = [...tempOptionList].map((row) => {
    if (row["id"] === obj["id"]) return obj;
    return row;
  });
  dispatch(appendTaskInTable(tempOptionList));
};

// export const updateTokenRetrieveverStatus = (obj) => (dispatch, getState) => {
//   const currentSelectedAccChangerType = fetchSelectedAccChangerCard(getState());
//   const currentOptionList = fetchAccChangerListState(getState());
//   let tempSelectedObj = { ...currentSelectedAccChangerType };
//   let tempOptionList = [...currentOptionList];
//   tempSelectedObj["list"] = [...tempSelectedObj["list"]].map((row) => {
//     if (row["id"] === obj["id"]) return obj;
//     return row;
//   });
//   let afterUpdate = tempOptionList.map((acc) => {
//     if (acc["changerType"] === tempSelectedObj["changerType"])
//       return tempSelectedObj;
//     return acc;
//   });
//   dispatch(setSelctedAccChangerCard(tempSelectedObj));
//   dispatch(setAccountChangerList(afterUpdate));
// };
export const updateTaskState = (data) => (dispatch, getState) => {
  const { id, status, active } = data;
  const currentList = fetchTaskTableListState(getState());
  let tempOptionList = [...currentList];
  tempOptionList = [...tempOptionList].map((row) => {
    if (row["id"] === id) return { ...row, status, active };
    return row;
  });
  dispatch(appendTaskInTable(tempOptionList));
};

export const resetTaskState = () => (dispatch, getState) => {
  const currentList = fetchTaskTableListState(getState());
  let tempOptionList = [...currentList];
  tempOptionList = [...tempOptionList].map((row) => {
    let obj = { ...row };
    obj["status"] = "idle";
    obj["active"] = false;
    return obj;
  });
  dispatch(appendTaskInTable(tempOptionList));
};
