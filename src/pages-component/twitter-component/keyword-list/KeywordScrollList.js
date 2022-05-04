import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputFieldWithScrollList, LabelWithToolTip } from "../../../component";
import {
  addTwitterKeywordInList,
  deleteTwitterDatafromList,
} from "../../../features/logic/twitter";
import { toastWarning } from "../../../toaster";

function KeywordScrollList({ keyWordList, appTheme }) {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const handleKeywordChange = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleAddKeyword = () => {
    if (keyword) {
      dispatch(addTwitterKeywordInList({ key: "KEYWORD", word: keyword }));
      setKeyword("");
    } else {
      toastWarning("Can't leave blank, enter a keyword.");
    }
  };

  const handleDeleteKeyword = (word) => {
    dispatch(deleteTwitterDatafromList({ key: "KEYWORD", word }));
  };

  return (
    <div>
      <InputFieldWithScrollList
        btnProps={{ onClick: handleAddKeyword }}
        inputProps={{
          value: keyword,
          onChange: handleKeywordChange,
        }}
        list={keyWordList}
        title="Keywords"
        placeHolder="Enter Keywords"
        onDelete={handleDeleteKeyword}
        appTheme={appTheme}
      >
        <LabelWithToolTip delayHide={500} isCustomToolTip={true}>
          <p className="custom-tooltip-text">Leave blank for all keywords</p>
        </LabelWithToolTip>
      </InputFieldWithScrollList>
    </div>
  );
}

export default KeywordScrollList;
