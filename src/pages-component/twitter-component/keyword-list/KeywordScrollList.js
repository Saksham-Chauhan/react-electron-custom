import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { InputFieldWithScrollList } from '../..'
import {
  addTwitterKeywordInList,
  deleteTwitterDatafromList,
} from '../../../features/logic/twitter'

function KeywordScrollList({ keyWordList, appTheme }) {
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()

  const handleKeywordChange = (e) => {
    const { value } = e.target
    setKeyword(value)
  }

  const handleAddKeyword = () => {
    dispatch(addTwitterKeywordInList({ key: 'KEYWORD', word: keyword }))
    setKeyword('')
  }

  const handleDeleteKeyword = (word) => {
    dispatch(deleteTwitterDatafromList({ key: 'KEYWORD', word }))
  }

  return (
    <div>
      <InputFieldWithScrollList
        isComingSoon={true}
        btnProps={{ onClick: handleAddKeyword }}
        inputProps={{
          value: keyword,
          onChange: handleKeywordChange,
        }}
        list={keyWordList}
        title="Keywords"
        placeHolder="Enter Keywords"
        onDelete={handleDeleteKeyword}
        appTheme={appTheme}
      />
    </div>
  )
}

export default KeywordScrollList
