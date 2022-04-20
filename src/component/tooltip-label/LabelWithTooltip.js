import React from 'react'
import './styles.css'
import ReactTooltip from 'react-tooltip'
import help from '../../assests/images/help.svg'
import lightModehelp from '../../assests/images/lightModehelp.svg'
import { fetchThemsState } from '../../features/counterSlice'
import { useSelector } from 'react-redux'
function LabelWithTooltip({
  toolTopText = "I'm Tooltip",
  labelText,
  isCustomToolTip = false,
  parentStyle,
  children,
  ...props
}) {
  const appTheme = useSelector(fetchThemsState)
  return (
    <div {...parentStyle} className="label-with-tooltip ">
      <label className={appTheme ? 'lightMode_color' : ''}>{labelText}</label>
      <img
        data-tip
        data-for={labelText}
        src={appTheme ? lightModehelp : help}
        alt="help-icon"
      />
      <ReactTooltip
        {...props}
        place="top"
        type="light"
        id={labelText}
        effect="solid"
        className="custom-tooltip"
        backgroundColor="var(--sidebar-bg)"
      >
        {isCustomToolTip ? (
          children
        ) : (
          <p id="custom-tooltip-text">{toolTopText}</p>
        )}
      </ReactTooltip>
    </div>
  )
}

export default LabelWithTooltip
