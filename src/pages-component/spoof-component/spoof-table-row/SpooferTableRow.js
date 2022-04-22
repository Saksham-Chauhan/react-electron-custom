import React, { useEffect, useState } from 'react'
import UseAnimations from 'react-useanimations'
import stop from '../../../assests/images/stop.svg'
import lightMode_play from '../../../assests/images/lightMode_play.svg'
import play from '../../../assests/images/play.svg'
import trash2 from 'react-useanimations/lib/trash2'
import toggle from '../../../assests/images/toggle.svg'
import { fetchThemsState } from '../../../features/counterSlice'
import { useSelector } from 'react-redux'
function SpooferTableRow({
  index,
  spoof,
  onDelete,
  onToggle,
  onStart,
  onStop,
}) {
  const [isStart, setIsStart] = useState(false)
  const appTheme = useSelector(fetchThemsState)
  useEffect(() => {
    if (spoof['status'] === 'Stopped') {
      setIsStart(false)
    } else if (spoof['status'] === 'Running') {
      setIsStart(true)
    }
  }, [spoof])
  const theme = {
    tableHeader: appTheme
      ? 'spoofer-page-table-header tbody light-bg light-mode-table-color'
      : 'spoofer-page-table-header tbody',
  }
  return (
    <div className={theme.tableHeader}>
      <div>{index}</div>
      <div>{spoof['url']}</div>
      <div>{spoof['proxyName']}</div>
      <div style={{ color: getColor(spoof['status'], appTheme) }}>
        {' '}
        {spoof['status']}
      </div>
      <div>
        <div className="spoofer-table-row-action-col">
          <img
            onClick={() => onToggle(spoof)}
            src={toggle}
            alt=""
            style={{ width: 22 }}
          />
          {!isStart ? (
            <img
              onClick={() => onStart(spoof, setIsStart)}
              src={appTheme ? lightMode_play : play}
              alt=""
              style={{ width: 18 }}
            />
          ) : (
            <img onClick={() => onStop(spoof, setIsStart)} src={stop} alt="" />
          )}
          <UseAnimations
            onClick={() => onDelete(spoof)}
            animation={trash2}
            strokeColor="#B60E0E"
            size={26}
            wrapperStyle={{ cursor: 'pointer', paddingBottom: '4px' }}
          ></UseAnimations>
        </div>
      </div>
    </div>
  )
}

export default SpooferTableRow

const getColor = (status, appTheme) => {
  switch (status) {
    case 'Running':
      return appTheme ? 'var(--lightMode-status)' : 'var(--status)'
    case 'Stopped':
      return 'var(--red)'
    default:
      return appTheme ? 'var(--lightMode-text-color)' : 'var(--primary)'
  }
}
