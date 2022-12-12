import React from 'react';
import DropDown from "../../Component/DropDown";
import EditorContent from "../EditorContent"
import ModelView from '../ModelView';
import ClassNameSelect from './Component/ClassNameSelect';



class ModuleMeetSinglePerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  render() {

    const { index_1, sectionLearning, option, editable, themeType, loopIndex, sectionBuildStory, staticIndex } = this.props
    let arrayvalue = []
    if (themeType === "StoryCard") {
      arrayvalue.push(
        <React.Fragment>
          <div className="form-group">
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


      let appendData = ""

      if (sectionBuildStory[loopIndex].content[staticIndex].content.chooseType && sectionBuildStory[loopIndex].content[staticIndex].content.chooseType.label !== "Video") {

        appendData = <>
          <div className="form-group">
            <label> Image </label>
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
              isDisabled={editable === "false" ? true : false}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.image_error}</span>
          </div>



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

          <div className="form-group">
            <label>Bottom Text </label>
            <EditorContent
              text={sectionBuildStory[loopIndex].content[staticIndex].content.bottomText}
              themeType={"StoryMeetSinglePerson"}
              bottomText={true}
              index={loopIndex}
              secondindex={staticIndex}
              sectionBuildStory={sectionBuildStory}
              textOnchange={(value) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.bottomText = value
                this.props.setValue(sectionBuildStory);
              }}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.bottomText_error}</span>
          </div>


          <div className="form-group">
            <label for="text">Bottom Class Name</label>

            <ClassNameSelect
              value={sectionBuildStory[loopIndex].content[staticIndex].content.bottomclassName}
              onChange={e => {
                sectionBuildStory[loopIndex].content[staticIndex].content.bottomclassName = e;
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }}
            />
          </div>


          <div className="form-group">
            <label> Content Body   </label>

            <span style={{ float: "right" }} onClick={() => { this.setState({ update: true }) }}>
              <ModelView uniqueId={staticIndex + loopIndex}
                viewCode={sectionBuildStory[loopIndex].content[staticIndex].content.body}
                modelTextChange={(textValue) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.body = textValue
                  this.setState({ sectionBuildStory })
                }}
              />
            </span>


            <EditorContent
              text={sectionBuildStory[loopIndex].content[staticIndex].content.body}
              themeType={"StoryMeetSinglePerson"}
              body={true}
              index={loopIndex}
              secondindex={staticIndex}
              sectionBuildStory={sectionBuildStory}
              textOnchange={(value) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.body = value
                this.props.setValue(sectionBuildStory);
              }}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.body_error}</span>
          </div>


          <div className="form-group">
            <label for="text">Body Class Name</label>

            <ClassNameSelect
              value={sectionBuildStory[loopIndex].content[staticIndex].content.bodyclassname}
              onChange={e => {
                sectionBuildStory[loopIndex].content[staticIndex].content.bodyclassname = e;
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }}
            />
          </div>


          <div className="form-group">
            <label> Content question </label>

            <span style={{ float: "right" }} onClick={() => {
              this.setState({ update: true })
            }}>
              <ModelView uniqueId={staticIndex + "Q" + loopIndex}
                viewCode={sectionBuildStory[loopIndex].content[staticIndex].content.question}
                modelTextChange={(textValue) => {
                  sectionBuildStory[loopIndex].content[staticIndex].content.question = textValue
                  this.setState({ sectionBuildStory })
                  this.props.setValue(sectionBuildStory);
                }}
              />
            </span>

            <EditorContent
              text={sectionBuildStory[loopIndex].content[staticIndex].content.question}
              themeType={"StoryMeetSinglePerson"}
              question={true}
              index={loopIndex}
              secondindex={staticIndex}
              sectionBuildStory={sectionBuildStory}
              textOnchange={(value) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.question = value
                this.props.setValue(sectionBuildStory);
              }}
            />


            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.question_error}</span>
          </div>


          <div className="form-group">
            <label for="text">Question Class Name</label>

            <ClassNameSelect
              value={sectionBuildStory[loopIndex].content[staticIndex].content.questionclassname}
              onChange={e => {
                sectionBuildStory[loopIndex].content[staticIndex].content.questionclassname = e;
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }}
            />
          </div>

        </>
      }

      else {

        appendData = <>



          <div className="form-group">
            <label> Video </label>
            <DropDown
              selectedOption={sectionBuildStory[loopIndex].content[staticIndex].content.video ?
                sectionBuildStory[loopIndex].content[staticIndex].content.video
                :
                { label: 'Select', value: 'Select' }}
              onChange={(e) => {
                sectionBuildStory[loopIndex].content[staticIndex].content.video = e
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }}
              options={[]}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.question_error}</span>
          </div>

        </>

      }

      arrayvalue.push(<React.Fragment>

        <div className="form-group" >
          <label> Background color</label>
          <input type={'color'} disabled={editable === "false" ? true : false} className={'form-control'} placeholder={'Bgcolor1'} style={{ width: '100%' }}
            value={sectionBuildStory[loopIndex].content[staticIndex].content.color_1}
            onChange={(e) => {
              if (editable !== "false") {
                sectionBuildStory[loopIndex].content[staticIndex].content.color_1 = e.target.value
                this.setState({ sectionBuildStory })
                this.props.setValue(sectionBuildStory);
              }
            }} />
          <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.color_1_error}</span>
        </div>
        <div className="form-group">
          <label> Background color 2</label>
          <input type={'color'} disabled={editable === "false" ? true : false} className={'form-control'} placeholder={'Bgcolor2'} style={{ width: '100%' }}
            value={sectionBuildStory[loopIndex].content[staticIndex].content.color_2}
            onChange={(e) => {
              if (editable !== "false") {
                sectionBuildStory[loopIndex].content[staticIndex].content.color_2 = e.target.value
                this.setState({ sectionLearning })
                this.props.setValue(sectionBuildStory);
              }
            }} />
          <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.color_2_error}</span>
        </div>

        <div className="form-group">
          <label> Person Name</label>
          <EditorContent
            text={sectionBuildStory[loopIndex].content[staticIndex].content.personName}
            themeType={"StoryMeetSinglePerson"}
            personName={true}
            index={loopIndex}
            secondindex={staticIndex}
            sectionBuildStory={sectionBuildStory}
            textOnchange={(value) => {
              sectionBuildStory[loopIndex].content[staticIndex].content.personName = value
              this.props.setValue(sectionBuildStory);
            }}
          />

          <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.personName_error}</span>
        </div>


        <div className="form-group">
          <label for="text">Person Class Name</label>

          <ClassNameSelect
            value={sectionBuildStory[loopIndex].content[staticIndex].content.personclassname}
            onChange={e => {
              sectionBuildStory[loopIndex].content[staticIndex].content.personclassname = e;
              this.setState({ sectionBuildStory })
              this.props.setValue(sectionBuildStory);
            }}
          />
        </div>

        <div className="form-group">
          <label> Select Type</label>
          <DropDown
            selectedOption={sectionBuildStory[loopIndex].content[staticIndex].content.chooseType ?
              sectionBuildStory[loopIndex].content[staticIndex].content.chooseType
              :
              { label: 'Select', value: 'Select' }}
            onChange={(e) => {
              sectionBuildStory[loopIndex].content[staticIndex].content.chooseType = e
              this.setState({ sectionBuildStory })
              this.props.setValue(sectionBuildStory);
            }}
            options={[{ label: 'Image', value: 'Image' }, { label: 'Video', value: 'Video' }]}
            isDisabled={editable === "false" ? true : false}
          />

          <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[loopIndex].content[staticIndex].content.question_error}</span>
        </div>
        {appendData}
      </React.Fragment>)
    }
    else {



      let appendData = ""

      if (sectionLearning[index_1].content.chooseType && sectionLearning[index_1].content.chooseType.label !== "Video") {

        appendData = <>
          <div className="col-sm-4">
            <label> Image </label>
            <DropDown
              selectedOption={sectionLearning[index_1].content.image ?
                { label: sectionLearning[index_1].content.image.title, value: sectionLearning[index_1].content.image.title }
                :
                { label: 'Select', value: 'Select' }}
              onChange={(e) => {
                sectionLearning[index_1].content.image = e.json
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
              options={option}
              isDisabled={editable === "false" ? true : false}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.image_error}</span>
          </div>

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




          <div className="col-sm-4">
            <label> Bottom Text </label>


            <EditorContent
              text={sectionLearning[index_1].content.bottomText}
              themeType={"MeetSinglePerson"}
              bottomText={true}
              index={index_1}
              sectionLearning={sectionLearning}
              textOnchange={(value) => {
                sectionLearning[index_1].content.bottomText = value
                this.props.setValue(sectionLearning);
              }}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.bottomText_error}</span>
          </div>


          <div className="col-sm-3 topalign">
            <label for="text">Bottom Class Name</label>

            <ClassNameSelect
              value={sectionLearning[index_1].content.bottomclassName}
              onChange={e => {
                sectionLearning[index_1].content.bottomclassName = e;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
            />
          </div>




          <div className="col-sm-4 ">
            <label> Content Body  </label>


            <EditorContent text={sectionLearning[index_1].content.body}
              themeType={"MeetSinglePerson"} body={true}
              index={index_1} sectionLearning={sectionLearning} />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.body_error}</span>
          </div>



          <div className="col-sm-3 topalign">
            <label for="text">Body Class Name</label>

            <ClassNameSelect
              value={sectionLearning[index_1].content.bodyclassname}
              onChange={e => {
                sectionLearning[index_1].content.bodyclassname = e;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
            />
          </div>

          <div className="col-sm-4 ">
            <label> Content question</label>


            <EditorContent
              text={sectionLearning[index_1].content.question}
              themeType={"MeetSinglePerson"}
              question={true}
              index={index_1}
              sectionLearning={sectionLearning}
              textOnchange={(value) => {
                sectionLearning[index_1].content.question = value
                this.props.setValue(sectionLearning);
              }}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.question_error}</span>
          </div>

          <div className="col-sm-3 topalign">
            <label for="text">Question Class Name</label>

            <ClassNameSelect
              value={sectionLearning[index_1].content.questionclassname}
              onChange={e => {
                sectionLearning[index_1].content.questionclassname = e;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
            />
          </div>


        </>
      }

      else {
        appendData = <>
          <div className="col-sm-4">
            <label> Video </label>
            <DropDown
              selectedOption={sectionLearning[index_1].content.video ?
                sectionLearning[index_1].content.video
                :
                { label: 'Select', value: 'Select' }}
              onChange={(e) => {
                sectionLearning[index_1].content.video = e
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
              options={[]}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.question_error}</span>
          </div>

        </>

      }





      arrayvalue.push(<React.Fragment>
        <div className="row form-group" style={{ width: '100%' }}>

          <div className="col-sm-4">
            <label> Background color</label>
            <input type={'text'} disabled={editable === "false" ? true : false} className={'form-control'} placeholder={'Bgcolor1'} style={{ width: '100%' }}
              value={sectionLearning[index_1].content.color_1}
              onChange={(e) => {
                if (editable !== "false") {
                  sectionLearning[index_1].content.color_1 = e.target.value
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.color_1_error}</span>
          </div>

          <div className="col-sm-4">
            <label> Background color 2</label>
            <input type={'text'} disabled={editable === "false" ? true : false} className={'form-control'} placeholder={'Bgcolor2'} style={{ width: '100%' }}
              value={sectionLearning[index_1].content.color_2}
              onChange={(e) => {
                if (editable !== "false") {
                  sectionLearning[index_1].content.color_2 = e.target.value
                  this.setState({ sectionLearning })
                  this.props.setValue(sectionLearning);
                }
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.color_2_error}</span>
          </div>

          <div className="col-sm-4">
            <label> Person Name</label>
            <EditorContent
              text={sectionLearning[index_1].content.personName}
              themeType={"MeetSinglePerson"}
              personName={true}
              index={index_1}
              sectionLearning={sectionLearning}
              textOnchange={(value) => {
                sectionLearning[index_1].content.personName = value
                this.props.setValue(sectionLearning);
              }}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.personName_error}</span>
          </div>


          <div className="col-sm-3 topalign">
            <label for="text">Person Class Name</label>

            <ClassNameSelect
              value={sectionLearning[index_1].content.personclassname}
              onChange={e => {
                sectionLearning[index_1].content.personclassname = e;
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
            />
          </div>

          <div className="col-sm-4 ">
            <label> Select Type</label>
            <DropDown
              selectedOption={sectionLearning[index_1].content.chooseType ?
                sectionLearning[index_1].content.chooseType
                :
                { label: 'Select', value: 'Select' }}
              onChange={(e) => {
                sectionLearning[index_1].content.chooseType = e
                this.setState({ sectionLearning })
                this.props.setValue(sectionLearning);
              }}
              options={[{ label: 'Image', value: 'Image' }, { label: 'Video', value: 'Video' }]}
              isDisabled={editable === "false" ? true : false}
            />

            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index_1].content.question_error}</span>
          </div>
          {appendData}
        </div>

      </React.Fragment>)

    }

    return (<React.Fragment>
      {/* {JSON.stringify(sectionBuildStory)} */}
      {arrayvalue}</React.Fragment>)
  }

}


export default ModuleMeetSinglePerson