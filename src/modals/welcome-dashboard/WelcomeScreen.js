import React, { useEffect, useRef, useState } from 'react'
import { AppSpacer, ModalWrapper } from '../../component'
import Option from './options/Option'
import './style.css'
import './info/style.css'

//IMPORT LOGO
import linkOpner from '../../assests/activeDefault/link-active.svg'
import proxy from '../../assests/activeDefault/proxy-active.svg'
import invite from '../../assests/activeDefault/invite-active.svg'
import spoof from '../../assests/activeDefault/spoof-active.svg'
import bg from '../../assests/images/polygonBg.svg'
import twitter from '../../assests/activeDefault/twitter-active.svg'
import setting from '../../assests/activeDefault/settings-active.svg'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchLoggedUserDetails,
  fetchThemsState,
  setModalState,
} from '../../features/counterSlice'

import rightAero from '../../assests/images/rightAeroImg.svg'
import leftAero from '../../assests/images/leftAero.svg'
import lighMode_Arrow from '../../assests/images/lighMode_Arrow.svg'
import lightMode_leftArrow from '../../assests/images/lightMode_leftArrow.svg'
//OPTIONS DATA
const options = [
  { logo: linkOpner, text: 'Link Opener' },
  { logo: proxy, text: 'Proxy' },
  { logo: invite, text: 'Invite Joiner' },
  { logo: spoof, text: 'Spoofer' },
  { logo: twitter, text: 'Twitter Monitor' },
  { logo: setting, text: 'Settings' },
]

const WelcomeScreen = () => {
  const userDetails = useSelector(fetchLoggedUserDetails)
  const dispatch = useDispatch()
  const appTheme = useSelector(fetchThemsState)

  const [show, setShow] = useState(true)

  let newCount = useRef(0)

  useEffect(() => {
    let slideIndex = 1
    showDivs(slideIndex)
    let count = 0

    let btnright = document.getElementById('right')

    let decrease = document.getElementById('decrease')
    let increase = document.getElementById('increase')

    decrease.addEventListener('click', () => {
      if (slideIndex > 1) {
        plusDivs(-1)
      }
      if (process.env.NODE_ENV === 'development') {
        setShow(true)
      }
    })
    increase.addEventListener('click', () => {
      plusDivs(+1)
    })

    btnright.addEventListener('click', () => {
      plusDivs(+1)
    })
    function plusDivs(n) {
      showDivs((slideIndex += n))
    }

    function showDivs(n) {
      let i
      let x = document.getElementsByClassName('info')
      if (n > x.length) {
        slideIndex = 1
        count = count + 1
      }
      if (n < 1) {
        slideIndex = x.length
      }
      for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none'
      }
      x[slideIndex - 1].style.display = 'block'
    }

    function showIndexSlide(slide) {
      let x = document.getElementsByClassName('info')
      for (let i = 0; i < x.length; i++) {
        x[i].style.display = 'none'
      }
      x[slide].style.display = 'block'
    }

    const items = document.querySelectorAll('.onboarding-item')
    items.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        setShow(false)
        if (index === 0 || index === 1) {
          showIndexSlide(0)
        } else if (index === 2 || index === 3) {
          showIndexSlide(1)
        } else {
          showIndexSlide(2)
        }
      })
    })
  })
  const textClass = appTheme ? 'lightMode_color' : ''

  return (
    <ModalWrapper>
      <div className="welcome-screen">
        <img src={bg} alt="" className="background" />

        {!show ? (
          <>
            <img
              src={appTheme ? lightMode_leftArrow : leftAero}
              alt=""
              className="leftAeroImg"
              id="decrease"
              onClick={() => {
                if (newCount.current > 1) {
                  newCount.current = newCount.current - 1
                }
              }}
            />
            <img
              src={appTheme ? lighMode_Arrow : rightAero}
              alt=""
              className="rightAeroImg"
              id="increase"
              onClick={() => {
                newCount.current = newCount.current + 1
                if (newCount.current === 3) {
                  dispatch(setModalState('dashboardModal'))
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
              <h1 className={textClass}>Proxy Group Tester</h1>
              <AppSpacer spacer={25} />
              <p className={textClass}>
                Proxy Group allows you to create separate groups for your
                proxies. You can create a Group by clicking ➕ on the top left,
                can Import and/or Export bulk proxies in a group directly. You
                have an option to test either all or your individual proxies for
                speed, and filter all the Bad proxies based on the response.
                <br /> <br /> <br />
              </p>
              <h1 className={textClass}>Link Opener</h1>
              <AppSpacer spacer={25} />
              <p className={textClass}>
                Auto Link Opener allows you to monitor channels based on
                different keywords and directly open links based on different
                chrome profiles. You can directly Create Accounts by clicking ➕
                on the top left, add Account name and your Discord Token. You
                have an option to export Logs as .txt file and/or clear Logs as
                well.
                <br /> <br />
              </p>
            </div>
            <div className="info">
              <h1 className={textClass}>Invite Joiner</h1>
              <AppSpacer spacer={25} />
              <p className={textClass}>
                Kyro Tools gives you an option for Mass Invite Joiner. You can
                directly Create Accounts by clicking ➕ on the top left, add
                Account name and your Discord Token. The tool lets you select
                Token Group that you can create on the Settings page, use
                Proxies and set Delays to join links in a bulk without getting
                noticed or rate-limited. Direct Join lets you React and Accept
                rules to the added Invite Links based on the values entered by
                you.
                <br /> <br /> <br />
              </p>
              <h1 className={textClass}>Spoofer</h1>
              <AppSpacer spacer={25} />
              <p className={textClass}>
                Spoofer lets you create multiple browser instances for your
                tasks. You can directly enter the URL and select your Proxy
                group to create separate instances. Clicking on Toggle All would
                open separate windows for all the instances that you've created.
                <br /> <br />
              </p>
            </div>
            <div className="info">
              <h1 className={textClass}>Twitter Monitor</h1>
              <AppSpacer spacer={25} />
              <p className={textClass}>
                Kyro Tools offer you a Blazing fast Twitter Monitor with
                in-built Auto Link opener and Invite Joiner. You can monitor
                Latest and Featured Tweets with features like: QR Solver, OCR
                Support, Arithmetic Solver, and many more. You can directly add
                and/or delete accounts that you want to monitor.
                <br /> <br /> <br />
              </p>
              <h1 className={textClass}>Settings</h1>
              <AppSpacer spacer={25} />
              <p className={textClass}>
                Settings let you create create different Chrome Profiles that
                can be used for Auto Link opener. You can also create separate
                Token groups by entering multiple tokens, which can be modified
                as how you want. It lets you start and/or stop Background
                Animation. Enter a Webhook URL to test and select toggles for
                whichever webhooks you want to display. The user also has an
                option to Logout in this page.
                <br /> <br />
              </p>
            </div>
          </>
        ) : (
          <div className="info"></div>
        )}
        {show ? (
          <>
            <h1 className={textClass}>Welcome To Kyro.!</h1>
            <h6 className={textClass}>
              Nice to meet you, {userDetails.username}#
              {userDetails.discriminator}
            </h6>
            <AppSpacer spacer={50} />
            <h6 className={textClass}>TOP THINGS TO DO HERE</h6>
            {options.map((item, i) => {
              return (
                <div className="onboarding-item" key={i * 2 + 'jhvcgh'}>
                  <AppSpacer spacer={15} />
                  <Option {...item} />
                </div>
              )
            })}
          </>
        ) : (
          ''
        )}
        <AppSpacer spacer={50} />
        <div className="modal-control-btns">
          <div
            className={
              appTheme
                ? 'modal-cancel-btn btn lightMode-modalBtn '
                : 'modal-cancel-btn btn'
            }
            onClick={() => {
              dispatch(setModalState('dashboardModal'))
            }}
          >
            <span className={textClass}>Skip</span>
          </div>
          <div
            className={
              appTheme
                ? 'modal-cancel-btn submit btn btn_shadow '
                : ' modal-cancel-btn submit btn'
            }
            id="right"
            onClick={() => {
              setShow(false)
              newCount.current = newCount.current + 1
              if (newCount.current > 2) {
                dispatch(setModalState('dashboardModal'))
              }
            }}
          >
            <span>Next</span>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default WelcomeScreen
