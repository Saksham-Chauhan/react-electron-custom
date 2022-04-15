import React from 'react'
import Select from 'react-select'
import { selectCustomStyles, selectStyles } from './styles'
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

  return (
    <div className="input-field-container" onClick={props.navigate}>
      {isCustomLabel && <label className="custom-label">{fieldTitle}</label>}
      {!hideLabel && <label>{fieldTitle}</label>}
      {!isSelect ? (
        <div className="input-field-box">
          {!isMulti ? (
            !isCustomInputField ? (
              <input
                className={
                  appTheme
                    ? `${isCustomLabel} paragraph-color lightBg`
                    : `${isCustomLabel && 'custom-label-input'}`
                }
                {...props}
                autoSave="off"
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                placeholder={placeholderText}
                style={{ border: appTheme ? 'none' : '' }}
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
            styles={isCustomLabel ? selectCustomStyles : selectStyles}
            isSearchable={false}
          />
        </div>
      )}
    </div>
  )
}

export default InputField
