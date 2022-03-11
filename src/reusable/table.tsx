import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

/**
 * common table component to render the data in table format
 * @param {*} listData // data to display inside table body
 * @param {*} columns //column to display the table header
 * @param {*} onrowClick // optional function if need to trigger when row clicked
 * @returns 
 */
interface Props{
  listData: any;
  columns: any;
  onrowClick: any;
}

const TableList = ({listData, columns, onrowClick}: Props) => {

  const tableRowEvents = {
    // onclick the row this method will trigger.
    onClick: (e: any, row:any, rowIndex: any ) => {
      if(onrowClick){
        onrowClick(row.id)
      }
    },
  }

  return (
        <div className="tableWrapper">
          <BootstrapTable
            keyField="id" 
            data={listData}
            columns={columns}
            rowEvents={ tableRowEvents }
            pagination={paginationFactory({sizePerPage: 10, page: 1})}
            noDataIndication={"no results found"}
            wrapperClasses="table-responsive"
            bordered={false}
          />
        </div>
  );
};

export default TableList
