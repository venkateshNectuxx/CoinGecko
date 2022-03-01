import React, {useState} from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

const options = {
  paginationSize: 4,
  pageStartIndex: 1,
};

export const TableList = (listData, columns, onrowClick) => {

  const { SearchBar } = Search;

  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${rowIndex}`);
      console.log(row.id)
      onrowClick(row.id)
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
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
  );
};
