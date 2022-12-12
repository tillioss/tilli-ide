import React from "react";
import TopMenu from './Menu/TopMenu';
import SideMenu from './Menu/SideMenu';
import DataTable from "../Component/DataTable";
import { doConnect } from "../config/Common";

export default class AdminList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns : [
                {
                    name: 'Name',
                    selector: 'name',
                    sortable: true,
                },
                {
                    name: 'emailId',
                    selector: 'emailId',
                    sortable: true,
                },
                {
                    name: 'status',
                    selector: 'status',
                    sortable: true,
                },
                {
                    name: 'createdAt',
                    selector: 'createdAt',
                    sortable: true,
                    cell: (row, index, column, id) => {
                        let dateObject = new Date(row.createdAt)
                        let humanDateFormat = dateObject.toLocaleString();
                        return (<div id={row.userId}
                        >
                            <div style={{ fontWeight: 700 }}></div>
                            <p id={row.userId} >{!row.createdAt ? "-" : humanDateFormat}</p>  </div>)
                    }
                }
            ],
            dataContent: []
        }
    }

    componentDidMount() {
        this.getAdminList();
    }

    async getAdminList() {
        let postJson = { sessionId: '123' };
         await doConnect("adminList", "POST", postJson);
    }
    render() {
        let { columns, dataContent} = this.state;
        return <React.Fragment>
            <div className="container body">
                <div className="main_container">
                    {/* <!-- Side Menu--> */}
                    <SideMenu />
                    {/* <!-- Side Menu --> */}
                    {/* <!-- top navigation --> */}
                    <TopMenu />
                    {/* <!-- top navigation --> */}

                    {/* <!-- page content --> */}
                    <div className="right_col" role="main">
                        <div className="">
                            <div className="clearfix"></div>
                            <DataTable
                                title=""
                                columns={columns}
                                data={dataContent}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>;
    }
}
