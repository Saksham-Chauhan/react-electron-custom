import React from "react";
import { useDispatch } from "react-redux";
import {
  GroupCard,
  GroupTitle,
  AppSpacer,
  GroupStatusCard,
  TopWrapper,
} from "../../component";
import { setModalState } from "../../features/counterSlice";
import {
  ProxyTableContainer,
  ProxyTopBtnsWrapper,
} from "../../pages-component";
import "./styles.css";

function Proxy() {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(setModalState("proxyGroup"));
  };
  return (
    <div className="page-section">
      <div className="left-container">
        <TopWrapper>
          <GroupTitle onClick={handleOpenModal} />
        </TopWrapper>
        <AppSpacer spacer={20} />
        <div className="group-card-scroll">
          <GroupCard activeClass="active-card" />
          <GroupCard />
          <GroupCard />
        </div>
      </div>
      <div className="right-container">
        <TopWrapper>
          <GroupStatusCard />
        </TopWrapper>
        <AppSpacer spacer={20} />
        <ProxyTopBtnsWrapper />
        <AppSpacer spacer={20} />
        <ProxyTableContainer />
      </div>
    </div>
  );
}

export default Proxy;
