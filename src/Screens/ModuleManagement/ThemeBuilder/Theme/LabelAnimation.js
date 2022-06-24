import React from 'react';

export default class LabelAnimation extends React.Component {
    render() {
        let { layer, index, layerHover, layerActive, deviceHeight } = this.props;
        let { label } = layer;
        return <div
            onClick={() => this.props.setActiveLayer(index)}
            className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
            onMouseEnter={() => this.props.onHoverLayer(index)}
            onMouseLeave={() => this.props.onLeaveLayer(index)}
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
                display: "flex",
                flexDirection: "column"
            }} key={index}>
            {
                label.map((row) => {
                    return <div
                        style={{
                            backgroundColor: row.backgroundColor,
                            borderWidth: row.borderWidth + "px",
                            borderColor: row.borderColor,
                            borderStyle: row.borderStyle,
                            borderRadius: row.borderRadius + "px",
                            padding: 5,
                            flex: 1,
                            margin: 5
                        }} key={index} dangerouslySetInnerHTML={{ __html: row.text }}>
                    </div>
                })
            }
        </div>
    }
}
