import React from 'react'
import './styles.css'
import ReactTooltip from 'react-tooltip'
import help from '../../assests/images/help.svg'
function LabelWithTooltip({
  toolTopText = "I'm Tooltip",
  labelText,
  isCustomToolTip = false,
  parentStyle,
  children,
  ...props
}) {
  return (
    <div {...parentStyle} className="label-with-tooltip">
      <label>{labelText}</label>
      <img data-tip data-for={labelText} src={help} alt="help-icon" />
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
