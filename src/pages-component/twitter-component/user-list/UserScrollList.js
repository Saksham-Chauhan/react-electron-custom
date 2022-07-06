import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTwitterKeywordInList,
  deleteTwitterDatafromList,
} from "../../../features/logic/twitter";
import { InputFieldWithScrollList } from "../../../component";
import { TweetHandlerRegExp } from "../../../constant/regex";
import { toastWarning } from "../../../toaster";

function UserScrollList({ userList }) {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const handleUserChange = (e) => {
    const { value } = e.target;
    setUser(value);
  };

  const handleUserAdd = () => {
    if (user.includes("@")) {
      if (TweetHandlerRegExp.test(user) && user.length > 0) {
        dispatch(
          addTwitterKeywordInList({
            key: "USER",
            word: user.slice(1, user.length),
          })
        );
        setUser("");
      } else toastWarning("Enter valid twitter handler");
    } else if (TweetHandlerRegExp.test(user) && user.length > 0) {
      dispatch(
        addTwitterKeywordInList({
          key: "USER",
          word: user,
        })
      );
      setUser("");
    } else toastWarning("Enter valid twitter handler");
  };

  const handleDeleteUser = (word) => {
    dispatch(deleteTwitterDatafromList({ key: "USER", word }));
  };
  return (
    <div>
      <InputFieldWithScrollList
        list={userList}
        btnProps={{ onClick: handleUserAdd }}
        inputProps={{
          value: user,
          onChange: handleUserChange,
        }}
        title="Twitter Username"
        placeHolder="Enter Twitter Username"
        onDelete={handleDeleteUser}
      />
    </div>
  );
}

export default UserScrollList;
