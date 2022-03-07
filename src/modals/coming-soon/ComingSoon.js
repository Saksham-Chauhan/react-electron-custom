import React from "react";
import {ModalWrapper, AppSpacer } from "../../component";
import UseAnimations from 'react-useanimations';
import lock from 'react-useanimations/lib/lock';

function ComingSoon() {
  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>Coming Soon</h2>
        <UseAnimations animation={lock} strokeColor="#fff" size={25}></UseAnimations>
      </div>
      <AppSpacer spacer={30} />
      <AppSpacer spacer={25} />
      <div className="modal-control-btns">
        <div className="modal-cancel-btn submit btn">
          <span>Unlock</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default ComingSoon;
