import React, { useEffect, useRef, useState } from "react";
import { AppSpacer, ModalWrapper } from "../../component";
import Option from "./options/Option";
import "./style.css";
import "./info/style.css";

//IMPORT LOGO
import linkOpner from "../../assests/activeDefault/link-active.svg";
import proxy from "../../assests/activeDefault/proxy-active.svg";
import invite from "../../assests/activeDefault/invite-active.svg";
import spoof from "../../assests/activeDefault/spoof-active.svg";
import bg from "../../assests/images/polygonBg.svg";
import twitter from "../../assests/activeDefault/twitter-active.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedUserDetails,
  setModalState,
} from "../../features/counterSlice";

import rightAero from "../../assests/images/rightAeroImg.svg";
import leftAero from "../../assests/images/leftAero.svg";

//OPTIONS DATA
const options = [
  { logo: linkOpner, text: "Link Opener" },
  { logo: proxy, text: "Proxy" },
  { logo: invite, text: "Invite Joiner" },
  { logo: spoof, text: "Spoofer" },
  { logo: twitter, text: "Twitter Monitor" },
];

const WelcomeScreen = () => {
  const userDetails = useSelector(fetchLoggedUserDetails);
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);

  let newCount = useRef(0);

  useEffect(() => {
    var slideIndex = 1;
    showDivs(slideIndex);
    var count = 0;

    let btnright = document.getElementById("right");

    let decrease = document.getElementById("decrease");
    let increase = document.getElementById("increase");

    decrease.addEventListener("click", () => {
      if (slideIndex > 1) {
        plusDivs(-1);
      }
    });
    increase.addEventListener("click", () => {
      plusDivs(+1);
    });

    btnright.addEventListener("click", () => {
      plusDivs(+1);
    });
    function plusDivs(n) {
      showDivs((slideIndex += n));
    }

    function showDivs(n) {
      var i;
      var x = document.getElementsByClassName("info");
      if (n > x.length) {
        slideIndex = 1;
        count = count + 1;
      }
      if (n < 1) {
        slideIndex = x.length;
      }
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      x[slideIndex - 1].style.display = "block";
    }
  });

  return (
    <ModalWrapper>
      <div className="welcome-screen">
        <img src={bg} alt="" className="background" />

        {!show ? (
          <>
            <img
              src={leftAero}
              alt=""
              className="leftAeroImg"
              id="decrease"
              onClick={() => {
                if (newCount.current > 1) {
                  newCount.current = newCount.current - 1;
                }
              }}
            />
            <img
              src={rightAero}
              alt=""
              className="rightAeroImg"
              id="increase"
              onClick={() => {
                newCount.current = newCount.current + 1;
                if (newCount.current === 3) {
                  dispatch(setModalState("dashboardModal"));
                }
              }}
            />
          </>
        ) : (
          <>
            <span id="increase"></span>
            <span id="decrease"></span>
          </>
        )}
        {!show ? (
          <>
            <div className="info">
              <h1>Proxy</h1>
              <AppSpacer spacer={25} />
              <p>
                What is Lorem Ipsum?
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
                <br /> <br /> Why do we use it? <br />
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
            <div className="info">
              <h1>Twitter Monitor</h1>
              <AppSpacer spacer={25} />
              <p>
                What is Lorem Ipsum?
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
                <br /> <br /> Why do we use it? <br />
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
          </>
        ) : (
          <div className="info"></div>
        )}
        {show ? (
          <>
            <h1>Welcome To Kyro.!</h1>
            <h6>
              Nice to meet you, {userDetails.username}#
              {userDetails.discriminator}
            </h6>
            <AppSpacer spacer={50} />
            <h6>TOP THINGS TO DO HERE</h6>
            {options.map((item, i) => {
              return (
                <div key={i * 2 + "jhvcgh"}>
                  <AppSpacer spacer={15} />
                  <Option {...item} />
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}
        <AppSpacer spacer={50} />
        <div className="modal-control-btns">
          <div
            className="modal-cancel-btn btn"
            onClick={() => {
              dispatch(setModalState("dashboardModal"));
            }}
          >
            <span>Skip</span>
          </div>
          <div
            className="modal-cancel-btn submit btn"
            id="right"
            onClick={() => {
              setShow(false);
              newCount.current = newCount.current + 1;
              if (newCount.current > 2) {
                dispatch(setModalState("dashboardModal"));
              }
            }}
          >
            <span>Next</span>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default WelcomeScreen;
