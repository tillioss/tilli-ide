import React from 'react';
import CloseImage from "../../../src/images/close.png";



class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {

        const { LevelStage, index_1, Contentdata, editable, contentTextValidate } = this.props
        let arrayvalue = []


        arrayvalue.push(
            <React.Fragment>
                <div className="row form-group ml-0 mb-3">

                    <div className="col-sm-3 ">  questionTitle </div>
                    <div className="col-sm-7 ">
                        <input type={'text'} className={'form-control'} placeholder={'question'} style={{ width: '100%' }}
                            value={Contentdata[index_1].content.questionTitle}
                            onChange={(e) => {
                                Contentdata[index_1].content.questionTitle = e.target.value;
                                this.setState({ Contentdata })

                            }} />

                        {editable !== "false" ?

                            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{contentTextValidate[index_1]}</span>
                            : null}

                    </div>
                    <div className="col-sm-2 " />
                </div>
            </React.Fragment>)
        Contentdata[index_1].content.questionList.map((ival, index) => {

            arrayvalue.push(
                <React.Fragment>
                    <div className="row form-group">
                        <div className="col-sm-5 ">
                            <input type={'text'} className={'form-control'} placeholder={'question'} style={{ width: '100%' }} value={ival.question}
                                onChange={(e) => {
                                    Contentdata[index_1].content.questionList[index].question = e.target.value;
                                    this.setState({ LevelStage, Contentdata })

                                }} />

                            {Contentdata[index_1].content.questionList[index].qustionlist_error ?

                                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{Contentdata[index_1].content.questionList[index].qustionlist_error}</span>
                                :
                                null
                            }
                        </div>

                        <div className="col-sm-5 " >
                            <input type={'text'} disabled={editable === "false" ? true : false} className={'form-control'} placeholder={'Color'} style={{ width: '100%' }} value={ival.color}
                                onChange={(e) => {
                                    if (editable !== "false") {
                                        Contentdata[index_1].content.questionList[index].color = e.target.value;
                                        this.setState({ LevelStage, Contentdata })
                                    }
                                }} />

                            {Contentdata[index_1].content.questionList[index].qustion_color_error ?

                                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{Contentdata[index_1].content.questionList[index].qustion_color_error}</span>
                                :
                                null
                            }
                        </div>

                        <div className="col-sm-2 " onClick={() => {

                            if (editable !== "false") {

                                delete Contentdata[index_1].content.questionList[index]
                                this.setState({ LevelStage, Contentdata })

                            }

                        }}>
                            {editable !== "false" ? <img src={CloseImage} style={{ width: 30, height: 30 }} alt="loading" /> : null}

                        </div>
                    </div>
                </React.Fragment>
            )
            return true
        })


        return (<div style={{ width: '100%' }}>{arrayvalue}</div>)
    }

}


export default QuestionsList