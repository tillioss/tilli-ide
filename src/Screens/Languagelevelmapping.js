import React from "react";
import DropDown from "../Component/DropDown";
import { toast, ToastContainer } from "react-toastify";
import { doConnect } from "../config/Common";
import { Link } from "react-router-dom";


export default class Languagelevelmapping extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            languageMappingData: {},
            languageSelect: {},
            languages: {}

        }

    }

    componentDidMount() {
        this.getLanguageList()
        this.getLevels()
    }
    async getLanguageList() {

        let postJson = { sessionId: '1223' };
        let responseData = await doConnect("getLanguages", "POST", postJson);
        this.setState({ "languages": JSON.parse(responseData.response) })

    }

    async getLevels() {
        let postJson = { sessionId: '1223', levelId: '' };
        let responseData = await doConnect("getGameLevels", "POST", postJson);
        let json = responseData;
        let that = this;
        if (Object.keys(json).length > 0 && json['levelsMap'] !== null && json['levelsMap'] !== undefined) {
            let levelsMap = json['levelsMap'];
            that.setState({ gamingArray: levelsMap })
        }
    }
    async submitFun() {
        const { languageSelect } = this.state;
        //languageId:String, jsonData:String, sessionId: String
        if (!languageSelect.value) {
            this.setState({ errorLanguage: "Please Select" })
            return false
        }
        toast.success('Added data !', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }
    async getlevelsNameLanguageMappingdata(e) {

        let postJson = { languageId: e.value, sessionId: "1223" }
        let responseData = await doConnect("getLevelsNameLanguageMapping", "POST", postJson);
        if (responseData.response !== null) {
            this.setState({ languageMappingData: JSON.parse(responseData.response) })
        } else {
            this.setState({ languageMappingData: {} })
        }
    }


    render() {

        const { gamingArray, languageMappingData, languageSelect, errorLanguage } = this.state;

        let data = [];
        Object.keys(this.state.languages).map((ival, index) => {
            // alert(this.state.data_value[ival])
            //{ label: "Tamil", value: "Tamil" }
            data.push({ value: ival, label: this.state.languages[ival] })
            return true
        });



        let rowcontent = [];
        if (gamingArray) {

            Object.keys(gamingArray).map((ival, index) => {
                rowcontent.push(
                    <div className="row mt-3 ">
                        <div className="col-1" />
                        <div className="col-3">
                            {gamingArray[ival].name}

                        </div>
                        <div className="col-3" >
                            <input style={{ width: '100%', paddingTop: 5, paddingBottom: 5, paddingLeft: 5 }} value={languageMappingData[ival] ? languageMappingData[ival] : ""} placeholder={"Type"} onChange={(e) => {
                                languageMappingData[ival] = e.target.value
                                this.setState({ languageMappingData })

                            }} />
                        </div>

                        <div className="col-4" />
                    </div>)
                return true
            })
        }

        return (
            <React.Fragment>

                <div className="main-content">
                    <div className="right_col" role="main">
                        <div className="">
                            <div className="clearfix"></div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12  ">
                                    <div className="x_panel">
                                        <div className="x_title">
                                            <h2>Language Level Mapping</h2>
                                            <ul className="nav navbar-right panel_toolbox">
                                                <li><Link className="collapse-link"><i className="fa fa-chevron-up"></i></Link>
                                                </li>
                                                <li className="dropdown">
                                                    <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></Link>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <Link className="dropdown-item" to="#">Settings 1</Link>
                                                        <Link className="dropdown-item" to="#">Settings 2</Link>
                                                    </div>
                                                </li>
                                                <li><Link className="close-link"><i className="fa fa-close"></i></Link>
                                                </li>
                                            </ul>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="x_content">
                                            <ToastContainer />
                                            <div className="row mt-4 form-group ">
                                                <div className="col-3"> <label> Select Language  </label> </div>
                                                <div className="col-5">
                                                    <DropDown
                                                        selectedOption={languageSelect}
                                                        onChange={(e) => {
                                                            this.setState({ languageSelect: e })
                                                            this.getlevelsNameLanguageMappingdata(e)
                                                        }}
                                                        options={data}
                                                    />
                                                    <span style={{ color: 'red' }}>{errorLanguage}</span>
                                                </div>
                                                <div className="col-4" />
                                            </div>

                                            {/* content*/}

                                            {/* {JSON.stringify(gamingArray)} */}
                                            {/* {JSON.stringify(this.state.languageMappingData)} */}

                                            <div className="row mt-2 ">
                                                <div className="col-1" />
                                                <div className="col-3">
                                                    <p style={{ color: 'black' }}>  Levels </p>
                                                </div>
                                                <div className="col-2">

                                                    <p style={{ color: 'black' }}> {languageSelect.label} Value </p>
                                                </div>

                                                <div className="col-6" />
                                            </div>

                                            {rowcontent}

                                            <div className="row mt-4 ">
                                                <div className="col-3" />

                                                <div className="col-4">
                                                    <button type="button" className="btn btn-primary" onClick={() => { this.submitFun() }}>Submit</button>
                                                </div>

                                                <div className="col-5" />
                                            </div>



                                            {/*content*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /page content --> */}
                </div>

            </React.Fragment>
        )

    }


}