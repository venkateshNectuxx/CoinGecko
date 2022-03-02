import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

/**
 * common table component to render the data in table format
 * @param {*} listData // data to display inside table body
 * @param {*} columns //column to display the table header
 * @param {*} onrowClick // optional function if need to trigger when row clicked
 * @returns 
 */
export const TableList = (listData, columns, onrowClick) => {

  const { SearchBar } = Search;

  const tableRowEvents = {
    // onclick the row this method will trigger.
    onClick: (e, row, rowIndex) => {
      if(onrowClick){
        onrowClick(row.id)
      }
    },
    
  }

  return (
        <div className="tableWrapper">
          <ToolkitProvider
            keyField="id" 
            data={listData}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                  <SearchBar {...props.searchProps} />     
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  rowEvents={ tableRowEvents }
                  pagination={paginationFactory()}
                  noDataIndication={"no results found"}
                  wrapperClasses="table-responsive"
                  bordered={false}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
  );
};
