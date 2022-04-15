import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputFieldWithScrollList } from '../..'
import { chromeRegExp } from '../../../constant/regex'
import {
  fetchChromeUserListState,
  fetchThemsState,
} from '../../../features/counterSlice'
import {
  addChromeUserInList,
  removeChromeUserFromList,
} from '../../../features/logic/setting'
import { toastWarning } from '../../../toaster'

function ChromeUser() {
  const dispatch = useDispatch()
  const chromeList = useSelector(fetchChromeUserListState)
  const appTheme = useSelector(fetchThemsState)

  const [chrome, setChrome] = useState('')

  const handleChange = (e) => {
    const { value } = e.target
    setChrome(value)
  }

  const handleAdd = () => {
    if (chromeRegExp.test(chrome)) {
      dispatch(addChromeUserInList(chrome))
      setChrome('')
    } else toastWarning('Enter valid Chrome User')
  }

  const handleDelete = (group) => {
    dispatch(removeChromeUserFromList(group))
  }

  return (
    <div>
      <InputFieldWithScrollList
        btnProps={{ onClick: handleAdd }}
        inputProps={{
          value: chrome,
          onChange: handleChange,
        }}
        onDelete={handleDelete}
        title="Chrome User"
        list={chromeList}
        placeHolder="Enter Chrome User (e.g. Guest)"
        appTheme={appTheme}
      />
    </div>
  )
}

export default ChromeUser
