import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
class EditorContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      editView: false
    }
  }

  componentDidMount() {
    let editorState = '';
    if (JSON.stringify(this.props.text)) {
      let { contentBlocks, entityMap } = htmlToDraft(this.props.text);
      let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      editorState = EditorState.createWithContent(contentState);
    }
    this.setState({
      editorState: editorState ? editorState : EditorState.createEmpty(),
      editView: false
    })
  }

  componentDidUpdate(prevProps) {
    // if (this.props.text !== prevProps.text) {
    //   let editorState = '';
    //   if (JSON.stringify(this.props.text)) {
    //     let { contentBlocks, entityMap } = htmlToDraft(this.props.text);
    //     let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    //     editorState = EditorState.createWithContent(contentState);
    //   }
    //   this.setState({
    //     editorState: editorState ? editorState : EditorState.createEmpty(),
    //   })
    // }
  }
  onEditorStateChange = (editorState) => {
    let { sectionLearning, index, themeType, secondindex, text2, text1, body, question, sectionBuildStory, typeContent
      , says, name, questionTitle, personName, bottomText, content, thirdindex, value } = this.props

    let editorContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    if (themeType == "IntroducePersons") {
      if (says) {
        sectionLearning[index].content.persons[secondindex].says = editorContent
      }
      else if (name) {
        sectionLearning[index].content.persons[secondindex].name = editorContent
      }

    }
    else if (themeType == "AudioQuizScreen") {
      sectionLearning[index].content.feelingsDataList[secondindex].questions = editorContent
    }
    else if (themeType == "ChooseCheckboxQuestions") {
      if (content) {
        sectionLearning[index].content.checkBoxesOption[secondindex].content = editorContent
      }
      else if (questionTitle) {
        sectionLearning[index].content.questionTitle = editorContent
      }

    }
    else if (themeType == "QuestionsList") {
      if (questionTitle) {
        sectionLearning[index].content.questionTitle = editorContent
      }
      else {
        sectionLearning[index].content.questionList[secondindex].question = editorContent
      }

    }
    else if (themeType == "CircleWithInfoAnimations") {
      if (value) {
        sectionLearning[index].content.text[secondindex].value = editorContent
      } else if (name) {
        sectionLearning[index].content.circles[secondindex].name = editorContent
      }
    } else if (themeType == "DropToSelection") {
      if (text1) {
        sectionLearning[index].content.text1 = editorContent
      }
      else if (text2) {
        sectionLearning[index].content.text2 = editorContent
      }
      else if (name) {
        sectionLearning[index].content.circles[secondindex].name = editorContent
      }

    } else if (themeType == "MeetSinglePerson") {
      if (body) {
        sectionLearning[index].content.body = editorContent
      }
      else if (question) {
        sectionLearning[index].content.question = editorContent
      }
      else if (personName) {
        sectionLearning[index].content.personName = editorContent
      }
      else if (bottomText) {
        sectionLearning[index].content.bottomText = editorContent
      }
    } else if (themeType == "StoryMeetSinglePerson") {
      if (body) {
        sectionBuildStory[index].content[secondindex].content.body = editorContent
      }
      else if (question) {
        sectionBuildStory[index].content[secondindex].content.question = editorContent
      }
      else if (personName) {
        sectionBuildStory[index].content[secondindex].content.personName = editorContent
      }
      else if (bottomText) {
        sectionBuildStory[index].content[secondindex].content.bottomText = editorContent
      }
    } else if (themeType == "StoryAudioQuizScreen") {
      sectionBuildStory[index].content[secondindex].content.feelingsDataList[thirdindex].questions = editorContent
    } else if (themeType == "StoryDropToSelection") {
      if (text1) {
        sectionBuildStory[index].content[secondindex].content.text1 = editorContent
      }
      else if (text2) {
        sectionBuildStory[index].content[secondindex].content.text2 = editorContent
      }
      else if (name) {
        sectionBuildStory[index].content[secondindex].content.circles[thirdindex].name = editorContent
      }
    } else if (themeType == "TitleText") {
      if (typeContent == "StoryThemeTitle") {
        sectionBuildStory[index].content[secondindex].title = editorContent
      }
      else {
        sectionLearning[index].title = editorContent
      }
    }
    else if (themeType == "SingleTextImagePage") {
      sectionLearning[index].content.bottomtext = editorContent
    } else if (themeType == "Ask Gender" || themeType == "Ask Age") {
      this.props.textOnchange(editorContent)
    } else {
      sectionLearning[index].content.text = editorContent
    }

    
    if(typeof this.props.textOnchange !== "undefined") {
      this.props.textOnchange(editorContent)
    }

    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState, editView } = this.state;
    return editView ? <div style={{ border: "1px solid #ddd" }}>
      <Editor
        editorState={editorState}
        wrapperClassName="wrapper-className"
        editorClassName="editor-className editor-border"
        toolbarClassName="toolbar-className"
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'colorPicker', 'textAlign'],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['bold', 'italic', 'underline'],
          },
          fontFamily: {
            options: ['montserrat-medium', 'montserrat-extrabold', 'schoolbell-regular', 'montserrat-regular'],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 36, 48, 60, 72, 96],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          colorPicker: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            colors: ['rgb(71,74,87)', 'rgb(227,91,119)', 'rgb(255,251,239)', 'rgb(107,200,174)'],
          },
          textAlign: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['left', 'center', 'right', 'justify']
          },
        }}
        value={editorState}
      />
      <div className="text-right" style={{ borderTop: "1px solid #ddd" }}>
        <button className="btn btn-sm btn-secondary m-2" onClick={() => {
          this.setState({
            editView: false
          })
        }}>Close</button>
      </div>
    </div> : (this.props.text === "" ? <button className="btn btn-sm btn-success"
      onClick={() =>
        this.setState({
          editView: true
        })
      }>Edit</button> : <div onClick={() =>
        this.setState({
          editView: true
        })
      } style={{ cursor: "pointer" }}>
      <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} ></div>
    </div>)
  }
}

export default EditorContent
