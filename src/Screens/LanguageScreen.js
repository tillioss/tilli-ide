import React from "react";
import DropDown from "../Component/DropDown";
import { toast, ToastContainer } from "react-toastify";
import CloseImage from "../images/close.png";
import { doConnect } from "../config/Common";

export default class LanguageScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedOption: {}, options: [{ label: "innerPageGroup", value: "innerPageGroup" }, { label: "commonPageGroup", value: "commonPageGroup" }, { label: "outerPageGroup", value: "outerPageGroup" }],
            innerGroupArray: [], outterGroupArray: [], addPageName: "", addPageArray: [], addPageObject: {}, addPagestate: false,
            errrorField: [], errorGroup: ""
        }
    }


    componentDidMount() {
        const { selectedOption } = this.state;
        /*console.log(JSON.parse(localStorage.getItem("addPageObject")))

        let jsonvalue = JSON.parse(localStorage.getItem("addPageObject"))
        if(jsonvalue)
        {
            this.setState({ addPageObject: jsonvalue })
        }*/






    }

    async addMoreButton(index) {
        const { addPageArray, errrorField, addPageObject } = this.state;

        //console.log('index',index,addPageObject)
        //addPageObject[index].fieldData.push({ title: "", value: "" })
        addPageObject[index].fieldData[Object.keys(addPageObject[index].fieldData).length + 1] = { title: "", value: "" }
        this.setState({ addPageObject })

        //addPageArray[index].innerarry.push({ title: "", value: "" })
        //errrorField[index] = "";
        //this.setState({ errrorField, addPageArray, errorIndex: index })

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

    removeIndex(index, innerIndex) {
        var confirm = window.confirm("Are you sure to delete")
        if (confirm) {
            //alert("remove"+index +" ,"+innerIndex)
            var addPageObjectNew = this.state.addPageObject
            // alert(JSON.stringify(addPageObjectNew[index]))

            delete addPageObjectNew[index]['fieldData'][innerIndex]
            this.setState({ addPageObject: addPageObjectNew })

        }


    }


    render() {

        const { selectedOption, options, errorGroup, innerGroupArray, outterGroupArray, addPageArray, addPagestate, addPageName, errrorField } = this.state;

        let datavariable = [];
        Object.keys(this.state.addPageObject).forEach((val) => {


            datavariable.push(<React.Fragment>
                <div className="card mt-4">
                    <div className="form row mt-4">
                        <div className="col-3"> <label> Page Name {val} </label> </div>
                        <div className="col-5">
                            <input type={'text'} style={{ width: "100%", paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                                value={this.state.addPageObject[val].pageName} placeholder={'Page Name'}
                                onChange={(e) => {
                                    this.state.addPageObject[val].pageName = e.target.value.trim('')

                                    //this.setState({addPageArray})
                                    this.setState({ addPageObject: this.state.addPageObject })
                                }} />
                            {/* <span style={{color:'red'}} > {errrorField[index_1]} </span> */}
                        </div>
                        <div className="col-5" />
                    </div>


                    <br /> <br />

                    {/*
                    {JSON.stringify(this.state.addPageObject)}
*/}
                    <React.Fragment>

                        {Object.keys(this.state.addPageObject[val].fieldData).map((ival, index) => {

                            return (<React.Fragment>

                                <div style={{ padding: 10, marginTop: 10 }}>
                                    <div className="form row mt-2">
                                        <div className="col-3"> <label> Item {index + 1}  </label> </div>
                                        <div className="col-5">
                                            <input type={'text'} style={{ width: "100%", paddingTop: 5, paddingBottom: 5, paddingLeft: 10, }} value={this.state.addPageObject[val].fieldData[ival].title} placeholder={"Item " + (index + 1)}
                                                onChange={(e) => {
                                                    this.state.addPageObject[val].fieldData[ival].title = e.target.value
                                                    //this.setState({ addPageArray })
                                                    this.setState({ addPageObject: this.state.addPageObject })
                                                }} />
                                        </div>
                                        <div className="col-4" >  <span> <img src={CloseImage} style={{ width: 30, height: 30 }} onClick={() => {
                                            this.removeIndex(val, ival)
                                        }} /> </span></div>
                                    </div>

                                    <div className="form row mt-4">
                                        <div className="col-3"> <label> Default value  {index + 1} </label> </div>
                                        <div className="col-5">
                                            <input type={'text'} style={{ width: "100%", paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }} value={this.state.addPageObject[val].fieldData[ival].value} placeholder={'Value ' + (index + 1)}
                                                onChange={(e) => {
                                                    this.state.addPageObject[val].fieldData[ival].value = e.target.value;
                                                    //this.setState({ addPageArray })
                                                    this.setState({ addPageObject: this.state.addPageObject })
                                                }} />
                                        </div>
                                        <div className="col-5" />
                                    </div>
                                </div>


                            </React.Fragment>)

                        })}


                        <div className="row mt-2">
                            <div className="col-3"></div>
                            <div className="col-5">
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    this.addMoreButton(val)

                                }} >Add More Field</button>

                            </div>
                            <div className="col-4" />
                        </div>




                    </React.Fragment>


                </div>
            </React.Fragment>
            )

        })


        return (<React.Fragment>
            <div className="main-content">

                {/* <!-- page content --> */}
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

                                        <br />
                                        {/*
                                            {JSON.stringify(this.state.addPageObject)}
*/}


                                        {

                                            datavariable

                                        }


                                        {/* {addPageArray.map((ivals, index_1) => {


return (<React.Fragment>
<div className="card mt-4">
{JSON.stringify(ivals.pageName)}   {JSON.stringify(Object.assign({},ivals.innerarry ) )} 
<div className="form row mt-4">
<div className="col-3"> <label> Page Name{index_1}  </label> </div>
<div className="col-5">
<input type={'text'} style={{ width: "100%", paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }} 
value={ivals.pageName} placeholder={'Page Name'}
onChange={(e) => {
ivals.pageName=e.target.value.trim('')

this.setState({addPageArray})
}} />
<span style={{color:'red'}} > {errrorField[index_1]} </span>
</div>
<div className="col-5" />
</div>


<br /> <br />


<React.Fragment>

{ ivals.innerarry && ivals.innerarry.map((ival, index) => {

return (<React.Fragment>


<div  style={{ padding: 10, marginTop: 10 }}>
<div className="form row mt-2">
<div className="col-3"> <label> Title  </label> </div>
<div className="col-5">
<input type={'text'} style={{ width: "100%", paddingTop: 5, paddingBottom: 5, paddingLeft: 10, }} value={ival.title} placeholder={index + "Title"}
onChange={(e) => {
ival.title = e.target.value
this.setState({ addPageArray })
}} />
</div>
<div className="col-4" />
</div>

<div className="form row mt-4">
<div className="col-3"> <label> Value  </label> </div>
<div className="col-5">
<input type={'text'} style={{ width: "100%", paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }} value={ival.value} placeholder={index + 'Value'}
onChange={(e) => {
ival.value = e.target.value;
this.setState({ addPageArray })
}} />
</div>
<div className="col-5" />
</div>
</div>


</React.Fragment>)

})}


<div className="row mt-2">
<div className="col-3"></div>
<div className="col-5">
<button type="button" className="btn btn-primary" onClick={() => {
this.addMoreButton(index_1)

}} >Add More Field</button>

</div>
<div className="col-4" />
</div>




</React.Fragment>


</div>
</React.Fragment>
)

})} */}

                                        <br /> <br />

                                        <div className="row mt-3">
                                            <div className="col-3"></div>
                                            <div className="col-5">
                                                <button type="button" className="btn btn-success" onClick={() => {
                                                    const { errrorField, errorIndex, addPageObject } = this.state;


                                                    let test = {}
                                                    test[Object.keys(test).length + 1] = { title: "", value: "", }

                                                    let innerarry = []
                                                    innerarry.push({ title: "", value: "", });

                                                    let obj = {}
                                                    //obj.fieldData = innerarry
                                                    obj.fieldData = test

                                                    //obj[Object.keys(addPageObject).length + 1] = innerarry
                                                    obj.pageName = Object.keys(addPageObject).length + 1

                                                    addPageObject[Object.keys(addPageObject).length + 1] = obj;

                                                    //console.log(addPageObject)

                                                    ///addPageArray.push({ pageName: '',innerarry })
                                                    this.setState({ addPagestate: true, addPageObject })

                                                }} >Add Page</button>

                                            </div>
                                            <div className="col-4" />
                                        </div>



                                        <div className="row mt-5">
                                            <div className="col-3"></div>
                                            <div className="col-5">
                                                <button type="button" className="btn btn-success" onClick={async () => {

                                                    if (!selectedOption.label) {
                                                        this.setState({ errorGroup: "Please Select" })
                                                        return false
                                                    }

                                                    let addPageArray = this.state.addPageArray;
                                                    let newarray = []
                                                    addPageArray.map((ival, index) => {
                                                        newarray[ival.pageName] = ival.innerarry
                                                        newarray[ival.pageName].pageName = ival.pageName
                                                    })
                                                    console.log("newarray", newarray)
                                                    console.log(this.state.addPageObject)

                                                    localStorage.setItem('addPageObject', JSON.stringify(this.state.addPageObject))

                                                    let postJson = { grouptype: selectedOption.value, jsonData: JSON.stringify(this.state.addPageObject), sessionId: "1223" }
                                                    let responseData = await doConnect("updateLanguageBaseData", "POST", postJson);
                                                    toast.success('Added data !', {
                                                        position: "top-center",
                                                        autoClose: 5000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                    });
                                                    this.setState({ test: "" })
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
