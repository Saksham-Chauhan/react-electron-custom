import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalWrapper } from "../../component";
import { fetchThemsState, setModalState } from "../../features/counterSlice";

const ProxyOnboarding = () => {
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);
  const handleCloseModal = () => {
    dispatch(setModalState("proxyOnboardingScreen"));
  };
  const handleOpenClamerModal = () => {
    dispatch(setModalState("proxyOnboardingScreen"));
    dispatch(setModalState("proxyGroup"));
  };

  const textClass = appTheme ? "lightMode_color" : "clamer-title";
  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2 className={textClass}>Discord Tokens</h2>
      </div>
      <div
        style={{
          overflow: "hidden",
          color: appTheme ? "var(--app-bg)" : "var( --scrollbar-bg)",
        }}
      >
        <p className={textClass}>
          <br />
          <br />
          Proxy Format : <br />
          You can enter your proxies in the following two format: <br />
          <br />
          Format 1:- ip:port:username:password <br />
          E.g.: <br /> 1.1.1.1:9090:username:password <br />
          121.122.11.213:1300:username:password
          <br />
          <br />
          Format 2:- ip:port <br />
          E.g.: <br /> 1.1.1.1:9090 <br />
          121.122.11.213:1300
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

export default ProxyOnboarding;
