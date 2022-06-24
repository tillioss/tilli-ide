import React from "react";
import Card from "../../Component/Card";
import Modal from "../../Component/Modal";
import PaginationDatatable from "../../Component/PaginationDatatable";
import Menu from "../Menu/Menu";
import { ToastContainer, toast } from 'react-toastify';
import DropDown from "../../Component/DropDown";
import { doConnect } from "../../config/Common";

export default class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userModal: false,
            name: "",
            email: "",
            password: "",
            refresh: false,
            userId: "",
            userToRoleModal: false,
            selectedRoleOption: [],
            roleOption: []
        }
    }

    componentDidMount() {
        this.getRoles()
    }

    async getRoles() {
        let postJson = { sessionId: '123', pageLimit: 100, noOfPage: 1 };
        let responseData = await doConnect("getRoles", "POST", postJson);
        let result = responseData.result;
        let roleOption = [];
        Object.keys(result).map((option) => {
            roleOption.push({ value: option, label: result[option].role })
        })

        this.setState({
            roleOption
        })
    }

    async save() {
        let { name, email, password, refresh } = this.state;
        let loginId = localStorage.getItem("loginId");
        let postJson = { sessionId: '123', name, email, password, createdBy: loginId };
        let responseData = await doConnect("createMember", "POST", postJson);
        if (responseData.response === "Success") {
            this.setState({
                refresh: !refresh,
                userModal: false
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

    async setRoleAccess(userId) {
        let { roleOption } = this.state;
        let postJson = { sessionId: '123', userId };
        let responseData = await doConnect("getMapUserToRole", "POST", postJson);

        let selectedRoleOption = [];
        roleOption.map((option) => {
            if (responseData.listOfRoleIds.includes(option.value)) {
                selectedRoleOption.push(option)
            }
        })
        this.setState({
            userId,
            userToRoleModal: true,
            selectedRoleOption
        })
    }

    async saveMap() {
        let { selectedRoleOption, userId } = this.state;
        let roles = selectedRoleOption.map(function (item) {
            return item.value;
        });

        let postJson = { sessionId: '123', userId, roles };
        let responseData = await doConnect("mapUserToRole", "POST", postJson);

        if (responseData.response === "Success") {
            this.setState({
                userToRoleModal: false
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
        let { userModal, refresh, userToRoleModal, selectedRoleOption, roleOption } = this.state;
        return <div className="main-content">
            <ToastContainer />
            <Card title={"Users"}>
                <div className="row">
                    <div className="col-12">
                        <button className="btn theme-bg pull-right" onClick={() => {
                            this.setState({
                                userModal: true
                            })
                        }}>Add User</button>
                    </div>
                </div>
                <PaginationDatatable
                    refresh={refresh}
                    domain={"admin"}
                    event={"getMembers"}
                    data={
                        [
                            {
                                column: "Name",
                                selector: 'name',
                            },
                            {
                                column: "Email",
                                selector: 'email',
                            },
                            {
                                column: "Roles",
                                cell: (row) => {
                                    return <div>
                                        <button className="btn btn-sm btn-success" onClick={() => this.setRoleAccess(row.memberId)}>Edit</button>
                                    </div>
                                }
                            },
                            {
                                column: "Status",
                                cell: (row) => {
                                    return row.status
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
                userModal && <Modal
                    visible={userModal}
                    closeModal={() => this.setState({ userModal: false })}
                    heading={`Add Users`}
                    body={<React.Fragment>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Enter Name" onChange={(e) => {
                                this.setState({
                                    name: e.target.value
                                })
                            }} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Enter Email" onChange={(e) => {
                                this.setState({
                                    email: e.target.value
                                })
                            }} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter Password" onChange={(e) => {
                                this.setState({
                                    password: e.target.value
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

            {
                userToRoleModal && <Modal
                    visible={userToRoleModal}
                    closeModal={() => this.setState({ userToRoleModal: false })}
                    heading={`Assign Role`}
                    body={<React.Fragment>
                        <div className="form-group">
                            <label>Page</label>
                            <DropDown
                                selectedOption={selectedRoleOption}
                                onChange={(e) => {
                                    this.setState({
                                        selectedRoleOption: e
                                    })
                                }}
                                options={roleOption}
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
