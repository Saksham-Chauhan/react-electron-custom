import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInputField, AppSpacer, ModalWrapper } from "../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../component/modal-wrapper/Modal";
import {
  fetchNftSettingRPCState,
  fetchThemsState,
  setModalState,
} from "../../features/counterSlice";
import { appendNftWalletInList } from "../../features/logic/nft";
import { handleFetchWallet } from "../../helper/nft-minter";
import { validationChecker } from "../../hooks/validationChecker";
import { nftWalletSchema } from "../../validation";

function NftWallet() {
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  const rpcURL = useSelector(fetchNftSettingRPCState);
  const textClass = appTheme ? "lightMode_color" : "";
  const [wallet, setWallet] = useState({
    walletNickName: "",
    walletPrivateKey: "",
    walletPublicKey: "",
    walletBalance: "0.00",
  });

  const handleCloseModal = () => {
    dispatch(setModalState("nftWalletModal"));
  };

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    setWallet((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleDispatchWallet = (wallet) => {
    dispatch(appendNftWalletInList(wallet));
  };

  const handleSubmit = async () => {
    const validationResult = validationChecker(nftWalletSchema, wallet);
    if (validationResult) {
      const res = await handleFetchWallet(wallet, rpcURL, handleDispatchWallet);
      if (res) handleCloseModal();
    }
  };

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2 className={textClass}>Create Wallet</h2>
      </div>
      <AppSpacer spacer={30} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            name="walletNickName"
            onChange={handleChange}
            fieldTitle="Wallet Nickname"
            placeholderText="Enter Wallet Nickname"
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            name="walletPublicKey"
            onChange={handleChange}
            fieldTitle="Wallet Address"
            placeholderText="Enter Wallet Address"
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="Private Key"
            onChange={handleChange}
            name="walletPrivateKey"
            placeholderText="Enter Private Key"
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      <AppSpacer spacer={25} />
      <div className="modal-control-btns">
        <div
          onClick={handleCloseModal}
          className={
            appTheme
              ? "modal-cancel-btn btn light-mode-modalbtn"
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
          <span>Create</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default NftWallet;
