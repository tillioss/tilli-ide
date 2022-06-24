import React from "react";
import Card from "../../Component/Card";
import Modal from "../../Component/Modal";
import PaginationDatatable from "../../Component/PaginationDatatable";
import Menu from "../Menu/Menu";
import { ToastContainer, toast } from 'react-toastify';
import { doConnect } from "../../config/Common";

export default class Pages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageModal: false,
            title: "",
            route: "",
            refresh: false
        }
    }

    async save() {
        let { title, route, refresh } = this.state;
        let postJson = { sessionId: '123', title, route };
        let responseData = await doConnect("createPage", "POST", postJson);

        if (responseData.response === "Success") {
            this.setState({
                refresh: !refresh,
                pageModal: false
            }, () => {
                toast.success('Page added Suucessfully.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        } else if (responseData.response === "Failure") {
            toast.error('Page already exist', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    render() {
        let { pageModal, refresh } = this.state;
        return <div className="main-content">
            <ToastContainer />
            <Card title={"Pages"}>
                <div className="row">
                    <div className="col-12">
                        <button className="btn theme-bg pull-right" onClick={() => {
                            this.setState({
                                pageModal: true
                            })
                        }}>Add Pages</button>
                    </div>
                </div>
                <PaginationDatatable
                    refresh={refresh}
                    domain={"admin"}
                    event={"getPages"}
                    data={
                        [
                            {
                                column: "Title",
                                selector: 'title',
                            },
                            {
                                column: "Route",
                                selector: 'route',
                            },
                            {
                                column: "Created At",
                                cell: (row) => {
                                    let dateObject = new Date(row.createdAt)
                                    let humanDateFormat = dateObject.toLocaleString();
                                    return humanDateFormat
                                }
                            },
                        ]
                    }
                />
            </Card>

            {pageModal && <Modal
                visible={pageModal}
                closeModal={() => this.setState({ pageModal: false })}
                heading={`Add Page`}
                body={<React.Fragment>
                    <div className="form-group">
                        <label>Page</label>
                        <input type="text" className="form-control" placeholder="Enter Page Title" onChange={(e) => {
                            this.setState({
                                title: e.target.value
                            })
                        }} />
                    </div>
                    <div className="form-group">
                        <label>Routing</label>
                        <input type="text" className="form-control" placeholder="Enter Page Routing" onChange={(e) => {
                            this.setState({
                                route: e.target.value
                            })
                        }} />
                    </div>
                </React.Fragment>
                }
                footer={<React.Fragment>
                    <button type="button" className="btn theme-bg" onClick={() => this.save()}>Save changes</button>
                </React.Fragment>}
            />
            }
        </div>;
    }
}
