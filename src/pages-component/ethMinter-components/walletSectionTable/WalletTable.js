import React from "react";
import "./style.css";
import { fetchThemsState } from "../../../features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import refreshWallet from "../../../assests/images/refreshWallet.svg";
import { removeNftWalletFromList } from "../../../features/logic/nft";
import { sendLogs } from "../../../helper/electron-bridge";

const WalletTable = ({ walletList = [] }) => {
  const dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);

  const handleDeleteRow = (row) => {
    const log = `${row?.walletNickName} Wallet id deleted`;
    sendLogs(log);
    dispatch(removeNftWalletFromList(row));
  };

  const WalletTableRow = ({ wallet, index, onDelete }) => (
    <div
      className={`   ${
        appTheme
          ? "acc-chnager-page-table-header body activeLink"
          : "acc-chnager-page-table-header body"
      } `}
    >
      <div>{index}</div>
      <div>{wallet?.walletNickName}</div>
      <div>{wallet?.walletPublicKey}</div>
      <div>{wallet?.walletBalance}</div>
      <div>
        <div
          style={{ alignItems: "center" }}
          className="acc-changer-table-row-action-column"
        >
          <img src={refreshWallet} alt="" />
          <UseAnimations
            wrapperStyle={{ cursor: "pointer" }}
            animation={trash2}
            strokeColor="#B60E0E"
            size={25}
            onClick={() => onDelete(wallet)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="wallet-table-section">
      <div className="acc-chnager-table-header-parent">
        <div
          className={
            appTheme
              ? "acc-chnager-page-table-header activeLink"
              : "acc-chnager-page-table-header"
          }
        >
          <div>#</div>
          <div>Wallet Nickname</div>
          <div>Wallet Address</div>
          <div>Wallet Balance</div>
          <div>Actions</div>
        </div>
      </div>
      <div className="wallet-table-scroll">
        {walletList.map((wallet, index) => (
          <WalletTableRow
            onDelete={handleDeleteRow}
            index={index + 1}
            {...{ wallet }}
            key={wallet["id"] || `wallet-table-item-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default WalletTable;
