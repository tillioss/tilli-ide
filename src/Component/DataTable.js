import React from "react";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";




export default (props)=>{
    const {columns,data, noHeader }=props

    const tableData = {
        columns,
        data
      };

    return(
        <React.Fragment>
             <DataTableExtensions {...tableData} >

        <DataTable
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