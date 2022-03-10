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
  fetchClaimerGroupModalState,
  fetchWebhookSettingState,
} from "./features/counterSlice";
import {
  ProxyGroupModal,
  DiscordAccountModal,
  AddGmailModal,
  InviteJoinerAccountModal,
  InviteJoinerSettingModal,
  AddSpoofModal,
  EditProxySingleModal,
  ClaimerGroupModal,
} from "./modals";
import {
  ProxyPage,
  LinkOpenerPage,
  OneClickPage,
  InviteJoinerPage,
  TwitterPage,
  SpooferPage,
  SettingPage,
  Login,
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
import { closelinkOpenerMonitor } from "./features/logic/discord-account";

function App() {
  const dispatch = useDispatch();
  const proxyModalState = useSelector(fetchProxyGroupModalState);
  const discordModalState = useSelector(fetchDiscordModalState);
  const addGmailModalState = useSelector(fetchAddGmailModalState);
  const inviteModalState = useSelector(fetchAddJoinerModalState);
  const spoofModalState = useSelector(fetchSpoofModalState);
  const claimerGroupmodalState = useSelector(fetchClaimerGroupModalState);
  const proxyEditModalState = useSelector(fetchEditProxyModalState);
  const globalSetting = useSelector(fetchWebhookSettingState);
  const inviteSettigModalState = useSelector(
    fetchInviteJoinerSettingModalState
  );
  const animClass = !globalSetting.bgAnimation
    ? "kyro-bot"
    : "kyro-bot-no-animation";

  useEffect(() => {
    dispatch(closelinkOpenerMonitor());
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
      {spoofModalState && <AddSpoofModal />}
      {claimerGroupmodalState && <ClaimerGroupModal />}
      {proxyEditModalState && <EditProxySingleModal />}
      {proxyModalState && <ProxyGroupModal />}
      {addGmailModalState && <AddGmailModal />}
      {discordModalState && <DiscordAccountModal />}
      {inviteModalState && <InviteJoinerAccountModal />}
      {inviteSettigModalState && <InviteJoinerSettingModal />}

      {false ? (
        <>
          <div className="app sidebar">
            <AppSidebar />
          </div>
          <div className="app page-section">
            <div className="app overlay-wrapper">
              <img id="kyro-chip" src={chip} alt="bot-animatable-icon" />
              <img id={animClass} src={bot} alt="bot-animatable-icon" />
              <div className="page-section-overlay">
                <DragBar />
                <AppController />
                <Routes>
                  <Route path={RoutePath.setting} element={<SettingPage />} />
                  <Route path={RoutePath.spoofer} element={<SpooferPage />} />
                  <Route path={RoutePath.twitter} element={<TwitterPage />} />
                  <Route
                    path={RoutePath.inviteJoiner}
                    element={<InviteJoinerPage />}
                  />
                  <Route
                    path={RoutePath.linkOpener}
                    element={<LinkOpenerPage />}
                  />
                  <Route path={RoutePath.proxy} element={<ProxyPage />} />
                  <Route path={RoutePath.oneclick} element={<OneClickPage />} />
                </Routes>
                <AppFooter />
              </div>
            </div>
            <ToastContainer />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
