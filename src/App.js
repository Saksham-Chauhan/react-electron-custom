import React from "react";
import "./App.css";
import bot from "./assests/images/bot.svg";
import { AppController, DragBar } from "./component";
import { ProxyPage } from "./pages";
function App() {
  return (
    <div className="app">
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
      </div>
    </div>
  );
}

export default App;
