import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { AppInputField, AppSpacer, ModalWrapper } from '../../component'
import { DISCORD_MASS_OPTIONS, RoutePath } from '../../constant'
import {
  fetchChromeUserListState,
  fetchClaimerGroupList,
  fetchProxyGroupList,
  fetchThemsState,
  setModalState,
} from '../../features/counterSlice'
import { addDataInTableList } from '../../features/logic/acc-changer'
import {
  getClaimerValue,
  makeClaimerSelectOption,
  makeProxyOptions,
} from '../../helper'
import {
  activityChangerValidation,
  basicAccChangerValidation,
  giveawayJoinerValidation,
  inviteJoinerValidation,
  linkOpenerValidation,
  massInviteJoinerValidation,
  nicknameChangerValidation,
} from './helper'
import {
  UserNameChangerSlide,
  ActivityChangerSlide,
  AvatarChangerSlide,
  PasswordChnagerSlide,
  ServerLeaverSlide,
  TokenCheckerSlide,
  MassInviteSlide,
  TokenRetriverSlide,
  GiveawayJoinerSlide,
  InviteJoinerSlide,
  LinkOpenerSlide,
  XPFarmerSlide,
} from './slides'
import NicknameChanger from './slides/NicknameChanger'
import Chance from 'chance'
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from '../../component/modal-wrapper/Modal'
function AccountChanger() {
  const navigate = useNavigate()
  const chromeList = useSelector(fetchChromeUserListState)
  const proxyGroupList = useSelector(fetchProxyGroupList)
  const claimerGroupList = useSelector(fetchClaimerGroupList)
  const dispatch = useDispatch()
  const [accountChanger, setAccountChanger] = useState({
    proxyGroup: {},
    claimerGroup: {},
    status: 'idle',
    createdAt: new Date().toUTCString(),
    changerType: '',
    active: false,
    render: false,
  })
  const handleClaimerMenuOpen = () => {
    if (claimerGroupList.length === 0) {
      handleCloseModal()
      navigate(RoutePath.setting, { replace: true })
    }
  }

  const handleTypeChanger = ({ value }) => {
    setAccountChanger((pre) => {
      return { ...pre, changerType: value }
    })
  }

  const handleProxyMenuOpen = () => {
    if (proxyGroupList.length === 0) {
      handleCloseModal()
      navigate(RoutePath.setting, { replace: true })
    }
  }

  const handleCloseModal = () => {
    dispatch(setModalState('accountChangerModal'))
  }

  const getProxyGroupValue = () => {
    if (Object.keys(accountChanger.proxyGroup).length > 0) {
      const result = proxyGroupList.filter(
        (group) => group['id'] === accountChanger.proxyGroup['id'],
      )
      if (result.length > 0) {
        return [
          {
            label: result[0]['groupName'],
            value: result[0]['proxies'],
            id: result[0]['id'],
          },
        ]
      }
    }
    return []
  }

  const makeRndName = (data) => {
    let arr = []
    const chance = new Chance()
    const list = [...data['value']?.split('\n')]
    for (let i = 0; i < list.length; i++) {
      const name = chance.name()
      arr.push(name)
    }
    return arr
  }

  const handleClaimer = (data) => {
    if (accountChanger['changerType'] === 'nicknameChanger') {
      const rndList = makeRndName(data)
      setAccountChanger((pre) => {
        return { ...pre, nicknameGenerate: rndList.join('\n') }
      })
    }
    setAccountChanger((pre) => {
      return {
        ...pre,
        claimerGroup: data,
      }
    })
  }

  const handleSelectProxyGroup = (group) => {
    if (Object.keys(group).length > 0) {
      setAccountChanger((pre) => {
        return {
          ...pre,
          proxyGroup: group,
        }
      })
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    setAccountChanger((pre) => {
      return { ...pre, [name]: value }
    })
  }

  const handleRefreshName = () => {
    const rndList = makeRndName(accountChanger.claimerGroup)
    setAccountChanger((pre) => {
      return { ...pre, nicknameGenerate: rndList.join('\n') }
    })
  }

  const handleSubmit = () => {
    const validation = basicAccChangerValidation(accountChanger)
    const type = accountChanger['changerType']
    if (validation) {
      let valid
      if (type === 'activityChanger') {
        valid = activityChangerValidation(accountChanger)
      } else if (type === 'nicknameChanger') {
        valid = nicknameChangerValidation(accountChanger)
      } else if (type === 'massInviter') {
        valid = massInviteJoinerValidation(accountChanger)
      } else if (type === 'giveawayJoiner') {
        valid = giveawayJoinerValidation(accountChanger)
      } else if (type === 'linkOpener') {
        valid = linkOpenerValidation(accountChanger)
      } else if (type === 'inviteJoiner') {
        valid = inviteJoinerValidation(accountChanger)
      } else {
        valid = true
      }
      if (valid) {
        dispatch(addDataInTableList(accountChanger))
        handleCloseModal()
      }
    }
  }

  const handleSelectAPI = (obj) => {
    setAccountChanger((pre) => {
      return { ...pre, url: obj.key }
    })
  }
  const handleSelectToken = (obj) => {
    setAccountChanger((pre) => {
      return { ...pre, token: obj.value }
    })
  }

  const handleMonitorToken = (data) => {
    setAccountChanger((pre) => {
      return { ...pre, monitorToken: data }
    })
  }

  const handleChromeMenuOpen = () => {
    if (chromeList.length === 0) {
      handleCloseModal()
      navigate(RoutePath.setting, { replace: true })
    }
  }

  const handleChromeUser = (data) => {
    setAccountChanger((pre) => {
      return { ...pre, chromeUser: data }
    })
  }

  const handleToggler = (e) => {
    const { name, checked } = e.target
    setAccountChanger((pre) => {
      return { ...pre, [name]: checked }
    })
  }
  const handleIsEmoji = (flag = false) => {
    setAccountChanger((pre) => {
      return { ...pre, emoji: flag }
    })
  }
  const handleUpdateObject = (key, value) => {
    setAccountChanger((pre) => {
      return { ...pre, [key]: value }
    })
  }

  return (
    <ModalWrapper onClick={handleIsEmoji}>
      <div className="modal-tilte">
        <h2>Create Task</h2>
      </div>
      <AppSpacer spacer={30} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            onChange={handleTypeChanger}
            fieldTitle="Type"
            isSelect={true}
            value={DISCORD_MASS_OPTIONS.filter(
              (type) => type['value'] === accountChanger['changerType'],
            )}
            selectOptions={DISCORD_MASS_OPTIONS}
            placeholderText="Select Type"
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          {accountChanger['changerType'] === 'linkOpener' && (
            <AppInputField
              onChange={handleChromeUser}
              placeholderText={
                chromeList.length > 0 ? 'Select Chrome User' : 'Add Chrome User'
              }
              selectOptions={chromeList}
              fieldTitle="Chrome User"
              isSelect={chromeList.length > 0}
              disabled={chromeList.length > 0}
              navigate={chromeList.length > 0 ? () => {} : handleChromeMenuOpen}
            />
          )}
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      <AppSpacer spacer={10} />
      {accountChanger['changerType'] !== 'linkOpener' && (
        <ModalFlexOuterRow>
          <ModalFlexInnerRow>
            <AppInputField
              fieldTitle="Token Group"
              placeholderText={
                claimerGroupList.length > 0
                  ? 'Select Token Group'
                  : 'Add Token Group'
              }
              onMenuOpen={handleClaimerMenuOpen}
              selectOptions={makeClaimerSelectOption(claimerGroupList)}
              onChange={handleClaimer}
              value={getClaimerValue(
                claimerGroupList,
                accountChanger.claimerGroup,
              )}
              isSelect={claimerGroupList.length > 0 ? true : false}
              disabled={claimerGroupList.length > 0 ? false : true}
              navigate={
                claimerGroupList.length > 0 ? () => {} : handleProxyMenuOpen
              }
            />
          </ModalFlexInnerRow>
          <ModalFlexInnerRow>
            <AppInputField
              fieldTitle="Proxy Group"
              placeholderText={
                proxyGroupList.length > 0
                  ? 'Select Proxy Group'
                  : 'Add Proxy group'
              }
              onMenuOpen={handleProxyMenuOpen}
              value={getProxyGroupValue()}
              selectOptions={makeProxyOptions(proxyGroupList)}
              onChange={handleSelectProxyGroup}
              isSelect={proxyGroupList.length > 0 ? true : false}
              disabled={proxyGroupList.length > 0 ? false : true}
              navigate={
                proxyGroupList.length > 0 ? () => {} : handleProxyMenuOpen
              }
            />
          </ModalFlexInnerRow>
        </ModalFlexOuterRow>
      )}

      <AppSpacer spacer={10} />
      {getDynamicSlideRnder(
        accountChanger['changerType'],
        handleChange,
        handleSelectAPI,
        accountChanger,
        handleRefreshName,
        handleSelectToken,
        handleMonitorToken,
        handleToggler,
        handleCloseModal,
        handleSubmit,
        handleIsEmoji,
        handleUpdateObject,
      )}
      <AppSpacer spacer={30} />
      {accountChanger?.changerType ? (
        accountChanger?.changerType === 'massInviter' ? (
          ''
        ) : (
          <div className="modal-control-btns">
            <div onClick={handleCloseModal} className="modal-cancel-btn btn">
              <span>Cancel</span>
            </div>
            <div onClick={handleSubmit} className="modal-cancel-btn submit btn">
              <span>Create</span>
            </div>
          </div>
        )
      ) : (
        <div className="modal-control-btns">
          <div onClick={handleCloseModal} className="modal-cancel-btn btn">
            <span>Cancel</span>
          </div>
          <div onClick={handleSubmit} className="modal-cancel-btn submit btn">
            <span>Create</span>
          </div>
        </div>
      )}
    </ModalWrapper>
  )
}

export default AccountChanger

const getDynamicSlideRnder = (
  type,
  handleChange,
  handleSelect,
  state,
  handleRefreshName,
  handleSelectToken,
  handleMonitorToken,
  handleToggler,
  handleCloseModal,
  handleSubmit,
  handleIsEmoji,
  handleUpdateObject,
) => {
  switch (type) {
    case 'avatarChanger':
      return (
        <AvatarChangerSlide
          onChange={handleChange}
          handleSelectAPI={handleSelect}
        />
      )
    case 'serverLeaver':
      return <ServerLeaverSlide onChange={handleChange} />
    case 'usernameChanger':
      return <UserNameChangerSlide onChange={handleChange} />
    case 'activityChanger':
      return <ActivityChangerSlide onChange={handleChange} />
    case 'nicknameChanger':
      return (
        <NicknameChanger
          onRefresh={handleRefreshName}
          state={state}
          onChange={handleChange}
        />
      )
    case 'passwordChanger':
      return <PasswordChnagerSlide onChange={handleChange} />
    case 'tokenChecker':
      return <TokenCheckerSlide onChange={handleChange} />
    case 'massInviter':
      return (
        <MassInviteSlide
          onChange={handleChange}
          handleToggler={handleToggler}
          pageState={state}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          handleIsEmoji={handleIsEmoji}
          handleUpdateObject={handleUpdateObject}
        />
      )
    case 'tokenRetrieve':
      return <TokenRetriverSlide onChange={handleChange} />
    case 'giveawayJoiner':
      return (
        <GiveawayJoinerSlide
          onChange={handleChange}
          pageState={state}
          selectToken={handleSelectToken}
        />
      )
    case 'inviteJoiner':
      return (
        <InviteJoinerSlide
          onChange={handleChange}
          state={state}
          handleMonitorToken={handleMonitorToken}
        />
      )
    case 'linkOpener':
      return (
        <LinkOpenerSlide
          onChange={handleChange}
          state={state}
          handleMonitorToken={handleMonitorToken}
        />
      )
    case 'xpFarmer':
      return (
        <XPFarmerSlide
          onChange={handleChange}
          state={state}
          handleMonitorToken={handleMonitorToken}
        />
      )
    default:
      return <UserNameChangerSlide onChange={handleChange} />
  }
}
