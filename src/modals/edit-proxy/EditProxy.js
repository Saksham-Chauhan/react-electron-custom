import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInputField, AppSpacer, ModalWrapper } from "../../component";
import { ProxyRegExp } from "../../constant/regex";
import {
  fetchEditStorageState,
  setEditStorage,
  setModalState,
} from "../../features/counterSlice";
import { editSingleProxy } from "../../features/logic/proxy";

function EditProxy() {
  const dispatch = useDispatch();
  const [proxy, setProxy] = useState({});
  const editState = useSelector(fetchEditStorageState);

  useEffect(() => {
    if (Object.keys(editState).length > 0) {
      setProxy((pre) => {
        return { ...editState };
      });
    }
    return () => {
      dispatch(setEditStorage({}));
    };
  }, [editState, dispatch]);

  const handleCloseModal = () => {
    dispatch(setModalState("editProxy"));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProxy((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = () => {
    if (ProxyRegExp.test(proxy?.proxy)) {
      dispatch(editSingleProxy(proxy));
      handleCloseModal();
    }
  };

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>Edit Proxy</h2>
      </div>
      <AppSpacer spacer={30} />
      <AppInputField
        name="proxy"
        onChange={handleChange}
        placeholderText="Enter proxy"
        value={proxy.proxy}
        fieldTitle="Proxy"
      />
      <AppSpacer spacer={25} />
      <div className="modal-control-btns">
        <div onClick={handleCloseModal} className="modal-cancel-btn btn">
          <span>Cancel</span>
        </div>
        <div onClick={handleSubmit} className="modal-cancel-btn submit btn">
          <span>Save</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default EditProxy;
