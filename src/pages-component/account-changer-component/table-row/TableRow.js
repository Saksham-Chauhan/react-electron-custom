import React from 'react'
import UseAnimations from 'react-useanimations'
import play from '../../../assests/images/play.svg'
import lightMode_play from '../../../assests/images/lightMode_play.svg'
import trash2 from 'react-useanimations/lib/trash2'
import stop from '../../../assests/images/stop.svg'
import download from '../../../assests/images/download.svg'
import { DISCORD_MASS_OPTIONS } from '../../../constant'
import { fetchThemsState } from '../../../features/counterSlice'
import { useSelector } from 'react-redux'
// const CONDITIONAL_TOKEN = ["linkOpener"];

function TableRow({ onDelete, obj, index, onPlay, onStop, onDownload }) {
  const appTheme = useSelector(fetchThemsState)

  function getLabel() {
    for (let i = 0; i < DISCORD_MASS_OPTIONS.length; i++) {
      if (DISCORD_MASS_OPTIONS[i].value === obj.changerType)
        return DISCORD_MASS_OPTIONS[i].label
    }
  }

  let type = obj.changerType
  return (
    <div
      className={
        appTheme
          ? 'acc-chnager-page-table-header body  light-bg light-mode_table-color'
          : 'acc-chnager-page-table-header body'
      }
    >
      <div>{index}</div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70%', overflow: 'hidden' }}>
          {obj.changerType === 'giveawayJoiner' ||
          obj.changerType === 'linkOpener'
            ? obj?.monitorToken?.label
            : obj?.claimerGroup?.label}
        </div>
        {obj.changerType === 'giveawayJoiner' && '...'}
      </div>
      <div>{getLabel()}</div>
      <div
        style={{
          color: getColor(obj?.status, appTheme),
        }}
      >
        {obj?.status}
      </div>
      {/* <div
        style={{
          textOverflow: "ellipsis",
          overflowX: "hidden",
        }}
      >
        {CONDITIONAL_TOKEN.includes(obj["changerType"])
          ? obj?.monitorToken?.label
          : obj?.claimerGroup?.label}
      </div> */}
      <div>
        <div className="acc-changer-table-row-action-column">
          {obj?.status === 'Completed' &&
          (type === 'passwordChanger' || type === 'tokenRetrieve') ? (
            <img src={download} alt="dwd" onClick={() => onDownload(obj)} />
          ) : obj['active'] ? (
            <img src={stop} alt="" onClick={() => onStop(obj)} />
          ) : (
            <img
              src={appTheme ? lightMode_play : play}
              alt=""
              onClick={() => onPlay(obj)}
            />
          )}
          <UseAnimations
            wrapperStyle={{ cursor: 'pointer' }}
            animation={trash2}
            strokeColor="#B60E0E"
            size={25}
            onClick={() => onDelete(obj)}
          />
        </div>
      </div>
    </div>
  )
}

export default TableRow

const getColor = (status, appTheme) => {
  switch (status) {
    case 'Running':
      return appTheme ? 'var(--lightMode-status)' : 'var(--status)'
    case 'Monitoring...':
      return appTheme ? 'var( --lightMode-monitoring)' : 'var(--status)'
    case 'Completed':
      return appTheme ? 'var(--lightMode-complete)' : '#1186db'
    case 'Stopped':
      return 'var(--delete)'
    case 'idle':
      return appTheme ? 'var(--lightMode-text-color)' : ''
    default:
      return 'var(--primary)'
  }
}
