import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GroupCard,
  GroupTitle,
  AppSpacer,
  TopWrapper,
  GroupStatusCard,
} from "../../component";
import {
  setModalState,
  setTempStorage,
  fetchProxyGroupList,
  fetchTempStorageState,
} from "../../features/counterSlice";
import { searchingFunction } from "../../hooks/searchFunction";
import {
  ProxyTableContainer,
  ProxyTopBtnsWrapper,
} from "../../pages-component";
import "./styles.css";

function Proxy() {
  const dispatch = useDispatch();
  const [tempList, setTempList] = useState([]);
  const [search, setSearch] = useState("");
  const proxyGroupList = useSelector(fetchProxyGroupList);
  const tempData = useSelector(fetchTempStorageState);

  useEffect(() => {
    if (
      tempData["type"] === "proxy-group" &&
      tempData["proxyList"].length > 0
    ) {
      setTempList([...tempData["proxyList"]]);
    } else setTempList([]);
  }, [tempData]);

  const handleOpenModal = () => {
    dispatch(setModalState("proxyGroup"));
  };

  const handleGroupSelect = (group) => {
    dispatch(setTempStorage({ ...group, type: "proxy-group" }));
  };

  const handleSearching = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length > 0) {
      const result = searchingFunction(value, tempList, "PROXY");
      if (result.length > 0) {
        setTempList([...result]);
      } else setTempList([]);
    } else setTempList([...tempData["proxyList"]]);
  };

  return (
    <div className="page-section">
      <div className="left-container">
        <TopWrapper>
          <GroupTitle onClick={handleOpenModal} />
        </TopWrapper>
        <AppSpacer spacer={20} />
        <div className="group-card-scroll">
          {proxyGroupList.map((group) => (
            <GroupCard
              key={group["id"]}
              cardTitle={group["groupName"]}
              onClick={() => handleGroupSelect(group)}
              cardSubtitle={group["proxyList"].length}
              activeClass={group["id"] === tempData["id"] ? "active-card" : ""}
            />
          ))}
        </div>
      </div>
      <div className="right-container">
        <TopWrapper>
          <GroupStatusCard title={tempData["groupName"]} />
        </TopWrapper>
        <div className="page-padding-section">
          <AppSpacer spacer={20} />
          <ProxyTopBtnsWrapper {...{ search, handleSearching }} />
          <AppSpacer spacer={20} />
          <ProxyTableContainer list={tempList} />
        </div>
      </div>
    </div>
  );
}

export default Proxy;
