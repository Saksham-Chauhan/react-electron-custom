import React from 'react'
import './styles.css'
import {
  SettingTopSection,
  SettingUserProfile,
  SettingWebhookSection,
  SettingChromeUserSection,
  SettingProxyGroupSection,
  SettingCalimerGroupSection,
} from '../../pages-component'
import { useSelector } from 'react-redux'
import { AppSpacer } from '../../component'
import {
  fetchLoggedUserDetails,
  fetchThemsState,
} from '../../features/counterSlice'

function Setting() {
  const userDetails = useSelector(fetchLoggedUserDetails)
  const appTheme = useSelector(fetchThemsState)
  return (
    <div
      className={
        appTheme
          ? 'setting-page-outer lightModePage-section'
          : 'setting-page-outer'
      }
    >
      <SettingTopSection />
      <div className="setting-page-padding">
        <AppSpacer spacer={10} />
        <div className="setting-page_top-section">
          <div className="setting-page_webhook-section">
            <SettingWebhookSection {...{ userDetails }} />
          </div>
          <div className="setting-page_user-section">
            <SettingUserProfile {...{ userDetails }} />
          </div>
        </div>
        <AppSpacer spacer={25} />
        <div className="setting-page-section-col">
          <div className="chrome-user-section">
            <SettingChromeUserSection />
          </div>
          <div className="claimer-group-section">
            <SettingCalimerGroupSection />
          </div>
          <div className="proxy-group-section">
            <SettingProxyGroupSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting
