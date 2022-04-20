import React from 'react'
import { useDispatch } from 'react-redux'
import { sleep } from '../../../helper'
import {
  deleteAllTableRow,
  updateStatusOfTableRow,
} from '../../../features/logic/acc-changer'
import UseAnimations from 'react-useanimations'
import add from '../../../assests/images/plus.svg'
import play from '../../../assests/images/play.svg'
import trash2 from 'react-useanimations/lib/trash2'
import searchIcon from '../../../assests/images/search.svg'
import lightModeplush from '../../../assests/images/lightModeplus.svg'
import lightModesearch from '../../../assests/images/lightModesearch.svg'
import { fetchThemsState, setModalState } from '../../../features/counterSlice'
import { apiCallToDiscord } from '../table-section/TableSection'
import { useSelector } from 'react-redux'
function TopBtnsWrapper({ search, handleSearching, tempList }) {
  const dispatch = useDispatch()
  const appTheme = useSelector(fetchThemsState)

  const handleAdd = () => {
    dispatch(setModalState('accountChangerModal'))
  }

  const handleDeleteAll = () => {
    dispatch(deleteAllTableRow())
  }

  const handleSinglePlay = async (obj) => {
    const type = obj['changerType']
    const { proxyGroup, claimerGroup } = obj
    const tokenArray = claimerGroup['value']?.split('\n')
    for (let index = 0; index < tokenArray.length; index++) {
      const token = tokenArray[index]
      const tokenArr = token?.split(':')
      const proxyArray = proxyGroup['value'].split('\n')
      for (let j = 0; j < proxyArray.length; j++) {
        let proxySplit = proxyArray[j]?.split(':')
        const proxy = {
          host: proxySplit[0],
          port: proxySplit[1],
          auth: {
            username: proxySplit[2],
            password: proxySplit[3],
          },
        }
        dispatch(updateStatusOfTableRow(obj, 'Running'))
        const apiResponse = await apiCallToDiscord({
          type,
          token: tokenArr[3],
          proxy,
          username: obj.username,
          password: tokenArr[2],
          guildId: obj.serverIDs,
          activityDetail: obj.activityDetails,
          nickName: obj.nicknameGenerate,
          currentPass: tokenArr[2],
          newPass: obj.commonPassword,
          invideCodes: obj.inviteCodes,
        })
        if (apiResponse.status === 200) {
          dispatch(updateStatusOfTableRow(obj, 'Completed'))
        } else {
          dispatch(updateStatusOfTableRow(obj, 'Stopped'))
        }
        await sleep(Number(obj.delay) || 3000)
      }
    }
  }

  const handlePlayAll = () => {
    if (tempList?.length > 0) {
      tempList?.forEach(async (data) => {
        await handleSinglePlay(data)
      })
    }
  }
  const btnClass = appTheme
    ? 'icon-btn-wrapper btn light-bg'
    : 'icon-btn-wrapper btn'
  return (
    <div className="page-top-btns-wrapper">
      <div className="page-left-container">
        <div
          className={
            appTheme
              ? 'page-top-search-container light-bg'
              : 'page-top-search-container'
          }
        >
          <img
            src={appTheme ? lightModesearch : searchIcon}
            alt="search-icon"
          />
          <input
            value={search}
            onChange={handleSearching}
            placeholder="Search"
            type="search"
            className={appTheme ? 'light-mode-input' : ''}
          />
        </div>
        <div onClick={handleAdd} className={btnClass}>
          <img src={appTheme ? lightModeplush : add} alt="" />
        </div>
        <div onClick={handlePlayAll} className={btnClass}>
          <img src={play} alt="" />
        </div>
        <div onClick={handleDeleteAll} className={btnClass}>
          <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} />
        </div>
      </div>
    </div>
  )
}

export default TopBtnsWrapper
