import React from "react";
import "./login.css";
import loginRobo from "../../assests/images/login_robo.svg";
import loginbg1 from "../../assests/images/login_bg1.svg";
import loginbg2 from "../../assests/images/login_bg2.svg";
import loginbg3 from "../../assests/images/login_bg3.svg";
import loginbg4 from "../../assests/images/login_bg4.svg";
import loginbg5 from "../../assests/images/login_bg5.svg";
import { LoginInner } from "../../pages-component";

const Login = () => {
  return (
    <div className="login">
      <img src={loginRobo} alt="" className="robo" />
      <img src={loginbg1} alt="" className="bg-one" />
      <img src={loginbg2} alt="" className="bg-two" />
      <img src={loginbg3} alt="" className="bg-three" />
      <img src={loginbg4} alt="" className="bg-four" />
      <img src={loginbg5} alt="" className="bg-five" />
      <img src={loginbg5} alt="" className="bg-six" />
      <LoginInner />
    </div>
  );
};
export default Login;
