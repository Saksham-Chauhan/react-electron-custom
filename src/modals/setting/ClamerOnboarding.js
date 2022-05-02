import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalWrapper } from "../../component";
import { fetchThemsState, setModalState } from "../../features/counterSlice";

const ClamerOnboarding = () => {
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  const handleCloseModal = () => {
    dispatch(setModalState("clamerOnboardingScreen"));
  };
  const handleOpenClamerModal = () => {
    dispatch(setModalState("clamerOnboardingScreen"));
    dispatch(setModalState("claimerGroup"));
  };
  const textClass = appTheme ? "lightMode_color" : "clamer-title";
  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2 className={textClass}>Discord Tokens</h2>
      </div>
      <div
        style={{
          color: "var(--primary)",

          overflow: "hidden",
        }}
      >
        <p className={textClass}>
          <br />
          <br />
          Account Format : <br />
          You can enter your account in the following format: <br />
          <br />
          Format 1- email:password:token <br />
          E.g.: harry12@gmail.com:password_7:ODY5AKGBJJ6VDREFGYgjhut667xy_z
          <br />
          jhone@gmail.com:jhonePass*4:ODY5AKGBJJ6VDREFGYgjhut667xyhhx
          <br />
          <br />
          Format 2- token <br /> E.g.: <br />
          ODY4FGHjhfjht567fgtyr76fggy6redf5ur-A7Yz <br />
          OD74FGHjhfjht567fgtyr76fggy6redf5uratzy1_a
          <br />
          <br />
        </p>
      </div>
      <div className="modal-control-btns">
        <div
          className={
            appTheme
              ? "modal-cancel-btn btn light-mode-modalbtn"
              : "modal-cancel-btn btn"
          }
          onClick={handleCloseModal}
        >
          <span className={textClass}>Cancel</span>
        </div>
        <div
          onClick={handleOpenClamerModal}
          className={
            appTheme
              ? "modal-cancel-btn submit btn btn-shadow "
              : " modal-cancel-btn submit btn"
          }
        >
          <span>Got it</span>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ClamerOnboarding;
