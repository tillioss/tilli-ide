import React from 'react';
import drag_drop from '../../../../images/drag_drop.png';

export default class DragAndDrop extends React.Component {
    render() {
        let { layer, index, deviceHeight } = this.props;
        let { drag, drop } = layer;
        return <React.Fragment>
            <div
                onClick={() => this.props.setActiveLayer(index)}
                style={{
                    position: "absolute",
                    top: drag.y + "%",
                    left: drag.x + "%",
                    width: drag.width + "%",
                    height: parseInt((drag.height / 100) * deviceHeight) + "px",
                    // backgroundColor: drag.backgroundColor,
                    borderWidth: drag.borderWidth + "px",
                    borderColor: drag.borderColor,
                    borderStyle: drag.borderStyle,
                    borderRadius: drag.borderRadius + "px",
                }} key={index}>
                <img style={{ width: "100%", height: "100%" }} src={drag.image ? drag.image : drag_drop} alt="loading" />
            </div>
            {
                drop.map((row, rowIndex) => {
                    return <div
                        onClick={() => this.props.setActiveLayer(index)}
                        style={{
                            position: "absolute",
                            top: row.y + "%",
                            left: row.x + "%",
                            width: row.width + "%",
                            height: parseInt((row.height / 100) * deviceHeight) + "px",
                            borderWidth: row.borderWidth + "px",
                            borderColor: row.borderColor,
                            borderStyle: row.borderStyle,
                            borderRadius: row.borderRadius + "px",
                            boxShadow: 'inset 0px 0px 0px 2px #2196f3'
                        }} key={rowIndex}>
                    </div>
                })
            }
        </React.Fragment>
    }
}
