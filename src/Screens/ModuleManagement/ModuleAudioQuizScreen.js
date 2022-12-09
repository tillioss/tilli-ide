import React from 'react';
import DropDown from "../../Component/DropDown";
import EditorContent from "../EditorContent"
import ClassNameSelect from './Component/ClassNameSelect';


class ModuleAudioQuizScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

  }
  render() {

    const { sectionLearning, index_1, editable, themeType,
      sectionBuildStory, staticIndex, loopIndex, optionSelect, option } = this.props;
    let arrayvalue = [];

    if (themeType === "StoryCard") {
      arrayvalue.push(
        <React.Fragment>
          <div className="row item form-group" style={{ width: "100%" }}>
            <div className="col-sm-1 "> Title </div>
            <div className="col-sm-6">


              <EditorContent
                text={sectionBuildStory[loopIndex].content[staticIndex].title}
                themeType={"TitleText"}
                typeContent={"StoryThemeTitle"}
                index={loopIndex}
                secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].title = value
                  this.props.setValue(sectionBuildStory);
                }}
              />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}></span>
            </div>
            <div className="col-sm-5"> </div>

          </div>
        </React.Fragment>
      )



      arrayvalue.push(
        <React.Fragment>
          <div className="form-group">
            <label> Change Color Box </label>
            <div>
              <input type={'text'} className={'form-control'} value={sectionBuildStory[loopIndex].content[staticIndex].content.changeColorBox} placeholder={'Enter Color'} style={{ width: '100%' }}
                onChange={(e) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.changeColorBox = e.target.value;
                  this.setState({ sectionBuildStory })
                  this.props.setValue(sectionBuildStory);
                }} />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}></span>
            </div>
          </div>
        </React.Fragment>
      )

      arrayvalue.push(
        <div className="form-group">
          <label> Image</label>
          <div>
            <DropDown
              selectedOption={sectionBuildStory[loopIndex].content[staticIndex].content.image ?
                sectionBuildStory[loopIndex].content[staticIndex].content.image
                :
                { label: 'Select', value: 'Select' }}
              onChange={(e) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.image = e
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }}
              options={option}
            />
          </div>
        </div>

      )

      arrayvalue.push(
        <>
          <div className="form-group">
            <label for="text">Image Style</label>
            <textarea rows="1" cols="50" className="form-control" placeholder="style"
              value={sectionBuildStory[loopIndex].content[staticIndex].content.imagestyle}
              onChange={e => {
                sectionBuildStory[loopIndex].content[staticIndex].content.imagestyle = e.target.value;
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }}
            />
          </div>
          <div className="form-group">
            <label for="text">Image Class Name</label>

            <ClassNameSelect
              value={sectionBuildStory[loopIndex].content[staticIndex].content.imageclassname}
              onChange={e => {
                sectionBuildStory[loopIndex].content[staticIndex].content.imageclassname = e;
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }}
            />
          </div>
        </>
      )


      arrayvalue.push(
        <div className="row mt-5">
          <div className="col-sm-4"> <h4> Question</h4> </div>
          <div className="col-sm-8 text-center">
            {editable !== "false" ? <button type="button" className="btn btn-success " onClick={() => {
              sectionBuildStory[loopIndex].content[staticIndex].content.feelingsDataList.push({ questions: '', results: [] })
              this.setState({ sectionBuildStory })
              this.props.setValue(sectionBuildStory);
            }} >Add questions</button> : null}
          </div>
        </div>
      )


      sectionBuildStory[loopIndex].content[staticIndex].content.feelingsDataList.map((ival, index) => {
        arrayvalue.push(
          <div className="mb-2" style={{ backgroundColor: "#eee", padding: 10 }}>
            <div className="form-group">
              <label>Text</label>
              <EditorContent
                text={sectionBuildStory[loopIndex].content[staticIndex].content.feelingsDataList[index].questions}
                themeType={"StoryAudioQuizScreen"}
                thirdindex={index}
                index={loopIndex} secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.feelingsDataList[index].questions = value
                  this.props.setValue(sectionBuildStory);
                }}
              />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.questions_error}</span>
            </div>
            <div className="form-group">
              <label>Class Name</label>

              <ClassNameSelect
                value={ival.nameClassName}
                onChange={e => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.feelingsDataList[index].nameClassName = e;
                  this.setState({ sectionBuildStory })
                  this.props.setValue(sectionBuildStory);
                }}
              />
            </div>
            <div className="form-group text-center">
              <button onClick={() => {
                if (editable !== "false") {
                  delete sectionBuildStory[loopIndex].content[staticIndex].content.feelingsDataList[index]
                  let remove_undef = sectionBuildStory[loopIndex].content[staticIndex].content.feelingsDataList.filter(function (element) {
                    return element !== null;
                  });
                  sectionBuildStory[loopIndex].content[staticIndex].content.feelingsDataList = remove_undef
                  this.props.setValue(sectionBuildStory);
                  this.setState({ sectionBuildStory })
                }
              }} className="btn btn-danger">
                <i className="fa fa-close" ></i> Delete
              </button>
            </div>

          </div>
        )
        return true
      })


    }
    else {
      arrayvalue.push(
        <React.Fragment>
          <div className="row item form-group" style={{ width: "100%" }}>
            <div className="col-sm-1"> Change Color Box </div>
            <div className="col-sm-4">
              <input type={'text'} className={'form-control'} value={sectionLearning[index_1].content.changeColorBox} placeholder={'Enter Color'} style={{ width: '100%' }}
                onChange={(e) => {
                  sectionLearning[index_1].content.changeColorBox = e.target.value;
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }} />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}></span>
            </div>
            <div className="col-sm-7"> </div>

          </div>
        </React.Fragment>
      )


      arrayvalue.push(
        <div className="row item form-group" style={{ marginTop: 20, marginBottom: 20 }}>
          <div className="col-sm-1 text-ali-left"> Image</div>
          <div className="col-sm-5" style={{ textAlign: "left" }}>
            <DropDown
              selectedOption={!optionSelect[index_1] ? { label: "", value: "" } : optionSelect[index_1]}
              onChange={(e) => {
                if (editable !== "false") {
                  optionSelect[index_1] = e
                  sectionLearning[index_1].content.image = e.json;
                  this.setState({ optionSelect, sectionLearning })
                  this.props.setValue(sectionLearning);
                }
              }}
              options={option}
              isDisabled={editable === "false" ? true : false}
            />

          </div>
          <div className="col-sm-2" style={{ top: -30 }}>
            {optionSelect[index_1] ?
              <img style={{ width: '100%', height: 100 }} src={optionSelect[index_1].value} alt={'loading'} className="img-responsive" />

              : null}
          </div>

          <div className="col-sm-1"> </div>

        </div>

      )

      arrayvalue.push(
        <>
          <div className="row">
            <div className="col-sm-1 topalign mb-3" />
            <div className="col-sm-3 topalign">
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
            <div className="col-sm-3 topalign">
              <label for="text">Image ClassName</label>
              <input type="text" className="form-control" placeholder="classname"
                value={sectionLearning[index_1].content.imageclassname}
                onChange={e => {
                  sectionLearning[index_1].content.imageclassname = e.target.value;
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }} />
            </div>

          </div>
        </>
      )

      arrayvalue.push(
        <React.Fragment>
          <div className="col-sm-3" style={{ marginTop: 15, marginBottom: 10 }}> <h4> Add Question</h4> </div>
          <div className="col-sm-5"> </div>
          <div className="col-sm-3" style={{ marginTop: 10, marginBottom: 10 }}>
            {editable !== "false" ? <button type="button" className="btn btn-success " onClick={() => {
              sectionLearning[index_1].content.feelingsDataList.push({ questions: '', results: [] })
              this.setState({ sectionLearning })
              this.props.setValue(sectionLearning);
            }} >Add questions</button> : null}

          </div>
          <div className="col-sm-1"> </div>
        </React.Fragment>
      )


      sectionLearning[index_1].content.feelingsDataList.map((ival, index) => {
        arrayvalue.push(
          <React.Fragment>
            <div className="row form-group" style={{ width: '100%' }}>
              <div className="col-sm-2 marginspace"></div>
              <div className="col-sm-5 marginspace">
                <EditorContent
                  text={sectionLearning[index_1].content.feelingsDataList[index].questions}
                  themeType={"AudioQuizScreen"}
                  index={index_1}
                  secondindex={index}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.feelingsDataList[index].questions = value
                    this.props.setValue(sectionLearning);
                  }}
                />

                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.feelingsDataList[index].questions_error}</span>
              </div>

              <div className="col-sm-3 marginspace">
                <label>nameClassName</label>
                <input type={'text'} className={'form-control'} placeholder={'nameClassName'} style={{ width: '100%' }}
                  value={ival.nameClassName}
                  onChange={(e) => {
                    sectionLearning[index_1].content.feelingsDataList[index].nameClassName = e.target.value;
                    this.setState({ sectionLearning })
                    this.props.setValue(sectionLearning);
                  }} />
              </div>

              <div className="col-sm-1 marginspace" onClick={() => {
                if (editable !== "false") {
                  delete sectionLearning[index_1].content.feelingsDataList[index]
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }
              }}>
                {editable !== "false" ?
                  <i className="fa fa-close" style={{ fontSize: 20, color: "#FFF", backgroundColor: "#f95a2b", padding: 5, cursor: "pointer" }}></i>
                  : null}

              </div>
            </div>

          </React.Fragment>
        )
        return true
      })

    }

    return (<div style={{ width: "100%" }}>{arrayvalue}</div>)
  }


}


export default ModuleAudioQuizScreen