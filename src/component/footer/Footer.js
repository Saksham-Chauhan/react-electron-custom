import React from "react";
import "./styles.css";
import { Detector } from "react-detect-offline";
import connected from "../../assests/images/network.svg";

function Footer() {
  return (
    <div className="footer-app-status">
      <div className="footer-connection-status">
        <img src={connected} alt="connection-status" />
        <Detector
          polling={{ interval: 5 * 60 * 1000 }}
          render={({ online }) => {
            return (
              <span
                style={{ color: online ? "var(--status)" : "var(--red)" }}
              >
                {online ? "Connected" : "Disconnect"}
              </span>
            );
          }}
        />
      </div>
    </div>
  );
}

export default Footer;
