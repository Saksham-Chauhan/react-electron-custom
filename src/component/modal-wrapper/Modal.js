import React from "react";
import "./styles.css";
import small_bot from "../../assests/images/small-bot.svg";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ children, bgImageURL, ...props }) {
  const modalVariants = {
    initial: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  };

  return (
    <AnimatePresence exitBeforeEnter={true}>
      <motion.div
        initial={modalVariants.initial}
        animate={modalVariants.initial}
        exit={modalVariants.exit}
        transition={{ ease: "easeOut", duration: 50 }}
        className="modal-wrapper"
      >
        <div {...props} className="modal-inner">
          <div className="server-img">
            <img src={bgImageURL ? bgImageURL : small_bot} alt="" />
          </div>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Modal;

export const ModalFlexOuterRow = ({ children }) => (
  <div className="modal-flex">{children}</div>
);

export const ModalFlexInnerRow = ({ children }) => (
  <div className="modal-flex-half">{children}</div>
);
