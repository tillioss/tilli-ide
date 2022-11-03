import React from 'react';
import DataTable from "../Component/DataTable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropDown from "../Component/DropDown";
import MyConstant from "../config/MyConstant";
import { doConnect } from '../config/Common';


class Level extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {},
            levelArray: [],
            imageList: [],
            data: [], gamingArray: {}, typeSelect: "", levelColor: '', levelName: '',
            buttonName: "Submit",
            sortOrder: '',
            defineModule: false,
            sortOrderArray: []
        }
    }

    componentDidMount() {

        this.getLevels();
        this.getImages();
    }

    async getImages() {
        let postJson = { fileType: 'image', sessionId: '1223' };
        let responseData = await doConnect("getGameFilesList", "POST", postJson);
        let json = responseData;
        this.setState({ imageList: json.filesMap })
    }

    async getLevels() {
        let postJson = { sessionId: '1223', levelId: '' };
        let responseData = await doConnect("getGameLevels", "POST", postJson);
        let json = responseData;
        let that = this;
        if (Object.keys(json).length > 0 && json['levelsMap'] != null && json['levelsMap'] != undefined) {
            let levelsMap = json['levelsMap'];
            let sortOrderArray = []
            Object.keys(levelsMap).map((sortOrderObjects) => {
                let sortOrderAllData = levelsMap[sortOrderObjects]
                let sortOrderUniqData = sortOrderAllData.sortOrder
                sortOrderArray.push(sortOrderUniqData.toString())
            })
            that.setState({ gamingArray: levelsMap,sortOrderArray})
        }
    }

    async deleteLevels(levelId) {
        let postJson = { sessionId: '1223', levelId: levelId };
        let responseData = await doConnect("deleteGameLevels", "POST", postJson);
                if (responseData.response == 'Success') {
                    toast.success(' Data deleted !', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    this.getLevels();

                } else {
                    alert(responseData.response);
                }
    }


    async createLevel() {
        const { levelName, levelColor, selectedOption, sortOrder ,sortOrderArray
        } = this.state;
        var validLength = levelColor ? levelColor.search("#") : 0;
        if (levelName.length == 0) {
            this.setState({ levelNameValidate: 'Please Enter Value' })
            return false
        } else if (validLength && (levelColor.length != 7 || levelColor.length != 4)) {
            this.setState({ levelColorValidate: 'Please Enter six digit color cod with # ' })
            return false
        } else {
            this.setState({ levelNameValidate: '' })
        }

        if (levelColor.length == 0) {
            this.setState({ levelColorValidate: 'Please Enter value' })
            return false
        } else if (validLength == 0 && levelColor.length < 4) {
            this.setState({ levelColorValidate: 'Please Enter 4 Number' })
            return false
        } else {
            this.setState({ levelColorValidate: '' })
        }

        if (!selectedOption.label) {
            this.setState({ levelImageValidate: 'Please Choose Image' })
            return false
        }
        else {
            this.setState({ levelImageValidate: '' })
        }
        if (!Number(sortOrder)) {
            this.setState({ sortOrderValidate: 'Please enter sort order' })
            return false
        }
        else if (sortOrderArray.includes(sortOrder.toString())) {
            this.setState({ sortOrderValidate: 'This order number is already available' })
            return false
        }
        else {
            this.setState({ sortOrderValidate: '' })
        }

        if (levelName && levelName.length != 0 && levelColor.length != 0) {
            let postJson = { name: levelName, color: levelColor, sessionId: '1223', image: this.state.selectedOption.json, sortOrder: Number(sortOrder) };
            let responseData = await doConnect("addGameLevel", "POST", postJson);
            var json = responseData;
            var response = json.response;
            if (response == 'Success') {
                toast.success('Added data !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.setState({ buttonName: 'Submit', selectedOption: {}, typeSelect: '', idvalue: "", levelColor: "", levelName: "",defineModule:false })
                this.getLevels();
            } else {
                alert(response);
            }
        }
    }

    async updateLevels() {
        const { levelName, levelColor, sortOrder ,sortOrderArray} = this.state;
        let validLength = levelColor ? levelColor.search("#") : 0;
        if (levelName.length == 0) {
            this.setState({ levelNameValidate: 'Please Enter Value' })
            return false
        } else {
            this.setState({ levelNameValidate: '' })
        }
        if (levelColor.length == 0) {
            this.setState({ levelColorValidate: 'Please Enter value' })
            return false
        }
        else if (validLength && (levelColor.length != 7 || levelColor.length != 4)) {
            this.setState({ levelColorValidate: 'Please Enter six digit color cod with # ' })
            return false
        } else {
            this.setState({ levelColorValidate: '' })
        }
        if (!Number(sortOrder)) {
            this.setState({ sortOrderValidate: 'Please enter sort order' })
            return false
        }
        else if (sortOrderArray.includes(sortOrder.toString())) {
            this.setState({ sortOrderValidate: 'This order number is already available' })
            return false
        }
        else {
            this.setState({ sortOrderValidate: '' })
        }
        let found = this.state.levelArray.findIndex((a) =>
            a.id === this.state.idvalue
        )
        /* let Anotherarray = [...this.state.levelArray]
         Anotherarray[found].name = this.state.levelName
         Anotherarray[found].color = this.state.levelColor*/

        if (levelName && levelName.length != 0 && levelColor.length != 0) {

            let postJson = { levelId: this.state.idvalue, name: levelName, color: levelColor, sessionId: '1223', image: this.state.selectedOption.json, sortOrder: Number(sortOrder) };
            let responseData = await doConnect("updateGameLevel", "POST", postJson);
            if (responseData.response == 'Success') {
                toast.success('Updated data !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.setState({ buttonName: 'Submit', selectedOption: {}, typeSelect: '', idvalue: "", levelColor: "", levelName: "",defineModule:false})

                this.getLevels();
            } else {
                alert(responseData.response);
            }
        }


    }

    render() {

        const { buttonName, defineModule,sortOrder } = this.state;

        const columns = [
            {
                name: 'Order',
                selector: 'sortOrder',
                sortable: true,
            },
            {
                name: 'Title',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Color',
                selector: 'color',
                sortable: true,
            },
            {
                name: 'Graphic',
                selector: 'Button',
                sortable: true,
                cell: (row, index, column, id) => {
                    let image = row.image;
                    return <div style={{ padding: 10 }}><img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + image.fileName + "&id=" + image.fileType} width="75" height="75" /></div>
                },

            },
            {
                name: 'Manage',
                sortable: true,
                cell: (row, index, column, id) => {
                    let image = row.image;
                    return <div style={{ padding: 10 }}>

                        <button id={row.id} className="btn btnc" onClick={() => {
                            this.props.history.push('/' + MyConstant.keyList.projectUrl + '/module-manager-ide/' + row.id)
                        }}>Manage</button>

                    </div>
                },
            },
            //             {
            //                 name: 'Manage',
            //                 sortable: true,
            //                 cell: (row, index, column, id) => {
            //                     let image = row.image;
            //                     return <div style={{padding: 10}}>

            // <button  id={row.id} className="btn btn-success"  onClick={()=>{
            //                              this.props.history.push('/'+MyConstant.keyList.projectUrl+'/modulemanager/'+row.id )
            //                           }}>New</button>

            //                           </div>
            //                 },
            //             },
            {
                name: 'Edit',
                selector: 'Edit',
                sortable: true,
                cell: (row, index, column, id) =>
                    <div id={row.id}>
                        <div style={{ fontWeight: 700 }}></div>
                        <button id={row.id} className="btn btn-info" onClick={(e) => {
                            console.log(this.state.gamingArray)

                            let object = {};
                            object.value = this.state.gamingArray[e.target.id].id;
                            object.label = this.state.gamingArray[e.target.id].image.title;
                            object.json = this.state.gamingArray[e.target.id].image

                            let levelName = this.state.gamingArray[e.target.id].name
                            let levelColor = this.state.gamingArray[e.target.id].color
                            let sortOrder = this.state.gamingArray[e.target.id].sortOrder
                            this.setState({ defineModule: true,buttonName: 'Update', selectedOption: object, typeSelect: 'Edit', idvalue: e.target.id, levelColor, levelName,sortOrder })
                        }}>Edit</button>
                    </div>,
            },
            {
                name: 'Delete',
                selector: 'Delete',
                sortable: true,
                cell: (row, index, column, id) =>
                    <div id={row.id}
                    >
                        <div style={{ fontWeight: 700 }}></div>
                        <button id={row.id} className="btn btn-danger" onClick={(e) => {
                            this.deleteLevels(e.target.id)
                        }}>Delete</button>  </div>,
            }
        ];

        let data = [];
        Object.keys(this.state.gamingArray).map((ival, index) => {
            data.push(this.state.gamingArray[ival])
        });

        let options = [];
        Object.keys(this.state.imageList).map((ival, index) => {
            let image = this.state.imageList[ival];
            options.push({ value: image.id, label: image.title, json: image })
        });

        return (
            <React.Fragment>
                <div className="main-content">
                    <div className="right_col" role="main">
                        <div className="">

                            <div className="clearfix"></div>
                            {/* <!--content --> */}

                            <div className="row">
                                <div className="col-md-12 col-sm-12  ">
                                    <div className="x_panel">
                                        <div className="x_title">
                                            <h2>List of Existing modules</h2>
                                            <div className="float-right">
                                                <button className="btn btn-success" onClick={() => {
                                                    this.setState({
                                                        defineModule: true,
                                                        sortOrder: "",
                                                        levelColor: "",
                                                        selectedOption: {},
                                                        levelName: ""
                                                    })
                                                }}>Add Module</button>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="x_content">
                                            <ToastContainer />
                                            {
                                                defineModule && <div className="row">
                                                    <div className="col-8">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label>Title</label>
                                                                    <input type={'text'} placeholder={'Enter Title'} className={'form-control'}
                                                                        value={this.state.levelName} onChange={(e) => {
                                                                            this.setState({ levelName: e.target.value })
                                                                        }} />
                                                                    <span style={{ color: 'red', fontSize: 12, float: "inherit", marginTop: 5 }}> {this.state.levelNameValidate} </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label>Graphic</label>
                                                                    <DropDown
                                                                        selectedOption={this.state.selectedOption.label ? this.state.selectedOption : { label: 'Select', value: 'Select' }}
                                                                        onChange={(e) => {
                                                                            this.setState({ selectedOption: e })
                                                                        }}
                                                                        options={options}
                                                                    />
                                                                    <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 5 }}> {this.state.levelImageValidate} </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label>Color</label>
                                                                    <input type={'text'} placeholder={'Enter Color'} className={'form-control'}
                                                                        value={this.state.levelColor} onChange={(e) => {
                                                                            this.setState({ levelColor: e.target.value })
                                                                        }} />
                                                                    <span style={{ color: 'red', fontSize: 12, float: "inherit", marginTop: 5 }}> {this.state.levelColorValidate} </span>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label>Sort Order</label>
                                                                    <input type={'text'} placeholder={'Enter Sort Order'} className={'form-control'}
                                                                        value={this.state.sortOrder} onChange={(e) => {
                                                                            this.setState({ sortOrder: e.target.value })
                                                                        }} />
                                                                    <span style={{ color: 'red', fontSize: 12, float: "inherit", marginTop: 5 }}> {this.state.sortOrderValidate} </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                {
                                                                    buttonName == 'Submit' ? <React.Fragment>
                                                                        <div className="row">
                                                                            <div className="col-12 text-right">
                                                                                <button type="button" className="btn btn-primary" onClick={() => {
                                                                                    this.createLevel()
                                                                                }}>{buttonName}</button>
                                                                                <button type="button" className="btn btn-danger" onClick={() => {
                                                                                    this.setState({
                                                                                        defineModule: false,
                                                                                        levelNameValidate: "",
                                                                                        levelColorValidate: "",
                                                                                        levelImageValidate: "",
                                                                                        sortOrderValidate: ""
                                                                                    })
                                                                                }}>Cancel</button>
                                                                            </div>
                                                                        </div>
                                                                        </React.Fragment> : <React.Fragment>
                                                                        <div className="row">
                                                                            <div className="col-12 text-right">
                                                                                <button type="button" className={'btn btn-success '} onClick={() => {
                                                                                    this.updateLevels()
                                                                                }}>{buttonName}
                                                                                </button>
                                                                            <button type="button" className="btn btn-danger" onClick={() => {
                                                                                this.setState({
                                                                                    defineModule: false,
                                                                                    selectedOption: {}, 
                                                                                    typeSelect: '', 
                                                                                    idvalue: "", 
                                                                                    levelColor: "", 
                                                                                    levelName: "",
                                                                                    levelNameValidate: "",
                                                                                        levelColorValidate: "",
                                                                                        levelImageValidate: "",
                                                                                        sortOrderValidate: ""
                                                                                })
                                                                            }}>Cancel</button>
                                                                        </div>
                                                                    </div>
                                                                </React.Fragment>
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-4" style={{ height: 200 }}>
                                                        {
                                                            this.state.selectedOption.json && <img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.selectedOption.json.fileName + "&id=" + this.state.selectedOption.json.fileType} style={{ maxHeight: "100%" }} alt="loading..." />
                                                        }
                                                    </div>
                                                </div>
                                            }

                                            <div className="row" >
                                                <div className="col-sm-12">
                                                    <div className="row">
                                                        <div className="col-sm-12" style={{ verticalAlign: 'center' }}>
                                                            {data.length != 0 ?
                                                                <DataTable
                                                                    title=""
                                                                    columns={columns}
                                                                    data={data}
                                                                    noHeader={true}
                                                                />
                                                                :
                                                                <React.Fragment>
                                                                    <div className="row">
                                                                        <div className="col-sm-4"> </div>
                                                                        <div className="col-sm-4">
                                                                            <div className="loader"></div>
                                                                        </div>
                                                                        <div className="col-sm-4"> </div>
                                                                    </div>
                                                                </React.Fragment>}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!--content --> */}

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Level;
