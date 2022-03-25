import React from "react";
import "./styles.css";
import TableRow from "../proxy-table-row/ProxyTableRow";
import { AppSpacer } from "../../../component";
import { useDispatch } from "react-redux";
import { deleteProxyRow } from "../../../features/logic/proxy";
import { proxyTester } from "../../../helper/electron-bridge";
import { setEditStorage, setModalState } from "../../../features/counterSlice";

function ProxyTable({ list }) {
  const dispatch = useDispatch();

  const handleDeleteProxy = (proxy) => {
    dispatch(deleteProxyRow(proxy));
  };

  const handleEditProxy = (proxy) => {
    dispatch(setEditStorage(proxy));
    dispatch(setModalState("editProxy"));
  };

  const handleTestProxy = (proxy) => {
    proxyTester(proxy);
  };

  return (
    <div className="proxy-table-container">
      <div className="tbl-header">
        <div className="tbl-header-inner">
          <div className="tbl-header-title">#</div>
          <div className="tbl-header-title">proxy</div>
          <div className="tbl-header-title">user</div>
          <div className="tbl-header-title">password</div>
          <div className="tbl-header-title">status</div>
          <div className="tbl-header-title">actions</div>
        </div>
      </div>
      <AppSpacer spacer={10} />
      <div className="table-body-scroll">
        {list.map((row, index) => (
          <TableRow
            data={row}
            key={row["id"]}
            index={index + 1}
            onTest={handleTestProxy}
            onEdit={handleEditProxy}
            onDelete={handleDeleteProxy}
          />
        ))}
      </div>
    </div>
  );
}

export default ProxyTable;
