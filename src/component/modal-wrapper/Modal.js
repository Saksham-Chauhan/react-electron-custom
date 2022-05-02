import React from "react";
import { useSelector } from "react-redux";
import small_bot from "../../assests/images/small-bot.svg";
import { fetchThemsState } from "../../features/counterSlice";
import "./styles.css";

function Modal({ children, bgImageURL, flag, handleIsEmoji, ...props }) {
  const appTheme = useSelector(fetchThemsState);

  return (
    <div
      className="modal-wrapper"
      onClick={() => {
        if (flag) handleIsEmoji(false);
      }}
    >
      <div
        {...props}
        className={appTheme ? "modal-inner light-bg-modal  " : "modal-inner"}
      >
        <div className="server-img">
          <img src={bgImageURL ? bgImageURL : small_bot} alt="Server Logo" />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;

export const ModalFlexOuterRow = ({ children }) => (
  <div className="modal-flex">{children}</div>
);

export const ModalFlexInnerRow = ({ children }) => (
  <div className="modal-flex-half">{children}</div>
);
