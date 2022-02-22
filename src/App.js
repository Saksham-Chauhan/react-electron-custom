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

function App() {
  const proxyModalState = useSelector(fetchProxyGroupModalState);


  return (
    <div className="app">
      {proxyModalState && <ProxyGroupModal />}
      <div className="app sidebar"></div>
      <div className="app page-section">
        <div className="app overlay-wrapper">
          <img id="kyro-bot" src={bot} alt="bot-animatable-icon" />
          <div className="page-section-overlay">
            <DragBar />
            <AppController />
            <ProxyPage />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
