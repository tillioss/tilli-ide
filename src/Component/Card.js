import React from "react";

export default class Card extends React.Component {
    render() {
        let { title } = this.props;
        return <div className="card">
            <div className="card-header theme-bg">
                {title}
            </div>
            <div className="card-body">
                {this.props.children}
            </div>
        </div>
            ;
    }
}
