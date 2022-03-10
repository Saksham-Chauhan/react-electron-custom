import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInputField, AppSpacer, ModalWrapper } from "../../component";
import { discordTokenRegExp } from "../../constant/regex";
import {
  fetchEditStorageState,
  setEditStorage,
  setModalState,
} from "../../features/counterSlice";
import {
  addClaimerAccountInList,
  editClaimerAccountFromList,
} from "../../features/logic/discord-account";
import { addNewIJAccount } from "../../features/logic/invite-joiner";
import { toastWarning } from "../../toaster";

const accountType = [
  { value: "monitor", label: "Monitor" },
  { value: "claimerGroup", label: "Claimer Group" },
];

function InviteJoinerAccount() {
  const dispatch = useDispatch();
  const editState = useSelector(fetchEditStorageState);
  const [account, setAccount] = useState({ accountName: "", accountType: "" });

  useEffect(() => {
    if (Object.keys(editState).length > 3) {
      setAccount((pre) => {
        return { ...editState };
      });
    }
    return () => {
      dispatch(setEditStorage({}));
    };
  }, [editState, dispatch]);

  const handleCloseModal = () => {
    dispatch(setModalState("inviteJoinerAccount"));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAccount((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const checkValidation = () => {
    let valid = false;
    if (account.accountName.length > 0) {
      valid = true;
    } else {
      toastWarning("Enter account name");
      valid = false;
    }
    if (account.accountType.length > 0) {
      valid = true;
    } else {
      toastWarning("Select account type");
      valid = false;
    }
    if (account.accountType === "monitor") {
      if (account?.monitorToken.length > 0) {
        valid = true;
      } else {
        toastWarning("Enter monitor token");
        valid = false;
      }
    } else {
      if (account?.claimerToken?.length > 0) {
        valid = true;
      } else {
        toastWarning("Enter Claimer token");
        valid = false;
      }
    }
    return valid;
  };

  const handleSelectType = ({ value }) => {
    setAccount((pre) => {
      return { ...pre, accountType: value };
    });
  };

  const handleCreateIJaccount = () => {
    if (account.accountType === "monitor") {
      if (discordTokenRegExp.test(account.monitorToken)) {
        console.log("VALID MONITOR TOKEN");
      }
    } else {
      let tokenArr = account?.claimerToken?.split("\n");
      let validToken = [];
      if (tokenArr.length > 0) {
        tokenArr.forEach((token) => {
          if (discordTokenRegExp.test(token)) {
            console.log("Valid Cliame Token", token);
            validToken.push(token);
          }
        });
        console.log(validToken);
      }
    }
  };

  const handleSubmit = () => {
    const result = checkValidation();
    if (result) {
      if (Object.keys(editState).length > 3) {
        // dispatch(editClaimerAccountFromList(account));
      } else {
        handleCreateIJaccount();
        // dispatch(addNewIJAccount(account))
      }
      // handleCloseModal();
    }
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
        onChange={handleChange}
        placeholderText="Enter Name"
        fieldTitle="Name"
        name="accountName"
        value={account.accountName}
      />
      <AppSpacer spacer={10} />
      <AppInputField
        isSelect={true}
        onChange={handleSelectType}
        selectOptions={accountType}
        value={accountType.filter(
          (data) => data["value"] === account.accountType
        )}
        fieldTitle="Type"
        placeholderText="Select Type"
      />
      <AppSpacer spacer={10} />
      {account.accountType === "monitor" ? (
        <AppInputField
          onChange={handleChange}
          placeholderText="Enter Your Monitor Token"
          fieldTitle="Token"
          name="monitorToken"
          value={
            account?.monitorToken !== undefined ? account?.monitorToken : ""
          }
        />
      ) : (
        <AppInputField
          onChange={handleChange}
          placeholderText="Separated By Next line"
          fieldTitle="Tokens"
          isMulti={true}
          name="claimerToken"
          value={account?.claimerToken}
        />
      )}

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

export default InviteJoinerAccount;
