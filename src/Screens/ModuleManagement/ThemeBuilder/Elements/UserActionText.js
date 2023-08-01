import React from 'react';


export default class UserActionText extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userActionText: ""
        }
    }

    componentDidMount() {
        if (typeof (this.props.userActionText) !== "undefined") {
            let { userActionText } = this.props;
            this.setState({
                userActionText
            })
        }
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.userActionText !== this.props.userActionText) || (prevProps.layerActive !== this.props.layerActive)) {
            this.setState({
                userActionText: this.props.userActionText,
            })
        }
    }





    render() {
        let { userActionText } = this.state
        let { layerActive, } = this.props
        return <div>
            <div className='form-group'>
                <label>User Action Text  </label>
                <input type={"text"} className={"form-control"} value={userActionText} key={layerActive + "txt"} onChange={(e) => {
                    this.setState({ userActionText: e.target.value }, () => {
                        this.props.setValue(e.target.value)
                    })
                }} />
            </div>
        </div>;
    }
}
