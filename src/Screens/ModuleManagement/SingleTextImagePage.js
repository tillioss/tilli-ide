import React from 'react';
import DropDown from "../../Component/DropDown";
import CloseImage from "../../../src/images/close.png";
import EditorContent from "../EditorContent"
import ClassNameSelect from './Component/ClassNameSelect';


class SingleTextImagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  render() {

    const { index, sectionLearning, optionSelect, option } = this.props

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
        <label> Text  </label>
        <EditorContent
          text={sectionLearning[index].content.text}
          index={index}
          sectionLearning={sectionLearning}
          textOnchange={(value) => {
            sectionLearning[index].content.text = value
            this.props.setValue(sectionLearning);
          }}
        />

        {/* <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.body_error}</span> */}
      </div>


      <div className="form-group">
        <label for="text">Text Class Name</label>
        {/* <input type="text" className="form-control" placeholder="classname"
          value={sectionLearning[index].content.textClassName}
          onChange={e => {
            sectionLearning[index].content.textClassName = e.target.value;
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }} /> */}
          <ClassNameSelect
            value={sectionLearning[index].content.textClassName}
            onChange={e => {
              sectionLearning[index].content.textClassName = e;
              this.setState({ sectionLearning })
              this.props.setValue(sectionLearning);
            }}
          />
      </div>

      <div className="form-group">
        <label>Bottom Text </label>
        <EditorContent
          text={sectionLearning[index].content.bottomtext}
          themeType="SingleTextImagePage"
          index={index}
          sectionLearning={sectionLearning}
          textOnchange={(value) => {
            sectionLearning[index].content.bottomtext = value
            this.props.setValue(sectionLearning);
          }}
        />
      </div>


      <div className="form-group">
        <label for="text">Bottom Class Name</label>
        {/* <input type="text" className="form-control" placeholder="classname"
          value={sectionLearning[index].content.bottomClassName}
          onChange={e => {
            sectionLearning[index].content.bottomClassName = e.target.value;
            this.setState({ sectionLearning })
            this.props.setValue(sectionLearning);
          }} /> */}
          <ClassNameSelect
            value={sectionLearning[index].content.bottomClassName}
            onChange={e => {
              sectionLearning[index].content.bottomClassName = e;
              this.setState({ sectionLearning })
              this.props.setValue(sectionLearning);
            }}
          />
      </div>



    </>


    arrayvalue.push(<React.Fragment>
      <div className="" style={{ width: '100%' }}>
        {appendData}
      </div>

    </React.Fragment>)

    return (<React.Fragment>
      {/* {JSON.stringify(sectionBuildStory)} */}
      {arrayvalue}</React.Fragment>)
  }

}


export default SingleTextImagePage