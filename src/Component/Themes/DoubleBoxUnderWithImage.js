import React from 'react';
import DropDown from "../DropDown";


class DoubleBoxUnderWithImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { OptionSelect, Option, LevelStage, index_1, ImageValidate,
            contentTextValidate, Contentdata, editable } = this.props

        let arrayvalue = [];
        arrayvalue.push(<div className="row item form-group" style={{ marginTop: 20, marginBottom: 20 }}>

            <div className="col-sm-1 text-ali-left"> Image</div>
            <div className="col-sm-5" style={{ textAlign: "left" }}>

                <DropDown
                    selectedOption={OptionSelect[index_1] ? OptionSelect[index_1] : { label: 'Select', value: 'Select' }}
                    onChange={(e) => {
                        if (editable != "false") {

                            OptionSelect[index_1] = e
                            Contentdata[index_1].content.image = e.json;
                            this.setState({ OptionSelect, Contentdata })
                        }


                    }}
                    options={Option}
                    isDisabled={editable == "false" ? true : false}
                />
                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ImageValidate[index_1]}</span>
            </div>
            <div className="col-sm-2" style={{ top: -30 }}>
                {OptionSelect[index_1] ?

                    <img style={{ width: '100%', height: 100 }} src={OptionSelect[index_1].value} alt={'No Image'} class="img-responsive" />

                    : null}
            </div>
            <div className="col-sm-1"> </div>
        </div>)

        arrayvalue.push(<div className="row item form-group">
            <div className="col-sm-1"> </div>
            <div className="col-sm-7">
                <textarea className={'form-control'} value={Contentdata[index_1].content.text} style={{ width: '100%' }}
                    onChange={(e) => {
                        // LevelStage[found_index].content.text = e.target.value;
                        Contentdata[index_1].content.text = e.target.value;
                        //contentText[index_1]=e.target.value;
                        this.setState({ LevelStage, Contentdata })
                    }}
                />
                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{contentTextValidate[index_1]}</span>
            </div>

            <div className="col-sm-4"> </div>
        </div>)




        return (
            <div>
                {arrayvalue}
            </div>
        )

    }

}

export default DoubleBoxUnderWithImage
