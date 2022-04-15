import React, { useEffect, useState } from 'react'
import stop from '../../../assests/images/stop.svg'
import play from '../../../assests/images/play.svg'
import toggle from '../../../assests/images/toggle.svg'
import UseAnimations from 'react-useanimations'
import trash2 from 'react-useanimations/lib/trash2'
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
  const lightModeClass = appTheme
    ? 'spoofer-page-table-header tbody lightBg paragraph-color'
    : 'spoofer-page-table-header tbody'

  return (
    <div className={lightModeClass}>
      <div>{index}</div>
      <div>{spoof['url']}</div>
      <div>{spoof['proxyName']}</div>
      <div
        style={{
          color:
            spoof.status === 'Stopped'
              ? '#B60E0E'
              : spoof.status === 'Running'
              ? ' #03902B'
              : spoof.status === 'Idle'
              ? ' #111010'
              : '',
        }}
      >
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
              src={play}
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
