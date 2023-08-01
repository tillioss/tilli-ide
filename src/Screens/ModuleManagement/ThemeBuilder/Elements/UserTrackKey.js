import React from 'react';


export default class UserTrackKey extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userTrackKey: ""
        }
    }

    componentDidMount() {
        if (typeof (this.props.userTrackKey) !== "undefined") {
            let { userTrackKey } = this.props;
            this.setState({
                userTrackKey
            })
        }
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.userTrackKey !== this.props.userTrackKey) || (prevProps.layerActive !== this.props.layerActive)) {
            this.setState({
                userTrackKey: this.props.userTrackKey,
            })
        }
    }





    render() {
        let { userTrackKey } = this.state
        let { layerActive, } = this.props
        return <div>
            <div className='form-group'>
                <label>Tracking key  </label>
                <input type={"text"} className={"form-control"} value={userTrackKey} key={layerActive + "key"} onChange={(e) => {
                    let lowerCaseConvert = e.target.value.toLowerCase()
                    this.setState({ userTrackKey: lowerCaseConvert }, () => {
                        this.props.setValue(lowerCaseConvert)
                    })
                }} />
            </div>
        </div>;
    }
}
