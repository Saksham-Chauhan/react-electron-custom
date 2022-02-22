import React from 'react'
import "./styles.css"
import TableRow from "../proxy-table-row/ProxyTableRow"
import { AppSpacer } from '../../../component'
function ProxyTable() {
  return (
    <div className='proxy-table-container' >
        <div className='tbl-header'>
            <div className='tbl-header-title'>#</div>
            <div className='tbl-header-title'>proxy</div>
            <div className='tbl-header-title'>user</div>
            <div className='tbl-header-title'>password</div>
            <div className='tbl-header-title'>status</div>
            <div className='tbl-header-title'>actions</div>
        </div>
        <AppSpacer spacer={10} />
        <div className='table-body-scroll'>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
            <TableRow/>
        </div>
    </div>
  )
}

export default ProxyTable