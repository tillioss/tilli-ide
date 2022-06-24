import React from "react";
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from "react-toastify";
import { doConnect } from "../config/Common";


export default class LanguageMaster extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [], data_value: {}, EnterValue: "", editable: false, editId: ""
        }
    }

    componentDidMount() {

        this.getLanguageData()

    }

    async getLanguageData() {

        let postJson = { sessionId: '1223' };
        console.log('postJson', postJson)
        let responseData = await doConnect("getLanguages", "POST", postJson);
        this.setState({ "data_value": JSON.parse(responseData.response) })
    }

    async submitFunction() {
        const { EnterValue } = this.state

        let postJson = { sessionId: '1223', languageName: EnterValue };
        let responseData = await doConnect("addLanguage", "POST", postJson);
        console.log('postJson', postJson)
        let json = responseData;
        this.getLanguageData()

        toast.success('Added data !', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });


        this.setState({ EnterValue: "  " })

    }

    editFunction(index) {

        const { EnterValue, data_value } = this.state


        this.setState({ EnterValue: data_value[index], editable: true, editId: index })

    }

    async UpdateFunction() {
        const { editId, EnterValue, data_value } = this.state;


        // languageId:String,languageName:String, sessionId: String
        let postJson = { languageId: editId, languageName: EnterValue, sessionId: '1223' };
        let responseData = await doConnect("updateLanguage", "POST", postJson);
        
                this.getLanguageData()

                toast.success('Updated data !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

        this.setState({ EnterValue: "", data_value, editable: false, editId: "" })
    }

    render() {

        const { data_value, EnterValue, editable } = this.state;

        let data = [];
        Object.keys(this.state.data_value).map((ival, index) => {
            // alert(this.state.data_value[ival])
            data.push({ id: ival, name: this.state.data_value[ival] })
        });


        let columns = [
            {
                name: 'Language',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Edit',
                selector: 'Edit',
                sortable: true,
                cell: (row, index, column, id) =>
                    <div >
                        <div style={{ fontWeight: 700 }}></div>
                        <button id={index} className="btn btn-danger" onClick={(e) => {
                            console.log(e.target.id)
                            this.editFunction(row.id)
                        }}>Edit</button>
                    </div>,
            },

        ]

        return (<React.Fragment>
            <div className="main-content">
                <div className="right_col" role="main">
                    <div className="">
                        <div className="clearfix"></div>
                        <div className="row">
                            <div className="col-md-12 col-sm-12  ">
                                <div className="x_panel">
                                    <div className="x_title">
                                        <h2>Language Master</h2>
                                        <ul className="nav navbar-right panel_toolbox">
                                            <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                                            </li>
                                            <li className="dropdown">
                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item" href="#">Settings 1</a>
                                                    <a className="dropdown-item" href="#">Settings 2</a>
                                                </div>
                                            </li>
                                            <li><a className="close-link"><i className="fa fa-close"></i></a>
                                            </li>
                                        </ul>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="x_content">
                                        {/*Content*/}
                                        <ToastContainer />
                                        <div className="row form-group" >
                                            <div className="col-1" />
                                            <div className="col-3"> <label> Language</label> </div>
                                            <div className="col-4">
                                                <input type={'text'} value={EnterValue} style={{ width: "100%", paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }} placeholder={'Enter Language'}
                                                    onChange={(e) => {
                                                        this.setState({ EnterValue: e.target.value })
                                                    }} />
                                            </div>
                                            <div className="col-4" />
                                        </div>


                                        <div className="row form-group mt-3" >

                                            <div className="col-3"> </div>
                                            <div className="col-6">
                                                <button type="button" className="btn btn-primary" onClick={() => {
                                                    if (editable) {
                                                        this.UpdateFunction()
                                                    }
                                                    else {
                                                        this.submitFunction()
                                                    }

                                                }} > {editable ? "Update" : "Submit"} </button>

                                            </div>
                                            <div className="col-3" />
                                        </div>

                                        {/* {JSON.stringify(data)}*/}
                                        <div className="row form-group col-12" >
                                            <DataTable
                                                title=""
                                                columns={columns}
                                                data={data} />
                                        </div>


                                        {/*Content*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
    }

}
