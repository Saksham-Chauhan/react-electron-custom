import { generateId } from "../../helper";
import {
  fetchAccChangerListState,
  fetchSelectedAccChangerCard,
  setAccountChangerList,
  setSelctedAccChangerCard,
} from "../counterSlice";

export const addDataInTableList = (obj) => (dispatch, getState) => {
  const currentSelectedAccChangerType = fetchSelectedAccChangerCard(getState());
  const currentOptionList = fetchAccChangerListState(getState());
  let tempSelectedObj = { ...currentSelectedAccChangerType };
  let tempOptionList = [...currentOptionList];
  let tempObj = { ...obj };
  tempObj["id"] = generateId();
  tempSelectedObj["list"] = [...tempSelectedObj["list"], tempObj];
  let afterUpdate = tempOptionList.map((acc) => {
    if (acc["changerType"] === tempSelectedObj["changerType"]) {
      return tempSelectedObj;
    }
    return acc;
  });
  dispatch(setSelctedAccChangerCard(tempSelectedObj));
  dispatch(setAccountChangerList(afterUpdate));
};

export const deleteDataFromTableList = (deletedRow) => (dispatch, getState) => {
  const currentSelectedAccChangerType = fetchSelectedAccChangerCard(getState());
  const currentOptionList = fetchAccChangerListState(getState());
  let tempSelectedObj = { ...currentSelectedAccChangerType };
  let tempOptionList = [...currentOptionList];
  tempSelectedObj["list"] = [...tempSelectedObj["list"]].filter(
    (obj) => obj["id"] !== deletedRow["id"]
  );
  let afterUpdate = tempOptionList.map((acc) => {
    if (acc["changerType"] === tempSelectedObj["changerType"])
      return tempSelectedObj;
    return acc;
  });
  dispatch(setSelctedAccChangerCard(tempSelectedObj));
  dispatch(setAccountChangerList(afterUpdate));
};

export const deleteAllTableRow = () => (dispatch, getState) => {
  const currentSelectedAccChangerType = fetchSelectedAccChangerCard(getState());
  const currentOptionList = fetchAccChangerListState(getState());
  let tempSelectedObj = { ...currentSelectedAccChangerType };
  let tempOptionList = [...currentOptionList];
  tempSelectedObj["list"] = [];
  let afterUpdate = tempOptionList.map((acc) => {
    if (acc["changerType"] === tempSelectedObj["changerType"])
      return tempSelectedObj;
    return acc;
  });
  dispatch(setSelctedAccChangerCard(tempSelectedObj));
  dispatch(setAccountChangerList(afterUpdate));
};

export const updateStatusOfTableRow = (obj, status) => (dispatch, getState) => {
  const currentSelectedAccChangerType = fetchSelectedAccChangerCard(getState());
  const currentOptionList = fetchAccChangerListState(getState());
  let tempSelectedObj = { ...currentSelectedAccChangerType };
  let tempOptionList = [...currentOptionList];
  tempSelectedObj["list"] = [...tempSelectedObj["list"]].map((row) => {
    if (row["id"] === obj["id"]) {
      let data = { ...row };
      data["status"] = status;
      return data;
    }
    return row;
  });
  let afterUpdate = tempOptionList.map((acc) => {
    if (acc["changerType"] === tempSelectedObj["changerType"])
      return tempSelectedObj;
    return acc;
  });
  dispatch(setSelctedAccChangerCard(tempSelectedObj));
  dispatch(setAccountChangerList(afterUpdate));
};
