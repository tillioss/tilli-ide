import React from 'react';
import DropDown from "../../Component/DropDown";
import EditorContent from "../EditorContent"
import ClassNameSelect from './Component/ClassNameSelect';


class DoubleBoxOverlapWithImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { OptionSelect, Option, LevelStage, found_index, index_1, ImageValidate,
            contentText, contentTextValidate, editable, sectionLearning } = this.props

        let arrayvalue = [];
        arrayvalue.push(<div className="form-group" style={{ marginTop: 20, marginBottom: 20 }}>
            <label>Image</label>
            <div>
                <DropDown
                    selectedOption={!OptionSelect[index_1] ? { label: "", value: "" } : OptionSelect[index_1]}
                    onChange={(e) => {
                        if (editable != "false") {

                            OptionSelect[index_1] = e
                            sectionLearning[index_1].content.image = e.json;
                            this.setState({ OptionSelect, sectionLearning })
                        }
                    }}
                    options={Option}
                    isDisabled={editable == "false" ? true : false}
                />
            </div>
        </div>)


        arrayvalue.push(<React.Fragment>
                <div className="form-group">
                    <label for="text">Image Style</label>
                    <div>
                        <textarea rows="1" cols="50" className="form-control" placeholder="style"
                        value={sectionLearning[index_1].content.imagestyle}
                            onChange={e => {
                                sectionLearning[index_1].content.imagestyle = e.target.value;
                                this.props.setValue(sectionLearning);
                                this.setState({ sectionLearning })
                            }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label for="text">Image Class Name</label>
                    {/* <input type="text" className="form-control" placeholder="classname"
                    value={sectionLearning[index_1].content.imageclassname}
                        onChange={e => {
                            sectionLearning[index_1].content.imageclassname = e.target.value;
                            this.props.setValue(sectionLearning);
                            this.setState({ sectionLearning })
                        }} /> */}

                    <ClassNameSelect
                    value={sectionLearning[index_1].content.imageclassname}
                    onChange={e => {
                        sectionLearning[index_1].content.imageclassname = e;
                        this.props.setValue(sectionLearning);
                        this.setState({ sectionLearning })
                    }}
                    />
                </div>
        </React.Fragment>)

        arrayvalue.push(<div className="form-group">
            <label>Content</label>
            <div>
                <EditorContent 
                    text={sectionLearning[index_1].content.text}
                    index={index_1}  
                    sectionLearning={sectionLearning}
                    textOnchange={(value) => {
                        sectionLearning[index_1].content.text = value
                        this.props.setValue(sectionLearning);
                    }}
                />
            </div>
        </div>)
        return (
            <div style={{ width: "100%" }}>
                {arrayvalue}
            </div>
        )

    }

}

export default DoubleBoxOverlapWithImage
