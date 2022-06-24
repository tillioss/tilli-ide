import React from 'react';
import CloseImage from "../../../src/images/close.png";
import DropDown from "../../Component/DropDown";
import EditorContent from "../EditorContent"
import ClassNameSelect from './Component/ClassNameSelect';



class IntroducePersons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

  }
  render() {

    const { LevelStage, OptionSelect, sectionLearning, index_1, option, editable } = this.props;
    return (<div>{
      sectionLearning[index_1].content.persons.map((ival, index) => {
        return <div className="mb-2" style={{backgroundColor:"#eee", padding: 10}}>
          <div className="form-group">
            <label for="text">Person name</label>
            {/* <input type={'text'} className={'form-control'} placeholder={'Person name'} style={{ width: '100%' }} value={ival.name}
                onChange={(e) => {
                  sectionLearning[index_1].content.persons[index].name = e.target.value;
                  this.setState({ LevelStage, sectionLearning })
                }} /> */}

            <EditorContent
              text={sectionLearning[index_1].content.persons[index].name}
              themeType={"IntroducePersons"}
              name={true}
              index={index_1}
              secondindex={index}
              sectionLearning={sectionLearning}
              textOnchange={(value) => {
                sectionLearning[index_1].content.persons[index].name = value
                this.props.setValue(sectionLearning);
              }}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.error_name}</span>
          </div>
          <div className="form-group">
            <label>Class Name</label>
            {/* <input type={'text'} className={'form-control'} placeholder={'nameClassName'} style={{ width: '100%' }} value={sectionLearning[index_1].content.persons[index].nameClassName}
              onChange={(e) => {
                sectionLearning[index_1].content.persons[index].nameClassName = e.target.value;
                this.setState({ LevelStage, sectionLearning })
                this.props.setValue(sectionLearning);
              }} /> */}
              <ClassNameSelect
                  value={sectionLearning[index_1].content.className}
                  onChange={e => {
                    sectionLearning[index_1].content.persons[index].nameClassName = e;
                    this.setState({ LevelStage, sectionLearning })
                    this.props.setValue(sectionLearning);
                  }}
              />
          </div>

          <div className="form-group">
            <label for="text">Image Background Color</label>
            <input type={'color'} disabled={editable == "false" ? true : false} className={'form-control'} placeholder={'image Bg'} style={{ width: '100%' }} value={ival.imageBg}
              onChange={(e) => {
                if (editable != "false") {
                  sectionLearning[index_1].content.persons[index].imageBg = e.target.value;
                  this.setState({ LevelStage, sectionLearning })
                  this.props.setValue(sectionLearning);
                }
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.error_imageBg}</span>
          </div>

          <div className="form-group">
            <label for="text">Text Background Color</label>
            <input type={'color'} disabled={editable == "false" ? true : false} className={'form-control'} placeholder={'Background color'} style={{ width: '100%' }} value={ival.bg}
              onChange={(e) => {
                if (editable != "false") {
                  sectionLearning[index_1].content.persons[index].bg = e.target.value;
                  this.setState({ LevelStage, sectionLearning })
                  this.props.setValue(sectionLearning);
                }
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.error_bg}</span>
          </div>

          <div className="form-group">
            <label for="text">Says</label>
            <EditorContent
              text={sectionLearning[index_1].content.persons[index].says}
              themeType={"IntroducePersons"}
              says={true}
              index={index_1}
              secondindex={index}
              sectionLearning={sectionLearning}
              textOnchange={(value) => {
                sectionLearning[index_1].content.persons[index].says = value
                this.props.setValue(sectionLearning);
              }}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.error_says}</span>
          </div>


          <div className="form-group">
            <label for="text">Image</label>
            <DropDown
              selectedOption={sectionLearning[index_1].content.persons[index].image ?
                { label: sectionLearning[index_1].content.persons[index].image.title, value: sectionLearning[index_1].content.persons[index].image.title }
                : { label: 'Select', value: 'Select' }}
              onChange={(e) => {
                if (editable != "false") {
                  OptionSelect[index_1] = e
                  sectionLearning[index_1].content.persons[index].image = e.json;
                  this.props.setValue(sectionLearning);
                  this.setState({ sectionLearning, OptionSelect })
                }
              }}
              options={option}
              isDisabled={editable == "false" ? true : false}
            />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.error_image}</span>
          </div>
          <div className="form-group">
            <label for="text">Image Style</label>
            <textarea rows="1" cols="50" className="form-control" placeholder="style"
              value={sectionLearning[index_1].content.imagestyle}
              onChange={e => {
                sectionLearning[index_1].content.imagestyle = e.target.value;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
            />
          </div>
          <div className="form-group">
            <label for="text">Image ClassName</label>
            {/* <input type="text" className="form-control" placeholder="classname"
              value={sectionLearning[index_1].content.imageclassname}
              onChange={e => {
                sectionLearning[index_1].content.imageclassname = e.target.value;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }} /> */}
              <ClassNameSelect
                  value={sectionLearning[index_1].content.imageclassname}
                  onChange={e => {
                    sectionLearning[index_1].content.imageclassname = e;
                    this.setState({ sectionLearning })
                    this.props.setValue(sectionLearning);
                  }}
                />
          </div>
        </div>
      })
    }
    </div>)
  }


}


export default IntroducePersons