import React from "react";
import "./styles.css";
import { motion, AnimatePresence } from "framer-motion";
function Modal({ children }) {
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
        <div className="modal-inner">{children}</div>
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
