import React from "react";
import { useSelector } from "react-redux";
import { AppSpacer } from "../../../component";
import { fetchThemsState } from "../../../features/counterSlice";

function DiscordSpooferSlide() {
  const appTheme = useSelector(fetchThemsState);
  const textClass = appTheme ? "lightMode_color" : "";
  const handleCloseModal = () => {};
  const handleSubmit = () => {};
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <AppSpacer spacer={30} />
      <div className="modal-control-btns">
        <div
          onClick={handleCloseModal}
          className={
            appTheme
              ? "modal-cancel-btn btn light-mode-modalbtn"
              : "modal-cancel-btn btn"
          }
        >
          <span className={textClass}>Cancel</span>
        </div>
        <div
          onClick={handleSubmit}
          className="modal-cancel-btn submit btn btn-shadow "
        >
          <span className={textClass}>Create</span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DiscordSpooferSlide;
