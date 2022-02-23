import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import bot from "./assests/images/bot.svg";
import chip from "./assests/images/chip.svg";
import { AppController, DragBar, AppFooter } from "./component";
import {
  fetchDiscordModalState,
  fetchProxyGroupModalState,
} from "./features/counterSlice";
import { ProxyGroupModal, DiscordAccountModal } from "./modals";
import { ProxyPage, LinkOpenerPage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { RoutePath } from "./constant";
function App() {
  const proxyModalState = useSelector(fetchProxyGroupModalState);
  const discordModalState = useSelector(fetchDiscordModalState);

  return (
    <div className="app">
      {proxyModalState && <ProxyGroupModal />}
      {discordModalState && <DiscordAccountModal />}
      <div className="app sidebar"></div>
      <div className="app page-section">
        <div className="app overlay-wrapper">
          <img id="kyro-chip" src={chip} alt="bot-animatable-icon" />
          <img id="kyro-bot" src={bot} alt="bot-animatable-icon" />
          <div className="page-section-overlay">
            <DragBar />
            <AppController />
            <Routes>
              <Route path={RoutePath.proxy} element={<ProxyPage />} />
              <Route path={RoutePath.home} element={<LinkOpenerPage />} />
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
