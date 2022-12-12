import React from "react";
import DataTableComponent from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";




const DataTable = (props) => {
  const { columns, data, noHeader } = props
  const tableData = {
    columns,
    data
  };

  return (
    <React.Fragment>
      <DataTableExtensions {...tableData} >
        <DataTableComponent
          title=""
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          noHeader={typeof noHeader !== "undefined" ? noHeader : false}
        />

      </DataTableExtensions>
    </React.Fragment>
  )
}
export default DataTable
