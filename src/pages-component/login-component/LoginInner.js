import React from "react";
import "./logininner.css";
import logo from "../../assests/images/logo.svg";
import discord from "../../assests/images/discord.svg";

const ipcRrendrer = window.require("electron").ipcRenderer;

const LoginInner = () => {
  return (
    <div className="logininner">
      <div>
        <img src={logo} alt="logo" />
        <h1>KYRO TOOLS</h1>
        <h2>Good To See You, Come Hop In!</h2>
        <h3>
          A desktop application filled with an array of tools for those into
          multi-platform bot automation.
        </h3>
        <div>
          <button
            className="login-button"
            onClick={() => ipcRrendrer.send("auth")}
          >
            <img src={discord} alt="logo" />
            Log In with Discord
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginInner;
