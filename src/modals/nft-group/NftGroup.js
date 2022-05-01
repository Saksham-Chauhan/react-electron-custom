import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInputField, AppSpacer, ModalWrapper } from "../../component";
import { nftOptionsList } from "../../constant";
import { fetchThemsState, setModalState } from "../../features/counterSlice";
import { appendGroupInNftGroupList } from "../../features/logic/nft";
import { sendLogs } from "../../helper/electron-bridge";
import { validationChecker } from "../../hooks/validationChecker";
import { nftGroupSchema } from "../../validation";

function NftGroup() {
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  const textClass = appTheme ? "lightMode_color" : "";
  const [group, setGroup] = useState({
    minterTitle: "",
    minterType: "ETH",
    minterList: [],
  });

  const handleCloseModal = () => {
    dispatch(setModalState("nftGroupModal"));
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setGroup((pre) => {
      return { ...pre, minterTitle: value };
    });
  };

  const handleSelect = ({ value }) => {
    setGroup((pre) => {
      return { ...pre, minterType: value };
    });
  };

  const handleSubmit = () => {
    const validationResult = validationChecker(nftGroupSchema, group);
    if (validationResult) {
      const log = `New ETH minter group is created ${group.minterTitle}`;
      sendLogs(log);
      dispatch(appendGroupInNftGroupList(group));
      handleCloseModal();
    }
  };

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>Create Group</h2>
      </div>
      <AppSpacer spacer={30} />
      <AppInputField
        onChange={handleChange}
        fieldTitle="Group Name"
        placeholderText="Enter Group Name"
      />
      <AppSpacer spacer={10} />
      <AppInputField
        fieldTitle="Type"
        isSelect={true}
        onChange={handleSelect}
        // placeholderText="Select Type"
        defaultValue={{ label: "ETH", value: "eth" }}
        selectOptions={nftOptionsList}
      />
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

export default NftGroup;
