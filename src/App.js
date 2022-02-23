import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import bot from "./assests/images/bot.svg";
import { AppController, DragBar } from "./component";
import { fetchProxyGroupModalState } from "./features/counterSlice";
import { ProxyGroupModal } from "./modals";
import { ProxyPage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "./component";
import { RoutePath } from "./constant";
import { Routes, Route } from "react-router-dom";
// gmail modal
import { AddGmail } from "./modals";
import { OneClickPage } from "./pages";
function App() {
  const proxyModalState = useSelector(fetchProxyGroupModalState);

  const gmail = false;
  return (
    <div className="app">
      {gmail && <AddGmail />}
      {/* {proxyModalState && <ProxyGroupModal />} */}
      <div className="app sidebar">
        <Sidebar />
      </div>
      <div className="app page-section">
        <div className="app overlay-wrapper">
          <img id="kyro-bot" src={bot} alt="bot-animatable-icon" />
          <div className="page-section-overlay">
            <DragBar />
            <AppController />
            <Routes>
              <Route path={RoutePath.proxy} element={<ProxyPage />} />
              <Route path={RoutePath.oneclick} element={<OneClickPage />} />
            </Routes>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
