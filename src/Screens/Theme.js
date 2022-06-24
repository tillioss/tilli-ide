import React from 'react';
import DataTable from "../Component/DataTable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import DropDown from "../Component/DropDown";
import MyConstant from "../config/MyConstant";
import TopMenu from '../Screens/Menu/TopMenu';
import SideMenu from '../Screens/Menu/SideMenu';
import { Link } from 'react-router-dom';
import Modal from '../Component/Modal';
import { doConnect } from '../config/Common';

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
            themeType: "Static"
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
        if (Object.keys(json).length > 0 && json['themesMap'] != null && json['themesMap'] != undefined) {
            let themesMap = json['themesMap'];
            that.setState({ themesList: themesMap })
        }
    }

    async submitFunction() {
        const { themeName, selectedOption, themeType } = this.state;

        if (themeName.length == 0) {
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

        if (themeName && themeName.length != 0) {
            let postJson = {
                name: themeName,
                sessionId: '1223',
                image: this.state.selectedOption.json,
                themeType
            };
            let responseData = await doConnect("addTheme", "POST", postJson);
            if (responseData.response == 'Success') {
                toast.success('Added data !', {
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
    }

    async UpdateFunction() {
        const { themeName, themeType } = this.state;

        if (themeName.length == 0) {
            this.setState({ themeNameValidate: 'Please Enter Value' })
            return false
        } else {

            this.setState({ themeNameValidate: '' })
        }
        let found = this.state.themeValue.findIndex((a) =>
            a.id === this.state.idvalue
        );
        let postJson = {
            themeId: this.state.idvalue,
            name: themeName,
            image: this.state.selectedOption.json,
            sessionId: '1223',
            themeType
        };
        let responseData = await doConnect("updateTheme", "POST", postJson);
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
            this.getThemes();
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

        const { displayImage, submitButtton, themeModal, themeType } = this.state;

        const columns = [
            {
                name: 'Name',
                selector: 'name',
                sortable: true,
            },

            {
                name: 'Image',
                selector: 'Button',
                sortable: true,
                cell: (row, index, column, id) => {
                    let image = row.image;
                    return <div style={{ padding: 10 }}><img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + image.fileName + "&id=" + image.fileType} width="75" height="75" onClick={async () => {

                        await this.setState({ imageView: { json: row.image }, displayImage: "block" })

                    }} /></div>
                },

            },
            {
                name: 'Manage',
                selector: 'Manage',
                sortable: true,
                cell: (row, index, column, id) =>
                    row.themeType === "Dynamic" ? <div id={row.id}>
                        <div style={{ fontWeight: 700 }}></div>
                        <Link to={"/" + MyConstant.keyList.projectUrl + "/theme-builder/" + row.id} className="btn btn-primary">Manage</Link>
                    </div> : "-",
            },
            {
                name: 'Edit',
                selector: 'Edit',
                sortable: true,
                cell: (row, index, column, id) =>
                    <div id={row.id}                       >
                        <div style={{ fontWeight: 700 }}></div>
                        <button id={row.id} className="btn btn-info" onClick={(e) => {
                            console.log('e', e.target.id)
                            //console.log(this.state.themesList)
                            var found = Object.keys(this.state.themesList).findIndex((a) =>
                                this.state.themesList[e.target.id] === e.target.id
                            )

                            let object = {};
                            object.value = this.state.themesList[e.target.id].id;
                            object.label = this.state.themesList[e.target.id].image.title;
                            object.json = this.state.themesList[e.target.id].image

                            // console.log(object)
                            let themeName = this.state.themesList[e.target.id].name
                            let themeType = this.state.themesList[e.target.id].themeType

                            this.setState({
                                themeModal: true,
                                selectedOption: object,
                                typeSelect: 'Edit',
                                idvalue: e.target.id,
                                themeName,
                                submitButtton: 'Update',
                                themeType
                            })
                        }}>Edit</button>
                    </div>,
            },
            {
                name: 'Delete',
                selector: 'Delete',
                sortable: true,
                cell: (row, index, column, id) =>
                    <div id={row.id} >
                        <div style={{ fontWeight: 700 }}></div>
                        <button id={row.id} className="btn btn-danger" onClick={(e) => {
                            this.deleteThemes(e.target.id)
                        }}>Delete</button>
                    </div>,
            }

        ];

        let data = [];
        Object.keys(this.state.themesList).map((ival, index) => {
            data.push(this.state.themesList[ival])
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



                                            {/*Image View*/}
                                            <div id="myModal" className="modal_image" style={{ display: displayImage }} >
                                                <span className="close" onClick={() => {
                                                    this.setState({ displayImage: "none" })
                                                }}  >&times;</span>
                                                {this.state.imageView ?

                                                    <img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.imageView.json.fileName + "&id=" + this.state.imageView.json.fileType} className="modal-content_image" id="img01" />

                                                    : null}

                                                <div id="caption">  </div>
                                            </div>
                                            {/*Image View*/}

                                            {/*Content*/}

                                            {
                                                themeModal && <Modal
                                                    visible={themeModal}
                                                    size={"modal-lg"}
                                                    closeModal={() => this.setState({ themeModal: false })}
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

                                                    </React.Fragment>
                                                    }
                                                    footer={<React.Fragment>
                                                        {
                                                            submitButtton == 'Submit' ?
                                                                <button type="button" className={'btn btn-primary'} onClick={() => {
                                                                    this.submitFunction()
                                                                }}>{submitButtton}
                                                                </button>
                                                                :
                                                                <span>
                                                                    <button type="button" className={'btn btn-primary '} onClick={() => {
                                                                        this.UpdateFunction()
                                                                    }}>{submitButtton}
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
