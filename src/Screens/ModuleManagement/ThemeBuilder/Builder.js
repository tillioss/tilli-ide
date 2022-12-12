import React from 'react';
import drag_drop from '../../../images/drag_drop.png';
import EllipseForm from './Elements/EllipseForm';
import RectangleForm from './Elements/RectangleForm';
import TextForm from './Elements/TextForm';
import ImageForm from './Elements/ImageForm';
import MyConstant from '../../../config/MyConstant';
import { toast, ToastContainer } from "react-toastify";
import CircleForm from './Elements/CircleForm';
import LableAnimationForm from './Elements/LableAnimationForm';
import LabelAnimation from './Theme/LabelAnimation';
import DragAndDrop from './Theme/DragAndDrop';
import VideoForm from './Elements/VideoForm';
import DragAndDropForm from './Elements/DragAndDropForm';
import GroupedInput from './Theme/GroupedInput';
import GroupedInputForm from './Elements/GroupedInputForm';
import Card from '../../../Component/Card';
import Modal from '../../../Component/Modal';
import { doConnect } from '../../../config/Common';

export default class Builder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            layers: [],
            layerHover: "",
            layerActive: "",
            deviceHeight: "",
            deviceWidth: "",
            fileData: {},
            themeId: "",
            hiddenViewModal: false
        }
        this.buildDesign = this.buildDesign.bind(this);
        this.setValue = this.setValue.bind(this);
        this.escFunction = this.escFunction.bind(this);
        this.setActiveLayer = this.setActiveLayer.bind(this);
        this.onHoverLayer = this.onHoverLayer.bind(this);
        this.onLeaveLayer = this.onLeaveLayer.bind(this);
    }

    componentDidMount() {
        let { themeId } = this.props.match.params;
        let height = this.mobile.clientHeight;
        let width = this.mobile.clientWidth;
        this.setState({
            deviceHeight: height,
            deviceWidth: width,
            themeId,
        }, () => {
            this.getLayers();
            this.getImages()
        })

        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event) {
        if (event.key === "Escape") {
            this.setState({
                layerActive: ""
            })
        }
    }
    async getImages() {
        let postJson = { fileType: 'image', sessionId: '1223' };
        let responseData = await doConnect("getGameFilesList", "POST", postJson);
        let json = responseData;
        this.setState({
            fileData: json.filesMap
        }, () => {
            this.getGifImage()
        })
    }


    getImageOption() {
        let imageOptions = [];
        Object.keys(this.state.fileData).map((ival, index) => {
            let image = this.state.fileData[ival];
            imageOptions.push({ value: MyConstant.keyList.apiURL + "vp?action=module&key=" + image.fileName + "&id=" + image.fileType, label: image.title, json: image })
            return true
        });
        return imageOptions
    }
    getVideoOption() {
        let imageOptions = [];

        return imageOptions
    }

    async getGifImage() {
        let postJson = { fileType: 'gif', sessionId: '1223' };
        let responseData = await doConnect("getGameFilesList", "POST", postJson);
        let json = responseData;
        let data_merge = { ...this.state.fileData, ...json.filesMap }
        this.setState({
            fileData: data_merge
        })
    }

    async getLayers() {
        let { themeId } = this.state;
        let postJson = { themeId };
        let responseData = await doConnect("getThemeContent", "POST", postJson);
        responseData = JSON.parse(responseData)
        if (responseData.response !== null) {
            this.setState({
                layers: JSON.parse(responseData.response)
            })
        }
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    deleteLayer() {
        let { layers, layerActive } = this.state;
        if (window.confirm("Please confirm to Delete this Layer")) {
            console.log(layerActive, layers[layerActive])
            let findRecordIndex = layers.findIndex((e) => { return e.action === "Record" });
            let findCheckLayOutIndex = layers.findIndex((e) => { return e.action === "Checked Layout" });
            let findChangeLayOutIndex = layers.findIndex((e) => { return e.action === "Change Layout" });
            let findResetLayOutIndex = layers.findIndex((e) => { return e.action === "Reset Text" });

            if (findRecordIndex !== "-1" && layers[findRecordIndex] && layers[findRecordIndex].action === "Record") {
                console.log("layers-->", layers[findRecordIndex], layerActive)
                let { hidden, questionMark, recordHold, recordValue, visible } = layers[findRecordIndex].layers;
                if (Array.isArray(recordHold) && recordHold.includes(layerActive)) {
                    recordHold = recordHold.filter((e) => { return e !== layerActive })
                    layers[findRecordIndex].layers.recordHold = recordHold
                }
                if (Array.isArray(recordValue) && recordValue.includes(layerActive)) {
                    recordValue = recordValue.filter((e) => { return e !== layerActive })
                    layers[findRecordIndex].layers.recordValue = recordValue
                }
                if (Array.isArray(visible) && visible.includes(layerActive)) {
                    visible = visible.filter((e) => { return e !== layerActive })
                    layers[findRecordIndex].layers.visible = visible
                }
                if (Array.isArray(hidden) && hidden.includes(layerActive)) {
                    hidden = hidden.filter((e) => { return e !== layerActive })
                    layers[findRecordIndex].layers.hidden = hidden
                }
                if (Array.isArray(questionMark) && questionMark.includes(layerActive)) {
                    questionMark = questionMark.filter((e) => { return e !== layerActive })
                    layers[findRecordIndex].layers.questionMark = questionMark
                }
                console.log("recordIndex-->", layers[findRecordIndex], layerActive)
            }

            if (findCheckLayOutIndex !== "-1" && layers[findCheckLayOutIndex] && layers[findCheckLayOutIndex].action === "Checked Layout") {
                let { hidden, visible } = layers[findCheckLayOutIndex].layers;
                console.log("layers-->", layers[findCheckLayOutIndex], layerActive)
                if (visible.includes(layerActive)) {
                    visible = visible.filter((e) => { return e !== layerActive })
                    layers[findCheckLayOutIndex].layers.visible = visible
                }
                if (hidden.includes(layerActive)) {
                    hidden = hidden.filter((e) => { return e !== layerActive })
                    layers[findCheckLayOutIndex].layers.hidden = hidden
                }
                console.log("checkLayout-->", layers[findCheckLayOutIndex], layerActive)
            }

            if (findChangeLayOutIndex !== "-1" && layers[findChangeLayOutIndex] && layers[findChangeLayOutIndex].action === "Change Layout") {
                let { hidden, visible } = layers[findChangeLayOutIndex].layers;
                console.log("layers-->", layers[findChangeLayOutIndex], layerActive)
                if (Array.isArray(visible) && visible.includes(layerActive)) {
                    visible = visible.filter((e) => { return e !== layerActive })
                    layers[findChangeLayOutIndex].layers.visible = visible
                }
                if (Array.isArray(hidden) && hidden.includes(layerActive)) {
                    hidden = hidden.filter((e) => { return e !== layerActive })
                    layers[findChangeLayOutIndex].layers.hidden = hidden
                }
                console.log("changeLayout-->", layers[findChangeLayOutIndex], layerActive)
            }
            if (findResetLayOutIndex !== "-1" && layers[findResetLayOutIndex] && layers[findResetLayOutIndex].action === "Reset Text") {
                let { resetText } = layers[findResetLayOutIndex].layers;
                if (Array.isArray(resetText) && resetText.includes(layerActive)) {
                    resetText = resetText.filter((e) => { return e !== layerActive })
                    layers[findResetLayOutIndex].layers.resetText = resetText
                }
            }
            layers.splice(layerActive, 1);
        }
        console.log("layers-->", layers)
        this.setState({
            layers,
            layerActive: ""
        })
    }
    drop(ev) {
        ev.preventDefault();
        let { layers, } = this.state
        var data = ev.dataTransfer.getData("text");

        console.log(data);
        let x = 0;
        let y = 0;
        switch (data) {
            case "rectangle":
                layers.push({
                    visibility: "visible",
                    type: data,
                    x: x,
                    y: y,
                    width: 100,
                    height: 20,
                    backgroundColor: "#dddddd",
                    borderWidth: 0,
                    borderColor: "",
                    borderStyle: "solid",
                    borderRadius: 0,
                    action: ""
                })
                break;
            case "groupedInput":
                layers.push({
                    type: data,
                    inputType: "checkbox",
                    visibility: "visible",
                    inputs: [
                        {
                            x: x,
                            y: y,
                            width: 100,
                            height: 20,
                            backgroundColor: "#dddddd",
                            borderWidth: 0,
                            borderColor: "",
                            borderStyle: "solid",
                            borderRadius: 0,
                            action: ""
                        }
                    ]
                })
                break;
            case "ellipse":
                layers.push({
                    visibility: "visible",
                    type: data,
                    x: x,
                    y: y,
                    width: 100,
                    height: 100,
                    backgroundColor: "#dddddd",
                    borderWidth: 0,
                    borderColor: "",
                    borderStyle: "solid",
                    borderRadius: 50,
                    action: ""
                })
                break;
            case "circle":
                layers.push({
                    visibility: "visible",
                    type: data,
                    x: x,
                    y: y,
                    radius: 25,
                    backgroundColor: "#dddddd",
                    borderWidth: 0,
                    borderColor: "",
                    borderStyle: "solid",
                    action: ""
                })
                break;
            case "text":
                layers.push({
                    visibility: "visible",
                    type: data,
                    x: x,
                    y: y,
                    width: 100,
                    height: 20,
                    text: "Place text here",
                    action: ""
                })
                break;
            case "image":
                layers.push({
                    visibility: "visible",
                    type: data,
                    x: x,
                    y: y,
                    width: 100,
                    height: 20,
                    image: "",
                    action: ""
                })
                break;
            case "video":
                layers.push({
                    visibility: "visible",
                    type: data,
                    x: x,
                    y: y,
                    width: 100,
                    height: 20,
                    video: "",
                    action: ""
                })
                break;
            case "labelAnimation":
                layers.push({
                    visibility: "visible",
                    type: data,
                    x: x,
                    y: y,
                    width: 100,
                    height: 20,
                    backgroundColor: "#dddddd",
                    borderWidth: 0,
                    borderColor: "",
                    borderStyle: "solid",
                    borderRadius: 0,
                    action: "",
                    label: [
                        {
                            text: "Place text here",
                            backgroundColor: "#dddddd",
                            borderWidth: 0,
                            borderColor: "",
                            borderStyle: "solid",
                            borderRadius: 0,
                        }
                    ]
                })
                break;
            case "dragAndDrop":
                layers.push({
                    type: data,
                    drag: {
                        x: x,
                        y: y,
                        width: 20,
                        height: 20,
                        backgroundColor: "#dddddd",
                        borderWidth: 0,
                        borderColor: "",
                        borderStyle: "solid",
                        borderRadius: 0
                    },
                    drop: [{
                        x: x + 20,
                        y: y,
                        width: 20,
                        height: 20,
                        borderWidth: 0,
                        borderColor: "",
                        borderStyle: "solid",
                        borderRadius: 0
                    }]
                })
                break;
            default:
        }

        this.setState({
            layers,
            layerActive: (layers.length - 1)
        })
        ev.stopPropagation();
        return false;
    }

    layerBuild(layer, index) {
        let builder;
        let { deviceHeight, layerHover, layerActive, deviceWidth } = this.state;
        switch (layer.type) {
            case "rectangle":
                builder = <div
                    onClick={() => this.setActiveLayer(index)}
                    className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
                    onMouseEnter={() => this.onHoverLayer(index)}
                    onMouseLeave={() => this.onLeaveLayer(index)}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "%",
                        height: parseInt((layer.height / 100) * deviceHeight) + "px",
                        backgroundColor: layer.backgroundColor,
                        borderWidth: layer.borderWidth + "px",
                        borderColor: layer.borderColor,
                        borderStyle: layer.borderStyle,
                        borderRadius: layer.borderRadius + "px",
                    }} key={index}>
                </div>
                break;
            case "groupedInput":
                builder = <GroupedInput setActiveLayer={this.setActiveLayer} onHoverLayer={this.onHoverLayer} onLeaveLayer={this.onLeaveLayer} deviceHeight={deviceHeight} layerHover={layerHover} layerActive={layerActive} index={index} layer={layer} />
                break;
            case "labelAnimation":
                builder = <LabelAnimation setActiveLayer={this.setActiveLayer} onHoverLayer={this.onHoverLayer} onLeaveLayer={this.onLeaveLayer} deviceHeight={deviceHeight} layerHover={layerHover} layerActive={layerActive} index={index} layer={layer} />
                break;
            case "dragAndDrop":
                builder = <DragAndDrop setActiveLayer={this.setActiveLayer} onHoverLayer={this.onHoverLayer} onLeaveLayer={this.onLeaveLayer} deviceHeight={deviceHeight} layerHover={layerHover} layerActive={layerActive} index={index} layer={layer} />
                break;
            case "ellipse":
                builder = <div
                    onClick={() => this.setActiveLayer(index)}
                    className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
                    onMouseEnter={() => this.onHoverLayer(index)}
                    onMouseLeave={() => this.onLeaveLayer(index)}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "px",
                        height: layer.height + "px",
                        backgroundColor: layer.backgroundColor,
                        borderWidth: layer.borderWidth + "px",
                        borderColor: layer.borderColor,
                        borderStyle: layer.borderStyle,
                        borderRadius: layer.borderRadius + "px",
                    }} key={index}>
                </div>
                break;
            case "circle":
                builder = <div
                    onClick={() => this.setActiveLayer(index)}
                    className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
                    onMouseEnter={() => this.onHoverLayer(index)}
                    onMouseLeave={() => this.onLeaveLayer(index)}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: parseInt((layer.radius / 100) * deviceWidth) + "px",
                        height: parseInt((layer.radius / 100) * deviceWidth) + "px",
                        backgroundColor: layer.backgroundColor,
                        borderWidth: layer.borderWidth + "px",
                        borderColor: layer.borderColor,
                        borderStyle: layer.borderStyle,
                        borderRadius: "50%",
                    }} key={index}>
                </div>
                break;
            case "text":
                builder = <div
                    onClick={() => this.setActiveLayer(index)}
                    className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
                    onMouseEnter={() => this.onHoverLayer(index)}
                    onMouseLeave={() => this.onLeaveLayer(index)}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "%",
                        minHeight: parseInt((layer.height / 100) * deviceHeight) + "px",
                    }} key={index} dangerouslySetInnerHTML={{ __html: layer.text }}>
                </div>
                break;
            case "image":
                builder = <div
                    onClick={() => this.setActiveLayer(index)}
                    className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
                    onMouseEnter={() => this.onHoverLayer(index)}
                    onMouseLeave={() => this.onLeaveLayer(index)}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "%",
                        height: parseInt((layer.height / 100) * deviceHeight) + "px",
                    }} key={index}>
                    <img style={{ width: "100%", height: "100%" }} src={layer.image ? layer.image : drag_drop} alt="loading" />
                </div>
                break;
            case "video":
                builder = <div
                    onClick={() => this.setActiveLayer(index)}
                    className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
                    onMouseEnter={() => this.onHoverLayer(index)}
                    onMouseLeave={() => this.onLeaveLayer(index)}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "%",
                        height: parseInt((layer.height / 100) * deviceHeight) + "px",
                    }} key={index}>
                    <video style={{ width: "100%", height: "100%" }} >
                        <source src={layer.video ? layer.video : drag_drop} />
                    </video>
                </div>
                break;
            default:
        }
        return builder;
    }

    setValue(layers) {
        this.setState({
            layers
        })
    }

    buildDesign() {
        let { layers, layerActive } = this.state;
        let builder;

        let x = 0;
        let y = 0;
        if (layerActive !== "") {
            let activeLayer = layers[layerActive];
            let layerType = activeLayer.type;
            switch (layerType) {
                case "rectangle":
                    builder = <RectangleForm layerActive={layerActive} layers={layers} setValue={this.setValue} />
                    break;
                case "groupedInput":
                    builder = <GroupedInputForm layerActive={layerActive} layers={layers} setValue={this.setValue} />
                    break;
                case "labelAnimation":
                    builder = <LableAnimationForm layerActive={layerActive} layers={layers} setValue={this.setValue} />
                    break;
                case "dragAndDrop":
                    builder = <DragAndDropForm layerActive={layerActive} layers={layers} setValue={this.setValue} x={x} y={y} imageOptions={this.getImageOption()} />
                    break;
                case "ellipse":
                    builder = <EllipseForm layerActive={layerActive} layers={layers} setValue={this.setValue} />
                    break;
                case "circle":
                    builder = <CircleForm layerActive={layerActive} layers={layers} setValue={this.setValue} />
                    break;
                case "text":
                    builder = <TextForm layerActive={layerActive} layers={layers} setValue={this.setValue} />
                    break;
                case "image":
                    builder = <ImageForm layerActive={layerActive} layers={layers} imageOptions={this.getImageOption()} setValue={this.setValue} />
                    break;
                case "video":
                    builder = <VideoForm layerActive={layerActive} layers={layers} videoOptions={this.getVideoOption()} setValue={this.setValue} />
                    break;
                default:
            }
        }
        return builder;
    }

    onHoverLayer(index) {
        this.setState({
            layerHover: index
        })
    }
    onLeaveLayer(index) {
        this.setState({
            layerHover: ""
        })
    }

    setActiveLayer(index) {
        this.setState({
            layerActive: index
        })
    }

    async save() {
        let { themeId, layers } = this.state;
        let postJson = { themeId, data: JSON.stringify(layers) };
        let responseData = await doConnect("updateThemeContent", "POST", postJson);
        responseData = JSON.parse(responseData)
        if (responseData.response === "Success") {
            toast.success('Successfully updated.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    preview() {
        let { themeId } = this.state;
        let url = "/" + MyConstant.keyList.projectUrl + "/theme-viewer/" + themeId;
        window.open(url, '_blank').focus();
    }
    hiddenView() {
        this.setState({
            hiddenViewModal: true
        })
    }

    layerAdd(value) {
        let { layers } = this.state;
        layers[value].visibility = layers[value].visibility === "visible" ? "hidden" : "visible";
        this.setState({
            layers
        })
    }

    back() {
        if (window.confirm("Are you sure to continue to back?") === true) {
            let url = "/" + MyConstant.keyList.projectUrl + "/Theme";
            this.props.history.push(url);
        }
    }
    render() {
        let { layers, layerActive, hiddenViewModal, deviceHeight } = this.state;
        return <div className="main-content">
            <ToastContainer />
            <div className="layer-builder d-flex dynamic-form">
                <div className="smartphone-builder">
                    <div className="smartphone-content tilli-web"
                        onDrop={(e) => this.drop(e)}
                        onDragOver={(e) => this.allowDrop(e)}
                        ref={(e) => { this.mobile = e }}
                    >
                        <div style={{ position: "relative", height: "100%" }}>
                            {
                                layers.map((layer, index) => {
                                    return this.layerBuild(layer, index)
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="builder" style={{ flex: 1, margin: "0 10px", backgroundColor: "#fff" }}>
                    <div className="row mx-0 py-2" style={{ borderBottom: "1px solid #ddd", height: 50 }}>
                        <div className="col-6">
                            <button className="btn btn-sm btn-secondary" onClick={() => this.back()}>Back</button>
                        </div>
                        <div className="col-6 text-right">
                            <button className="btn btn-sm btn-secondary mr-2" onClick={() => this.hiddenView()}>Layers</button>
                            <button className="btn btn-sm btn-success mr-2" onClick={() => this.preview()}>Preview</button>
                            <button className="btn btn-sm btn-primary" onClick={() => this.save()}>Save</button>
                        </div>
                    </div>
                    <div style={{ height: 'calc(100vh - 175px)', overflow: "auto" }}>

                        <div className="row mx-0 p-2">
                            <div className="col-2" id="rectangle" draggable="true" onDragStart={(e) => this.drag(e)}>
                                <div className="element">
                                    Rectangle
                                </div>
                            </div>
                            <div className="col-2" draggable="true">
                                <div className="element" id="ellipse" draggable="true" onDragStart={(e) => this.drag(e)}>
                                    Ellipse
                                </div>
                            </div>
                            <div className="col-2" id="text" draggable="true" onDragStart={(e) => this.drag(e)}>
                                <div className="element">
                                    Text
                                </div>
                            </div>
                            <div className="col-2" id="image" draggable="true" onDragStart={(e) => this.drag(e)}>
                                <div className="element">
                                    Image
                                </div>
                            </div>
                            <div className="col-2" id="circle" draggable="true" onDragStart={(e) => this.drag(e)}>
                                <div className="element">
                                    Circle
                                </div>
                            </div>
                            <div className="col-2" id="labelAnimation" draggable="true" onDragStart={(e) => this.drag(e)}>
                                <div className="element">
                                    Label Animation
                                </div>
                            </div>
                        </div>
                        <div className="row mx-0 p-2">
                            <div className="col-2" id="dragAndDrop" draggable="true" onDragStart={(e) => this.drag(e)}>
                                <div className="element">
                                    Drag and Drop
                                </div>
                            </div>
                            <div className="col-2" id="video" draggable="true" onDragStart={(e) => this.drag(e)}>
                                <div className="element">
                                    Video
                                </div>
                            </div>
                            <div className="col-2" id="groupedInput" draggable="true" onDragStart={(e) => this.drag(e)}>
                                <div className="element">
                                    Grouped Input
                                </div>
                            </div>
                        </div>
                        {
                            layerActive !== "" && <React.Fragment>
                                <div style={{
                                    background: '#3b79f6',
                                    padding: 10,
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>
                                    Layer {layerActive + 1}
                                </div>
                                {this.buildDesign()}
                                <hr />
                                <div className="row">
                                    <div className="col-12 text-right">
                                        <button onClick={() => this.deleteLayer()} className="btn btn-sm btn-danger">Delete</button>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
            {
                hiddenViewModal && <Modal
                    visible={hiddenViewModal}
                    closeModal={() => this.setState({ hiddenViewModal: false })}
                    heading={`Preview`}
                    size="modal-xl"
                    body={
                        <div className="d-flex">
                            <div className="smartphone" style={{ height: deviceHeight + 120 }}>
                                <div className="smartphone-content tilli-web" style={{ height: deviceHeight }}>
                                    <div style={{ position: "relative", height: "100%" }}>
                                        {
                                            layers.map((layer, index) => {
                                                return this.layerBuild(layer, index)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="px-3" style={{ flex: 1 }}>
                                <div style={{
                                    background: '#3b79f6',
                                    padding: 10,
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>
                                    Layout
                                </div>
                                <div className="pt-2">
                                    <Card
                                        title="Layers">
                                        {
                                            layers.map((row, rowIndex) => {
                                                return <div className="pt-2 px-2" key={rowIndex}>
                                                    <input type="checkbox" name="layers" onChange={() => this.layerAdd(rowIndex)} checked={row.visibility === "visible"} /> Layer {rowIndex + 1}
                                                </div>
                                            })
                                        }
                                    </Card>
                                </div>
                            </div>
                        </div>
                    }
                />
            }
        </div>;
    }
}
