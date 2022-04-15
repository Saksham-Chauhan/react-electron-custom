import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEditStorageState,
  fetchIsAddnewProxyModalState,
  openAddNewProxyModal,
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
  addProxyInList,
  editProxyGroup,
} from "../../features/logic/proxy";
import { sendLogs } from "../../helper/electron-bridge";

function ProxyGroup() {
  const dispatch = useDispatch();
  const editState = useSelector(fetchEditStorageState);
  const addProxy = useSelector(fetchIsAddnewProxyModalState);
  const [proxy, setProxy] = useState({
    groupName: "",
    proxies: "",
    createdAt: new Date().toUTCString(),
  });

  useEffect(() => {
    if (Object.keys(editState).length > 0) {
      setProxy((pre) => {
        return { ...editState };
      });
    } else if (Object.keys(addProxy).length > 0) {
      setProxy((pre) => {
        return { ...addProxy, proxies: "" };
      });
    }
    return () => {
      dispatch(setEditStorage({}));
      dispatch(openAddNewProxyModal({}));
    };
  }, [editState, addProxy, dispatch]);

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
      let len = proxyString[i].split(":").length;
      if (ProxyRegExp.test(proxyString[i])) {
        let obj = {};
        obj["id"] = generateId();
        obj["proxy"] = proxyString[i];
        obj["checked"] = false;
        obj["status"] = "N/A";
        valid.push(obj);
      } else if (len === 2) {
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
    const log = `New Proxy group created ${proxyGroup["groupName"]} with ${valid.length} proxies`;
    sendLogs(log);
    dispatch(addProxyGroupInList(proxyGroup));
  };

  const handleEditProxyGroup = () => {
    let valid = [];
    let proxyGroup = { ...proxy };
    const proxyString = proxy.proxies.split("\n");
    for (let i = 0; i < proxyString.length; i++) {
      let len = proxyString[i].split(":").length;
      if (ProxyRegExp.test(proxyString[i])) {
        let obj = {};
        obj["id"] = generateId();
        obj["proxy"] = proxyString[i];
        obj["checked"] = false;
        obj["status"] = "N/A";
        valid.push(obj);
      } else if (len === 2) {
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
      } else if (Object.keys(addProxy).length > 0) {
        handleAddProxyInGroup();
      } else {
        handleCreateProxyGroup();
      }
      handleCloseModal();
    }
  };

  const handleAddProxyInGroup = () => {
    let valid = [];
    let proxyGroup = { ...proxy };
    const proxyString = proxy.proxies.split("\n");
    for (let i = 0; i < proxyString.length; i++) {
      let len = proxyString[i].split(":").length;
      if (ProxyRegExp.test(proxyString[i])) {
        let obj = {};
        obj["id"] = generateId();
        obj["proxy"] = proxyString[i];
        obj["checked"] = false;
        obj["status"] = "N/A";
        valid.push(obj);
      } else if (len === 2) {
        let obj = {};
        obj["id"] = generateId();
        obj["proxy"] = proxyString[i];
        obj["checked"] = false;
        obj["status"] = "N/A";
        valid.push(obj);
      }
    }
    let preProxyList = addProxy["proxyList"];
    let combiner = [...preProxyList, ...valid];
    proxyGroup["proxyList"] = combiner;
    proxyGroup["proxies"] = combiner.map((proxy) => proxy["proxy"]).join("\n");
    dispatch(addProxyInList(proxyGroup));
  };

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2>
          {Object.keys(editState).length > 0 ? "Edit" : "Create"} Proxy Group
        </h2>
      </div>
      <AppSpacer spacer={30} />
      {Object.keys(addProxy).length > 0 ? (
        <AppInputField
          onChange={handleChange}
          value={proxy.groupName}
          placeholderText="Enter Proxy Group Name"
          fieldTitle="Proxy Group Name"
          name="groupName"
          disabled={true}
        />
      ) : (
        <AppInputField
          onChange={handleChange}
          value={proxy.groupName}
          placeholderText="Enter Proxy Group Name"
          fieldTitle="Proxy Group Name"
          name="groupName"
        />
      )}

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
          <span>{Object.keys(editState).length > 0 ? "Save" : "Create"}</span>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default ProxyGroup;
