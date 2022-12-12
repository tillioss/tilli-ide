import React from 'react';
import DropDown from "../../Component/DropDown";
import EditorContent from "../EditorContent"
import EditorContentTwo from "../EditorContent_2"
import ModelView from '../ModelView';
import ClassNameSelect from './Component/ClassNameSelect';


class ModuleCircleWithInfoAnimations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

  }
  render() {
    const { optionSelect, option, index_1, sectionLearning, type, editable,
      sectionBuildStory, staticIndex, loopIndex, themeType } = this.props;
    let arrayvalue = []

    if (themeType === "StoryCard") {
      arrayvalue.push(
        <React.Fragment>
          <div className="form-group" style={{ width: "100%" }}>
            <label> Title </label>
            <div>
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

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].title_error}</span>
            </div>
          </div>
        </React.Fragment>
      )
      arrayvalue.push(
        <div className="form-group">
          <label>Image </label>
          <div>
            <DropDown
              selectedOption={sectionBuildStory[loopIndex].content[staticIndex].content.image.title ?
                { label: sectionBuildStory[loopIndex].content[staticIndex].content.image.title, value: sectionBuildStory[loopIndex].content[staticIndex].content.image.title }
                :
                { label: 'Select', value: 'Select' }}
              onChange={(e) => {
                if (editable !== "false") {
                  optionSelect[index_1] = e
                  sectionBuildStory[loopIndex].content[staticIndex].content.image = e.json;

                  this.setState({ optionSelect, sectionBuildStory })
                  this.props.setValue(sectionBuildStory);
                }

              }}
              options={option}
              isDisabled={editable === "false" ? true : false}
            />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.image_error}</span>
          </div>
        </div>
      )


      arrayvalue.push(
        <>
          <div className="form-group">
            <label>Image Style</label>
            <textarea
              rows="1"
              cols="50"
              className="form-control"
              placeholder="style"
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
        <React.Fragment>
          <div className="mt-3 form-group" style={{ width: "100%" }}>
            <h4>Circles</h4>
          </div>
        </React.Fragment>
      )

      let circleHtmlData = []

      sectionBuildStory[loopIndex].content[staticIndex].content.circles.map(((ival, index) => {
        let datachange = ""
        if (type) {
          datachange = <input type={'text'} className={'form-control'} placeholder={'Name'} style={{ width: '100%' }} value={ival.name}
            onChange={(e) => {
              sectionBuildStory[loopIndex].content[staticIndex].content.circles[index].name = e.target.value
              this.setState({ sectionBuildStory })
              this.props.setValue(sectionBuildStory);
            }} />
        } else {
          datachange = <EditorContent
            text={sectionBuildStory[loopIndex].content[staticIndex].content.circles[index].name}
            themeType={"StoryDropToSelection"}
            name={true}
            index={loopIndex}
            secondindex={staticIndex}
            thirdindex={index}
            sectionLearning={sectionBuildStory}
            textOnchange={(value) => {
              sectionBuildStory[loopIndex].content[staticIndex].content.circles[index].name = value
              this.props.setValue(sectionBuildStory);
            }}
          />
        }

        circleHtmlData.push(<div className="mb-2" style={{ backgroundColor: "#eee", padding: 10 }}>
          <div className="form-group">
            <label>Text</label>
            {datachange}
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.name_error}</span>
          </div>

          <div className="form-group">
            <label>Color</label>
            <input type={'text'} disabled={editable === "false" ? true : false} className={'form-control'} placeholder={'Color'} style={{ width: '100%' }} value={ival.color}
              onChange={(e) => {
                if (editable !== "false") {
                  sectionBuildStory[loopIndex].content[staticIndex].content.circles[index].color = e.target.value
                  this.setState({ sectionBuildStory })
                  this.props.setValue(sectionBuildStory);
                }
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.color_error}</span>
          </div>
          {type ?

            <div className="form-group">
              <label>Correct answer</label>
              <input style={{ marginLeft: 10 }} disabled={editable === "false" ? true : false} type="checkbox" id="" name="" value="" checked={
                sectionBuildStory[loopIndex].content[staticIndex].content.circles[index].isCorrectanswer}
                onChange={(e) => {
                  if (editable !== "false") {
                    if (sectionBuildStory[loopIndex].content[staticIndex].content.circles[index].isCorrectanswer === false) {
                      sectionBuildStory[loopIndex].content[staticIndex].content.circles[index].isCorrectanswer = true
                    }
                    else {
                      sectionBuildStory[loopIndex].content[staticIndex].content.circles[index].isCorrectanswer = false
                    }
                    this.setState({ sectionBuildStory })
                    this.props.setValue(sectionBuildStory);
                  }

                }} />
            </div>

            : null}

        </div>)
        return true
      }))

      arrayvalue.push(circleHtmlData)
      arrayvalue.push(
        <React.Fragment>
          <div className="form-group">
            <h4>Change Color</h4>
          </div>
        </React.Fragment>
      )

      arrayvalue.push(<React.Fragment>
        <div className="form-group">
          <label>Change Story Box Color</label>
          <div>
            <input type={'color'} className={'form-control'} placeholder={'Change Story Box Color'} style={{ width: '100%' }}
              value={sectionBuildStory[loopIndex].content[staticIndex].content.changeColorStoryBox}
              onChange={(e) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.changeColorStoryBox = e.target.value
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }} />
          </div>
        </div>
        <div className="form-group" style={{ width: '100%' }}>
          <label>Change Question Box Color</label>
          <div className="">
            <input type={'color'} className={'form-control'} placeholder={'Change Question Box Color'} style={{ width: '100%' }}
              value={sectionBuildStory[loopIndex].content[staticIndex].content.ChangeColorQuestionBox}
              onChange={(e) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.ChangeColorQuestionBox = e.target.value
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }} />
          </div>
        </div>

        <div className="form-group">
          <label>Change Image Background Color</label>
          <div className="">
            <input type={'color'} className={'form-control'} placeholder={'Change Image Background Color'} style={{ width: '100%' }}
              value={sectionBuildStory[loopIndex].content[staticIndex].content.imageBgColor}
              onChange={(e) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.imageBgColor = e.target.value
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }} />
          </div>
        </div>

      </React.Fragment>)



      arrayvalue.push(
        <React.Fragment>
          <div className="row " style={{ width: "100%" }}>
            <div className="col-sm-12"> <h4>Text</h4>
            </div>
          </div>
        </React.Fragment>
      )
      arrayvalue.push(<React.Fragment>
        <div className="form-group" style={{ width: '100%' }}>
          <label>Story
            <span onClick={() => { this.setState({ update: true }) }}>
              <ModelView uniqueId={staticIndex + "T" + loopIndex}
                viewCode={sectionBuildStory[loopIndex].content[staticIndex].content.text1}
                modelTextChange={(textValue) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.text1 = textValue
                  this.setState({ sectionBuildStory })
                  this.props.setValue(sectionBuildStory);
                }}
              />
            </span></label>
          <div>
            <EditorContent
              text={sectionBuildStory[loopIndex].content[staticIndex].content.text1}
              themeType={"StoryDropToSelection"}
              text1={true}
              index={loopIndex}
              secondindex={staticIndex}
              sectionBuildStory={sectionBuildStory}
              textOnchange={(value) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.text1 = value
                this.props.setValue(sectionBuildStory);
              }}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>
              {sectionBuildStory[loopIndex].content[staticIndex].content.text1_error}</span>
          </div>
        </div>

        <div className="form-group">
          <label>Class Name</label>

          <ClassNameSelect
            value={sectionBuildStory[loopIndex].content[staticIndex].content.storyclassName}
            onChange={e => {
              sectionBuildStory[loopIndex].content[staticIndex].content.storyclassName = e;
              this.setState({ sectionBuildStory })
              this.props.setValue(sectionBuildStory);
            }}
          />
        </div>
        <div className="form-group" style={{ width: '100%' }}>
          <label>Question <span onClick={() => { this.setState({ update: true }) }}>
            <ModelView uniqueId={staticIndex + "T2" + loopIndex}
              viewCode={sectionBuildStory[loopIndex].content[staticIndex].content.text2}
              modelTextChange={(textValue) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.text2 = textValue
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }}
            />
          </span></label>
          <div className="form-group">

            <EditorContent
              text={sectionBuildStory[loopIndex].content[staticIndex].content.text2}
              themeType={"StoryDropToSelection"}
              text2={true}
              index={loopIndex}
              secondindex={staticIndex}
              sectionBuildStory={sectionBuildStory}
              textOnchange={(value) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.text2 = value
                this.props.setValue(sectionBuildStory);
              }}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>
              {sectionBuildStory[loopIndex].content[staticIndex].content.text2_error}</span>
          </div>


          <div className="form-group">

            <label>Class Name</label>
            <ClassNameSelect
              value={sectionBuildStory[loopIndex].content[staticIndex].content.questionclassName}
              onChange={e => {
                sectionBuildStory[loopIndex].content[staticIndex].content.questionclassName = e
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }}
            />
          </div>

        </div>

      </React.Fragment>)

      arrayvalue.push(
        <React.Fragment>
          <div className="row mt-3">
            <div className="col-sm-12"> <h4>Message</h4>  </div>
          </div>
        </React.Fragment>
      )



      arrayvalue.push(
        <React.Fragment>
          <div className="form-group">
            <div className="col-sm-4 marginspace">

              <EditorContentTwo
                text={sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_header_1}
                themeType={"StoryDropToSelection"}
                failure_header_1={true}
                index={loopIndex}
                secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_header_1 = value
                  this.props.setValue(sectionBuildStory);
                }}
              />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_header_1_error}</span>
            </div>

            <div className="col-sm-4 marginspace">

              <EditorContentTwo
                text={sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_body_1}
                themeType={"StoryDropToSelection"}
                failure_body_1={true}
                index={loopIndex}
                secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_body_1 = value
                  this.props.setValue(sectionBuildStory);
                }}
              />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_body_1_error}</span>
            </div>

            <div className="col-sm-4 marginspace">


              <EditorContentTwo
                text={sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_button_1}
                themeType={"StoryDropToSelection"}
                failure_button_1={true}
                index={loopIndex}
                secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_button_1 = value
                  this.props.setValue(sectionBuildStory);
                }}

              />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_button_1_error}</span>
            </div>

          </div>



          <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-4 marginspace">

              <EditorContentTwo
                text={sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_header_2}
                themeType={"StoryDropToSelection"}
                failure_header_2={true}
                index={loopIndex}
                secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_header_2 = value
                  this.props.setValue(sectionBuildStory);
                }}
              />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_header_2_error}</span>
            </div>

            <div className="col-sm-4 marginspace">
              <EditorContentTwo
                text={sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_body_2}
                themeType={"StoryDropToSelection"}
                failure_body_2={true}
                index={loopIndex}
                secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_body_2 = value
                  this.props.setValue(sectionBuildStory);
                }}
              />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_body_2_error}</span>
            </div>

            <div className="col-sm-4 marginspace">
              <EditorContentTwo
                text={sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_button_2}
                themeType={"StoryDropToSelection"} failure_button_2={true}
                index={loopIndex} secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_button_2 = value
                  this.props.setValue(sectionBuildStory);
                }}
              />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.message.failure_button_2_error}</span>
            </div>

          </div>



          <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-4 marginspace">

              <EditorContentTwo
                text={sectionBuildStory[loopIndex].content[staticIndex].content.message.success_header_1}
                themeType={"StoryDropToSelection"}
                success_header_1={true}
                index={loopIndex}
                secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.message.success_header_1 = value
                  this.props.setValue(sectionBuildStory);
                }}
              />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.message.success_header_1_error}</span>
            </div>

            <div className="col-sm-4 marginspace">

              <EditorContentTwo
                text={sectionBuildStory[loopIndex].content[staticIndex].content.message.success_body_1}
                themeType={"StoryDropToSelection"}
                success_body_1={true}
                index={loopIndex}
                secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.message.success_body_1 = value
                  this.props.setValue(sectionBuildStory);
                }}
              />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.message.success_body_1_error}</span>
            </div>

            <div className="col-sm-4 marginspace">

              <EditorContentTwo
                text={sectionBuildStory[loopIndex].content[staticIndex].content.message.success_button_1}
                themeType={"StoryDropToSelection"}
                success_button_1={true}
                index={loopIndex}
                secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.message.success_button_1 = value
                  this.props.setValue(sectionBuildStory);
                }}

              />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.message.success_button_1_error}</span>
            </div>

          </div>

          <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-4 marginspace">

              <EditorContentTwo
                text={sectionBuildStory[loopIndex].content[staticIndex].content.message.success_header_2}
                themeType={"StoryDropToSelection"}
                success_header_2={true}
                index={loopIndex}
                secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.message.success_header_2 = value
                  this.props.setValue(sectionBuildStory);
                }}
              />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.message.success_header_2_error}</span>
            </div>

            <div className="col-sm-4 marginspace">

              <EditorContentTwo
                text={sectionBuildStory[loopIndex].content[staticIndex].content.message.success_body_2}
                themeType={"StoryDropToSelection"}
                success_body_2={true}
                index={loopIndex} secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.message.success_body_2 = value
                  this.props.setValue(sectionBuildStory);
                }}
              />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.message.success_body_2_error}</span>
            </div>

            <div className="col-sm-4 marginspace">


              <EditorContentTwo
                text={sectionBuildStory[loopIndex].content[staticIndex].content.message.success_button_2}
                themeType={"StoryDropToSelection"}
                success_button_2={true}
                index={loopIndex}
                secondindex={staticIndex}
                sectionBuildStory={sectionBuildStory}
                textOnchange={(value) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.message.success_button_2 = value
                  this.props.setValue(sectionBuildStory);
                }} />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.message.success_button_2_error}</span>
            </div>

          </div>



        </React.Fragment>
      )



      arrayvalue.push(<React.Fragment>
        <div className="row form-group" style={{ width: '100%' }}>

          <div className="col-sm-6 marginspace">
            <label>Success Message </label>
            <input type={'text'} className={'form-control'} placeholder={'Success Message'} style={{ width: '100%' }}
              value={sectionBuildStory[loopIndex].content[staticIndex].content.correctAnswer}
              onChange={(e) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.correctAnswermsg = e.target.value
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }} />
          </div>

          <div className="col-sm-6 marginspace">
            <label>Failure Message </label>
            <input type={'text'} className={'form-control'} placeholder={'Failure Message'} style={{ width: '100%' }}
              value={sectionBuildStory[loopIndex].content[staticIndex].content.wrongAnswer}
              onChange={(e) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.wrongAnswermsg = e.target.value
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }} />
          </div>

          <div className="col-sm-3 marginspace">
            <label>Number Of Points </label>
            <input type={'number'} className={'form-control'} placeholder={'Enter Number Of Points'} style={{ width: '100%' }}
              value={sectionBuildStory[loopIndex].content[staticIndex].content.numberOfPoints}
              onChange={(e) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.numberOfPoints = e.target.value
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }} />
          </div>

          <div className="col-sm-3 marginspace">
            <label>Add Learning Point  </label>
            <input type={'number'} className={'form-control'} placeholder={'Add Learning Point'} style={{ width: '100%' }}
              value={sectionBuildStory[loopIndex].content[staticIndex].content.learningPoint}
              onChange={(e) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.learningPoint = e.target.value
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }} />
          </div>
        </div>
      </React.Fragment>)

    } else {
      arrayvalue.push(
        <React.Fragment>
          <div className="form-group">
            Image
            <DropDown
              selectedOption={optionSelect[index_1] ? optionSelect[index_1] : { label: 'Select', value: 'Select' }}
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
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.image_error}</span>
          </div>
        </React.Fragment>
      )


      arrayvalue.push(
        <>
          <div className="form-group">
            <label for="text">Image Style</label>
            <textarea rows="1" cols="50" className="form-control" placeholder="Image Style"
              value={sectionLearning[index_1].content.imagestyle}
              onChange={e => {
                sectionLearning[index_1].content.imagestyle = e.target.value;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
            />
          </div>
          <div className="form-group">
            <label for="text">Image Class Name</label>
            <ClassNameSelect
              value={sectionLearning[index_1].content.imageclassname}
              onChange={e => {
                sectionLearning[index_1].content.imageclassname = e;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
            />
          </div>
        </>
      )

      arrayvalue.push(
        <div className="form-group">
          <label for="text">Image Text</label>
          <input type="text" className="form-control" placeholder="image Text"
            value={sectionLearning[index_1].content.imageText}
            onChange={e => {
              sectionLearning[index_1].content.imageText = e.target.value;
              this.setState({ sectionLearning })
              this.props.setValue(sectionLearning);
            }} />
        </div>
      )

      arrayvalue.push(
        <React.Fragment>
          <div className="row mt-5">
            <div className="col-sm-12">
              <h4>Circles</h4>
            </div>
          </div>
        </React.Fragment>
      )

      let circleDatahtml = []

      sectionLearning[index_1].content.circles.map(((ival, index) => {
        let datachange = ""
        if (type) {
          datachange = <input type={'text'} className={'form-control'} placeholder={'Name'} style={{ width: '100%' }} value={ival.name}
            onChange={(e) => {
              sectionLearning[index_1].content.circles[index].name = e.target.value
              this.setState({ sectionLearning })
              this.props.setValue(sectionLearning);
            }} />
        } else {
          datachange = <EditorContent
            text={sectionLearning[index_1].content.circles[index].name}
            themeType={"CircleWithInfoAnimations"}
            name={true}
            index={index_1}
            secondindex={index}
            sectionLearning={sectionLearning}
            textOnchange={(value) => {
              sectionLearning[index_1].content.circles[index].name = value
              this.props.setValue(sectionLearning);
            }}
          />
        }

        circleDatahtml.push(<div className="mb-2" style={{ backgroundColor: "#eee", padding: 10 }}>
          <div className="form-group">
            <label>Text</label>
            {datachange}
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.name_error}</span>
          </div>


          <div className="form-group">
            <label>Class Name </label>
            <ClassNameSelect
              value={ival.nameClassName}
              onChange={e => {
                sectionLearning[index_1].content.circles[index].nameClassName = e;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
            />
          </div>


          <div className="form-group">
            <label>Color </label>
            <input type={'text'} disabled={editable === "false" ? true : false} className={'form-control'} placeholder={'Color'} style={{ width: '100%' }} value={ival.color}
              onChange={(e) => {
                if (editable !== "false") {
                  sectionLearning[index_1].content.circles[index].color = e.target.value
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.color_error}</span>
          </div>


          {type ?
            <div className="col-sm-2 marginspace">
              <label>Correct answer</label>
              <input style={{ marginLeft: 10 }} disabled={editable === "false" ? true : false} type="checkbox" id="" name="" value="" checked={sectionLearning[index_1].content.circles[index].isCorrectanswer}
                onChange={(e) => {
                  if (editable !== "false") {
                    if (sectionLearning[index_1].content.circles[index].isCorrectanswer === false) {
                      sectionLearning[index_1].content.circles[index].isCorrectanswer = true
                    }
                    else {
                      sectionLearning[index_1].content.circles[index].isCorrectanswer = false
                    }
                    this.setState({ sectionLearning })
                    this.props.setValue(sectionLearning);
                  }

                }} />
            </div>
            : null}

        </div>)
        return true;
      }))

      arrayvalue.push(
        <div >
          {circleDatahtml}
        </div>
      )

      if (type) {
        arrayvalue.push(
          <React.Fragment>
            <div className="row item form-group" style={{ width: "100%" }}>
              <div className="col-sm-1"> <h4>Change Color</h4>  </div>
              <div className="col-sm-6">
              </div>
              <div className="col-sm-5"> </div>

            </div>
          </React.Fragment>
        )

        arrayvalue.push(<React.Fragment>
          <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-5 marginspace">
              <input type={'text'} className={'form-control'} placeholder={'Change Story Box Color'} style={{ width: '100%' }}
                value={sectionLearning[index_1].content.changeColorStoryBox}
                onChange={(e) => {
                  sectionLearning[index_1].content.changeColorStoryBox = e.target.value
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }} />
            </div>

          </div>
          <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-5 marginspace">
              <input type={'text'} className={'form-control'} placeholder={'Change Question Box Color'} style={{ width: '100%' }}
                value={sectionLearning[index_1].content.ChangeColorQuestionBox}
                onChange={(e) => {
                  sectionLearning[index_1].content.ChangeColorQuestionBox = e.target.value
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }} />
            </div>

          </div>


          <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-5 marginspace">
              <input type={'text'} className={'form-control'} placeholder={'Change Image Bg Color'} style={{ width: '100%' }}
                value={sectionLearning[index_1].content.imageBgColor}
                onChange={(e) => {
                  sectionLearning[index_1].content.imageBgColor = e.target.value
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }} />
            </div>

          </div>

        </React.Fragment>)



        arrayvalue.push(
          <React.Fragment>
            <div className="col-sm-4 text-ali-left" style={{ marginTop: 15 }}><h4>Text</h4> </div>
            <div className="col-sm-4"> </div>
            <div className="col-sm-3" style={{ marginTop: 10, marginBottom: 10 }}>
            </div>
            <div className="col-sm-1"> </div>

          </React.Fragment>
        )

        arrayvalue.push(<React.Fragment>
          <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-5 marginspace">
              <EditorContent
                text={sectionLearning[index_1].content.text1}
                themeType={"DropToSelection"}
                text1={true}
                index={index_1}
                sectionLearning={sectionLearning}
                textOnchange={(value) => {
                  sectionLearning[index_1].content.text1 = value
                  this.props.setValue(sectionLearning);
                }}
              />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.text1_error}</span>

            </div>

          </div>
          <div className="row form-group" style={{ width: '100%' }}>
            <div className="col-sm-5 marginspace">
              <EditorContent
                text={sectionLearning[index_1].content.text2}
                themeType={"DropToSelection"}
                text2={true}
                index={index_1}
                sectionLearning={sectionLearning}
                textOnchange={(value) => {
                  sectionLearning[index_1].content.text2 = value
                  this.props.setValue(sectionLearning);
                }}
              />


              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.text2_error}</span>
            </div>

          </div>

        </React.Fragment>)

      }


      if (!type) {

        Object.keys(sectionLearning[index_1].content.text).map(((index) => {
          arrayvalue.push(<React.Fragment>
            <div className="row form-group" style={{ width: '100%' }}>
              <div className="col-sm-5 marginspace">

                <label>Text</label>
                <EditorContent
                  text={sectionLearning[index_1].content.text[index].value}
                  themeType={"CircleWithInfoAnimations"}
                  value={true}
                  index={index_1}
                  secondindex={index}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.text[index].value = value
                    this.props.setValue(sectionLearning);
                  }}
                />
                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.text[index].value_error}</span>
              </div>

              <div className="col-sm-3 marginspace">
                <label>Color</label>
                <input type={'text'} disabled={editable === "false" ? true : false} className={'form-control'} placeholder={'Color'} style={{ width: '100%' }}
                  value={sectionLearning[index_1].content.text[index].style.color}
                  onChange={(e) => {
                    if (editable !== "false") {
                      sectionLearning[index_1].content.text[index].style.color = e.target.value
                      this.setState({ sectionLearning })
                      this.props.setValue(sectionLearning);
                    }
                  }} />
                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.text[index].style.color_error}</span>
              </div>

              <div className="col-sm-3 marginspace">
                <label>Class Name</label>
                <ClassNameSelect
                  value={sectionLearning[index_1].content.text[index].style.nameClassName}
                  onChange={e => {
                    sectionLearning[index_1].content.text[index].style.nameClassName = e;
                    this.setState({ sectionLearning })
                    this.props.setValue(sectionLearning);
                  }}
                />
              </div>
            </div>

          </React.Fragment>)
          return true
        }))

      }

      if (sectionLearning[index_1].content.message) {
        arrayvalue.push(
          <React.Fragment>
            <div className="col-sm-4 text-ali-left" style={{ marginTop: 15 }}><h4>Message</h4> </div>
            <div className="col-sm-4"> </div>

            <div className="col-sm-1"> </div>

            <div className="row form-group" style={{ width: '100%' }}>
              <div className="col-sm-4 marginspace">

                <EditorContentTwo
                  text={sectionLearning[index_1].content.message.failure_header_1}
                  themeType={"DropToSelection"}
                  failure_header_1={true}
                  index={index_1}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.message.failure_header_1 = value
                    this.props.setValue(sectionLearning);
                  }}
                />

                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.message.failure_header_1_error}</span>
              </div>

              <div className="col-sm-4 marginspace">

                <EditorContentTwo
                  text={sectionLearning[index_1].content.message.failure_body_1}
                  themeType={"DropToSelection"}
                  failure_body_1={true}
                  index={index_1}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.message.failure_body_1 = value
                    this.props.setValue(sectionLearning);
                  }}
                />


                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.message.failure_body_1_error}</span>
              </div>

              <div className="col-sm-4 marginspace">


                <EditorContentTwo
                  text={sectionLearning[index_1].content.message.failure_button_1}
                  themeType={"DropToSelection"}
                  failure_button_1={true}
                  index={index_1}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.message.failure_button_1 = value
                    this.props.setValue(sectionLearning);
                  }}
                />

                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.message.failure_button_1_error}</span>
              </div>

            </div>



            <div className="row form-group" style={{ width: '100%' }}>
              <div className="col-sm-4 marginspace">

                <EditorContentTwo
                  text={sectionLearning[index_1].content.message.failure_header_2}
                  themeType={"DropToSelection"}
                  failure_header_2={true}
                  index={index_1}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.message.failure_header_2 = value
                    this.props.setValue(sectionLearning);
                  }}
                />

                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.message.failure_header_2_error}</span>
              </div>

              <div className="col-sm-4 marginspace">
                <EditorContentTwo
                  text={sectionLearning[index_1].content.message.failure_body_2}
                  themeType={"DropToSelection"}
                  failure_body_2={true}
                  index={index_1}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.message.failure_body_2 = value
                    this.props.setValue(sectionLearning);
                  }}
                />

                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.message.failure_body_2_error}</span>
              </div>

              <div className="col-sm-4 marginspace">
                <EditorContentTwo
                  text={sectionLearning[index_1].content.message.failure_button_2}
                  themeType={"DropToSelection"}
                  failure_button_2={true}
                  index={index_1}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.message.failure_button_2 = value
                    this.props.setValue(sectionLearning);
                  }}
                />

                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.message.failure_button_2_error}</span>
              </div>
            </div>


            <div className="row form-group" style={{ width: '100%' }}>
              <div className="col-sm-4 marginspace">
                <EditorContentTwo
                  text={sectionLearning[index_1].content.message.success_header_1}
                  themeType={"DropToSelection"}
                  success_header_1={true}
                  index={index_1}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.message.success_header_1 = value
                    this.props.setValue(sectionLearning);
                  }}
                />
                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.message.success_header_1_error}</span>
              </div>
              <div className="col-sm-4 marginspace">
                <EditorContentTwo
                  text={sectionLearning[index_1].content.message.success_body_1}
                  themeType={"DropToSelection"}
                  success_body_1={true}
                  index={index_1}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.message.success_body_1 = value
                    this.props.setValue(sectionLearning);
                  }}
                />

                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.message.success_body_1_error}</span>
              </div>
              <div className="col-sm-4 marginspace">
                <EditorContentTwo
                  text={sectionLearning[index_1].content.message.success_button_1}
                  themeType={"DropToSelection"}
                  success_button_1={true}
                  index={index_1}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.message.success_button_1 = value
                    this.props.setValue(sectionLearning);
                  }}
                />
                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.message.success_button_1_error}</span>
              </div>

            </div>
            <div className="row form-group" style={{ width: '100%' }}>
              <div className="col-sm-4 marginspace">
                <EditorContentTwo
                  text={sectionLearning[index_1].content.message.success_header_2}
                  themeType={"DropToSelection"}
                  success_header_2={true}
                  index={index_1}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.message.success_header_2 = value
                    this.props.setValue(sectionLearning);
                  }}
                />

                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.message.success_header_2_error}</span>
              </div>
              <div className="col-sm-4 marginspace">

                <EditorContentTwo
                  text={sectionLearning[index_1].content.message.success_body_2}
                  themeType={"DropToSelection"}
                  success_body_2={true}
                  index={index_1}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.message.success_body_2 = value
                    this.props.setValue(sectionLearning);
                  }} />


                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.message.success_body_2_error}</span>
              </div>
              <div className="col-sm-4 marginspace">
                <EditorContentTwo
                  text={sectionLearning[index_1].content.message.success_button_2}
                  themeType={"DropToSelection"}
                  success_button_2={true}
                  index={index_1}
                  sectionLearning={sectionLearning}
                  textOnchange={(value) => {
                    sectionLearning[index_1].content.message.success_button_2 = value
                    this.props.setValue(sectionLearning);
                  }} />
                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.message.success_button_2_error}</span>
              </div>

            </div>



          </React.Fragment>
        )

        arrayvalue.push(<React.Fragment>
          <div className="row form-group" style={{ width: '100%' }}>

            <div className="col-sm-6 marginspace">
              <label>Sucess Message </label>
              <input type={'text'} className={'form-control'} placeholder={'Enter Sucess Message'} style={{ width: '100%' }}
                value={sectionLearning[index_1].content.correctAnswer}
                onChange={(e) => {
                  sectionLearning[index_1].content.correctAnswermsg = e.target.value
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }} />
            </div>

            <div className="col-sm-6 marginspace">
              <label>Failure Message </label>
              <input type={'text'} className={'form-control'} placeholder={'Enter Failure answer'} style={{ width: '100%' }}
                value={sectionLearning[index_1].content.wrongAnswer}
                onChange={(e) => {
                  sectionLearning[index_1].content.wrongAnswermsg = e.target.value
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }} />
            </div>



            <div className="col-sm-3 marginspace">
              <label>number Of Points </label>
              <input type={'number'} className={'form-control'} placeholder={'Enter Number'} style={{ width: '100%' }}
                value={sectionLearning[index_1].content.numberOfPoints}
                onChange={(e) => {
                  sectionLearning[index_1].content.numberOfPoints = e.target.value
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }} />
            </div>

            <div className="col-sm-3 marginspace">
              <label>Add Learning Point  </label>
              <input type={'number'} className={'form-control'} placeholder={'Enter Number'} style={{ width: '100%' }}
                value={sectionLearning[index_1].content.learningPoint}
                onChange={(e) => {
                  sectionLearning[index_1].content.learningPoint = e.target.value
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }} />
            </div>

          </div>

        </React.Fragment>)
      }

    }

    if (themeType === "StoryCard") {
      return (<div style={{ width: '100%' }}>{arrayvalue}</div>)
    }
    else {
      return (<div>{arrayvalue}</div>)
    }
  }
}


export default ModuleCircleWithInfoAnimations
