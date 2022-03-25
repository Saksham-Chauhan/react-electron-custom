import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputFieldWithScrollList } from "../..";
import { channelRegexExp } from "../../../constant/regex";
import {
  addChannelInList,
  deleteChannelFromList,
} from "../../../features/logic/discord-account";
import { toastWarning } from "../../../toaster";

function ChannelList({ channelList }) {
  const [channel, setChannel] = useState("");
  const dispatch = useDispatch();

  const handleChannelChange = (e) => {
    const { value } = e.target;
    setChannel(value);
  };

  const handleDeleteChannel = (word) => {
    dispatch(deleteChannelFromList({ key: "LO", word }));
  };

  const handleAddChannel = () => {
    if (channelRegexExp.test(channel)) {
      dispatch(addChannelInList({ key: "LO", word: channel }));
      setChannel("");
    } else toastWarning("Enter valid channel");
  };

  return (
    <div>
      <InputFieldWithScrollList
        placeHolder="Enter channel ID"
        inputProps={{
          value: channel,
          onChange: handleChannelChange,
        }}
        onDelete={handleDeleteChannel}
        list={channelList}
        btnProps={{ onClick: handleAddChannel }}
      />
    </div>
  );
}

export default ChannelList;
