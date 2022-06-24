import React from "react";
import TopMenu from '../Screens/Menu/TopMenu';
import SideMenu from '../Screens/Menu/SideMenu';
import DataTable from "../Component/DataTable";
import { doConnect } from "../config/Common";

export default class AttemptDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loadingState: false,
            userLevelId: false
        }
    }


    async componentDidMount() {
        console.log(this.props.match.params.Userid)
        console.log('userid==>', this.props.match.params.Userid)
        let postJson = { sessionId: '1223', userId: this.props.match.params.Userid };
        let responseData = await doConnect("getLevelAttempts", "POST", postJson);
        let json = responseData;
        if (responseData.levelAttemptMap) {
            let levelAttempt = []
            Object.keys(responseData.levelAttemptMap).map((ival, index) => {
                if (responseData.levelAttemptMap[ival].levelName) {
                    levelAttempt.push(responseData.levelAttemptMap[ival])
                }

            });
            this.setState({ levelAttempt: levelAttempt })

        }
        else {

        }

        let columns = [

            {
                name: 'LevelName',
                selector: 'levelName',
                sortable: true,
            },
            {
                name: 'AttamptNo',
                selector: 'attamptNo',
                sortable: true,
            },
            {
                name: 'levelPoint',
                selector: 'levelPoint',
                sortable: true,
            },
            {
                name: 'createdAt',
                selector: 'createdAt',
                sortable: true,
                cell: (row, index, column, id) => {
                    let dateObject = new Date(row.createdAt)
                    let humanDateFormat = dateObject.toLocaleString();
                    return (<div id={index}
                    >
                        <div style={{ fontWeight: 700 }}></div>
                        <p id={index} >{!row.createdAt ? "-" : humanDateFormat}</p>  </div>)
                }
            },
            {
                name: 'View',
                selector: 'View',
                sortable: true,
                cell: (row, index, column, id) =>
                    <div >
                        <div style={{ fontWeight: 700 }}></div>
                        <button id={index} data-toggle="modal" data-target=".bd-example-modal-lg" className="btn btn-danger" onClick={(e) => {
                            const { levelAttempt } = this.state;
                            //console.log('-->', levelAttempt[e.target.id])
                            this.getAttemptLevel(levelAttempt[e.target.id], index)
                            this.setState({ loadingState: false })


                        }}>View</button>  </div>,
            },

        ]

        this.setState({ columns })

    }


    async getAttemptLevel(jsonValue, index) {

        let postJson = { sessionId: '1223', userId: localStorage.getItem("Userid"), levelId: jsonValue.levelId, attamptNo: jsonValue.attamptNo };
        console.log('postJson get level==>', index, jsonValue, postJson)
        let uniqueJsonId = localStorage.getItem("Userid") + "_" + jsonValue.levelId + "_" + parseInt(index + 1)
        console.log("uniqueJsonId", uniqueJsonId)
        let that = this;
        let responseData = await doConnect("getLevelAttempts", "POST", postJson);
        if (responseData.levelAttemptMap) {

            console.log('levelAttempt--->', responseData.levelAttemptMap)

            this.setState({ Jsonview: responseData.levelAttemptMap, loadingState: true, userLevelId: uniqueJsonId })


        }

    }



    render() {

        const { columns, levelAttempt, loadingState, userLevelId } = this.state;




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
                                                <div className="row form-group mt-2" style={{padding:10,margin:10}}>
                                                    {JSON.stringify(this.state.Jsonview[userLevelId])}
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



                            <div className="row">
                                <div className="col-2" />
                                <div className="col-8">
                                    <h3>{this.props.match.params.Userid}</h3>
                                </div>
                                <div className="col-2" />
                            </div>

                            <DataTable
                                title=""
                                columns={columns}
                                data={levelAttempt}
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