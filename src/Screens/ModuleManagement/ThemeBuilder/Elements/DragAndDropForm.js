import React from 'react';
import DropDown from '../../../../Component/DropDown';
import MyConfig from '../../../../config/MyConfig';
import ImageSelect from '../../Component/ImageSelect';

export default class DragAndDropForm extends React.Component {
    render() {
        let { layers, layerActive, x, y, imageOptions } = this.props;
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
                            value={activeLayer.drag.x}
                            onChange={(e) => {
                                layers[layerActive].drag.x = e.target.value
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
                        <input type="number" className="form-control" placeholder="" value={activeLayer.drag.y}
                            onChange={(e) => {
                                layers[layerActive].drag.y = e.target.value
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
                        <input type="number" className="form-control" placeholder="" value={activeLayer.drag.width}
                            onChange={(e) => {
                                layers[layerActive].drag.width = e.target.value
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
                        <input type="number" className="form-control" placeholder="" value={activeLayer.drag.height}
                            onChange={(e) => {
                                layers[layerActive].drag.height = e.target.value
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
                    <label>Image</label>
                    <ImageSelect
                        selectedOption={imageOptions.filter(option => option.value === activeLayer.image)}
                        onChange={(e) => {
                            layers[layerActive].drag.image = e
                            this.props.setValue(layers)
                        }}
                        options={imageOptions}
                    />
                </div>
                <div className="col-3">
                    <label>Border Width</label>
                    <input type="number" className="form-control" value={activeLayer.drag.borderWidth}
                        onChange={(e) => {
                            layers[layerActive].drag.borderWidth = e.target.value
                            this.props.setValue(layers)
                        }}
                    />
                </div>
                <div className="col-3">
                    <label>Border Color</label>
                    <input type="color" className="form-control" value={activeLayer.drag.borderColor}
                        onChange={(e) => {
                            layers[layerActive].drag.borderColor = e.target.value
                            this.props.setValue(layers)
                        }}
                    />
                </div>
                <div className="col-3">
                    <label>Border Radius</label>
                    <input type="number" className="form-control" value={activeLayer.drag.borderRadius}
                        onChange={(e) => {
                            layers[layerActive].drag.borderRadius = e.target.value
                            this.props.setValue(layers)
                        }}
                    />
                </div>
            </div>
            <hr />
            {
                activeLayer.drop.map((row, index) => {
                    return <div className="mt-2" key={index} >
                        <h4>Drop {index + 1}</h4>
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
                                            layers[layerActive].drop[index].x = e.target.value
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
                                            layers[layerActive].drop[index].y = e.target.value
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
                                            layers[layerActive].drop[index].width = e.target.value
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
                                            layers[layerActive].drop[index].height = e.target.value
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
                                <label>Border Width</label>
                                <input type="number" className="form-control" value={row.borderWidth}
                                    onChange={(e) => {
                                        layers[layerActive].drop[index].borderWidth = e.target.value
                                        this.props.setValue(layers)
                                    }}
                                />
                            </div>
                            <div className="col-3">
                                <label>Border Color</label>
                                <input type="color" className="form-control" value={row.borderColor}
                                    onChange={(e) => {
                                        layers[layerActive].drop[index].borderColor = e.target.value
                                        this.props.setValue(layers)
                                    }}
                                />
                            </div>
                            <div className="col-3">
                                <label>Border Radius</label>
                                <input type="number" className="form-control" value={row.borderRadius}
                                    onChange={(e) => {
                                        layers[layerActive].drop[index].borderRadius = e.target.value
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
                                        layers[layerActive].drop[index].action = e.value
                                        this.props.setValue(layers)
                                    }}
                                    options={onClickOptions}
                                />
                            </div>
                        </div>
                    </div>
                })
            }
            <div className="row mt-2">
                <div className="col-12 text-center">
                    <button className="btn btn-primary" onClick={() => {
                        layers[layerActive].drop.push({
                            x: x,
                            y: y,
                            width: 20,
                            height: 20,
                            backgroundColor: "#000000",
                            borderWidth: 0,
                            borderColor: "",
                            borderStyle: "solid",
                            borderRadius: 0
                        })
                        this.props.setValue(layers)
                    }}>Add Drop</button>
                </div>
            </div>

        </div>;
    }
}
