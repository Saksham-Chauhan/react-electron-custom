import React from 'react'
import { AppSpacer, AppToggler } from '../../../component'
import './styles.css'
import { fetchThemsState } from '../../../features/counterSlice'
import { useSelector } from 'react-redux'

function TopLeftSection({ handleScreen, twitterSetting, handleToggle }) {
  const appTheme = useSelector(fetchThemsState)
  return (
    <div>
      <div className="flex-btn-row">
        <div
          style={{ padding: '0.8em' }}
          className={
            appTheme
              ? 'switch-with-text light-mode-sidebar'
              : 'switch-with-text'
          }
        >
          <AppToggler
            checked={twitterSetting?.twitterMonitor}
            id="turn-twitter-monitor"
            name="twitterMonitor"
            onChange={handleToggle}
          />
          <span>
            Turn {twitterSetting?.twitterMonitor ? 'OFF' : 'ON'} Monitor
          </span>
        </div>
        <div
          style={{ padding: '0.8em 1em' }}
          onClick={handleScreen}
          className={
            appTheme
              ? 'switch-with-text with-no-toggle btn light-mode-sidebar'
              : 'switch-with-text with-no-toggle btn'
          }
        >
          <span>Twitter Settings</span>
        </div>
      </div>
      <AppSpacer spacer={30} />
      <div className="custom-twitter-toggle">
        <div className="custom-twitter-label">
          <h3 className={appTheme ? 'lightMode_color' : ''}>
            Auto Link Opener/Joiner
          </h3>
        </div>
        <AppSpacer spacer={20} />
        <div className="flex-btn-row toogle-wrapper">
          <div
            className={
              appTheme
                ? 'switch-with-text light-mode-sidebar'
                : 'switch-with-text'
            }
          >
            <AppToggler
              checked={twitterSetting?.startAutoLinkOpener}
              id="twitter-auto-link-opener"
              name="startAutoLinkOpener"
              onChange={handleToggle}
            />
            <span>
              {twitterSetting?.startAutoLinkOpener ? 'Stop' : 'Start'} Auto Link
              Opener
            </span>
          </div>
          <div
            className={
              appTheme
                ? 'switch-with-text light-mode-sidebar'
                : 'switch-with-text'
            }
          >
            <AppToggler
              checked={twitterSetting?.startAutoInviteJoiner}
              id="twitter-auto-invit-joiner"
              name="startAutoInviteJoiner"
              onChange={handleToggle}
            />
            <span>
              {twitterSetting?.startAutoInviteJoiner ? 'Stop' : 'Start'} Auto
              Invite Joiner
            </span>
          </div>
        </div>
      </div>
      <AppSpacer spacer={30} />
    </div>
  )
}

export default TopLeftSection
