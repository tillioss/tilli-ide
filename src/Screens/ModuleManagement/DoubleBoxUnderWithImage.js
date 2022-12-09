import React from 'react';
import DropDown from "../../Component/DropDown";


class DoubleBoxUnderWithImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { OptionSelect, Option, LevelStage, index_1, Contentdata, editable } = this.props
        let arrayvalue = [];
        arrayvalue.push(<div className="row item form-group" style={{ marginTop: 20, marginBottom: 20 }}>
            <div className="col-sm-1 text-ali-left"> Image</div>
            <div className="col-sm-5" style={{ textAlign: "left" }}>
                <DropDown
                    selectedOption={!OptionSelect[index_1] ? { label: "", value: "" } : OptionSelect[index_1]}
                    onChange={(e) => {
                        if (editable !== "false") {
                            OptionSelect[index_1] = e
                            Contentdata[index_1].content.image = e.json;
                            this.setState({ OptionSelect, Contentdata })
                        }
                    }}
                    options={Option}
                    isDisabled={editable === "false" ? true : false}
                />

            </div>
            <div className="col-sm-2" style={{ top: -30 }}>
                {OptionSelect[index_1] ?
                    <img style={{ width: '100%', height: 100 }} src={OptionSelect[index_1].value} alt={'loading'} className="img-responsive" />
                    : null}
            </div>
            <div className="col-sm-1"> </div>
        </div>)

        arrayvalue.push(<div className="row item form-group">
            <div className="col-sm-1"> </div>
            <div className="col-sm-7">
                <textarea className={'form-control'} value={Contentdata[index_1].content.text} style={{ width: '100%' }}
                    onChange={(e) => {
                        Contentdata[index_1].content.text = e.target.value;
                        this.setState({ LevelStage, Contentdata })
                    }}
                />
            </div>
            <div className="col-sm-4"> </div>
        </div>)


        return (
            <div style={{ width: "100%" }}>
                {arrayvalue}
            </div>
        )

    }

}

export default DoubleBoxUnderWithImage
