import React from 'react';
import DataTable from "../Component/DataTable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyConstant from "../config/MyConstant";
import { doConnect } from '../config/Common';


class LevelModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: {},
            levelArray: [],
            imageList: [],
            data: [], gamingArray: {}, typeSelect: "", levelColor: '', levelName: '',
            buttonName: "Submit",
            sortOrder: ''
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
        let that = this;
        let json = responseData;
        if (Object.keys(json).length > 0 && json['levelsMap'] != null && json['levelsMap'] != undefined) {
            let levelsMap = json['levelsMap'];
            that.setState({ gamingArray: levelsMap })
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
        const { levelName, levelColor, selectedOption, sortOrder } = this.state;
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
            this.setState({ sortOrderValidate: 'Please Sort Order' })
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
                this.setState({ buttonName: 'Submit', selectedOption: {}, typeSelect: '', idvalue: "", levelColor: "", levelName: "" })
                this.getLevels();
            } else {
                alert(response);
            }
        }
    }

    async  updateLevels() {
        const { levelName, levelColor, sortOrder } = this.state;
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
                this.setState({ buttonName: 'Submit', selectedOption: {}, typeSelect: '', idvalue: "", levelColor: "", levelName: "" })

                this.getLevels();
            } else {
                alert(responseData.response);
            }
        }


    }

    render() {

        const { buttonName } = this.state;

        const columns = [
            {
                name: 'Order',
                selector: 'sortOrder',
                sortable: true,
            },
            {
                name: 'Name',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Color',
                selector: 'color',
                sortable: true,
            },
            {
                name: 'Image',
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

                        <button id={row.id} className="btn btn-primary" onClick={() => {
                            // this.props.history.push('/'+MyConstant.keyList.projectUrl+'/ModuleLanguageMapping/'+row.id )
                            this.props.history.push('/' + MyConstant.keyList.projectUrl + '/ModuleLanguageJson/' + row.id)
                        }}>Manage</button>

                    </div>
                },
            },

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
                                            <h2>Plain Page</h2>
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
                                            <div className="row" style={{ marginTop: 20 }}>
                                                <div className="col-sm-3"></div>
                                                <div className="col-sm-5"><h4> Level Module </h4></div>
                                                <div className="col-sm-4">
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12" style={{ verticalAlign: 'center' }}>
                                                    {data.length != 0 ?
                                                        <DataTable
                                                            title=""
                                                            columns={columns}
                                                            data={data}
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

                            {/* <!--content --> */}

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LevelModule;
