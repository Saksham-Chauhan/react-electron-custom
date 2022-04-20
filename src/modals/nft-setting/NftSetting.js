import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInputField, AppSpacer, ModalWrapper } from "../../component";
import {
  fetchNftSettingDelaytate,
  fetchNftSettingEhterAPIState,
  fetchNftSettingRPCState,
  fetchNftSettingState,
  fetchThemsState,
  setModalState,
  setNftSetting,
} from "../../features/counterSlice";
import "./styles.css";
function NftSetting() {
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  const textClass = appTheme ? "lightMode_color" : "";
  const etherScanAPI = useSelector(fetchNftSettingEhterAPIState);
  const retryDelay = useSelector(fetchNftSettingDelaytate);
  const rpcURL = useSelector(fetchNftSettingRPCState);
  const [setting, setSetting] = useState({
    rpcURL: "",
    etherScanAPI: "",
    retryDelay: "",
  });

  useEffect(() => {
    setSetting((pre) => {
      return {
        ...pre,
        retryDelay,
        rpcURL,
        etherScanAPI,
      };
    });
  }, [etherScanAPI, retryDelay, rpcURL]);

  const handleCloseModal = () => {
    dispatch(setModalState("nftSettingModal"));
  };

  const handleSave = (key) => {
    if (key === "RPC") {
      dispatch(setNftSetting({ key: "rpcURL", value: setting.rpcURL }));
    } else if (key === "API") {
      dispatch(
        setNftSetting({ key: "etherScanAPI", value: setting.etherScanAPI })
      );
    } else {
      dispatch(setNftSetting({ key: "retryDelay", value: setting.retryDelay }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSetting((pre) => {
      return { ...pre, [name]: value };
    });
  };

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>Settings</h2>
      </div>
      <AppSpacer spacer={30} />
      <div className="nft-setting-flex">
        <div className="nft-setting-input">
          <AppInputField
            name="rpcURL"
            value={setting?.rpcURL}
            onChange={handleChange}
            fieldTitle="RPC URL"
            placeholderText="Enter RPC URL"
          />
        </div>
        <div onClick={() => handleSave("RPC")} className="nft-setting-btn btn">
          <span>Save</span>
        </div>
      </div>
      <AppSpacer spacer={10} />
      <div className="nft-setting-flex">
        <div className="nft-setting-input">
          <AppInputField
            onChange={handleChange}
            name="etherScanAPI"
            value={setting?.etherScanAPI}
            fieldTitle="Etherscan API"
            placeholderText="Enter Etherscan API"
          />
        </div>
        <div onClick={() => handleSave("API")} className="nft-setting-btn btn">
          <span>Save</span>
        </div>
      </div>
      <AppSpacer spacer={10} />
      <div className="nft-setting-flex">
        <div className="nft-setting-input">
          <AppInputField
            name="retryDelay"
            onChange={handleChange}
            value={setting?.retryDelay}
            fieldTitle="Retry Delay"
            placeholderText="Enter Retry Delay"
          />
        </div>
        <div
          onClick={() => handleSave("DELAY")}
          className="nft-setting-btn btn"
        >
          <span>Save</span>
        </div>
      </div>
      <AppSpacer spacer={25} />
      <div className="modal-control-btns">
        <div
          onClick={handleCloseModal}
          className={
            appTheme
              ? "modal-cancel-btn btn lightMode-modalBtn "
              : "modal-cancel-btn btn"
          }
        >
          <span className={textClass}>Cancel</span>
        </div>
        <div></div>
      </div>
    </ModalWrapper>
  );
}

export default NftSetting;
