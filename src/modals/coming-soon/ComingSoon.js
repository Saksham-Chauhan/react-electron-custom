import React from "react";
import { AppSpacer } from "../../component";
import UseAnimations from "react-useanimations";
import lock from "react-useanimations/lib/lock";
import "./styles.css";

function ComingSoon() {
  return (
    <div className="coming-soon-modal-wrapper">
      <div className="coming-soon-modal-inner">
        <div className="coming-soon-modal-title">
          <h2>Coming Soon</h2>
        </div>
        <AppSpacer spacer={30} />
        <div className="coming-soon-modal-lock">
          <UseAnimations
            animation={lock}
            strokeColor="var(--primary)"
            size={50}
          ></UseAnimations>
        </div>
        <AppSpacer spacer={30} />
        <div className=" coming-soon-modal-lock modal-control-btns">
          <div className="modal-cancel-btn submit btn">
            <span>Unlock</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
