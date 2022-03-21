import React, { useEffect } from "react";
import "./App.css";
import bot from "./assests/images/bot.svg";
import chip from "./assests/images/chip.svg";
import {
  setUserDetails,
  resetIJMonitor,
  fetchSpoofModalState,
  fetchWebhookListState,
  fetchDiscordModalState,
  fetchLoggedUserDetails,
  fetchAddGmailModalState,
  fetchWebhookSettingState,
  fetchEditProxyModalState,
  fetchProxyGroupModalState,
  fetchClaimerGroupModalState,
  fetchInviteJoinerSettingModalState,
} from "./features/counterSlice";
import {
  AddGmailModal,
  AddSpoofModal,
  ProxyGroupModal,
  ClaimerGroupModal,
  DiscordAccountModal,
  EditProxySingleModal,
  InviteJoinerSettingModal,
} from "./modals";
import {
  Login,
  ProxyPage,
  TwitterPage,
  SettingPage,
  SpooferPage,
  MinitingPage,
  DashboardPage,
  AccountGenPage,
  LinkOpenerPage,
  InviteJoinerPage,
} from "./pages";

import {
  authUser,
  decodeUser,
  errorToaster,
  spooferToaster,
  updateNotAvailable,
  proxyTestResultListener,
} from "./helper/electron-bridge";
import {
  updateSpooferStatus,
  resetSpooferStatus,
} from "./features/logic/spoof";
import { RoutePath } from "./constant";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { loggedUserWebhook } from "./helper/webhook";
import { toastInfo, toastWarning } from "./toaster";
import { useDispatch, useSelector } from "react-redux";
import { proxyStatusUpdater } from "./features/logic/proxy";
import { resetTwitterMonitor } from "./features/logic/twitter";
import { closelinkOpenerMonitor } from "./features/logic/discord-account";
import { AppController, DragBar, AppFooter, AppSidebar } from "./component";

function App() {
  const dispatch = useDispatch();
  const proxyModalState = useSelector(fetchProxyGroupModalState);
  const discordModalState = useSelector(fetchDiscordModalState);
  const addGmailModalState = useSelector(fetchAddGmailModalState);
  const spoofModalState = useSelector(fetchSpoofModalState);
  const claimerGroupmodalState = useSelector(fetchClaimerGroupModalState);
  const proxyEditModalState = useSelector(fetchEditProxyModalState);
  const globalSetting = useSelector(fetchWebhookSettingState);
  const inviteSettigModalState = useSelector(
    fetchInviteJoinerSettingModalState
  );
  const webhookList = useSelector(fetchWebhookListState);
  const logggedUserDetails = useSelector(fetchLoggedUserDetails);

  const animClass = !globalSetting.bgAnimation
    ? "kyro-bot"
    : "kyro-bot-no-animation";

  useEffect(() => {
    dispatch(closelinkOpenerMonitor());
    dispatch(resetSpooferStatus());
    dispatch(resetTwitterMonitor());
    dispatch(resetIJMonitor());
    spooferToaster((data) => {
      if (Object.keys(data).length > 0) {
        dispatch(updateSpooferStatus(data));
      }
    });
    authUser().then(async (user) => {
      if (user !== null) {
        const decode = decodeUser(user);
        if (decode.roles.length > 0) {
          let title = `${decode.username}#${decode.discriminator} Just Logged In 🥰 🥳 `;
          await loggedUserWebhook(
            title,
            webhookList[0],
            globalSetting?.logOnOff
          );
          dispatch(setUserDetails(decode));
        } else toastWarning("Sorry, you don't have required role  😭");
      }
    });
    proxyTestResultListener((res) => {
      dispatch(proxyStatusUpdater(res));
    });
    updateNotAvailable(() => toastInfo("Update not available"));
    errorToaster((err) => toastWarning(err));
  }, [dispatch, globalSetting, webhookList]);

  // check is user log in or not
  if (Object.keys(logggedUserDetails).length === 0)
    return (
      <React.Fragment>
        <Login />
        <ToastContainer />
      </React.Fragment>
    );

  return (
    <div className="app">
      {spoofModalState && <AddSpoofModal />}
      {proxyModalState && <ProxyGroupModal />}
      {addGmailModalState && <AddGmailModal />}
      {discordModalState && <DiscordAccountModal />}
      {claimerGroupmodalState && <ClaimerGroupModal />}
      {proxyEditModalState && <EditProxySingleModal />}
      {inviteSettigModalState && <InviteJoinerSettingModal />}
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
              <Route path={RoutePath.accountGen} element={<AccountGenPage />} />
              <Route path={RoutePath.setting} element={<SettingPage />} />
              <Route path={RoutePath.spoofer} element={<SpooferPage />} />
              <Route path={RoutePath.twitter} element={<TwitterPage />} />
              <Route
                path={RoutePath.inviteJoiner}
                element={<InviteJoinerPage />}
              />
              <Route path={RoutePath.linkOpener} element={<LinkOpenerPage />} />
              <Route path={RoutePath.proxy} element={<ProxyPage />} />
              <Route path={RoutePath.oneclick} element={<MinitingPage />} />
              <Route path={RoutePath.home} element={<DashboardPage />} />
            </Routes>
            <AppFooter />
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
