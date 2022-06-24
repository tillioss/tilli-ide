import React from 'react';
import DropDown from "../../Component/DropDown";
import CloseImage from "../../../src/images/close.png";
import EditorContent from "../EditorContent"
import ClassNameSelect from './Component/ClassNameSelect';


class AskGender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  render() {

    const { index, sectionLearning, optionSelect, option, themeName,editable } = this.props
    let arrayvalue = []
    let appendData = ""
    appendData = <>
      <div className="form-group">
        <label> Image </label>
        <DropDown
          selectedOption={sectionLearning[index].content.image ?
            { label: sectionLearning[index].content.image.title, value: sectionLearning[index].content.image.title }
            :
            { label: 'Select', value: 'Select' }}
          onChange={(e) => {
            sectionLearning[index].content.image = e.json
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }}
          options={option}
          isDisabled={editable == "false" ? true : false}
        />
        {/* <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.image_error}</span> */}
      </div>



      <div className="form-group">
        <label for="text">Image Style</label>
        <textarea rows="1" cols="50" className="form-control" placeholder="style"
          value={sectionLearning[index].content.imagestyle}
          onChange={e => {
            sectionLearning[index].content.imagestyle = e.target.value;
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }}
        />
      </div>
      <div className="form-group">
        <label for="text">Image Class Name</label>
        {/* <input type="text" className="form-control" placeholder="classname"
          value={sectionLearning[index].content.imageclassname}
          onChange={e => {
            sectionLearning[index].content.imageclassname = e.target.value;
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }} /> */}

            <ClassNameSelect
              value={sectionLearning[index].content.imageclassname}
              onChange={e => {
                sectionLearning[index].content.imageclassname = e;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
            />
      </div>

      <div className="form-group">
        <label> Question 1 </label>
        <EditorContent text={sectionLearning[index].content.question}
          index={index} sectionLearning={sectionLearning} themeType={"Ask Gender"}
          textOnchange={(value) => {
            sectionLearning[index].content.question = value
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }} />
      </div>


      <div className="form-group">
        <label for="text">Question 1 Class Name</label>
        {/* <input type="text" className="form-control" placeholder="classname"
          value={sectionLearning[index].content.questionClassName}
          onChange={e => {
            sectionLearning[index].content.questionClassName = e.target.value;
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }} /> */}
          <ClassNameSelect
              value={sectionLearning[index].content.questionClassName}
              onChange={e => {
                sectionLearning[index].content.questionClassName = e;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
            />
      </div>

      <div className="form-group">
        <label> Question 2 </label>
        <EditorContent text={sectionLearning[index].content.question_2}
          themeType={themeName}
          index={index} sectionLearning={sectionLearning}
          textOnchange={(value) => {
            sectionLearning[index].content.question_2 = value
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }} />
      </div>


      <div className="form-group">
        <label for="text">Question 2 Class Name</label>
        {/* <input type="text" className="form-control" placeholder="classname"
          value={sectionLearning[index].content.question_2_ClassName}
          onChange={e => {
            sectionLearning[index].content.question_2_ClassName = e.target.value;
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }} /> */}
          <ClassNameSelect
              value={sectionLearning[index].content.question_2_ClassName}
              onChange={e => {
                sectionLearning[index].content.question_2_ClassName = e;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
            />
      </div>



      <div className="form-group">
        <label> Girl </label>
        <EditorContent text={sectionLearning[index].content.chooseType_1}
          themeType={themeName}
          index={index} sectionLearning={sectionLearning}
          textOnchange={(value) => {
            sectionLearning[index].content.chooseType_1 = value
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }} />

      </div>

      <div className="form-group">
        <label for="text">Girl Class Name</label>
        {/* <input type="text" className="form-control" placeholder="classname"
          value={sectionLearning[index].content.chooseType_1_ClassName}
          onChange={e => {
            sectionLearning[index].content.chooseType_1_ClassName = e.target.value;
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }} /> */}
          <ClassNameSelect
              value={sectionLearning[index].content.chooseType_1_ClassName}
              onChange={e => {
                sectionLearning[index].content.chooseType_1_ClassName = e;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
          />
      </div>

      <div className="form-group">
        <label> Boy </label>
        <EditorContent text={sectionLearning[index].content.chooseType_2}
          themeType={themeName}
          index={index} sectionLearning={sectionLearning}
          textOnchange={(value) => {
            sectionLearning[index].content.chooseType_2 = value
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }}
        />
      </div>


      <div className="form-group">
        <label for="text">Boy Class Name</label>
        {/* <input type="text" className="form-control" placeholder="classname"
          value={sectionLearning[index].content.chooseType_2_ClassName}
          onChange={e => {
            sectionLearning[index].content.chooseType_2_ClassName = e.target.value;
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }} /> */}
          <ClassNameSelect
              value={sectionLearning[index].content.chooseType_2_ClassName}
              onChange={e => {
                sectionLearning[index].content.chooseType_2_ClassName = e;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
          />
      </div>

      <div className="form-group">
        <label> Ask Later </label>
        <EditorContent text={sectionLearning[index].content.chooseType_3}
          themeType={themeName}
          index={index} sectionLearning={sectionLearning}
          textOnchange={(value) => {
            sectionLearning[index].content.chooseType_3 = value
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }} />

      </div>

      <div className="form-group">
        <label for="text">Ask Later Class Name</label>
        {/* <input type="text" className="form-control" placeholder="classname"
          value={sectionLearning[index].content.chooseType_3_ClassName}
          onChange={e => {
            sectionLearning[index].content.chooseType_3_ClassName = e.target.value;
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }} /> */}
          <ClassNameSelect
              value={sectionLearning[index].content.chooseType_3_ClassName}
              onChange={e => {
                sectionLearning[index].content.chooseType_3_ClassName = e;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
          />
      </div>

    </>

    arrayvalue.push(<React.Fragment>
        {appendData}
    </React.Fragment>)

    return (<React.Fragment>
      {/* {JSON.stringify(sectionBuildStory)} */}
      {arrayvalue}</React.Fragment>)
  }

}


export default AskGender