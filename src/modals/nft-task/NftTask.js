import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInputField, AppSpacer, ModalWrapper } from "../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../component/modal-wrapper/Modal";
import {
  fetchEditStorageState,
  fetchNftSettingEhterAPIState,
  fetchNftSettingRPCState,
  fetchNftWalletListState,
  fetchThemsState,
  setEditStorage,
  setModalState,
} from "../../features/counterSlice";
import { addTaskInGroup, editTaskInGroup } from "../../features/logic/nft";
import { sendLogs } from "../../helper/electron-bridge";
import { handleGetMintdata } from "../../helper/nft-minter";
import { validationChecker } from "../../hooks/validationChecker";
import { nftTaskSchema } from "../../validation";

function NftTask() {
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  const editState = useSelector(fetchEditStorageState);
  const walletList = useSelector(fetchNftWalletListState);
  const rpcURL = useSelector(fetchNftSettingRPCState);
  const apiKey = useSelector(fetchNftSettingEhterAPIState);
  const textClass = appTheme ? "lightMode_color" : "";
  const [task, setTask] = useState({
    walletID: "",
    transactionCost: "",
    contractAddress: "",
    functionName: "",
    functionParam: "",
    gasPriceMethod: "",
    status: "Idle",
    walletName: "",
  });
  const [tempVar, setTempVar] = useState();
  useEffect(() => {
    const setData = () => {
      if (Object.keys(editState).length > 0) {
        setTask((pre) => {
          return { ...editState };
        });
      }
    };
    setData();
    // return () => {
    //   dispatch(setEditStorage({}));
    // };
  }, [editState, dispatch]);

  const handleCloseModal = () => {
    dispatch(setEditStorage({}));
    dispatch(setModalState("nftTaskModal"));
  };

  const handleGasMethod = ({ value }) => {
    setTask((pre) => {
      return { ...pre, gasPriceMethod: value };
    });
  };

  const handleWalletMethod = (wallets) => {
    setTempVar([...wallets]);
  };

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    setTask((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const getWalletOption = () => {
    let obj = [];
    if (walletList.length) {
      for (let i = 0; i < walletList.length; i++) {
        obj = [
          {
            label: walletList[i].walletNickName,
            value: walletList[i].id,
          },
          ...obj,
        ];
      }
    }
    return obj;
  };
  const handleDispatchTask = (data) => {
    dispatch(addTaskInGroup(data));
  };
  const handleDispatchEditTask = (data) => {
    dispatch(editTaskInGroup(data));
  };

  const handleSubmit = async () => {
    let log;
    const validationresult = validationChecker(
      nftTaskSchema(task.gasPriceMethod === "manual"),
      task
    );
    if (Object.keys(editState).length === 0) {
      if (validationresult) {
        for (let i = 0; i < tempVar.length; i++) {
          task.walletID = tempVar[i].value;
          task.walletName = tempVar[i].label;
          log = `new Minter task is created with contract address ${task.contractAddress}`;
          try {
            const res = await handleGetMintdata(
              task,
              rpcURL,
              apiKey,
              handleDispatchTask
            );
            if (res.status === 200) handleCloseModal();
          } catch (e) {
            log = `Can't create new task with ${task.contractAddress}`;
          }
          sendLogs(log);
        }
      }
    } else {
      setTask({ ...editState });
      try {
        const res = await handleGetMintdata(
          task,
          rpcURL,
          apiKey,
          handleDispatchEditTask
        );
        if (res.status === 200) {
          dispatch(setEditStorage({}));
          handleCloseModal();
        }
      } catch (e) {
        log = `Can't create new task with ${task.contractAddress}`;
      }
      sendLogs(log);
    }
  };

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2 className={textClass}>
          {Object.keys(editState).length > 0 ? "Edit" : "Create"} Task
        </h2>
      </div>
      <AppSpacer spacer={30} />
      <ModalFlexOuterRow>
        <AppInputField
          fieldTitle="Select Wallets"
          placeholderText="Select Wallets"
          isSelect={true}
          autoClose={false}
          isMulti
          selectOptions={getWalletOption()}
          onChange={handleWalletMethod}
        />
      </ModalFlexOuterRow>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            type="number"
            name="transactionCost"
            value={task.transactionCost}
            onChange={handleChange}
            fieldTitle="Transaction Cost"
            placeholderText="Enter Transaction Cost"
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            name="contractAddress"
            onChange={handleChange}
            value={task.contractAddress}
            fieldTitle="Contract Address"
            placeholderText="Enter Contract Address"
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            name="functionName"
            value={task.functionName}
            onChange={handleChange}
            fieldTitle="Function Name"
            placeholderText="Enter Function Name"
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            name="functionParam"
            value={task.functionParam}
            onChange={handleChange}
            fieldTitle="Function Parameters"
            placeholderText="Enter Function Parameters"
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            isSelect={true}
            fieldTitle="Gas Price Method"
            placeholderText="Select Gas Price"
            selectOptions={GAS_OPTION}
            onChange={handleGasMethod}
            value={GAS_OPTION.filter(
              (opt) => opt["value"] === task.gasPriceMethod
            )}
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      <AppSpacer spacer={10} />
      {task["gasPriceMethod"] === "manual" && (
        <ModalFlexOuterRow>
          <ModalFlexInnerRow>
            <AppInputField
              name="maxFee"
              type="number"
              value={task?.maxFee}
              onChange={handleChange}
              fieldTitle="Max Fee"
              placeholderText="Enter Max Fee"
            />
          </ModalFlexInnerRow>
          <ModalFlexInnerRow>
            <AppInputField
              name="maxPriorityFee"
              type="number"
              value={task?.maxPriorityFee}
              onChange={handleChange}
              fieldTitle="Max Priority Fee"
              placeholderText="Enter Max Priority Fee"
            />
          </ModalFlexInnerRow>
        </ModalFlexOuterRow>
      )}

      <AppSpacer spacer={25} />
      <div className="modal-control-btns">
        <div
          onClick={handleCloseModal}
          className={
            appTheme
              ? "modal-cancel-btn btn light-mode-modalbtn "
              : "modal-cancel-btn btn"
          }
        >
          <span className={textClass}>Cancel</span>
        </div>
        <div
          onClick={handleSubmit}
          className={
            appTheme
              ? "modal-cancel-btn submit btn btn-shadow "
              : " modal-cancel-btn submit btn"
          }
        >
          <span>{Object.keys(editState).length > 0 ? "Save" : "Create"}</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default NftTask;

const GAS_OPTION = [
  { label: "Rapid Price", value: "rapid" },
  { label: "Manual Price", value: "manual" },
];
