import React from 'react';
import drag_drop from '../../../images/drag_drop.png';
import DragAndDrop from './ThemeView/DragAndDrop';
import GroupedInput from './ThemeView/GroupedInput';
import LabelAnimation from './ThemeView/LabelAnimation';
import AudioRecognize from './ThemeView/AudioRecognize';
import SpeechRecognition from 'react-speech-recognition'
import { doConnect } from '../../../config/Common';

export default class ThemeViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            layers: [],
            deviceHeight: "",
            deviceWidth: "",
            audioRecognize: "",
            recordText: ""
        }
        this.dynamicThemeAction = this.dynamicThemeAction.bind(this);
        this.setRecord = this.setRecord.bind(this);
    }

    componentDidMount() {
        let { themeId } = this.props.match.params;
        let height = this.mobile.clientHeight;
        let width = this.mobile.clientWidth;
        this.setState({
            deviceHeight: height,
            deviceWidth: width,
            themeId
        }, () => {
            this.getLayers();
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

    dynamicThemeAction(layer, index) {
        let { layers } = this.state;
        let action = layer.action;
        let visible;
        let hidden;
        let audioRecognize;
        let that = this;
        switch (action) {
            case "Change Layout":
            case "Checked Layout":
                visible = layer.layers.visible;
                hidden = layer.layers.hidden;
                visible.map((row) => {
                    layers[row].visibility = "visible";
                })
                hidden.map((row) => {
                    layers[row].visibility = "hidden";
                })
                break;
            case "Record":
                visible = layer.layers.visible;
                hidden = layer.layers.hidden;
                audioRecognize = layer.layers.recordValue[0];
                visible.map((row) => {
                    layers[row].visibility = "visible";
                })
                hidden.map((row) => {
                    layers[row].visibility = "hidden";
                })
                this.setState({
                    audioRecognize
                })
                break;
            case "Record Press":
                let btn = document.querySelector('#layer' + index)
                btn.addEventListener('touchstart', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    console.log("start");
                    that.onStartRecord()
                })

                btn.addEventListener('touchend', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    console.log("end")
                    that.onStopRecord()

                })
                btn.addEventListener('touchleave', function () {
                    console.log('btn moving end');
                })
                btn.addEventListener('touchcancel', function () {
                    console.log('btn moving cancel');
                })

                //diff
                btn.addEventListener("mousedown", (e) => {
                    this.mouseEnterfunction()
                }, false);
                btn.addEventListener("mouseup", (e) => {
                    this.mouseMouseLeavefunction()
                }, false);
                break;
        }

        this.setState({
            layers
        })
    }
    mouseEnterfunction() {
        var that = this
        console.log("start web");
        that.onStartRecord()
    }

    mouseMouseLeavefunction() {
        var that = this
        console.log("end  web")
        that.onStopRecord()
    }
    onStartRecord() {
        SpeechRecognition.startListening({
            language: "en",
            continuous: true,
        })
    }
    onStopRecord() {
        SpeechRecognition.stopListening({ continuous: false })
    }

    setRecord(text) {
        this.setState({
            recordText: text
        })
    }
    layerBuildRecord(layer, index, recordText) {
        let builder;
        let { deviceHeight, deviceWidth } = this.state;
        switch (layer.type) {
            case "rectangle":
                builder = <div
                    className={`layer`}
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
                    }}
                    key={index}
                    id={"layer" + index}
                    onClick={() => {
                        this.dynamicThemeAction(layer, index)
                    }}
                >
                    {recordText}
                </div>
                break;
        }

        return builder;
    }
    layerBuild(layer, index) {
        let builder;
        let { deviceHeight, deviceWidth } = this.state;
        switch (layer.type) {
            case "rectangle":
                builder = <div
                    className={`layer`}
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
                    }}
                    key={index}
                    id={"layer" + index}
                    onClick={() => {
                        this.dynamicThemeAction(layer, index)
                    }}
                >
                </div>
                break;
            case "groupedInput":
                builder = <GroupedInput dynamicThemeAction={this.dynamicThemeAction} deviceHeight={deviceHeight} index={index} layer={layer} />
                break;
            case "labelAnimation":
                builder = <LabelAnimation dynamicThemeAction={this.dynamicThemeAction} deviceHeight={deviceHeight} index={index} layer={layer} />
                break;
            case "dragAndDrop":
                builder = <DragAndDrop dynamicThemeAction={this.dynamicThemeAction} deviceHeight={deviceHeight} index={index} layer={layer} />
                break;
            case "ellipse":
                builder = <div
                    className={`layer`}
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
                    }} key={index}
                    id={"layer" + index}
                    onClick={() => {
                        this.dynamicThemeAction(layer, index)
                    }}
                >
                </div>
                break;
            case "circle":
                builder = <div
                    className={`layer`}
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
                    }} key={index}
                    id={"layer" + index}
                    onClick={() => {
                        this.dynamicThemeAction(layer, index)
                    }}
                >
                </div>
                break;
            case "text":
                builder = <div
                    className={`layer`}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "%",
                        minHeight: parseInt((layer.height / 100) * deviceHeight) + "px",
                    }}
                    key={index}
                    id={"layer" + index}
                    dangerouslySetInnerHTML={{ __html: layer.text }}
                    onClick={() => {
                        this.dynamicThemeAction(layer, index)
                    }}
                >
                </div>
                break;
            case "image":
                builder = <div
                    className={`layer`}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "%",
                        height: parseInt((layer.height / 100) * deviceHeight) + "px",
                    }} key={index}
                    id={"layer" + index}
                    onClick={() => {
                        this.dynamicThemeAction(layer, index)
                    }}
                >
                    <img style={{ width: "100%", height: "100%" }} src={layer.image ? layer.image : drag_drop} />
                </div>
                break;
            case "video":
                builder = <div
                    className={`layer`}
                    style={{
                        visibility: layer.visibility,
                        position: "absolute",
                        top: layer.y + "%",
                        left: layer.x + "%",
                        width: layer.width + "%",
                        height: parseInt((layer.height / 100) * deviceHeight) + "px",
                    }} key={index}
                    id={"layer" + index}
                    onClick={() => {
                        this.dynamicThemeAction(layer, index)
                    }}
                >
                    <video style={{ width: "100%", height: "100%" }} >
                        <source src={layer.video ? layer.video : drag_drop} />
                    </video>
                </div>
                break;
        }
        return builder;
    }


    render() {
        let { layers, audioRecognize, recordText } = this.state;
        console.log("audioRecognize", audioRecognize)
        return <div className="mobile-responsive tilli-web"
            ref={(e) => { this.mobile = e }}
        >
            <div className="dynamic-form" style={{ position: "relative", height: "100%" }}>
                {
                    layers.map((layer, index) => {
                        return audioRecognize === index ? <AudioRecognize
                            setRecord={this.setRecord}>{this.layerBuildRecord(layer, index, recordText)}</AudioRecognize> : this.layerBuild(layer, index)
                    })
                }
            </div>
        </div>;
    }
}
