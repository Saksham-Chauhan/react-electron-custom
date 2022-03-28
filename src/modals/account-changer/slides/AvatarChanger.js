import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppInputField, AppSpacer } from "../../../component";
import { RoutePath } from "../../../constant";
import { setModalState } from "../../../features/counterSlice";
import { makeProxyOptions } from "../../../helper";

const api = [];
function AvatarChanger() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleApiMenuOpen = () => {
    if (api.length === 0) {
      navigate(RoutePath.accountChanger, { replace: true });
      handleCloseModal();
    }
  };
  const handleCloseModal = () => {
    dispatch(setModalState("accountChangerModal"));
  };
  const handleSelectProxyGroup = (group) => {
    if (Object.keys(group).length > 0) {
    }
  };
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <div className="modal-flex-field-wrapper">
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
          />
        </div>
        <div className="half-flex-field">
          <AppInputField
            fieldTitle="API"
            placeholderText="Select API"
            onMenuOpen={handleApiMenuOpen}
            value={api}
            selectOptions={makeProxyOptions(api)}
            onChange={handleSelectProxyGroup}
            isSelect={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AvatarChanger;
