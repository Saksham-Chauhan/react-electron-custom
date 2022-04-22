import React from 'react'
import './style.css'
import play from '../../../assests/images/play.svg'
import lightModeplay from '../../../assests/images/lightMode_play.svg'
import lightModeEditbtn from '../../../assests/images/lightModeEditbtn.svg'

import trash2 from 'react-useanimations/lib/trash2'
import edit from '../../../assests/images/edit.svg'
import UseAnimations from 'react-useanimations'
import {
  fetchNftWalletListState,
  fetchThemsState,
  setEditStorage,
  setModalState,
} from '../../../features/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { removeTaskFromList } from '../../../features/logic/nft'
import { sendLogs } from '../../../helper/electron-bridge'

const TableSection = ({ list = [] }) => {
  const dispatch = useDispatch()
  const walletList = useSelector(fetchNftWalletListState)
  const handleDeleteTask = (task) => {
    const log = `Delete the Minter task with id -> ${task.id}`
    sendLogs(log)
    dispatch(removeTaskFromList(task))
  }

  const handleTaskPlay = (task) => {
    const log = `Start minting the task with id -> ${task.id}`
    sendLogs(log)
    console.log(task)
  }

  const handleTaskEdit = (task) => {
    dispatch(setEditStorage(task))
    dispatch(setModalState('nftTaskModal'))
  }

  return (
    <div className="minter-table padding-horizontal">
      <div className="table-header-parent">
        <div className="table-header">
          <div>#</div>
          <div>Contract</div>
          <div>Mode</div>
          <div>Wallet</div>
          <div>Status </div>
          <div>Action </div>
        </div>
      </div>
      <div className="minter-table-scroll">
        {list?.map((row, index) => {
          return (
            <MinterTableRow
              onDelete={handleDeleteTask}
              key={row['id']}
              onEdit={handleTaskEdit}
              {...{ row, index }}
              onPlay={handleTaskPlay}
              wallet={walletList?.filter((w) => w.id === row?.walletID)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TableSection

const MinterTableRow = ({
  row,
  index,

  onDelete,
  onPlay,
  onEdit,
  wallet,
}) => {
  const appTheme = useSelector(fetchThemsState)

  const theme = {
    tableBg: appTheme ? 'table-header body light-bg ' : 'table-header body ',
    tableData: appTheme ? 'lightMode_color' : '',
    playBtn: appTheme ? lightModeplay : play,
    editBtn: appTheme ? lightModeEditbtn : edit,
  }

  return (
    <div className={theme.tableBg}>
      <div className={theme.tableData}>{index + 1}</div>
      <div className={theme.tableData}>{row?.contractAddress}</div>
      <div className={theme.tableData}>{row?.gasPriceMethod}</div>
      <div className={theme.tableData}>{row?.walletName} </div>
      <div className={theme.tableData}>{row?.status}</div>
      <div>
        <img
          src={theme.playBtn}
          onClick={() =>
            onPlay({
              ...row,
              wallet: wallet.length > 0 ? { ...wallet[0] } : {},
            })
          }
          alt=""
        />
        <img onClick={() => onEdit(row)} src={theme.editBtn} alt="" />
        <UseAnimations
          wrapperStyle={{ cursor: 'pointer' }}
          animation={trash2}
          strokeColor="#B60E0E"
          size={25}
          onClick={() => onDelete(row)}
        />
      </div>
    </div>
  )
}
