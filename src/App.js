import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import bot from "./assests/images/bot.svg";
import chip from "./assests/images/chip.svg";
import { AppController, DragBar, AppFooter, AppSidebar } from "./component";
import {
  fetchAddGmailModalState,
  fetchDiscordModalState,
  fetchProxyGroupModalState,
  fetchAddJoinerModalState,
  fetchInviteJoinerSettingModalState,
} from "./features/counterSlice";
import {
  ProxyGroupModal,
  DiscordAccountModal,
  AddGmailModal,
  InviteJoinerAccountModal,
  InviteJoinerSettingModal,
} from "./modals";
import {
  ProxyPage,
  LinkOpenerPage,
  OneClickPage,
  InviteJoinerPage,
  TwitterPage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoutePath } from "./constant";
import { Routes, Route } from "react-router-dom";

function App() {
  const proxyModalState = useSelector(fetchProxyGroupModalState);
  const discordModalState = useSelector(fetchDiscordModalState);
  const addGmailModalState = useSelector(fetchAddGmailModalState);
  const inviteModalState = useSelector(fetchAddJoinerModalState);
  const inviteSettigModalState = useSelector(
    fetchInviteJoinerSettingModalState
  );

  return (
    <div className="app">
      {proxyModalState && <ProxyGroupModal />}
      {addGmailModalState && <AddGmailModal />}
      {discordModalState && <DiscordAccountModal />}
      {inviteModalState && <InviteJoinerAccountModal />}
      {inviteSettigModalState && <InviteJoinerSettingModal />}
      <div className="app sidebar">
        <AppSidebar />
      </div>
      <div className="app page-section">
        <div className="app overlay-wrapper">
          <img id="kyro-chip" src={chip} alt="bot-animatable-icon" />
          <img id="kyro-bot" src={bot} alt="bot-animatable-icon" />
          <div className="page-section-overlay">
            <DragBar />
            <AppController />
            <Routes>
            <Route path={RoutePath.twitter} element={<TwitterPage />} />
              <Route
                path={RoutePath.inviteJoiner}
                element={<InviteJoinerPage />}
              />
              <Route path={RoutePath.linkOpener} element={<LinkOpenerPage />} />
              <Route path={RoutePath.proxy} element={<ProxyPage />} />
              <Route path={RoutePath.oneclick} element={<OneClickPage />} />
            </Routes>
            <AppFooter />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
