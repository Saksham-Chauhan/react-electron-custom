import React, { useEffect, useState } from "react";
import "./styles.css";
import { Detector } from "react-detect-offline";
import connected from "../../assests/images/network.svg";
import disconnected from "../../assests/images/nowifi.svg";
import up from "../../assests/images/up.svg";
import down from "../../assests/images/down.svg";
import { fetchNetworkSpeed, sendLogs } from "../../helper/electron-bridge";

const FETCH_NETWORK_SPEED_GAP = 3 * 1000;

function Footer() {
  const [speed, setSpeed] = useState({
    upload: "",
    download: "",
  });

  useEffect(() => {
    let timer;
    const fetchSpeed = async () => {
      try {
        const data = await fetchNetworkSpeed();
        setSpeed((pre) => {
          return { ...data };
        });
        timer = setTimeout(fetchSpeed, FETCH_NETWORK_SPEED_GAP);
      } catch (error) {
        const log = `Error in getting Network Spped, ${error.message}`;
        sendLogs(log);
      }
    };
    if (process.env.NODE_ENV !== "development") {
      fetchSpeed();
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function makeRound(str) {
    if (str === "Infinity" || str === undefined) {
      return Math.round(Number(0) / 1000);
    } else {
      return Math.round(Number(str) / 1000);
    }
  }

  return (
    <div className="footer-app-status">
      <div className="footer-app-network-speed">
        <img src={down} alt="upload-icon" />
        <span>
          {makeRound(speed.upload)}
          {"\t"}Kb/s
        </span>
        <img src={up} alt="upload-icon" />
        <span>
          {makeRound(speed.download)}
          {"\t"}Kb/s
        </span>
      </div>
      <div className="footer-connection-status">
        <Detector
          polling={{ interval: 5 * 60 * 1000 }}
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
