import React from 'react'
import './styles.css'

function Checkbox({ id, ...props }) {
  return (
    <div className="custom-checkbox">
      <input {...props} id={id} type="checkbox" />
      <label htmlFor={id}></label>
    </div>
  )
}

export default Checkbox
