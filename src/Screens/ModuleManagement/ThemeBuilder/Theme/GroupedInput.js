import React from 'react';

export default class GroupedInput extends React.Component {
    render() {
        let { layer, index, layerHover, layerActive, deviceHeight } = this.props;
        let { inputs, inputType } = layer;
        return <div key={index} style={{
            visibility: layer.visibility,
        }}>
            {
                inputs.map((row, rowIndex) => {
                    return <div
                        onClick={() => this.props.setActiveLayer(index)}
                        className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
                        onMouseEnter={() => this.props.onHoverLayer(index)}
                        onMouseLeave={() => this.props.onLeaveLayer(index)}
                        style={{
                            position: "absolute",
                            top: row.y + "%",
                            left: row.x + "%",
                            width: row.width + "%",
                            height: parseInt((row.height / 100) * deviceHeight) + "px",
                            backgroundColor: row.backgroundColor,
                            borderWidth: row.borderWidth + "px",
                            borderColor: row.borderColor,
                            borderStyle: row.borderStyle,
                            borderRadius: row.borderRadius + "px"
                        }} key={rowIndex}>
                        {/* <input type={inputType} /> */}
                    </div>
                })
            }
        </div>
    }
}
