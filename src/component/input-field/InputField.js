import React from 'react'
import Select from 'react-select'
import {
  selectCustomStyles,
  selectStyles,
  lightMode_selectStyles,
} from './styles'
import NumberFormat from 'react-number-format'
import './styles.css'
import { useSelector } from 'react-redux'
import { fetchThemsState } from '../../features/counterSlice'
const DefaultOptions = []

function InputField({
  isSelect = false,
  isCustomInputField = false,
  placeholderText = 'Select Site',
  fieldTitle = 'Site',
  hideLabel = false,
  format = '### ### ####',
  defaultValue = '',
  isMulti = false,
  multiHeight = '150px',
  selectOptions = DefaultOptions,
  isCustomLabel = false,
  ...props
}) {
  const appTheme = useSelector(fetchThemsState)
  const textClass = appTheme ? 'lightMode_color' : ''
  return (
    <div className="input-field-container" onClick={props.navigate}>
      {isCustomLabel && <label className="custom-label ">{fieldTitle}</label>}
      {!hideLabel && <label className={textClass}>{fieldTitle}</label>}
      {!isSelect ? (
        <div className="input-field-box">
          {!isMulti ? (
            !isCustomInputField ? (
              <input
                className={
                  appTheme
                    ? `${isCustomLabel} paragraph-color lightModeInput`
                    : `${isCustomLabel && 'custom-label-input'}`
                }
                {...props}
                autoSave="off"
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                placeholder={placeholderText}
              />
            ) : (
              <NumberFormat
                {...props}
                autoSave="off"
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                placeholder={placeholderText}
                format={format}
              />
            )
          ) : (
            <textarea
              style={{
                height: multiHeight,
              }}
              {...props}
              placeholder={placeholderText}
              className={appTheme ? 'lightModeInput ' : ''}
            ></textarea>
          )}
        </div>
      ) : (
        <div className="input-field-box">
          <Select
            {...props}
            placeholder={placeholderText}
            isOptionSelected={true}
            options={selectOptions}
            styles={
              isCustomLabel
                ? selectCustomStyles
                : appTheme
                ? lightMode_selectStyles
                : selectStyles
            }
            isSearchable={false}
          />
        </div>
      )}
    </div>
  )
}

export default InputField
