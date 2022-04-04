import React from 'react'
import "./styles.css"

function WrapperTop({children}) {
  return (
    <div className='wrapper'>
        <div>{children}</div>
    </div>
  )
}

export default WrapperTop