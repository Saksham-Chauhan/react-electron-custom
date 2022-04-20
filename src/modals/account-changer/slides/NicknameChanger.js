import React from 'react'
import { AppSpacer, LabelWithToolTip, AppInputField } from '../../../component'
import refresh from '../../../assests/images/refresh.svg'
import './style.css'
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from '../../../component/modal-wrapper/Modal'
import { fetchThemsState } from '../../../features/counterSlice'
import { useSelector } from 'react-redux'
function NicknameChanger({ state, onRefresh, ...props }) {
  const appTheme = useSelector(fetchThemsState)

  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            name="delay"
            {...props}
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in ms)"
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            {...props}
            fieldTitle="Server ID[s]"
            placeholderText="Eg. 936538800027467123"
            name="serverIDs"
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      <AppSpacer spacer={20} />
      <div className="nickname-row">
        <LabelWithToolTip
          toolTopText="Enter your server nick name"
          labelText="Nicknames"
        />
        <div
          onClick={onRefresh}
          className={
            appTheme
              ? 'group-title btn refresh light-mode-sidebar'
              : 'group-title btn refresh'
          }
        >
          <img src={refresh} alt="ref" />
        </div>
      </div>
      <AppInputField
        hideLabel={true}
        isMulti={true}
        {...props}
        value={state['nicknameGenerate']}
        name="nicknameGenerate"
        multiHeight="100px"
        placeholderText={`Eg. 
        jack123
        jack234
        jack344`}
      />
    </React.Fragment>
  )
}

export default NicknameChanger
