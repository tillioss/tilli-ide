import React from 'react';
import DropDown from '../../../../Component/DropDown';
import MyConfig from '../../../../config/MyConfig';
import ImageSelect from '../../Component/ImageSelect';
import CheckedLayoutForm from './CheckedLayoutForm';
import RecordLayoutForm from './RecordLayoutForm';

export default class ImageForm extends React.Component {

    render() {
        let { layers, layerActive, imageOptions } = this.props;
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
                    <label>Image</label>
                    {/* <DropDown
                        selectedOption={imageOptions.filter(option => option.value === activeLayer.image)}
                        onChange={(e) => {
                            layers[layerActive].image = e.value
                            this.props.setValue(layers)
                        }}
                        options={imageOptions}
                    /> */}
                    <ImageSelect
                        selectedOption={imageOptions.filter(option => option.value === activeLayer.image)}
                        onChange={(e) => {
                            layers[layerActive].image = e
                            this.props.setValue(layers)
                        }}
                        options={imageOptions}
                    />
                </div>
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
                            } else if(e.value === "Record") {
                                layers[layerActive].layers = {
                                    visible: [],
                                    hidden: [],
                                    recordValue: [],
                                    recordHold: []
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
                    {
                        (layers[layerActive].action === "Record") && <RecordLayoutForm 
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
                    <div className="my-3">
                        <input
                            type="checkbox"
                            placeholder=""
                            checked={activeLayer.visibility === "visible"}
                            onChange={(e) => {
                                layers[layerActive].visibility = e.target.checked ? "visible": "hidden";
                                this.props.setValue(layers)
                            }} />
                    </div>
                </div>
            </div>
        </div>;
    }
}
