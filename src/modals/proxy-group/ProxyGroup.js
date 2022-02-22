import React from "react";
import { useDispatch } from "react-redux";
import { setModalState } from "../../features/counterSlice";
import { AppInputField, ModalWrapper, AppSpacer } from "../../component";

function ProxyGroup() {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setModalState("proxyGroup"));
  };

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>Create Proxy Group</h2>
      </div>
      <AppSpacer spacer={30} />
      <AppInputField
        placeholderText="Enter Proxy Group Name"
        fieldTitle="Proxy Group Name"
      />
      <AppSpacer spacer={10} />
      <AppInputField
        fieldTitle="List Of Proxies"
        placeholderText="IP:Port:User:Pass"
        isMulti={true}
      />
      <AppSpacer spacer={25} />
      <div className="modal-control-btns">
        <div onClick={handleCloseModal} className="modal-cancel-btn btn">
          <span>Cancel</span>
        </div>
        <div className="modal-cancel-btn submit btn">
          <span>Create</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default ProxyGroup;
