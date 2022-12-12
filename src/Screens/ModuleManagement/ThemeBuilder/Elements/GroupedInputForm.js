import React from 'react';
import DropDown from '../../../../Component/DropDown';
import MyConfig from '../../../../config/MyConfig';
import CheckedLayoutForm from './CheckedLayoutForm';

export default class GroupedInputForm extends React.Component {
    render() {
        let { layers, layerActive, } = this.props;
        let activeLayer = layers[layerActive];
        let { inputType, inputs } = activeLayer;
        let formOptions = MyConfig.formInput;
        let onClickOptions = MyConfig.themeEvent;
        return <div className="m-2">
            <div className="row">
                <div className="col-9">
                    <label>Action</label>
                    <DropDown
                        selectedOption={formOptions.filter(option => option.value === inputType)}
                        onChange={(e) => {
                            layers[layerActive].inputType = e.value
                            this.props.setValue(layers)
                        }}
                        options={formOptions}
                    />
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
            <div className="my-2">
                {
                    inputs.map((row, rowIndex) => {
                        return <div className="my-2 p-2" key={rowIndex} style={{ border: "2px solid #ddd" }}>
                            <div className="row">
                                <div className="col-3">
                                    <label>X</label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder=""
                                            value={row.x}
                                            onChange={(e) => {
                                                layers[layerActive].inputs[rowIndex].x = e.target.value
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
                                        <input type="number" className="form-control" placeholder="" value={row.y}
                                            onChange={(e) => {
                                                layers[layerActive].inputs[rowIndex].y = e.target.value
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
                                        <input type="number" className="form-control" placeholder="" value={row.width}
                                            onChange={(e) => {
                                                layers[layerActive].inputs[rowIndex].width = e.target.value
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
                                        <input type="number" className="form-control" placeholder="" value={row.height}
                                            onChange={(e) => {
                                                layers[layerActive].inputs[rowIndex].height = e.target.value
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
                                    <input type="color" className="form-control" value={row.backgroundColor}
                                        onChange={(e) => {
                                            layers[layerActive].inputs[rowIndex].backgroundColor = e.target.value
                                            this.props.setValue(layers)
                                        }}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>Border Width</label>
                                    <input type="number" className="form-control" value={row.borderWidth}
                                        onChange={(e) => {
                                            layers[layerActive].inputs[rowIndex].borderWidth = e.target.value
                                            this.props.setValue(layers)
                                        }}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>Border Color</label>
                                    <input type="color" className="form-control" value={row.borderColor}
                                        onChange={(e) => {
                                            layers[layerActive].inputs[rowIndex].borderColor = e.target.value
                                            this.props.setValue(layers)
                                        }}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>Border Radius</label>
                                    <input type="number" className="form-control" value={row.borderRadius}
                                        onChange={(e) => {
                                            layers[layerActive].inputs[rowIndex].borderRadius = e.target.value
                                            this.props.setValue(layers)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-3">
                                    <label>Action</label>
                                    <DropDown
                                        selectedOption={onClickOptions.filter(option => option.value === row.action)}
                                        onChange={(e) => {
                                            layers[layerActive].inputs[rowIndex].action = e.value

                                            if (e.value === "Checked Layout" || e.value === "Change Layout") {
                                                layers[layerActive].inputs[rowIndex].layers = {
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
                                            (layers[layerActive].inputs[rowIndex].action === "Checked Layout" || layers[layerActive].inputs[rowIndex].action === "Change Layout") && <CheckedLayoutForm
                                                setValue={(value) => {
                                                    layers[layerActive].inputs[rowIndex].layers = value;
                                                    this.props.setValue(layers)
                                                }}
                                                changedLayers={layers[layerActive].inputs[rowIndex].layers}
                                                layers={layers}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }

                <div className="text-center">
                    <button className="btn btn-primary" onClick={() => {
                        layers[layerActive].inputs.push({
                            x: 0,
                            y: 0,
                            width: 100,
                            height: 20,
                            backgroundColor: "#dddddd",
                            borderWidth: 0,
                            borderColor: "",
                            borderStyle: "solid",
                            borderRadius: 0,
                            action: "",
                            visibility: "visible",
                        })

                        this.props.setValue(layers)
                    }}>Add Input</button>
                </div>
            </div>
        </div>
    }
}
