import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputFieldWithScrollList } from "../..";
import {
  addKeywordInList,
  deleteKeywordFromList,
} from "../../../features/logic/discord-account";

function KeywordSection({ keywordList }) {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const handleAddKeyword = () => {
    dispatch(addKeywordInList({ key: "IJ", word: keyword }));
    setKeyword("");
  };

  const handleKeywordChange = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleDeleteKeyword = (word) => {
    dispatch(deleteKeywordFromList({ key: "IJ", word }));
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

export default KeywordSection;
