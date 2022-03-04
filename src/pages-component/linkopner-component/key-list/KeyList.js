import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputFieldWithScrollList } from "../..";
import {
  addKeywordInList,
  deleteKeywordFromList,
} from "../../../features/logic/discord-account";
import { toastWarning } from "../../../toaster";

function KeyList({ keywordList }) {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const handleAddKeyword = () => {
    if (keyword.length > 0 && keyword !== "") {
      dispatch(addKeywordInList({ key: "LO", word: keyword }));
      setKeyword("");
    } else toastWarning("Enter valid keyword");
  };

  const handleKeywordChange = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleDeleteKeyword = (word) => {
    dispatch(deleteKeywordFromList({ key: "LO", word }));
  };

  return (
    <div>
      <InputFieldWithScrollList
        placeHolder="Enter Keywords"
        title="Keywords"
        list={keywordList}
        btnProps={{ onClick: handleAddKeyword }}
        inputProps={{
          value: keyword,
          onChange: handleKeywordChange,
        }}
        onDelete={handleDeleteKeyword}
      />
    </div>
  );
}

export default KeyList;
