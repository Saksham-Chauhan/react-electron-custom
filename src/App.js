import React, { useEffect } from "react";
import "./App.css";
import bot from "./assests/images/bot.svg";
import chip from "./assests/images/chip.svg";
import {
  setUserDetails,
  resetIJMonitor,
  fetchSpoofModalState,
  fetchDiscordModalState,
  fetchLoggedUserDetails,
  fetchDashboardModalState,
  fetchWebhookSettingState,
  fetchEditProxyModalState,
  fetchProxyGroupModalState,
  fetchClaimerGroupModalState,
  fetchAccountChangerModalState,
  fetchInviteJoinerSettingModalState,
} from "./features/counterSlice";
import {
  AddSpoofModal,
  OnboardingModal,
  ProxyGroupModal,
  ClaimerGroupModal,
  AccountChangerModal,
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
  AccountChangerPage,
} from "./pages";
import {
  sendLogs,
  authUser,
  decodeUser,
  errorToaster,
  spooferToaster,
  updateProgress,
  interceptorFound,
  downloadingStart,
  updateNotAvailable,
  proxyTestResultListener,
} from "./helper/electron-bridge";
import {
  resetSpooferStatus,
  updateSpooferStatus,
} from "./features/logic/spoof";
import {
  toastInfo,
  toastWarning,
  progressToast,
  MAX_TOAST_LIMIT,
} from "./toaster";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { EndPointToPage, RoutePath } from "./constant";
import { useDispatch, useSelector } from "react-redux";
import { proxyStatusUpdater } from "./features/logic/proxy";
import { Routes, Route, useLocation } from "react-router-dom";
import { resetTwitterMonitor } from "./features/logic/twitter";
import { interceptorWebhook, loggedUserWebhook } from "./helper/webhook";
import { closelinkOpenerMonitor } from "./features/logic/discord-account";
import { AppController, DragBar, AppFooter, AppSidebar } from "./component";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const spoofModalState = useSelector(fetchSpoofModalState);
  const globalSetting = useSelector(fetchWebhookSettingState);
  const discordModalState = useSelector(fetchDiscordModalState);
  const logggedUserDetails = useSelector(fetchLoggedUserDetails);
  const proxyModalState = useSelector(fetchProxyGroupModalState);
  const proxyEditModalState = useSelector(fetchEditProxyModalState);
  const onBoardingModalState = useSelector(fetchDashboardModalState);
  const claimerGroupmodalState = useSelector(fetchClaimerGroupModalState);
  const accountChangerModalState = useSelector(fetchAccountChangerModalState);
  const inviteSettigModalState = useSelector(
    fetchInviteJoinerSettingModalState
  );

  const animClass = !globalSetting.bgAnimation
    ? "kyro-bot"
    : "kyro-bot-no-animation";

  useEffect(() => {
    dispatch(resetIJMonitor());
    dispatch(resetSpooferStatus());
    dispatch(resetTwitterMonitor());
    dispatch(closelinkOpenerMonitor());
    spooferToaster((data) => {
      if (Object.keys(data).length > 0) {
        dispatch(updateSpooferStatus(data));
      }
    });

    authUser().then(async (user) => {
      if (user !== null) {
        const decode = decodeUser(user);
        if (decode.roles.length > 0) {
          try {
            let title = `${decode?.username}#${decode?.discriminator} Just Logged In 🥰 🥳 `;
            await loggedUserWebhook(
              title,
              globalSetting?.webhookList[0],
              globalSetting?.logOnOff
            );
          } catch (e) {
            const log = `Something went wrong on dispatch user ${e.message}`;
            sendLogs(log);
          }
          dispatch(setUserDetails(decode));
        } else toastWarning("Sorry, you don't have required role  😭");
      }
    });
    proxyTestResultListener((res) => {
      dispatch(proxyStatusUpdater(res));
    });
    interceptorFound((res) => {
      interceptorWebhook(`${res} Tool found.`);
    });
    updateNotAvailable(() =>
      toastInfo("Update not available or You are already to update 😍 🤩")
    );
    downloadingStart(() => {
      progressToast();
    });
    updateProgress((percent) => {
      const progressDiv = document.querySelector(".progress-value");
      progressDiv.innerHTML = percent;
    });
    errorToaster((err) => toastWarning(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, globalSetting.logOnOff]);

  // Route Navigation Listener
  useEffect(() => {
    const currentPage = EndPointToPage[location.pathname];
    const log = `Navigate to ${currentPage}`;
    sendLogs(log);
  }, [location.pathname]);

  // check is user log in or not
  if (Object.keys(logggedUserDetails).length === 0) {
    return (
      <React.Fragment>
        <Login />
        <ToastContainer />
      </React.Fragment>
    );
  }

  return (
    <div className="app">
      {spoofModalState && <AddSpoofModal />}
      {proxyModalState && <ProxyGroupModal />}
      {!onBoardingModalState && <OnboardingModal />}
      {discordModalState && <DiscordAccountModal />}
      {claimerGroupmodalState && <ClaimerGroupModal />}
      {proxyEditModalState && <EditProxySingleModal />}
      {accountChangerModalState && <AccountChangerModal />}
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
            <AppController {...{ location }} />
            <Routes>
              <Route
                path={RoutePath.accountChanger}
                element={<AccountChangerPage />}
              />
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
          <ToastContainer limit={MAX_TOAST_LIMIT} />
        </div>
      </div>
    </div>
  );
}

export default App;
