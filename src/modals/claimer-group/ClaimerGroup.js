import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { claimerGroupSchema } from '../../validation'
import {
  fetchEditStorageState,
  fetchSelectedClaimerGroupState,
  fetchThemsState,
  setEditStorage,
  setModalState,
  setSelectedClaimerGroup,
} from '../../features/counterSlice'
import { validationChecker } from '../../hooks/validationChecker'
import {
  addGroupInClaimerList,
  editClaimerGroupFromList,
} from '../../features/logic/setting'
import { AppInputField, AppSpacer, ModalWrapper } from '../../component'
import { toastWarning } from '../../toaster'
import { sendLogs } from '../../helper/electron-bridge'

function ClaimerGroup() {
  const dispatch = useDispatch()
  const appTheme = useSelector(fetchThemsState)

  const editState = useSelector(fetchEditStorageState)
  const selectedClaimerGroup = useSelector(fetchSelectedClaimerGroupState)
  const [claimer, setClaimer] = useState({
    id: '',
    name: '',
    claimerList: [],
    claimerToken: '',
    createdAt: new Date().toUTCString(),
  })

  useEffect(() => {
    if (Object.keys(editState).length > 0) {
      setClaimer((pre) => {
        return { ...editState }
      })
    }
    return () => {
      dispatch(setEditStorage({}))
    }
  }, [editState, dispatch])

  const handleChange = (e) => {
    const { value, name } = e.target
    setClaimer((pre) => {
      return { ...pre, [name]: value }
    })
  }

  const handleCloseModal = () => {
    dispatch(setModalState('claimerGroup'))
  }
  // email:username:password:token
  const handleSubmit = () => {
    let valid = []
    let obj = { ...claimer }
    const result = validationChecker(claimerGroupSchema, obj)
    obj.claimerToken.split('\n').forEach((t) => {
      let str = t?.split(':')
      if (str.length === 4) {
        valid.push(t)
      }
    })
    obj['claimerToken'] = valid.map((v) => v).join('\n')
    if (result) {
      if (valid.length > 0) {
        if (Object.keys(editState).length > 0) {
          dispatch(editClaimerGroupFromList(obj))
          if (obj['id'] === selectedClaimerGroup['id']) {
            let objClaimer = {}
            objClaimer['label'] = obj['name']
            objClaimer['id'] = obj['id']
            objClaimer['value'] = obj['claimerToken']
            dispatch(setSelectedClaimerGroup(objClaimer))
          }
        } else {
          const log = `New Token Group is created ${obj['name']}`
          sendLogs(log)
          dispatch(addGroupInClaimerList(obj))
        }
        handleCloseModal()
      } else toastWarning('Enter some valid token')
    }
  }
  const textClass = appTheme ? 'lightMode_color' : ''

  return (
    <ModalWrapper>
      <div className="modal-tilte">
        <h2 className={textClass}>
          {Object.keys(editState).length > 0 ? 'Edit' : 'Create'} Token Group
        </h2>
      </div>
      <AppSpacer spacer={30} />
      <AppInputField
        value={claimer.name}
        onChange={handleChange}
        name="name"
        fieldTitle="Name"
        placeholderText="Enter Name"
      />
      <AppSpacer spacer={10} />
      <AppInputField
        fieldTitle="Tokens"
        name="claimerToken"
        isMulti={true}
        onChange={handleChange}
        value={claimer.claimerToken}
        placeholderText="email:username:password:token"
      />
      <AppSpacer spacer={30} />
      <div className="modal-control-btns">
        <div
          onClick={handleCloseModal}
          className={
            appTheme
              ? 'modal-cancel-btn btn light-mode-modalbtn'
              : 'modal-cancel-btn btn'
          }
        >
          <span className={textClass}>Cancel</span>
        </div>
        <div
          onClick={handleSubmit}
          className={
            appTheme
              ? 'modal-cancel-btn submit btn btn-shadow '
              : ' modal-cancel-btn submit btn'
          }
        >
          <span>{Object.keys(editState).length > 0 ? 'Save' : 'Create'}</span>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ClaimerGroup
