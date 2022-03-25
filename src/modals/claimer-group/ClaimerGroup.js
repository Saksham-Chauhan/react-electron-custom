import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { claimerGroupSchema } from "../../validation";
import {
  fetchEditStorageState,
  fetchSelectedClaimerGroupState,
  setEditStorage,
  setModalState,
  setSelectedClaimerGroup,
} from "../../features/counterSlice";
import { validationChecker } from "../../hooks/validationChecker";
import {
  addGroupInClaimerList,
  editClaimerGroupFromList,
} from "../../features/logic/setting";
import { AppInputField, AppSpacer, ModalWrapper } from "../../component";
import { discordTokenRegExp } from "../../constant/regex";
import { toastWarning } from "../../toaster";

function ClaimerGroup() {
  const dispatch = useDispatch();
  const editState = useSelector(fetchEditStorageState);
  const selectedClaimerGroup = useSelector(fetchSelectedClaimerGroupState);
  const [claimer, setClaimer] = useState({
    id: "",
    name: "",
    claimerList: [],
    claimerToken: "",
    createdAt: new Date().toUTCString(),
  });

  useEffect(() => {
    if (Object.keys(editState).length > 0) {
      setClaimer((pre) => {
        return { ...editState };
      });
    }
    return () => {
      dispatch(setEditStorage({}));
    };
  }, [editState, dispatch]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setClaimer((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleCloseModal = () => {
    dispatch(setModalState("claimerGroup"));
  };

  const handleSubmit = () => {
    let valid = [];
    let obj = { ...claimer };
    const result = validationChecker(claimerGroupSchema, obj);
    obj.claimerToken.split("\n").forEach((t) => {
      if (discordTokenRegExp.test(t)) {
        valid.push(t);
      }
    });
    obj["claimerToken"] = valid.map((v) => v).join("\n");
    if (result) {
      if (valid.length > 0) {
        if (Object.keys(editState).length > 0) {
          dispatch(editClaimerGroupFromList(obj));
          if (obj["id"] === selectedClaimerGroup["id"]) {
            let objClaimer = {};
            objClaimer["label"] = obj["name"];
            objClaimer["id"] = obj["id"];
            objClaimer["value"] = obj["claimerToken"];
            dispatch(setSelectedClaimerGroup(objClaimer));
          }
        } else {
          dispatch(addGroupInClaimerList(obj));
        }
        handleCloseModal();
      } else toastWarning("Enter some valid token");
    }
  };

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>
          {Object.keys(editState).length > 0 ? "Edit" : "Create"} Claimer Group
        </h2>
      </div>
      <AppSpacer spacer={30} />
      <AppInputField
        value={claimer.name}
        onChange={handleChange}
        name="name"
        fieldTitle="Name"
        placeholderText="Enter Name"
      />
      <AppSpacer spacer={10} />
      <AppInputField
        fieldTitle="Tokens"
        name="claimerToken"
        isMulti={true}
        onChange={handleChange}
        value={claimer.claimerToken}
        placeholderText="Separated By Next line"
      />
      <AppSpacer spacer={30} />
      <div className="modal-control-btns">
        <div onClick={handleCloseModal} className="modal-cancel-btn btn">
          <span>Cancel</span>
        </div>
        <div onClick={handleSubmit} className="modal-cancel-btn submit btn">
          <span>{Object.keys(editState).length > 0 ? "Save" : "Create"}</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default ClaimerGroup;
