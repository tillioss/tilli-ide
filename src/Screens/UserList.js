import React from "react";
import TopMenu from '../Screens/Menu/TopMenu';
import SideMenu from '../Screens/Menu/SideMenu';
import DataTable from "../Component/DataTable";
import MyConstant from "../config/MyConstant";
import { doConnect } from "../config/Common";





export default class UserList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shortUserInfoMap: "", userDetails: "", loadingState: false
        }
    }


    async componentDidMount() {


        let postJson = { sessionId: '1223' };
        let that = this;
        let responseData = await doConnect("getAllUserList", "POST", postJson);
        let json = responseData;

        let data_content = [];
        Object.keys(json.shortUserInfoMap).map((ival, index) => {
            data_content.push(json.shortUserInfoMap[ival])
        });

        // console.log('data_content', data_content)
        this.setState({ shortUserInfoMap: json.shortUserInfoMap, data_content })

        let columns = [

            // {
            //     name: 'Name',
            //     selector: 'name',
            //     sortable: true,
            // },
            // {
            //     name: 'emailId',
            //     selector: 'emailId',
            //     sortable: true,
            // },
            {
                name: 'Session Id',
                selector: 'userId',
                sortable: true,
            },
            // {
            //     name: 'nameOfChild',
            //     selector: 'nameOfChild',
            //     sortable: true,
            // },
            {
                name: 'ageOfChild',
                selector: 'ageOfChild',
                sortable: true,
            },
            {
                name: 'genderOfChild',
                selector: 'genderOfChild',
                sortable: true,
                cell: (row, index, column, id) => {

                    return (<div id={row.userId + "g"}
                    >
                        <div style={{ fontWeight: 700 }}></div>
                        <p id={row.userId + "g"} >{!row.genderOfChild ? "-" : row.genderOfChild}</p>  </div>)
                }
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
            },
            // {
            //     name: 'lastLogin',
            //     selector: "lastLogin",
            //     sortable: true,
            //     cell: (row, index, column, id) => {
            //         let dateObject = new Date(row.lastLogin)
            //         let humanDateFormat = dateObject.toLocaleString();
            //         return (<div id={row.userId}
            //         >
            //             <div style={{ fontWeight: 700 }}></div>
            //             <p id={row.userId} >{!row.lastLogin ? "No login" : humanDateFormat}</p>  </div>)
            //     }

            //     //console.log(new Date(data_content[findindex].lastLogin ))      
            // },
            // {
            //     name: 'lastLogout',
            //     selector: 'lastLogout',
            //     sortable: true,
            //     cell: (row, index, column, id) => {
            //         let dateObject = new Date(row.lastLogout)
            //         let humanDateFormat = dateObject.toLocaleString();

            //         return (<div id={row.userId}
            //         >
            //             <div style={{ fontWeight: 700 }}></div>
            //             <p id={row.userId} >{!row.lastLogout ? "No login" : humanDateFormat}</p>  </div>)
            //     }
            // },
            // {
            //     name: 'Gamestatus',
            //     selector: 'Gamestatus',
            //     sortable: true,
            //     cell: (row, index, column, id) =>
            //         <div id={row.userId}
            //         >
            //             <div style={{ fontWeight: 700 }}></div>
            //             <button id={row.userId} className="btn btn-danger" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={(e) => {
            //                 const { data_content } = this.state;
            //                 let findindex = data_content.findIndex((a) =>
            //                     a.userId === e.target.id
            //                 )
            //                 this.getGameStatus(e.target.id, data_content[findindex].name)
            //                 this.setState({ loadingState: false })

            //             }}>View</button>  </div>,
            // },
            {
                name: 'Attempts',
                selector: 'Attempts',
                sortable: true,
                cell: (row, index, column, id) => {
                    return <div style={{ padding: 10 }}>
                        <button id={row.userId} className="btn btn-info" onClick={() => {
                            localStorage.setItem("Username", row.name)
                            localStorage.setItem("Userid", row.userId)
                            // this.props.history.push('/' + MyConstant.keyList.projectUrl + '/viewattempts')
                            window.open("/" + MyConstant.keyList.projectUrl + '/viewattempts/' + row.userId, "_blank");
                        }}>View Attempts</button>
                    </div>
                },
            },
        ]

        this.setState({ columns })

    }


    async getGameStatus(userid, username) {


        let postJson = { sessionId: '1223', userId: userid };
        let responseData = await doConnect("getUserGameStatus", "POST", postJson);
        let json = responseData;

        if (json.response == null) {

            let data = {}
            data.feelingTool = 0
            data.level = 0
            data.points = 0
            data.username = username
            this.setState({ userDetails: data, loadingState: true })
        }
        else {

            this.setState({ userDetails: { ...JSON.parse(responseData.response), username }, loadingState: true })
            console.log('JSON.parse(responseData.response)', JSON.parse(responseData.response))
        }


    }


    render() {
        const { data_content, columns, userDetails, loadingState } = this.state;
        return (<React.Fragment>
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
                            {/* <!--content --> */}
                            <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        {loadingState ?
                                            <React.Fragment>
                                                <div className="row form-group mt-2">
                                                    <div className="col-2" />
                                                    <div className="col-8"> <h4 style={{ color: "black" }}> View Details  </h4>  </div>
                                                    <div className="col-2" />
                                                </div>


                                                <div className="row form-group">
                                                    <div className="col-1" />
                                                    <div className="col-2"> <label style={{ color: "black" }}> Name </label> </div>
                                                    <div className="col-8"> <p style={{ color: "black" }}> {userDetails.username}   </p>  </div>
                                                    <div className="col-1" />
                                                </div>


                                                <div className="row form-group">
                                                    <div className="col-1" />
                                                    <div className="col-2"> <label style={{ color: "black" }}> FeelingTool </label> </div>
                                                    <div className="col-8"> <p style={{ color: "black" }}> {userDetails.feelingTool} </p> </div>
                                                    <div className="col-1" />
                                                </div>

                                                <div className="row form-group">
                                                    <div className="col-1" />
                                                    <div className="col-2"> <label style={{ color: "black" }}> Level </label> </div>
                                                    <div className="col-8"> <p style={{ color: "black" }}> {userDetails.level}   </p>  </div>
                                                    <div className="col-1" />
                                                </div>


                                                <div className="row form-group">
                                                    <div className="col-1" />
                                                    <div className="col-2">  <label style={{ color: "black" }}> Points </label> </div>
                                                    <div className="col-8"> <p style={{ color: "black" }}>  {userDetails.points}   </p>  </div>
                                                    <div className="col-1" />
                                                </div>

                                            </React.Fragment>

                                            :

                                            <React.Fragment>
                                                <div className="row">
                                                    <div className="col-sm-4"> </div>
                                                    <div className="col-sm-4">
                                                        <div className="loader"></div>
                                                    </div>
                                                    <div className="col-sm-4"> </div>
                                                </div>
                                            </React.Fragment>

                                        }
                                    </div>
                                </div>
                            </div>

                            <DataTable
                                title=""
                                columns={columns}
                                data={data_content}
                            />

                            {/* <!--content --> */}

                        </div>
                    </div>
                    {/* <!-- /page content --> */}

                    {/* <!-- footer content --> */}
                    <footer>
                        <div className="pull-right">
                            {/* Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a> */}
                        </div>
                        <div className="clearfix"></div>
                    </footer>
                    {/* <!-- /footer content --> */}
                </div>
            </div>

        </React.Fragment>
        )

    }



}