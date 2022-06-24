import React from 'react';
import Card from '../../../../Component/Card';
import DropDown from '../../../../Component/DropDown';
import MyConfig from '../../../../config/MyConfig';
import EditorContent from '../../Component/EditorContent';
import CheckedLayoutForm from './CheckedLayoutForm';

export default class LableAnimationForm extends React.Component {
    render() {
        let { layers, layerActive } = this.props;
        let activeLayer = layers[layerActive];

        let onClickOptions = MyConfig.themeEvent;
        return <div className="p-2">
            <div className="row">
                <div className="col-3">
                    <label>X</label>
                    <div className="input-group mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder=""
                            value={activeLayer.x}
                            onChange={(e) => {
                                layers[layerActive].x = e.target.value
                                this.props.setValue(layers)
                            }} />
                        <div className="input-group-append">
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <label>Y</label>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder="" value={activeLayer.y}
                            onChange={(e) => {
                                layers[layerActive].y = e.target.value
                                this.props.setValue(layers)
                            }}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <label>Width</label>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder="" value={activeLayer.width}
                            onChange={(e) => {
                                layers[layerActive].width = e.target.value
                                this.props.setValue(layers)
                            }} />
                        <div className="input-group-append">
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <label>Height</label>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder="" value={activeLayer.height}
                            onChange={(e) => {
                                layers[layerActive].height = e.target.value
                                this.props.setValue(layers)
                            }} />
                        <div className="input-group-append">
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <label>Background</label>
                    <input type="color" className="form-control" value={""} value={activeLayer.backgroundColor}
                        onChange={(e) => {
                            layers[layerActive].backgroundColor = e.target.value
                            this.props.setValue(layers)
                        }}
                    />
                </div>
                <div className="col-3">
                    <label>Border Width</label>
                    <input type="number" className="form-control" value={""} value={activeLayer.borderWidth}
                        onChange={(e) => {
                            layers[layerActive].borderWidth = e.target.value
                            this.props.setValue(layers)
                        }}
                    />
                </div>
                <div className="col-3">
                    <label>Border Color</label>
                    <input type="color" className="form-control" value={""} value={activeLayer.borderColor}
                        onChange={(e) => {
                            layers[layerActive].borderColor = e.target.value
                            this.props.setValue(layers)
                        }}
                    />
                </div>
                <div className="col-3">
                    <label>Border Radius</label>
                    <input type="number" className="form-control" value={""} value={activeLayer.borderRadius}
                        onChange={(e) => {
                            layers[layerActive].borderRadius = e.target.value
                            this.props.setValue(layers)
                        }}
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-3">
                    <label>Action</label>
                    <DropDown
                        selectedOption={onClickOptions.filter(option => option.value === activeLayer.action)}
                        onChange={(e) => {
                            layers[layerActive].action = e.value;
                            if(e.value === "Checked Layout" || e.value === "Change Layout") {
                                layers[layerActive].layers = {
                                    visible: [],
                                    hidden: []
                                }
                            }
                            this.props.setValue(layers)
                        }}
                        options={onClickOptions}
                    />
                </div>
                <div className="col-3">
                    <div className="mt-3">
                    {
                        (layers[layerActive].action === "Checked Layout" || layers[layerActive].action === "Change Layout") && <CheckedLayoutForm 
                        setValue={(value) => {
                            layers[layerActive].layers = value;
                            this.props.setValue(layers)
                        }}
                        changedLayers={layers[layerActive].layers}
                        layers={layers}
                    />
                    }
                    </div>
                </div>
                <div className="col-3">
                    <label>Visibility</label>
                    <div className="mt-2">
                        <input
                            type="checkbox"
                            placeholder=""
                            checked={activeLayer.visibility === "visible"}
                            onChange={(e) => {
                                layers[layerActive].visibility = e.target.checked ? "visible" : "hidden";
                                this.props.setValue(layers)
                            }} />
                    </div>
                </div>
            </div>
            <div className="row mt-2" >
                <div className="col-12">
                    <label>Label</label>
                    {
                        activeLayer.label.map((row, index) => {
                            return <div className="mb-2" key={index}>
                                <Card
                                title={"Label " + (index + 1)}>
                                <div>
                                    <EditorContent
                                        text={row.text}
                                        textOnchange={(value) => {
                                            layers[layerActive].label[index].text = value
                                            this.props.setValue(layers)
                                        }}
                                    />
                                    <div className="row mt-2">
                                        <div className="col-3">
                                            <label>Background</label>
                                            <input type="color" className="form-control" value={""} value={row.backgroundColor}
                                                onChange={(e) => {
                                                    layers[layerActive].label[index].backgroundColor = e.target.value
                                                    this.props.setValue(layers)
                                                }}
                                            />
                                        </div>
                                        <div className="col-3">
                                            <label>Border Width</label>
                                            <input type="number" className="form-control" value={""} value={row.borderWidth}
                                                onChange={(e) => {
                                                    layers[layerActive].label[index].borderWidth = e.target.value
                                                    this.props.setValue(layers)
                                                }}
                                            />
                                        </div>
                                        <div className="col-3">
                                            <label>Border Color</label>
                                            <input type="color" className="form-control" value={""} value={row.borderColor}
                                                onChange={(e) => {
                                                    layers[layerActive].label[index].borderColor = e.target.value
                                                    this.props.setValue(layers)
                                                }}
                                            />
                                        </div>
                                        <div className="col-3">
                                            <label>Border Radius</label>
                                            <input type="number" className="form-control" value={""} value={row.borderRadius}
                                                onChange={(e) => {
                                                    layers[layerActive].label[index].borderRadius = e.target.value
                                                    this.props.setValue(layers)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12 text-center">
                    <button className="btn btn-primary" onClick={() => {
                        layers[layerActive].label.push({
                            text: "Place text here",
                            backgroundColor: "#dddddd",
                            borderWidth: 0,
                            borderColor: "",
                            borderStyle: "solid",
                            borderRadius: 0,
                        })
                        this.props.setValue(layers)
                    }}>Add Label</button>
                </div>
            </div>

        </div>;
    }
}
