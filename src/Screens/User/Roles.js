import React from "react";
import Card from "../../Component/Card";
import Modal from "../../Component/Modal";
import PaginationDatatable from "../../Component/PaginationDatatable";
import { ToastContainer, toast } from 'react-toastify';
import DropDown from "../../Component/DropDown";
import { doConnect } from "../../config/Common";

export default class Roles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roleModal: false,
            roleToPageModal: false,
            role: "",
            refresh: false,
            roleId: "",
            selectedPageOption: [],
            pageOption: []
        }
    }

    componentDidMount() {
        this.getPages()
    }

    async getPages() {
        let postJson = { sessionId: '123', pageLimit: 100, noOfPage: 1 };
        let responseData = await doConnect("getPages", "POST", postJson);
        let result = responseData.result;
        let pageOption = [];
        Object.keys(result).map((option) => {
            pageOption.push({ value: option, label: result[option].title })
            return pageOption
        })

        this.setState({
            pageOption
        })
    }
    setRole(e) {
        this.setState({
            role: e.target.value
        })
    }
    async save() {
        let { role, refresh } = this.state;
        let postJson = { sessionId: '123', role };
        let responseData = await doConnect("createRole", "POST", postJson);
        if (responseData.response === "Success") {
            this.setState({
                refresh: !refresh,
                roleModal: false
            }, () => {
                toast.success('User added Suucessfully.', {
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
            toast.error('User already exist', {
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

    async setPageAccess(roleId) {
        let { pageOption } = this.state;
        let postJson = { sessionId: '123', roleId };
        let responseData = await doConnect("getMapRoleToPage", "POST", postJson);
        let selectedPageOption = [];
        pageOption.map((option) => {
            if (responseData.listOfPageIds.includes(option.value)) {
                selectedPageOption.push(option)
            }
            return pageOption
        })
        this.setState({
            roleId,
            roleToPageModal: true,
            selectedPageOption
        })
    }

    async saveMap() {
        let { selectedPageOption, roleId } = this.state;
        let pages = selectedPageOption.map(function (item) {
            return item.value;
        });

        let postJson = { sessionId: '123', roleId, pages };
        let responseData = await doConnect("mapRoleToPage", "POST", postJson);
        if (responseData.response === "Success") {
            this.setState({
                roleToPageModal: false
            }, () => {
                toast.success('Mapped Suucessfully.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        }
    }
    render() {
        let { roleModal, refresh, roleToPageModal, pageOption, selectedPageOption } = this.state;
        return <div className="main-content">
            <ToastContainer />
            <Card title={"Roles"}>
                <div className="row">
                    <div className="col-12">
                        <button className="btn theme-bg pull-right" onClick={() => {
                            this.setState({
                                roleModal: true
                            })
                        }}>Add Role</button>
                    </div>
                </div>
                <PaginationDatatable
                    refresh={refresh}
                    domain={"admin"}
                    event={"getRoles"}
                    data={
                        [
                            {
                                column: "Role",
                                selector: 'role',
                            },
                            {
                                column: "Page",
                                cell: (row) => {
                                    return <div>
                                        <button className="btn btn-sm btn-success" onClick={() => this.setPageAccess(row.roleId)}>Edit</button>
                                    </div>
                                }
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

            {
                roleModal && <Modal
                    visible={roleModal}
                    closeModal={() => this.setState({ roleModal: false })}
                    heading={`Add Role`}
                    body={<React.Fragment>
                        <div className="form-group">
                            <label>Role</label>
                            <input type="text" className="form-control" placeholder="Enter Role" onChange={(e) => this.setRole(e)} />
                        </div>
                    </React.Fragment>
                    }
                    footer={<React.Fragment>
                        <button type="button" className="btn theme-bg" onClick={() => this.save()}>Save changes</button>
                    </React.Fragment>}
                />
            }
            {
                roleToPageModal && <Modal
                    visible={roleToPageModal}
                    closeModal={() => this.setState({ roleToPageModal: false })}
                    heading={`Assign Page`}
                    body={<React.Fragment>
                        <div className="form-group">
                            <label>Page</label>
                            <DropDown
                                selectedOption={selectedPageOption}
                                onChange={(e) => {
                                    this.setState({
                                        selectedPageOption: e
                                    })
                                }}
                                options={pageOption}
                                isDisabled={false}
                                isMulti={true}
                            />
                        </div>
                    </React.Fragment>
                    }
                    footer={<React.Fragment>
                        <button type="button" className="btn theme-bg" onClick={() => this.saveMap()}>Save changes</button>
                    </React.Fragment>}
                />
            }
        </div>;
    }
}
