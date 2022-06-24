import React from 'react';
import DropDown from '../../../Component/DropDown';

export default class ClassNameSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                {label: "px-1", value: "px-1" },
                {label: "px-2", value: "px-2" },
                {label: "px-3", value: "px-3" },
                {label: "px-4", value: "px-4" },
                {label: "px-5", value: "px-5" },
                {label: "py-1", value: "py-1" },
                {label: "py-2", value: "py-2" },
                {label: "py-3", value: "py-3" },
                {label: "py-4", value: "py-4" },
                {label: "py-5", value: "py-5" },
                {label: "pt-1", value: "pt-1" },
                {label: "pt-2", value: "pt-2" },
                {label: "pt-3", value: "pt-3" },
                {label: "pt-4", value: "pt-4" },
                {label: "pt-5", value: "pt-5" },
                {label: "pb-1", value: "pb-1" },
                {label: "pb-2", value: "pb-2" },
                {label: "pb-3", value: "pb-3" },
                {label: "pb-4", value: "pb-4" },
                {label: "pb-5", value: "pb-5" },
                {label: "mx-1", value: "mx-1" },
                {label: "mx-2", value: "mx-2" },
                {label: "mx-3", value: "mx-3" },
                {label: "mx-4", value: "mx-4" },
                {label: "mx-5", value: "mx-5" },
                {label: "my-1", value: "my-1" },
                {label: "my-2", value: "my-2" },
                {label: "my-3", value: "my-3" },
                {label: "my-4", value: "my-4" },
                {label: "my-5", value: "my-5" },
                {label: "mt-1", value: "mt-1" },
                {label: "mt-2", value: "mt-2" },
                {label: "mt-3", value: "mt-3" },
                {label: "mt-4", value: "mt-4" },
                {label: "mt-5", value: "mt-5" },
                {label: "mb-1", value: "mb-1" },
                {label: "mb-2", value: "mb-2" },
                {label: "mb-3", value: "mb-3" },
                {label: "mb-4", value: "mb-4" },
                {label: "mb-5", value: "mb-5" },
                {label: "double-image", value: "double-image" },
                {label: "align-left", value: "align-left" },
                {label: "align-right", value: "align-right" },
                {label: "align-center", value: "align-center" }
            ],
            selectedClass: "",
            togglePreview: false
        }
    }

    render() {
        let { value } = this.props;
        let { options, selectedClass, togglePreview } = this.state;
        let selected = []
        if(value !== undefined) {
            value.split(" ").map((row) => {
                if(row.trim()) {
                    selected.push({label: row, value: row })
                }
            })
        }
        return <div className="row">
                <div className={togglePreview ? "col-5" : "col-11"}>
                    <DropDown
                        selectedOption={selected}
                        onChange={(e) => {
                            let selected = "";
                            if(e) {
                                e.map((row) => {
                                    selected += row.value+" ";
                                })
                            }
                            this.props.onChange(selected)
                            this.setState({
                                selectedClass: selected
                            })
                        }}
                        options={options}
                        isMulti={true}
                    />
                </div>
                <div className="col-1 text-center">
                    <button className="btn btn-primary" onClick={() => {
                        this.setState({togglePreview: !togglePreview})
                    }}>
                        <i className={`fa fa-arrow-${togglePreview ? "right" : "left"}`} />
                    </button>
                </div>
                {
                    togglePreview && <React.Fragment>
                            <div className="col-3 px-0" style={{border: '1px solid #000'}}>
                                <div style={{height: 25, lineHeight: '25px', background: '#673ab7', color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>
                                    Original
                                </div>
                                <div style={{height: 200, overflow: 'auto'}}>
                                Tilli believes in making cutting-edge research within this space more accessible and relevant to parents and teachers across the world so, that we can collectively create a healthier, happier, and safer life for children across the world.
                                </div>
                            </div>
                            <div className="col-3 px-0" style={{border: '1px solid #000'}}>
                                <div style={{height: 25, lineHeight: '25px', background: '#673ab7', color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>
                                    Preview
                                </div>
                                <div style={{height: 200, overflow: 'auto'}} className={selectedClass}>
                                    Tilli believes in making cutting-edge research within this space more accessible and relevant to parents and teachers across the world so, that we can collectively create a healthier, happier, and safer life for children across the world.
                                </div>
                            </div> 
                    </React.Fragment>
                }
                
            </div>;
    }
}
