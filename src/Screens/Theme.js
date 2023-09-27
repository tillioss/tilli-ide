import React from 'react';
import DataTable from "../Component/DataTable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { doConnect } from '../config/Common';
import { doFileConnectZip } from '../config/Common';
import { Link } from 'react-router-dom';
import Modal from '../Component/Modal';
import DropDown from "../Component/DropDown";
import MyConstant from "../config/MyConstant";;



class Theme extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {},
            imageList: [],
            themeValue: [],
            data: [],
            typeSelect: "",
            themeName: '',
            themesList: {},
            displayImage: 'none', submitButtton: 'Submit',
            themeModal: false,
            themeType: "Static",
            submitLoader: false,
            zipFileSelectValidate: "",
            fileObj: {},

        }
    }

    componentDidMount() {

        this.getThemes();
        this.getImages();
    }

    async getImages() {
        let postJson = { fileType: 'image', sessionId: '1223' };
        let responseData = await doConnect("getGameFilesList", "POST", postJson);
        let json = responseData;
        this.setState({ imageList: json.filesMap })
    }

    async deleteThemes(themeId) {
        let postJson = { sessionId: '1223', themeId: themeId };
        let responseData = await doConnect("deleteThemes", "POST", postJson);
        if (responseData.response === 'Success') {
            toast.success(' Theme is deleted successfully!!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            this.getThemes();

        } else {
            alert(responseData.response);
        }
    }

    async getThemes() {
        let postJson = { sessionId: '1223', themeId: '' };
        let that = this;
        let responseData = await doConnect("getThemes", "POST", postJson);

        let json = responseData;
        if (Object.keys(json).length > 0 && json['themesMap'] !== null && json['themesMap'] !== undefined) {
            let themesMap = json['themesMap'];
            that.setState({ themesList: themesMap })
        }
    }

    async submitFunction() {
        const { themeName, selectedOption, themeType, fileObj, } = this.state;
        if (themeName.length === 0) {
            this.setState({ themeNameValidate: 'Please Enter Value' })
            return false
        } else {
            this.setState({ themeNameValidate: '' })
        }
        if (!selectedOption.label) {
            this.setState({ levelImageValidate: 'Please Choose Image' })
            return false
        }
        else {
            this.setState({ levelImageValidate: '' })
        }
        if (themeType === "godot") {
            let zipFileSelectValidate = "";
            let validateFile = false
            if (Object.keys(fileObj).length === 0) {
                zipFileSelectValidate = "Please Upload Zip File"
                validateFile = true
            }
            this.setState({ zipFileSelectValidate })
            if (validateFile) {
                return false
            }

            await doFileConnectZip(fileObj)
        }
        if (themeName && themeName.length !== 0) {
            this.setState({ submitLoader: true })
            let postJson = {
                name: themeName,
                sessionId: '1223',
                image: this.state.selectedOption.json,
                themeType,
                gameFile: themeType === "godot" ? fileObj : {}

            };
            let responseData = await doConnect("addTheme", "POST", postJson);
            if (responseData.response === 'Success') {
                toast.success('Theme is added successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                this.getThemes();
                this.setState({ themeModal: false, themeName: "", selectedOption: "", imageView: "", fileObj: {}, submitLoader: false, })

            } else {
                alert(responseData.response);
            }
        }
    }

    async UpdateFunction() {
        const { themeName, themeType, fileObj } = this.state;

        if (themeName.length === 0) {
            this.setState({ themeNameValidate: 'Please Enter Value' })
            return false
        } else {

            this.setState({ themeNameValidate: '' })
        }
        this.setState({ submitLoader: true })
        let postJson = {
            themeId: this.state.idvalue,
            name: themeName,
            image: this.state.selectedOption.json,
            sessionId: '1223',
            themeType,
            gameFile: themeType === "godot" ? fileObj : {}
        };
        let responseData = await doConnect("updateTheme", "POST", postJson);
        if (responseData.response === 'Success') {
            toast.success('Theme is updated successfully !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.getThemes();
            this.setState({ themeModal: false, themeName: "", selectedOption: "", imageView: "", fileObj: {}, themeType: "Static", submitLoader: false, })
        } else {
            alert(responseData.response);
        }
    }

    onThemeTypeChanged(e) {
        this.setState({
            themeType: e.currentTarget.value,
        });
    }

    render() {

        const { displayImage, submitButtton, themeModal, themeType, zipFileSelectValidate } = this.state;
        let { submitLoader } = this.state
        const columns = [
            {
                name: 'Name',
                sortable: true,
                selector: (row, index, column, id) => {
                    return <div >{row.name}</div>
                },
            },

            {
                name: 'Image',
                sortable: true,
                selector: (row, index, column, id) => {
                    let image = row.image;
                    let imgPath = MyConstant.keyList.apiURL + "vp?action=module&key=" + image.fileName + "&id=" + image.fileType
                    return <div><img src={imgPath} width="75" height="75" alt='loading' onClick={async () => {
                        await this.setState({ imageView: { json: row.image }, displayImage: "block" })
                    }} /></div>
                },

            },
            {
                name: 'Manage',
                sortable: true,
                selector: (row, index, column, id) =>
                    row.themeType === "Dynamic" ? <div id={row.id}>
                        <div style={{ fontWeight: 700 }}></div>
                        <Link to={"/" + MyConstant.keyList.projectUrl + "/theme-builder/" + row.id} className="btn btn-primary">Manage</Link>
                    </div> : "-",
            },
            {
                name: 'Edit',
                sortable: true,
                selector: (row, index, column, id) =>
                    <div id={row.id}                       >
                        <div style={{ fontWeight: 700 }}></div>
                        {
                            row.themeType === "godot" && false ? <div>-</div> :
                                <button id={row.id} className="btn btn-info" onClick={(e) => {
                                    //console.log(this.state.themesList)                                
                                    let object = {};
                                    object.value = this.state.themesList[e.target.id].id;
                                    object.label = this.state.themesList[e.target.id].image.title;
                                    object.json = this.state.themesList[e.target.id].image
                                    // console.log(object)
                                    let themeName = this.state.themesList[e.target.id].name
                                    let themeType = this.state.themesList[e.target.id].themeType
                                    let gameFile = this.state.themesList[e.target.id].gameFile
                                    this.setState({
                                        themeModal: true,
                                        selectedOption: object,
                                        typeSelect: 'Edit',
                                        idvalue: e.target.id,
                                        themeName,
                                        submitButtton: 'Update',
                                        themeType,
                                        fileObj: gameFile ? gameFile : {}
                                    })
                                }}>Edit</button>
                        }
                    </div>,
            },
            {
                name: 'Delete',
                sortable: true,
                selector: (row, index, column, id) =>
                    <div id={row.id} >
                        <div style={{ fontWeight: 700 }}></div>
                        <button id={row.id} className="btn btn-danger" onClick={(e) => {
                            if (window.confirm("Please confirm to Delete this Theme")) {
                                this.deleteThemes(e.target.id)
                            }
                        }}>Delete</button>
                    </div>,
            },
            {
                name: 'Godot Preview',
                sortable: true,
                selector: (row, index, column, id) =>
                    (row.themeType === "godot" && row.gameFile && Object.keys(row.gameFile).length > 0) ? <div id={row.id}>
                        <div style={{ fontWeight: 700 }}></div>
                        <Link className="btn btn-primary" onClick={() => {
                            window.open("/" + MyConstant.keyList.projectUrl + "/godotpreview/" + row.id);

                        }}>Godot Preview</Link>
                    </div> : "-",
            },

        ];

        let data = [];
        Object.keys(this.state.themesList).map((ival) => {
            data.push(this.state.themesList[ival])
            return data
        });
        let options = [];
        Object.keys(this.state.imageList).map((ival) => {
            let image = this.state.imageList[ival];
            options.push({ value: image.id, label: image.title, json: image })
            return options
        });

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
                                            <h2>Theme</h2>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="x_content">

                                            <ToastContainer />
                                            <div className="row">
                                                <div className="col-12 text-right">
                                                    <button className="btn theme-bg" onClick={() => {
                                                        this.setState({
                                                            themeModal: true
                                                        })
                                                    }}>Add Theme</button>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    {data.length !== 0 ?
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



                                            {/*Image View*/}
                                            <div id="myModal" className="modal_image" style={{ display: displayImage }} >
                                                <span className="close" onClick={() => {
                                                    this.setState({ displayImage: "none" })
                                                }}  >&times;</span>
                                                {this.state.imageView ?

                                                    <img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.imageView.json.fileName + "&id=" + this.state.imageView.json.fileType} className="modal-content_image" id="img01" alt="loading" />

                                                    : null}

                                                <div id="caption">  </div>
                                            </div>
                                            {/*Image View*/}

                                            {/*Content*/}

                                            {
                                                themeModal && <Modal
                                                    visible={themeModal}
                                                    size={"modal-lg"}
                                                    closeModal={() => this.setState({
                                                        themeModal: false, themeName: "", selectedOption: "", imageView: ""
                                                    })}
                                                    heading={`Manage Theme`}
                                                    body={<React.Fragment>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label> Theme Name</label>
                                                                    <div>
                                                                        <input type={'text'} placeholder={'Enter Theme'} className={'form-control'}
                                                                            value={this.state.themeName} onChange={(e) => {
                                                                                this.setState({ themeName: e.target.value })
                                                                            }} />
                                                                        <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 5 }}> {this.state.themeNameValidate} </span>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label> Transparent image</label>
                                                                    <div>
                                                                        <DropDown
                                                                            selectedOption={this.state.selectedOption.label ? this.state.selectedOption : { label: "Select", value: "Select" }}
                                                                            onChange={(e) => {
                                                                                this.setState({ selectedOption: e, imageView: e })
                                                                            }}
                                                                            options={options}
                                                                        />
                                                                        <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 5 }}> {this.state.levelImageValidate} </span>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label> Theme Type</label>
                                                                    <div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="themeType" value="Static" onChange={(e) => this.onThemeTypeChanged(e)} checked={themeType === "Static"} />
                                                                            <label className="form-check-label">Static</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="themeType" value="Dynamic" onChange={(e) => this.onThemeTypeChanged(e)} checked={themeType === "Dynamic"} />
                                                                            <label className="form-check-label">Dynamic</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="godot" value="godot" onChange={(e) => this.onThemeTypeChanged(e)} checked={themeType === "godot"} />
                                                                            <label className="form-check-label">Godot</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    {this.state.selectedOption.json ? <React.Fragment>

                                                                        <img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.selectedOption.json.fileName + "&id=" + this.state.selectedOption.json.fileType} width="100%" height="100%" alt="loading..."
                                                                            onClick={() => {
                                                                                this.setState({ displayImage: "block" })
                                                                            }} />

                                                                    </React.Fragment> : null}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {themeType === "godot" && this.state.typeSelect === 'Edit' && Object.keys(this.state.fileObj).length > 0 && <>
                                                            <i style={{ fontSize: 30 }} className="fa fa-file-zip-o"></i>
                                                        </>}
                                                        {themeType === "godot" && this.state.typeSelect !== 'Edit' && <>
                                                            <div className="row item form-group" style={{ marginTop: 10 }}>
                                                                <div className="col-sm-1">Zip File </div>
                                                                <div className="col-sm-4">
                                                                    <input type="file"
                                                                        accept=".zip"
                                                                        onChange={async (event) => {
                                                                            var files = event.target.files;
                                                                            var length = files.length;

                                                                            if (length > 0) {
                                                                                for (var i = 0; i < length; i++) {
                                                                                    var fileUrl = URL.createObjectURL(files[i]);
                                                                                    var file = files[i];
                                                                                    var filename = file.name;
                                                                                    var ext = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);

                                                                                    var uid = uuidv4();
                                                                                    var fileObj = {
                                                                                        file: file,
                                                                                        fileUrl: fileUrl,
                                                                                        fileName: uid + "." + ext,
                                                                                        docsId: uid,
                                                                                        processType: "module",
                                                                                        fileType: ext,
                                                                                        origFileName: filename
                                                                                    };
                                                                                    // console.log("fileObj", fileObj)
                                                                                    this.setState({ fileObj, })
                                                                                }
                                                                            }
                                                                        }
                                                                        }
                                                                    />
                                                                    <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 5 }}> {zipFileSelectValidate} </span>
                                                                </div>
                                                                <div className="col-sm-7"> </div>
                                                            </div>
                                                        </>}
                                                    </React.Fragment>
                                                    }
                                                    footer={<React.Fragment>
                                                        {
                                                            submitButtton === 'Submit' ?
                                                                <button type="button" className={'btn btn-primary'} onClick={() => {
                                                                    this.submitFunction()
                                                                }}>
                                                                    {submitLoader ? <i className="fa fa-spinner fa-spin"></i> : null}
                                                                    {submitButtton}
                                                                </button>
                                                                :
                                                                <span>
                                                                    <button type="button" className={'btn btn-primary '} onClick={() => {
                                                                        this.UpdateFunction()
                                                                    }}>
                                                                        {submitLoader ? <i className="fa fa-spinner fa-spin"></i> : null}
                                                                        {submitButtton}
                                                                    </button>
                                                                </span>
                                                        }
                                                    </React.Fragment>}
                                                />
                                            }
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

export default Theme;
