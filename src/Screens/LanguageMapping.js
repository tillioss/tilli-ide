import React from "react";
import DropDown from "../Component/DropDown";
import MyConstant from "../config/MyConstant";
import TopMenu from '../Screens/Menu/TopMenu';
import SideMenu from '../Screens/Menu/SideMenu';
import { checkNullAndReturnString, doConnect } from "../config/Common";
import { toast, ToastContainer } from "react-toastify";


export default class LanguageMapping extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedOption: {}, options: [{ label: "innerPageGroup", value: "innerPageGroup" }, { label: "commonPageGroup", value: "commonPageGroup" }, { label: "outerPageGroup", value: "outerPageGroup" }],
            addPageName: "", addPageArray: [], addPageObject: {}, languageMappingData: {}, addPagestate: false,
            errrorField: [], errorGroup: "",
            LanguageSelect: {}, languages: {}
        }
    }


    componentDidMount() {
        const { selectedOption } = this.state;

        this.getLanguageList()

        /* console.log(JSON.parse(localStorage.getItem("addPageObject")))
         let jsonvalue = JSON.parse(localStorage.getItem("addPageObject"))
         this.setState({ addPageObject: jsonvalue })*/



    }
    async getLanguageList() {

        let postJson = { sessionId: '1223' };
        let responseData = await doConnect("getLanguages", "POST", postJson);
        this.setState({ "languages": JSON.parse(responseData.response) })
        
    }
    async getLanguageData(e) {
        let postJson = { grouptype: e.value, sessionId: "1223" }
        let responseData = await doConnect("getLanguageBaseData", "POST", postJson);
        if (responseData.response != null) {
            this.setState({ addPageObject: JSON.parse(responseData.response) })

        }
        else {
            this.setState({ addPageObject: {} })
        }
    }

    async getLanguageMappingdata(e) {
        const { selectedOption, addPageObject } = this.state;

        let postJson = { grouptype: selectedOption.value, languageId: e.value, sessionId: "1223" }
        let responseData = await doConnect("getLanguageMappingData", "POST", postJson);
        if (responseData.response != null) {
            this.setState({ languageMappingData: JSON.parse(responseData.response) })
        }
        else {
            this.setState({ languageMappingData: addPageObject })
        }

    }
    getMappingata(key, innerKey) {
        // alert(key)
        var reponse = ""
        if (checkNullAndReturnString(this.state.languageMappingData) && Object.keys(this.state.addPageObject).length > 0)
            if (checkNullAndReturnString(this.state.languageMappingData[key])) {
                if (checkNullAndReturnString(this.state.languageMappingData[key].fieldData) && checkNullAndReturnString(this.state.languageMappingData[key].fieldData[innerKey])) {
                    reponse = this.state.languageMappingData[key].fieldData[innerKey].value

                }

            }
        return reponse

    }
    onChangeFun(e) {

    }

    async addMoreButton(index) {
        const { addPageArray, errrorField, addPageObject } = this.state;
        addPageObject[index].fieldData[Object.keys(addPageObject[index].fieldData).length + 1] = { title: "", value: "" }
        this.setState({ addPageObject })
    }



    render() {

        const { selectedOption, options, errorGroup, LanguageSelect, errorLanguage } = this.state;

        let data = [];
        Object.keys(this.state.languages).map((ival, index) => {
            // alert(this.state.data_value[ival])
            //{ label: "Tamil", value: "Tamil" }
            data.push({ value: ival, label: this.state.languages[ival] })
        });



        let datavariable = [];
        Object.keys(this.state.addPageObject).forEach((val) => {


            datavariable.push(<React.Fragment>
                <div className="card mt-4">
                    <div className="form row mt-4">
                        <div className="col-3"> <label> Page Name  {val}</label> </div>
                        <div className="col-5">


                            <p style={{ float: "left", color: "black", }}> {this.state.addPageObject[val].pageName} </p>

                            {/* <span style={{color:'red'}} > {errrorField[index_1]} </span> */}
                        </div>
                        <div className="col-5" />
                    </div>


                    <br /> <br />


                    <React.Fragment>

                        {Object.keys(this.state.addPageObject[val].fieldData).map((ival, index) => {

                            return (<React.Fragment>

                                <div style={{ padding: 10, marginTop: 10 }}>
                                    <div className="form row mt-2">
                                        <div className="col-3"> <label> Item {index + 1} :  </label> </div>
                                        <div className="col-5">
                                            <p style={{ float: "left", color: "black", }}> {this.state.addPageObject[val].fieldData[ival].title} </p>
                                        </div>
                                        <div className="col-4" />
                                    </div>

                                    <div className="form row mt-4">
                                        <div className="col-3"> <label> Translate Value {index + 1} : </label> </div>
                                        <div className="col-5">

                                            <input type={'text'} style={{ width: "100%", paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                                                value={this.getMappingata(val, ival)}
                                                placeholder={'Value'}
                                                onChange={async (e) => {
                                                    this.onChangeFun(e)
                                                    if (!checkNullAndReturnString(this.state.languageMappingData[val])) {
                                                        this.state.languageMappingData[val] = this.state.addPageObject[val]
                                                        this.state.languageMappingData[val].fieldData[ival].value = e.target.value

                                                    }
                                                    else if (!checkNullAndReturnString(this.state.languageMappingData[val].fieldData[ival])) {
                                                        this.state.languageMappingData[val].fieldData[ival] = this.state.addPageObject[val].fieldData[ival]
                                                        this.state.languageMappingData[val].fieldData[ival].value = e.target.value

                                                    }
                                                    else {
                                                        // alert(JSON.stringify(this.state.languageMappingData[val]))
                                                        this.state.languageMappingData[val].fieldData[ival].value = e.target.value

                                                    }



                                                    //this.setState({addPageArray})
                                                    this.setState({ languageMappingData: this.state.languageMappingData })
                                                }} />


                                        </div>
                                        <div className="col-5" />
                                    </div>
                                </div>


                            </React.Fragment>)

                        })}


                        {/* <div className="row mt-2">
                            <div className="col-3"></div>
                            <div className="col-5">
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    this.addMoreButton(val)

                                }} >Add More Field</button>

                            </div>
                            <div className="col-4" />
                        </div> */}




                    </React.Fragment>


                </div>
            </React.Fragment>
            )

        })


        return (<React.Fragment>
            <div className="main-content">
                <div className="right_col" role="main">
                    <div className="">
                        <div className="clearfix"></div>
                        <div className="row">
                            <div className="col-md-12 col-sm-12  ">
                                <div className="x_panel">
                                    <div className="x_title">
                                        <h2>Language Page</h2>
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
                                        <div className="row">
                                            <div className="col-3"> <label> Group  </label> </div>
                                            <div className="col-5">
                                                <DropDown
                                                    selectedOption={selectedOption}
                                                    onChange={(e) => {
                                                        this.setState({ selectedOption: e })
                                                        this.getLanguageData(e)
                                                    }}
                                                    options={options}
                                                />
                                                <span style={{ color: 'red' }}>{errorGroup}</span>
                                            </div>
                                            <div className="col-4" />
                                        </div>



                                        <div className="row mt-4 form-group ">
                                            <div className="col-3"> <label> Select Language  </label> </div>
                                            <div className="col-5">
                                                <DropDown
                                                    selectedOption={LanguageSelect}
                                                    onChange={(e) => {
                                                        this.setState({ LanguageSelect: e })
                                                        this.getLanguageMappingdata(e)
                                                    }}
                                                    options={data}
                                                />
                                                <span style={{ color: 'red' }}>{errorLanguage}</span>
                                            </div>
                                            <div className="col-4" />
                                        </div>





                                        <br />


                                        {LanguageSelect.label && datavariable}





                                        <br /> <br />

                                        {/* <div className="row mt-3">
                                                <div className="col-3"></div>
                                                <div className="col-5">
                                                    <button type="button" className="btn btn-success" onClick={() => {
                                                        const { errrorField, errorIndex, addPageObject } = this.state;
                                                        let test = {}
                                                        test[Object.keys(test).length + 1] = { title: "", value: "", }
                                                        let obj = {}
                                                        obj.fieldData = test
                                                        obj.pageName = Object.keys(addPageObject).length + 1
                                                        addPageObject[Object.keys(addPageObject).length + 1] = obj;
                                                        this.setState({ addPagestate: true, addPageObject })
                                                    }} >Add Page</button>

                                                </div>
                                                <div className="col-4" />
                                            </div> */}



                                        <div className="row mt-5">
                                            <div className="col-3"></div>
                                            <div className="col-5">
                                                <button type="button" className="btn btn-success" onClick={async () => {

                                                    const { LanguageSelect } = this.state;

                                                    if (!selectedOption.label) {
                                                        this.setState({ errorGroup: "Please Select" })
                                                        return false
                                                    }
                                                    if (!LanguageSelect.value) {
                                                        this.setState({ errorLanguage: "Please Select" })
                                                        return false
                                                    }


                                                    let postJson = {
                                                        grouptype: selectedOption.value, languageId: LanguageSelect.value,
                                                        jsonData: JSON.stringify(this.state.languageMappingData), sessionId: "1223"
                                                    }
                                                    console.log("postJson", postJson)
                                                    let responseData = await doConnect("updateLanguageMappingData", "POST", postJson);
                                                    toast.success('Added data !', {
                                                        position: "top-center",
                                                        autoClose: 5000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                    });


                                                }} >Submit</button>

                                            </div>
                                            <div className="col-4" />
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
