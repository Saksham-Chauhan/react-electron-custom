import React, { useState } from "react";
import "./styles.css";
import {
  AppSpacer,
  AppToggler,
  ModalWrapper,
  AppInputField,
  LabelWithToolTip,
} from "../../component";
import {
  setModalState,
  fetchProxyGroupList,
  fetchThemsState,
} from "../../features/counterSlice";
import { toastWarning } from "../../toaster";
import { spooferSchema } from "../../validation";
import { useDispatch, useSelector } from "react-redux";
import decrement from "../../assests/images/decrement.svg";
import increment from "../../assests/images/increment.svg";
import { validationChecker } from "../../hooks/validationChecker";
import { addNewSpooferInList } from "../../features/logic/spoof";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../constant";
import prependHttp from "../../helper";

function AddSpoofer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const proxyGroupList = useSelector(fetchProxyGroupList);
  const appTheme = useSelector(fetchThemsState);

  const [spoof, setSpoof] = useState({
    id: "",
    url: "",
    status: "Idle",
    quantity: 1,
    proxyName: "",
    proxyValue: "",
    disableImages: "",
    isDisableImage: false,
    createdAt: new Date().toUTCString(),
  });

  /**
   * handle modal state
   */
  const handleCloseModal = () => {
    dispatch(setModalState("spoofModal"));
  };

  /**
   * handle input change event
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSpoof((pre) => {
      return { ...pre, [name]: type !== "checkbox" ? value : checked };
    });
  };

  /**
   * handle increment counter value
   */
  const incrementEvent = () => {
    setSpoof((pre) => {
      return { ...pre, quantity: pre.quantity + 1 };
    });
  };

  /**
   * handle decrement counter value
   */
  const decrementEvent = () => {
    setSpoof((pre) => {
      return { ...pre, quantity: pre.quantity <= 1 ? 1 : pre.quantity - 1 };
    });
  };

  /**
   * handle proxy select
   */
  const handleProxySelect = ({ value, label }) => {
    setSpoof((pre) => {
      return { ...pre, proxyName: label, proxyValue: value };
    });
  };
  /**
   * function make option for select
   */
  const makeProxyOptions = () => {
    if (proxyGroupList.length > 0) {
      const result = proxyGroupList.map((group) => {
        let obj = {};
        obj["label"] = group["groupName"];
        obj["value"] = group["proxies"];
        return obj;
      });
      return result;
    } else return [];
  };

  /**
   * handler bind to submit btn
   */
  const handleSubmit = () => {
    if (spoof.url) {
      const result = validationChecker(spooferSchema, spoof);
      if (result) {
        for (let i = 0; i < Number(spoof.quantity); i++) {
          dispatch(
            addNewSpooferInList({ ...spoof, url: prependHttp(spoof.url) })
          );
        }
        handleCloseModal();
      }
    } else toastWarning("Enter Valid URL");
  };

  const handleProxyMenuOpen = () => {
    if (proxyGroupList.length === 0) {
      navigate(RoutePath.proxy, { replace: true });
      handleCloseModal();
    }
  };
  const textClass = appTheme ? "lightMode_color" : "";
  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2 className={textClass}>Create Spoof Browser</h2>
      </div>
      <AppSpacer spacer={30} />
      <LabelWithToolTip
        labelText="URL"
        toolTopText="Enter URL you want to open"
      />
      <AppInputField
        name="url"
        placeholderText="Enter URL"
        hideLabel={true}
        value={spoof.url}
        onChange={handleChange}
      />
      <AppSpacer spacer={10} />
      <div className="spoof-modal-middle-section">
        <div>
          <LabelWithToolTip
            labelText="Proxy"
            toolTopText="Select proxy group"
          />
          <AppInputField
            selectOptions={makeProxyOptions()}
            hideLabel={true}
            onChange={handleProxySelect}
            placeholderText={
              proxyGroupList.length > 0
                ? "Select Proxy Group"
                : "Add Proxy Group"
            }
            onMenuOpen={handleProxyMenuOpen}
            isSelect={proxyGroupList.length > 0 ? true : false}
            disabled={proxyGroupList.length > 0 ? false : true}
            navigate={
              proxyGroupList.length > 0 ? () => {} : handleProxyMenuOpen
            }
          />
        </div>
        <div className="spoofer-counter">
          <label className={textClass}>Quantity</label>
          <div className="spoofer-counter-inner">
            <div onClick={decrementEvent}>
              <img src={decrement} alt="" />
            </div>
            <input
              min={1}
              type="number"
              name="quantity"
              value={spoof.quantity}
              onChange={handleChange}
              className={appTheme ? "light-mode-input" : ""}
            />
            <div onClick={incrementEvent}>
              <img src={increment} alt="" />
            </div>
          </div>
        </div>
      </div>
      <AppSpacer spacer={10} />
      <LabelWithToolTip
        labelText="Disable Images"
        toolTopText="Disable all image on loading browser"
      />
      <AppSpacer spacer={5} />
      <div className="joiner-custom-toggle">
        <AppToggler
          id="spoof-modal-disable-image"
          checked={spoof?.isDisableImage}
          onChange={handleChange}
          name="isDisableImage"
        />
        <label className={textClass}>
          Turn {!spoof?.isDisableImage ? "ON" : "OFF"}
        </label>
      </div>
      <AppSpacer spacer={30} />
      <div className="modal-control-btns">
        <div
          onClick={handleCloseModal}
          className={
            appTheme
              ? "modal-cancel-btn btn light-mode-modalbtn"
              : "modal-cancel-btn btn"
          }
        >
          <span className={textClass}>Cancel</span>
        </div>
        <div
          onClick={handleSubmit}
          className="modal-cancel-btn submit btn btn-shadow "
        >
          <span className={textClass}>Create</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default AddSpoofer;
