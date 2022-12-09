import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
class EditorContent_2 extends React.Component {

  constructor(props) {
    super(props);
    let editorState = '';
    if (JSON.stringify(this.props.text)) {
      let { contentBlocks, entityMap } = htmlToDraft(this.props.text);
      let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      editorState = EditorState.createWithContent(contentState);
    }
    this.state = {
      editorState: editorState ? editorState : EditorState.createEmpty(),
      editView: false
    }
  }

  onEditorStateChange = (editorState) => {
    let { sectionLearning, index, themeType, failure_header_1, failure_body_1, failure_button_1, failure_header_2
      , failure_body_2, failure_button_2, success_header_1, success_body_1, success_button_1,
      success_body_2, success_header_2, success_button_2, secondindex, sectionBuildStory } = this.props

    let editorContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    if (themeType === "DropToSelection") {
      if (failure_header_1) {
        sectionLearning[index].content.message.failure_header_1 = draftToHtml(editorContent)
      }
      else if (failure_body_1) {
        sectionLearning[index].content.message.failure_body_1 = draftToHtml(editorContent)
      }
      else if (failure_button_1) {
        sectionLearning[index].content.message.failure_button_1 = draftToHtml(editorContent)
      }
      else if (failure_header_2) {
        sectionLearning[index].content.message.failure_header_2 = draftToHtml(editorContent)
      }
      else if (failure_body_2) {
        sectionLearning[index].content.message.failure_body_2 = draftToHtml(editorContent)
      }
      else if (failure_button_2) {
        sectionLearning[index].content.message.failure_button_2 = draftToHtml(editorContent)
      }
      else if (success_header_1) {
        sectionLearning[index].content.message.success_header_1 = draftToHtml(editorContent)
      }
      else if (success_body_1) {
        sectionLearning[index].content.message.success_body_1 = draftToHtml(editorContent)
      }
      else if (success_button_1) {
        sectionLearning[index].content.message.success_button_1 = draftToHtml(editorContent)
      }
      else if (success_header_2) {
        sectionLearning[index].content.message.success_header_2 = draftToHtml(editorContent)
      }
      else if (success_body_2) {
        sectionLearning[index].content.message.success_body_2 = draftToHtml(editorContent)
      }
      else if (success_button_2) {
        sectionLearning[index].content.message.success_button_2 = draftToHtml(editorContent)
      }

    }
    else if (themeType === "StoryDropToSelection") {
      if (failure_header_1) {
        sectionBuildStory[index].content[secondindex].content.message.failure_header_1 = draftToHtml(editorContent)
      }
      else if (failure_body_1) {
        sectionBuildStory[index].content[secondindex].content.message.failure_body_1 = draftToHtml(editorContent)
      }
      else if (failure_button_1) {
        sectionBuildStory[index].content[secondindex].content.message.failure_button_1 = draftToHtml(editorContent)
      }
      else if (failure_header_2) {
        sectionBuildStory[index].content[secondindex].content.message.failure_header_2 = draftToHtml(editorContent)
      }
      else if (failure_body_2) {
        sectionBuildStory[index].content[secondindex].content.message.failure_body_2 = draftToHtml(editorContent)
      }
      else if (failure_button_2) {
        sectionBuildStory[index].content[secondindex].content.message.failure_button_2 = draftToHtml(editorContent)
      }
      else if (success_header_1) {
        sectionBuildStory[index].content[secondindex].content.message.success_header_1 = draftToHtml(editorContent)
      }
      else if (success_body_1) {
        sectionBuildStory[index].content[secondindex].content.message.success_body_1 = draftToHtml(editorContent)
      }
      else if (success_button_1) {
        sectionBuildStory[index].content[secondindex].content.message.success_button_1 = draftToHtml(editorContent)
      }
      else if (success_header_2) {
        sectionBuildStory[index].content[secondindex].content.message.success_header_2 = draftToHtml(editorContent)
      }
      else if (success_body_2) {
        sectionBuildStory[index].content[secondindex].content.message.success_body_2 = draftToHtml(editorContent)
      }
      else if (success_button_2) {
        sectionBuildStory[index].content[secondindex].content.message.success_button_2 = draftToHtml(editorContent)
      }
    }


    if (typeof this.props.textOnchange !== "undefined") {
      this.props.textOnchange(editorContent)
    }

    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState, editView } = this.state;
    return editView ? <div style={{ border: "1px solid" }}>
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

export default EditorContent_2
