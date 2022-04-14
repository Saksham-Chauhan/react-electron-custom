import React from 'react'
import './styles.css'
import { AppSpacer } from '../../../component'
import plus from '../../../assests/images/plus.svg'
import exportIcon from '../../../assests/images/export.svg'
import UseAnimations from 'react-useanimations'
import trash2 from 'react-useanimations/lib/trash2'

function InputWithList({
  title = 'Channel ID[s]',
  placeHolder = 'Enter User Name',
  isLogs = false,
  list = [],
  btnProps,
  inputProps,
  logAction,
  onDelete,
  appTheme,
  isComingSoon = false,
}) {
  return (
    <div className="input-field-with-scroll-outer">
      <h4 className={appTheme ? 'lightMode_color' : ''}>{title}</h4>
      <AppSpacer spacer={15} />
      <div
        className={
          appTheme
            ? 'input-field-with-scroll-inner lightBg'
            : 'input-field-with-scroll-inner'
        }
      >
        {!isComingSoon ? (
          <React.Fragment>
            {!isLogs ? (
              <div className="input-field-flex">
                <input
                  {...inputProps}
                  placeholder={placeHolder}
                  style={{
                    background: appTheme ? 'none ' : '',
                    color: appTheme ? '#706A6A' : '',
                    border: appTheme ? ' 1px solid #0D0027' : '',
                  }}
                />
                <div
                  {...btnProps}
                  className={
                    appTheme
                      ? 'plus-icon-btn btn lightModeSidebar'
                      : 'plus-icon-btn btn'
                  }
                >
                  <img src={plus} alt="" />
                </div>
              </div>
            ) : (
              <div className="input-field-flex-log-section">
                <div
                  onClick={logAction?.onExport}
                  className="plus-icon-btn btn"
                >
                  <img src={exportIcon} alt="" />
                </div>
                <div onClick={logAction?.onClear} className="plus-icon-btn btn">
                  <UseAnimations
                    animation={trash2}
                    strokeColor="#B60E0E"
                    size={25}
                  ></UseAnimations>
                </div>
              </div>
            )}
            <AppSpacer spacer={10} />
            <div className="scroll-list">
              {!isLogs
                ? list?.map((data, index) => (
                    <div key={data['id'] || index} className="scroll-list-item">
                      <span
                        style={{
                          color: appTheme ? '#0D0027' : '',
                        }}
                      >
                        {data['label']}
                      </span>
                      <UseAnimations
                        onClick={() => onDelete(data)}
                        animation={trash2}
                        strokeColor="#B60E0E"
                        size={25}
                        wrapperStyle={{ cursor: 'pointer' }}
                      ></UseAnimations>
                    </div>
                  ))
                : list?.map((data, index) => (
                    <div key={`${data}-${index}`} className="scroll-list-item">
                      <span>{data}</span>
                    </div>
                  ))}
              {!isLogs ? (
                list.length ? (
                  ''
                ) : (
                  <p
                    className={
                      appTheme ? 'blank-text lightMode_color' : 'blank-text'
                    }
                  >
                    Leave Blank For All.
                  </p>
                )
              ) : (
                ''
              )}
            </div>
          </React.Fragment>
        ) : (
          <div className="coming-soon-feature">
            <p
              className={appTheme ? 'blank-text lightMode_color' : 'blank-text'}
            >
              Coming Soon !!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default InputWithList
