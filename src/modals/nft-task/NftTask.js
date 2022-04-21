import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInputField, AppSpacer, ModalWrapper } from "../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../component/modal-wrapper/Modal";
import {
  fetchNftWalletListState,
  fetchThemsState,
  setModalState,
} from "../../features/counterSlice";
import { validationChecker } from "../../hooks/validationChecker";
import { nftTaskSchema } from "../../validation";

function NftTask() {
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  const walletList = useSelector(fetchNftWalletListState);
  const textClass = appTheme ? "lightMode_color" : "";
  const [task, setTask] = useState({
    wallet: "",
    transactionCost: "",
    contractAddress: "",
    functionName: "",
    functionParam: "",
    gasPriceMethod: "",
  });

  const handleCloseModal = () => {
    dispatch(setModalState("nftTaskModal"));
  };

  const handleGasMethod = ({ value }) => {
    setTask((pre) => {
      return { ...pre, gasPriceMethod: value };
    });
  };

  const handleWalletMethod = ({ value }) => {
    setTask((pre) => {
      return { ...pre, wallet: value };
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
      return { label: wallet.walletNickName, value: wallet?.id };
    });
  };

  const handleSubmit = () => {
    const validationresult = validationChecker(nftTaskSchema, task);
  };
  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>Create Task</h2>
      </div>
      <AppSpacer spacer={30} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
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
            onChange={handleChange}
            fieldTitle="Transaction Cost"
            placeholderText="Enter Transaction Cost"
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            name="contractAddress"
            onChange={handleChange}
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
            onChange={handleChange}
            fieldTitle="Function Name"
            placeholderText="Enter Function Name"
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            name="functionParam"
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
              onChange={handleChange}
              fieldTitle="Max Fee"
              placeholderText="Enter Max Fee"
            />
          </ModalFlexInnerRow>
          <ModalFlexInnerRow>
            <AppInputField
              name="maxPriorityFee"
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
          <span>Create</span>
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
