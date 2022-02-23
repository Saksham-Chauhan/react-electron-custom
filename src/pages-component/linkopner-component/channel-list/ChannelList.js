import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputFieldWithScrollList } from "../..";
import {
  addChannelInList,
  deleteChannelFromList,
} from "../../../features/logic/discord-account";

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
    dispatch(addChannelInList({ key: "LO", word: channel }));
    setChannel("");
  };

  return (
    <div>
      <InputFieldWithScrollList
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
