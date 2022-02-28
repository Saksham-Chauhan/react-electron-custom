import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTwitterKeywordInList,
  deleteTwitterDatafromList,
} from "../../../features/logic/twitter";
import { InputFieldWithScrollList } from "../..";

function UserScrollList({ userList }) {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const handleUserChange = (e) => {
    const { value } = e.target;
    setUser(value);
  };

  const handleUserAdd = () => {
    dispatch(addTwitterKeywordInList({ key: "USER", word: user }));
    setUser("");
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
        title="Users"
        placeHolder="Enter Username"
        onDelete={handleDeleteUser}
      />
    </div>
  );
}

export default UserScrollList;
