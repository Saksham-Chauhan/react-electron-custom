import React from "react";
import small_bot from "../../assests/images/small-bot.svg";
import "./styles.css";

function Modal({ children, bgImageURL, handleIsEmoji, ...props }) {
  return (
    <div className="modal-wrapper" onClick={() => handleIsEmoji(false)}>
      <div {...props} className="modal-inner">
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
