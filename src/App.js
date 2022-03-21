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
  fetchInviteJoinerSettingModalState,
  fetchSpoofModalState,
  fetchEditProxyModalState,
  fetchClaimerGroupModalState,
  fetchWebhookSettingState,
  fetchLoggedUserDetails,
  setUserDetails,
  resetIJMonitor,
  fetchWebhookListState,
} from "./features/counterSlice";
import {
  ProxyGroupModal,
  DiscordAccountModal,
  AddGmailModal,
  InviteJoinerSettingModal,
  AddSpoofModal,
  EditProxySingleModal,
  ClaimerGroupModal,
} from "./modals";
import {
  ProxyPage,
  LinkOpenerPage,
  MinitingPage,
  InviteJoinerPage,
  TwitterPage,
  SpooferPage,
  SettingPage,
  Login,
  DashboardPage,
  AccountGenPage,
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
  authUser,
  decodeUser,
} from "./helper/electron-bridge";
import {
  updateSpooferStatus,
  resetSpooferStatus,
} from "./features/logic/spoof";
import { toastInfo, toastWarning } from "./toaster";
import { proxyStatusUpdater } from "./features/logic/proxy";
import { closelinkOpenerMonitor } from "./features/logic/discord-account";
import { resetTwitterMonitor } from "./features/logic/twitter";
import { loggedUserWebhook } from "./helper/webhook";

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
        let title = `${decode.username}#${decode.discriminator} Just Logged In 🥰 🥳 `;
        await loggedUserWebhook(title, webhookList[0], globalSetting?.logOnOff);

        if (decode.roles.length > 0) {
          dispatch(setUserDetails(decode));
        } else toastWarning("Sorry, you don't have required role 🥲 😭");
      }
    });
    proxyTestResultListener((res) => {
      dispatch(proxyStatusUpdater(res));
    });
    updateNotAvailable(() => toastInfo("Update not available"));
    errorToaster((err) => toastWarning(err));
  }, [dispatch, globalSetting, webhookList]);

  // check is user log in or not
  if (Object.keys(logggedUserDetails).length === 0) return <Login />;

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
