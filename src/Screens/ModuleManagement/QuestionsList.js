import React from 'react';
import CloseImage from "../../../src/images/close.png";
import EditorContent from "../EditorContent"
import ClassNameSelect from './Component/ClassNameSelect';



class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {

        const { LevelStage, found_index, index_1, sectionLearning, editable, contentTextValidate } = this.props
        let arrayvalue = []

        arrayvalue.push(
            <React.Fragment>
                <div className="form-group">
                    <label>Question Title</label>
                    <div>
                        <EditorContent 
                            text={sectionLearning[index_1].content.questionTitle} 
                            themeType={"QuestionsList"}
                            questionTitle={true} 
                            index={index_1} 
                            sectionLearning={sectionLearning} 
                            textOnchange={(value) => {
                                sectionLearning[index_1].content.questionTitle = value
                                this.props.setValue(sectionLearning);
                            }}
                        />
                        {editable !== "false" ? <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.errorquestionTitle}</span>: null}
                    </div>
                </div>
                <div className="form-group">
                    <label>Class Name</label>
                     {/* <input type={'text'} className={'form-control'} placeholder={'ClassName'} style={{ width: '100%' }} value={sectionLearning[index_1].content.className}
                        onChange={(e) => {
                            sectionLearning[index_1].content.className = e.target.value;
                            this.props.setValue(sectionLearning);
                            this.setState({  sectionLearning })

                        }} /> */}
                    <ClassNameSelect
                            value={sectionLearning[index_1].content.className}
                            onChange={e => {
                                sectionLearning[index_1].content.className = e;
                                this.props.setValue(sectionLearning);
                                this.setState({  sectionLearning })
                            }}
                        /> 
                </div>
                <div className="roe">
                    <div className="col-12">
                        {
                        editable !== "false" && <button type="button" className="btn btn-primary active" onClick={() => {
                                        const { LevelStage, sectionLearning } = this.props;
                                        sectionLearning[index_1].content.questionList.push({ question: '', color: '' })
                                        this.setState({ sectionLearning })
                                        this.props.setValue(sectionLearning);
                                    }} >Add Question</button>
                        }

                    </div>
                </div>
            </React.Fragment>)
        sectionLearning[index_1].content.questionList.map((ival, index) => {

            arrayvalue.push(
                <div className="mb-2" style={{backgroundColor:"#eee", padding: 10}}>
                    <div className="form-group">
                        <label>Question</label>
                        <div>
                            <EditorContent 
                            text={sectionLearning[index_1].content.questionList[index].question} 
                            themeType={"QuestionsList"}
                            index={index_1} 
                            secondindex={index} 
                            sectionLearning={sectionLearning} 
                            textOnchange={(value) => {
                                sectionLearning[index_1].content.questionList[index].question = value
                                this.props.setValue(sectionLearning);
                            }}
                            />

                            {sectionLearning[index_1].content.questionList[index].qustionlist_error ?

                                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.questionList[index].qustionlist_error}</span>
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Background Color</label>
                        <div>
                            <input type={'color'} disabled={editable == "false" ? true : false} className={'form-control'} placeholder={'Color'} style={{ width: '100%' }} value={ival.color}
                                onChange={(e) => {
                                    if (editable != "false") {
                                        sectionLearning[index_1].content.questionList[index].color = e.target.value;
                                        this.setState({ LevelStage, sectionLearning })
                                        this.props.setValue(sectionLearning);
                                    }
                                }} />
                                {sectionLearning[index_1].content.questionList[index].qustion_color_error ?

                                    <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.questionList[index].qustion_color_error}</span>
                                    :
                                    null
                                }
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Class Name</label>
                        <div>
                            {/* <input type={'text'} className={'form-control'} placeholder={'ClassName'} style={{ width: '100%' }} value={ival.className}
                                    onChange={(e) => {
                                        sectionLearning[index_1].content.questionList[index].className = e.target.value;
                                        this.setState({ LevelStage, sectionLearning })
                                        this.props.setValue(sectionLearning);
                                    }} /> */}
                            <ClassNameSelect
                                value={ival.className}
                                onChange={e => {
                                    sectionLearning[index_1].content.questionList[index].className = e;
                                    this.setState({ LevelStage, sectionLearning })
                                    this.props.setValue(sectionLearning);
                                }}
                            />        
                        </div>
                    </div>

                    {editable != "false" && <div className="text-center">
                        <button className="btn btn-sm btn-danger" onClick={() => {
                                delete sectionLearning[index_1].content.questionList[index]
                                this.setState({ LevelStage, sectionLearning })
                                this.props.setValue(sectionLearning);
                        }}>
                            <i className="fa fa-close"></i> Delete
                        </button>
                    </div>
                    }
                </div>
            )

        })


        return (<div style={{ width: '100%' }}>{arrayvalue}</div>)
    }

}


export default QuestionsList