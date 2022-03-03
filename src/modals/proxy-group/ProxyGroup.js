import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEditStorageState,
  setEditStorage,
  setModalState,
} from "../../features/counterSlice";
import { AppInputField, ModalWrapper, AppSpacer } from "../../component";
import { validationChecker } from "../../hooks/validationChecker";
import { addProxyGroupSchema } from "../../validation";
import { ProxyRegExp } from "../../constant/regex";
import { generateId } from "../../helper";
import {
  addProxyGroupInList,
  editProxyGroup,
} from "../../features/logic/proxy";

function ProxyGroup() {
  const dispatch = useDispatch();
  const editState = useSelector(fetchEditStorageState);
  const [proxy, setProxy] = useState({ groupName: "", proxies: "" });

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
    dispatch(setModalState("proxyGroup"));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProxy((pre) => {
      return { ...pre, [name]: value };
    });
  };
  const handleCreateProxyGroup = () => {
    let valid = [];
    const proxyString = proxy.proxies.split("\n");
    for (let i = 0; i < proxyString.length; i++) {
      if (ProxyRegExp.test(proxyString[i])) {
        let obj = {};
        obj["id"] = generateId();
        obj["proxy"] = proxyString[i];
        obj["checked"] = false;
        obj["status"] = "N/A";
        valid.push(obj);
      }
    }
    let proxyGroup = { ...proxy };
    proxyGroup["id"] = generateId();
    proxyGroup["proxyList"] = valid;
    proxyGroup["proxies"] = valid.map((proxy) => proxy["proxy"]).join("\n");
    dispatch(addProxyGroupInList(proxyGroup));
  };
  const handleEditProxyGroup = () => {
    let valid = [];
    let proxyGroup = { ...proxy };
    const proxyString = proxy.proxies.split("\n");
    for (let i = 0; i < proxyString.length; i++) {
      if (ProxyRegExp.test(proxyString[i])) {
        let obj = {};
        obj["id"] = generateId();
        obj["proxy"] = proxyString[i];
        obj["checked"] = false;
        obj["status"] = "N/A";
        valid.push(obj);
      }
      proxyGroup["proxyList"] = valid;
      proxyGroup["proxies"] = valid.map((proxy) => proxy["proxy"]).join("\n");
    }
    dispatch(editProxyGroup(proxyGroup));
  };

  const handleSubmit = () => {
    const validationResult = validationChecker(addProxyGroupSchema, proxy);
    if (validationResult) {
      if (Object.keys(editState).length > 0) {
        handleEditProxyGroup();
      } else {
        handleCreateProxyGroup();
      }
      handleCloseModal();
    }
  };

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>Create Proxy Group</h2>
      </div>
      <AppSpacer spacer={30} />
      <AppInputField
        onChange={handleChange}
        value={proxy.groupName}
        placeholderText="Enter Proxy Group Name"
        fieldTitle="Proxy Group Name"
        name="groupName"
      />
      <AppSpacer spacer={10} />
      <AppInputField
        onChange={handleChange}
        fieldTitle="List Of Proxies"
        value={proxy.proxies}
        placeholderText="IP:Port:User:Pass"
        isMulti={true}
        name="proxies"
      />
      <AppSpacer spacer={25} />
      <div className="modal-control-btns">
        <div onClick={handleCloseModal} className="modal-cancel-btn btn">
          <span>Cancel</span>
        </div>
        <div onClick={handleSubmit} className="modal-cancel-btn submit btn">
          <span>Create</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default ProxyGroup;
