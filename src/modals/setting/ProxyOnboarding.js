import React from "react";
import { useDispatch } from "react-redux";
import { ModalWrapper } from "../../component";
import { setModalState } from "../../features/counterSlice";

const ProxyOnboarding = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(setModalState("proxyOnboardingScreen"));
  };
  const handleOpenClamerModal = () => {
    dispatch(setModalState("proxyOnboardingScreen"));
    dispatch(setModalState("proxyGroup"));
  };
  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>Discord Tokens</h2>
      </div>
      <div
        style={{
          color: "var(--primary)",

          overflow: "hidden",
        }}
      >
        <br /> <br /> <br />
        We can enter tokens in this format like:- email:password:token <br />
        All requirments are not required. <br /> We can enter token group like:-
        <br /> 1. example@gmail.com:mypasswoRd_0:OD5HJGFYTUR6_JKHGJKH
        VBHUGKJUHJy_2 <br /> 2. :mypasswoRd_0: <br /> 3. example@gmail.com::
        <br /> 4. example@gmail.com:mypasswoRd_0:
        <br /> 5. :mypasswoRd_0:OD5HJGFYTUR6_JKHGJKH VBHUGKJUHJy_2 etc.
        <br /> <br /> <br />
        {/* <video
          style={{
            width: "100%",
            height: "350px",
          }}
          // src={video}
          autoPlay={true}
          // controls={false}
        >
          <source
            src={require("../../assests/video/onBoardinScreen.mp4")}
            type="video/mp4"
          />
        </video> */}
      </div>
      <div className="modal-control-btns">
        <div className="modal-cancel-btn btn" onClick={handleCloseModal}>
          <span>Cancel</span>
        </div>
        <div
          className="modal-cancel-btn submit btn"
          onClick={handleOpenClamerModal}
        >
          <span>Got it</span>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ProxyOnboarding;
