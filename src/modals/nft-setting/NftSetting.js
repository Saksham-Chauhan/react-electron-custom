import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppInputField, AppSpacer, ModalWrapper } from '../../component'
import {
  fetchNftSettingDelaytate,
  fetchNftSettingEhterAPIState,
  fetchNftSettingRPCState,
  fetchThemsState,
  setModalState,
  setNftSetting,
} from '../../features/counterSlice'
import { sendLogs } from '../../helper/electron-bridge'
import './styles.css'
function NftSetting() {
  const dispatch = useDispatch()
  const appTheme = useSelector(fetchThemsState)
  const textClass = appTheme ? 'lightMode_color' : ''
  const etherScanAPI = useSelector(fetchNftSettingEhterAPIState)
  const retryDelay = useSelector(fetchNftSettingDelaytate)
  const rpcURL = useSelector(fetchNftSettingRPCState)
  const [setting, setSetting] = useState({
    rpcURL: '',
    etherScanAPI: '',
    retryDelay: '',
  })

  useEffect(() => {
    setSetting((pre) => {
      return {
        ...pre,
        retryDelay,
        rpcURL,
        etherScanAPI,
      }
    })
  }, [etherScanAPI, retryDelay, rpcURL])

  const handleCloseModal = () => {
    dispatch(setModalState('nftSettingModal'))
  }

  const handleSave = (key) => {
    let log
    if (key === 'RPC') {
      log = `RPC is updated to ${setting.rpcURL}`
      dispatch(setNftSetting({ key: 'rpcURL', value: setting.rpcURL }))
    } else if (key === 'API') {
      log = `EtherScan Api is updated to ${setting.etherScanAPI.substring(
        0,
        4,
      )}`
      dispatch(
        setNftSetting({ key: 'etherScanAPI', value: setting.etherScanAPI }),
      )
    } else {
      log = `Retry Delay value is updated to ${setting.retryDelay}`
      dispatch(setNftSetting({ key: 'retryDelay', value: setting.retryDelay }))
    }
    sendLogs(log)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setSetting((pre) => {
      return { ...pre, [name]: value }
    })
  }

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2 className={textClass}>Settings</h2>
      </div>
      <AppSpacer spacer={30} />
      <div className="nft-setting-flex">
        <div className="nft-setting-input">
          <AppInputField
            name="rpcURL"
            value={setting?.rpcURL}
            onChange={handleChange}
            fieldTitle="RPC URL"
            placeholderText="Enter RPC URL"
          />
        </div>
        <div onClick={() => handleSave('RPC')} className="nft-setting-btn btn">
          <span>Save</span>
        </div>
      </div>
      <AppSpacer spacer={10} />
      <div className="nft-setting-flex">
        <div className="nft-setting-input">
          <AppInputField
            onChange={handleChange}
            name="etherScanAPI"
            value={setting?.etherScanAPI}
            fieldTitle="Etherscan API"
            placeholderText="Enter Etherscan API"
          />
        </div>
        <div onClick={() => handleSave('API')} className="nft-setting-btn btn">
          <span>Save</span>
        </div>
      </div>
      <AppSpacer spacer={10} />
      <div className="nft-setting-flex">
        <div className="nft-setting-input">
          <AppInputField
            name="retryDelay"
            onChange={handleChange}
            value={setting?.retryDelay}
            fieldTitle="Retry Delay"
            placeholderText="Enter Retry Delay"
          />
        </div>
        <div
          onClick={() => handleSave('DELAY')}
          className="nft-setting-btn btn"
        >
          <span>Save</span>
        </div>
      </div>
      <AppSpacer spacer={25} />
      <div className="modal-control-btns">
        <div
          onClick={handleCloseModal}
          className={
            appTheme
              ? 'modal-cancel-btn btn light-mode-modalbtn '
              : 'modal-cancel-btn btn'
          }
        >
          <span className={textClass}>Cancel</span>
        </div>
        <div></div>
      </div>
    </ModalWrapper>
  )
}

export default NftSetting
