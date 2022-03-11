import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputFieldWithScrollList } from "../..";
import { channelRegexExp } from "../../../constant/regex";
import {
  addChannelInList,
  deleteChannelFromList,
} from "../../../features/logic/discord-account";
import { toastWarning } from "../../../toaster";

function KeywordSection({ keywordList }) {
  const [channel, setChannel] = useState("");
  const dispatch = useDispatch();

  const handleAddChannel = () => {
    if (channelRegexExp.test(channel)) {
      dispatch(addChannelInList({ key: "IJ", word: channel }));
      setChannel("");
    } else toastWarning("Enter valid channel");
  };

  const handleChannelChange = (e) => {
    const { value } = e.target;
    setChannel(value);
  };

  const handleChannelDelete = (word) => {
    dispatch(deleteChannelFromList({ key: "IJ", word }));
  };

  return (
    <div>
      <InputFieldWithScrollList
        placeHolder="Enter channel ID"
        list={keywordList}
        btnProps={{ onClick: handleAddChannel }}
        inputProps={{
          value: channel,
          onChange: handleChannelChange,
        }}
        onDelete={handleChannelDelete}
      />
    </div>
  );
}

export default KeywordSection;
