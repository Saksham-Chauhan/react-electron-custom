import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setModalState } from "../../features/counterSlice";
import { AppInputField, ModalWrapper, AppSpacer } from "../../component";
import { validationChecker } from "../../hooks/validationChecker";
import { addProxyGroupSchema } from "../../validation";
import { ProxyRegExp } from "../../constant/regex";
import { generateId } from "../../helper";
import { addProxyGroupInList } from "../../features/logic/proxy";

function ProxyGroup() {
  const dispatch = useDispatch();
  const [proxy, setProxy] = useState({ groupName: "", proxies: "" });

  const handleCloseModal = () => {
    dispatch(setModalState("proxyGroup"));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProxy((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = () => {
    let valid = [];
    const validationResult = validationChecker(addProxyGroupSchema, proxy);
    if (validationResult) {
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
