import React from 'react'
import small_bot from '../../assests/images/small-bot.svg'
import { fetchThemsState } from '../../features/counterSlice'
import { useSelector } from 'react-redux'
import './styles.css'

function Modal({ children, bgImageURL, ...props }) {
  const appTheme = useSelector(fetchThemsState)

  return (
    <div className="modal-wrapper">
      <div
        {...props}
        className={appTheme ? 'modal-inner light-bg-modal  ' : 'modal-inner'}
      >
        <div className="server-img">
          <img src={bgImageURL ? bgImageURL : small_bot} alt="Server Logo" />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal

export const ModalFlexOuterRow = ({ children }) => (
  <div className="modal-flex">{children}</div>
)

export const ModalFlexInnerRow = ({ children }) => (
  <div className="modal-flex-half">{children}</div>
)
