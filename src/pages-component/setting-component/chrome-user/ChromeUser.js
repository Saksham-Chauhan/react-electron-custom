import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputFieldWithScrollList } from "../../../component";
import { chromeRegExp } from "../../../constant/regex";
import { fetchChromeUserListState } from "../../../features/counterSlice";
import {
  addChromeUserInList,
  removeChromeUserFromList,
} from "../../../features/logic/setting";
import { toastWarning } from "../../../toaster";

function ChromeUser() {
  const dispatch = useDispatch();
  const chromeList = useSelector(fetchChromeUserListState);
  const [chrome, setChrome] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setChrome(value);
  };
  const newList = () => {
    return chromeList.filter((item) => {
      return item.label !== "Default";
    });
  };

  const handleAdd = () => {
    let flag = true;
    if (chromeRegExp.test(chrome)) {
      for (let i = 0; i < chromeList.length; i++) {
        if (chromeList[i].value === chrome) flag = false;
      }
      if (flag) {
        dispatch(addChromeUserInList(chrome));
        setChrome("");
      } else toastWarning("User name already exists");
    } else toastWarning("Enter valid Chrome User");
  };

  const handleDelete = (group) => {
    dispatch(removeChromeUserFromList(group));
  };

  return (
    <div>
      <InputFieldWithScrollList
        btnProps={{ onClick: handleAdd }}
        inputProps={{
          value: chrome,
          onChange: handleChange,
        }}
        onDelete={handleDelete}
        title="Chrome User"
        list={newList()}
        placeHolder="Enter Chrome User (e.g. Guest)"
      />
    </div>
  );
}

export default ChromeUser;
