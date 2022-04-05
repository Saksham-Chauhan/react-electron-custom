import React from "react";
import "./styles.css";

function Modal({ children, ...props }) {
  return (
    <div className="modal-wrapper">
      <div {...props} className="modal-inner">
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
