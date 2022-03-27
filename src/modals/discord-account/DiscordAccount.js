import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discordAccountSchema } from "../../validation";
import {
  fetchEditStorageState,
  setEditStorage,
  setModalState,
} from "../../features/counterSlice";
import { validationChecker } from "../../hooks/validationChecker";
import { AppInputField, AppSpacer, ModalWrapper } from "../../component";
import {
  addDiscordAccountInList,
  editDiscordAccountInList,
} from "../../features/logic/discord-account";
import { discordTokenRegExp } from "../../constant/regex";
import { toastWarning } from "../../toaster";

function DiscordAccount() {
  const dispatch = useDispatch();
  const editState = useSelector(fetchEditStorageState);
  const [account, setAccount] = useState({
    accountName: "",
    discordToken: "",
    createdAt: new Date().toUTCString(),
  });

  useEffect(() => {
    if (Object.keys(editState).length > 3) {
      console.log(editState);
      setAccount((pre) => {
        return { ...editState };
      });
    }
    return () => {
      dispatch(setEditStorage({}));
    };
  }, [editState, dispatch]);

  const handleCloseModal = () => {
    dispatch(setModalState("discordAccount"));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAccount((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = () => {
    if (discordTokenRegExp.test(account.discordToken)) {
      const result = validationChecker(discordAccountSchema, account);
      if (result) {
        if (Object.keys(editState).length === 0) {
          dispatch(addDiscordAccountInList(account));
        } else {
          dispatch(editDiscordAccountInList(account));
        }
        handleCloseModal();
      }
    } else toastWarning("Invalid token");
  };

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>
          {Object.keys(editState).length > 3 ? "Edit" : "Create"}
          {"\t"}Account
        </h2>
      </div>
      <AppSpacer spacer={30} />
      <AppInputField
        name="accountName"
        onChange={handleChange}
        placeholderText="Enter Account Name"
        value={account.accountName}
        fieldTitle="Account Name"
      />
      <AppSpacer spacer={10} />
      <AppInputField
        onChange={handleChange}
        name="discordToken"
        value={account.discordToken}
        placeholderText="Enter Discord Token"
        fieldTitle="Discord Token"
      />
      <AppSpacer spacer={25} />
      <div className="modal-control-btns">
        <div onClick={handleCloseModal} className="modal-cancel-btn btn">
          <span>Cancel</span>
        </div>
        <div onClick={handleSubmit} className="modal-cancel-btn submit btn">
          <span>{Object.keys(editState).length > 3 ? "Save" : "Create"}</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default DiscordAccount;
