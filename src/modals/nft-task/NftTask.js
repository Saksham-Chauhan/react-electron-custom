import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInputField, AppSpacer, ModalWrapper } from "../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../component/modal-wrapper/Modal";
import {
  fetchEditStorageState,
  fetchNftWalletListState,
  fetchThemsState,
  setEditStorage,
  setModalState,
} from "../../features/counterSlice";
import { addTaskInGroup, editTaskInGroup } from "../../features/logic/nft";
import { sendLogs } from "../../helper/electron-bridge";
import { validationChecker } from "../../hooks/validationChecker";
import { nftTaskSchema } from "../../validation";

function NftTask() {
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  const editState = useSelector(fetchEditStorageState);
  const walletList = useSelector(fetchNftWalletListState);
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

  useEffect(() => {
    if (Object.keys(editState).length > 0) {
      setTask((pre) => {
        return { ...editState };
      });
    }
    return () => {
      dispatch(setEditStorage({}));
    };
  }, [editState, dispatch]);

  const handleCloseModal = () => {
    dispatch(setModalState("nftTaskModal"));
  };

  const handleGasMethod = ({ value }) => {
    setTask((pre) => {
      return { ...pre, gasPriceMethod: value };
    });
  };

  const handleWalletMethod = ({ value, label }) => {
    setTask((pre) => {
      return { ...pre, walletID: value, walletName: label };
    });
  };

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    setTask((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const makeWalletOption = () => {
    return walletList.map((wallet) => {
      return { label: wallet.walletNickName, value: wallet.id };
    });
  };

  const getWalletOption = () => {
    if (walletList.length > 0) {
      for (let i = 0; i < walletList.length; i++) {
        const wallet = walletList[i];
        if (wallet?.id === task.walletID) {
          return [{ label: task.walletName, value: task.walletID }];
        }
      }
    } else return [];
  };

  const handleSubmit = () => {
    const validationresult = validationChecker(
      nftTaskSchema(task.gasPriceMethod === "manualPrice"),
      task
    );
    if (validationresult) {
      if (Object.keys(editState).length === 0) {
        const log = `new Minter task is created with contract address ${task.contractAddress}`;
        sendLogs(log);
        dispatch(addTaskInGroup(task));
      } else {
        dispatch(editTaskInGroup(task));
      }
      handleCloseModal();
    }
  };
  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>{Object.keys(editState).length > 0 ? "Edit" : "Create"} Task</h2>
      </div>
      <AppSpacer spacer={30} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            value={getWalletOption()}
            onChange={handleWalletMethod}
            fieldTitle="Wallet"
            isSelect={true}
            placeholderText="Select Wallet"
            selectOptions={makeWalletOption()}
          />
        </ModalFlexInnerRow>
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
      {task["gasPriceMethod"] === "manualPrice" && (
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
              ? "modal-cancel-btn btn lightMode-modalBtn "
              : "modal-cancel-btn btn"
          }
        >
          <span className={textClass}>Cancel</span>
        </div>
        <div
          onClick={handleSubmit}
          className={
            appTheme
              ? "modal-cancel-btn submit btn btn_shadow "
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
  { label: "Rapid Price", value: "rapidPrice" },
  { label: "Manual Price", value: "manualPrice" },
];
