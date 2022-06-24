import React from "react";
import DataTable from "../Component/DataTable";

export default class ManageUsers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            createNewUser: false,
            columns: [
                {
                    name: 'Name',
                    selector: 'name',
                    sortable: true,
                },
                {
                    name: 'Email Id',
                    selector: 'emailId',
                    sortable: true,
                },
                {
                    name: 'Status',
                    selector: 'status',
                    sortable: true,
                },
                {
                    name: 'Created At',
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
        this.getUsersList();
    }

    getUsersList() {
    }

    submit() {
        this.setState({
            createNewUser: false
        })
    }
    render() {
        let { columns, dataContent, createNewUser } = this.state;
        return <React.Fragment>
            <div className="main-content">
                <div className="right_col text-left" role="main">
                    {
                        createNewUser ? <div className="create-module">
                            <div className="row">
                                <div className="col-4">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input type="text" class="form-control" placeholder="Enter Name" />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="text" class="form-control" placeholder="Enter email" />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="text" class="form-control" placeholder="Enter Password" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button className={`btn btn-success pull-right`} onClick={() => this.submit()}>Submit</button>
                                </div>
                            </div>
                        </div> : <div className="row">
                            <div className="col-12">
                                <button className={`btn btn-primary pull-right`} onClick={() => {
                                    this.setState({
                                        createNewUser: true
                                    })
                                }}>Create New User</button>
                            </div>
                        </div>
                    }


                    <DataTable
                        title=""
                        columns={columns}
                        data={dataContent}
                    />
                </div>
            </div>
        </React.Fragment>;
    }
}
