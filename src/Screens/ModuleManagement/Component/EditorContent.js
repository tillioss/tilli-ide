import React from 'react';
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
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.text !== prevProps.text) {

    }
    let checkNumberIsTrue = !isNaN(parseFloat(this.props.layerActive)) && isFinite(this.props.layerActive)
    if (checkNumberIsTrue && this.props.layerActive !== prevProps.layerActive) {
      let editorState = '';
      if (JSON.stringify(this.props.text)) {
        let { contentBlocks, entityMap } = htmlToDraft(this.props.text);
        let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        editorState = EditorState.createWithContent(contentState);
      }
      this.setState({
        editorState: editorState ? editorState : EditorState.createEmpty(),
      })
    }
  }
  onEditorStateChange = (editorState) => {
    let editorContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (typeof this.props.textOnchange !== "undefined") {
      this.props.textOnchange(editorContent)
    }

    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return <div style={{ border: "1px solid #ddd" }}>
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
    </div>
  }
}

export default EditorContent
