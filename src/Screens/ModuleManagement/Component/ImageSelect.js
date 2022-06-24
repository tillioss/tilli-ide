import React from 'react';
import Modal from "../../../Component/Modal";

export default class ImageSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageListModal: false,
            selectedImage: "",
            search: "",
            searchOptions: []
        }
    }
    imageSelect(value) {
        this.setState({
            selectedImage: value
        })

    }

    save() {
        let { selectedImage } = this.state;
        this.setState({
            imageListModal: false
        }, () => {
            this.props.onChange(selectedImage)
        })
    }

    search(value) {
        let { options } = this.props;

        let searchOptions = [];
        options.map((row) => {
            if(row.label.toLowerCase().includes(value.toLowerCase())) {
                searchOptions.push(row)
            }
        })

        this.setState({
            search: value,
            searchOptions
        })
    }
    render() {
        let { imageListModal, selectedImage, search, searchOptions } = this.state;
        let { options } = this.props;

        options = search.trim() ? searchOptions : options
        return <div className="">
            <button
                className="btn btn-sm btn-success"
                onClick={() => {
                    this.setState({
                        imageListModal: true
                    })
                }}
            >Select Image</button>
            {
                imageListModal && <Modal
                    visible={imageListModal}
                    closeModal={() => this.setState({ imageListModal: false })}
                    heading={`Image`}
                    size={"modal-xl"}
                    body={<React.Fragment>
                        <div className="row">
                            <div className="col-12 text-right">
                                <input type="text" placeholder="Search" className="form-control" value={search} onChange={(e)=> this.search(e.target.value) }/>
                            </div>
                        </div>
                        <div className="row image-select p-2" style={{ maxHeight: "50vh", overflow: "auto" }}>
                            {
                                options.map((option, index) => {
                                    return <div className={`col-3 my-2 p-2 ${selectedImage === option.value ? "active" : ""}`} key={index} onClick={() => this.imageSelect(option.value)}>
                                        <div style={{ height: 50 }}>
                                            <img src={option.value} style={{ maxHeight: "100%", maxWidth: "100%" }} />
                                        </div>
                                        <div>{option.label}</div>
                                    </div>
                                })
                            }
                        </div>
                    </React.Fragment>
                    }
                    footer={<React.Fragment>
                        <button type="button" className="btn theme-bg" onClick={() => this.save()}>Save Changes</button>
                    </React.Fragment>}
                />
            }
        </div>;
    }
}
