import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  fetchSpoofModalState,
  fetchEditProxyModalState,
} from "./features/counterSlice";
import {
  ProxyGroupModal,
  DiscordAccountModal,
  AddGmailModal,
  InviteJoinerAccountModal,
  InviteJoinerSettingModal,
  AddSpoofModal,
  EditProxySingleModal,
} from "./modals";
import {
  ProxyPage,
  LinkOpenerPage,
  OneClickPage,
  InviteJoinerPage,
  TwitterPage,
  SpooferPage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoutePath } from "./constant";
import { Routes, Route } from "react-router-dom";
import {
  spooferToaster,
  errorToaster,
  proxyTestResultListener,
  updateNotAvailable,
} from "./helper/electron-bridge";
import {
  updateSpooferStatus,
  resetSpooferStatus,
} from "./features/logic/spoof";
import { toastInfo, toastWarning } from "./toaster";
import { proxyStatusUpdater } from "./features/logic/proxy";

function App() {
  const dispatch = useDispatch();
  const proxyModalState = useSelector(fetchProxyGroupModalState);
  const discordModalState = useSelector(fetchDiscordModalState);
  const addGmailModalState = useSelector(fetchAddGmailModalState);
  const inviteModalState = useSelector(fetchAddJoinerModalState);
  const spoofModalState = useSelector(fetchSpoofModalState);
  const proxyEditModalState = useSelector(fetchEditProxyModalState);
  const inviteSettigModalState = useSelector(
    fetchInviteJoinerSettingModalState
  );

  useEffect(() => {
    dispatch(resetSpooferStatus());
    spooferToaster((data) => {
      if (Object.keys(data).length > 0) {
        dispatch(updateSpooferStatus(data));
      }
    });
    proxyTestResultListener((res) => {
      dispatch(proxyStatusUpdater(res));
    });
    updateNotAvailable(() => toastInfo("Update not available"));
    errorToaster((err) => toastWarning(err));
  }, [dispatch]);

  return (
    <div className="app">
      {proxyEditModalState && <EditProxySingleModal />}
      {spoofModalState && <AddSpoofModal />}
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
              <Route path={RoutePath.spoofer} element={<SpooferPage />} />
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
