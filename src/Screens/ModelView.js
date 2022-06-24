import React from 'react';
export default class ModelView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dummy: true
        }

    }

    render() {
        let { uniqueId, viewCode } = this.props
        return (<>
            <span data-toggle="modal" data-target={".bd-example-modal-lg" + uniqueId}
                style={{ cursor: "pointer",}}>
                <i className="fa fa-code" aria-hidden="true"> </i>
            </span>
            <div class={"modal fade bd-example-modal-lg" + uniqueId} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" style={{ padding: "20px 20px 20px 20px", height: 130 }}>
                        <textarea id="w3review" name="w3review" rows="4" cols="50" style={{ width: "100%" }}
                            value={viewCode} onChange={(e) => {
                                this.props.modelTextChange(e.target.value)
                            }} >

                        </textarea>
                    </div>
                </div>
            </div>
        </>)
    }
}