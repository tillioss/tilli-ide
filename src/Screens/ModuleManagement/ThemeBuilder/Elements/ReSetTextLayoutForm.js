import React from 'react';
import Modal from '../../../../Component/Modal';
import GroupedInput from '../Theme/GroupedInput';
import DragAndDrop from '../ThemeView/DragAndDrop';
import LabelAnimation from '../ThemeView/LabelAnimation';
import drag_drop from '../../../../images/drag_drop.png';
import Card from '../../../../Component/Card';


export default class ReSetTextLayoutForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            setupModal: false,
            deviceHeight: "",
            deviceWidth: "",
            layers: [],
            resetText: []
        }
    }

    componentDidMount() {
        if (this.props.changedLayers) {
            let layers = JSON.parse(JSON.stringify(this.props.layers));
            let { resetText } = this.props.changedLayers;
            this.setState({
                layers,
                resetText: Array.isArray(resetText) ? resetText : []
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.changedLayers !== this.props.changedLayers) {
            let layers = JSON.parse(JSON.stringify(this.props.layers));
            let { resetText } = this.props.changedLayers;
            console.log("update", layers)
            this.setState({
                layers,
                resetText: Array.isArray(resetText) ? resetText : []
            })
        }
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
                    }} key={index}>
                </div>
                break;
            case "groupedInput":
                builder = <GroupedInput deviceHeight={deviceHeight} index={index} layer={layer} />
                break;
            case "labelAnimation":
                builder = <LabelAnimation deviceHeight={deviceHeight} index={index} layer={layer} />
                break;
            case "dragAndDrop":
                builder = <DragAndDrop deviceHeight={deviceHeight} index={index} layer={layer} />
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
                    }} key={index}>
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
                    }} key={index}>
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
                    }} key={index} dangerouslySetInnerHTML={{ __html: layer.text }}>
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
                    }} key={index}>
                    <img style={{ width: "100%", height: "100%" }} src={layer.image ? layer.image : drag_drop} alt="loading" />
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




    resetTextFun(value) {
        let { resetText } = this.state
        if (resetText.includes(value)) {
            const index = resetText.indexOf(value);
            resetText.splice(index, 1);
        } else {
            resetText.push(value);
        }
        this.setState({
            resetText
        })
    }

    save() {
        let { resetText } = this.state;
        this.props.setValue({ resetText: resetText });
        this.setState({
            setupModal: false
        })
    }
    render() {
        let { setupModal, layers, resetText, } = this.state;
        return <div>
            <button className="btn btn-primary" onClick={() => {
                this.setState({
                    setupModal: true,
                }, () => {
                    let height = this.mobile.clientHeight;
                    let width = this.mobile.clientWidth;
                    this.setState({
                        deviceHeight: height,
                        deviceWidth: width
                    });
                })
            }}>Layout Change</button>
            {
                setupModal && <Modal
                    visible={setupModal}
                    closeModal={() => this.setState({ setupModal: false })}
                    heading={`Preview`}
                    size="modal-xl"
                    body={
                        <div className="d-flex">
                            <div className="smartphone">
                                <div className="smartphone-content tilli-web" ref={(e) => { this.mobile = e }}>
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
                                        title="Reset Text  (Set to Reset Text)">
                                        {
                                            layers.map((row, rowIndex) => {
                                                return <div className="pt-2 px-2" key={rowIndex}>
                                                    <input type="checkbox" name="layers" onChange={() => this.resetTextFun(rowIndex)} checked={resetText.includes(rowIndex)} /> Layer {rowIndex + 1}
                                                </div>
                                            })
                                        }
                                    </Card>
                                </div>
                            </div>
                        </div>
                    }

                    footer={
                        <React.Fragment>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                this.save();
                            }}>Save changes</button>
                            <button type="button" className="btn btn-secondary" onClick={() => this.setState({ setupModal: false })}>Close</button>
                        </React.Fragment>
                    }
                />
            }
        </div>;
    }
}
