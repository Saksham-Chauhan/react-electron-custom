import React from "react";
import "./styles.css";
import { Detector } from "react-detect-offline";
import connected from "../../assests/images/network.svg";
import disconnected from "../../assests/images/nowifi.svg";

function Footer() {
  return (
    <div className="footer-app-status">
      <div className="footer-connection-status">
        <Detector
          polling={{ interval: 60 * 1000 }}
          render={({ online }) => {
            return (
              <React.Fragment>
                <img
                  src={online ? connected : disconnected}
                  alt="connection-status"
                />
                <span
                  style={{ color: online ? "var(--status)" : "var(--red)" }}
                >
                  {online ? "Connected" : "Disconnect"}
                </span>
              </React.Fragment>
            );
          }}
        />
      </div>
    </div>
  );
}

export default Footer;
