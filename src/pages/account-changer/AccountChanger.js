import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppSpacer } from "../../component";
import { fetchSelectedAccChangerCard } from "../../features/counterSlice";
import {
  AccountChangeLeftSection,
  AccountChangerTableSection,
  AccountChangerTopBtnsWrapper,
  AccountChangerTopSection,
} from "../../pages-component";
import "./style.css";

const AccountChanger = () => {
  const selectedCard = useSelector(fetchSelectedAccChangerCard);
  const [image, setImage] = useState("");
  useEffect(() => {
    (async () => {
      const re = await fetch("https://picsum.photos/200/300").then(function (
        response
      ) {
        return response.arrayBuffer();
      });

      const str = ArrayBufferToString(re, "base64");
      setImage("data:image/jpeg;base64," + str);
      // console.log(re.toString("base64"));
    })();

    function ArrayBufferToString(buffer, encoding) {
      if (encoding == null) encoding = "utf8";

      var uint8 = new Uint8Array(buffer);

      if (encoding === "base64") {
        str = String.fromCharCode.apply(null, uint8);
        return btoa(str);
      }

      var decoder = new TextDecoder(encoding);
      var str = decoder.decode(uint8);

      return str;
    }
  }, []);
  return (
    <div className="page-section">
      <div className="left-container">
        <AccountChangeLeftSection {...{ selectedCard }} />
      </div>
      <div className="right-container">
        <AccountChangerTopSection {...{ selectedCard }} />
        <AppSpacer spacer={20} />
        <div className="acc-changer-padding">
          <AccountChangerTopBtnsWrapper />
          <AppSpacer spacer={20} />
          <AccountChangerTableSection {...{ selectedCard }} />
        </div>
      </div>
    </div>
  );
};
export default AccountChanger;
