import React from "react";
import EditorContent from "../EditorContent";
import ClassNameSelect from "./Component/ClassNameSelect";

class ChooseCheckboxQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sectionLearning, index_1, editable } = this.props;

    let arrayvalue = [];
    arrayvalue.push(
      <React.Fragment>
        <div className="form-group">
          <label>Box Color</label>
          <div className="">
            <input
              type={"color"}
              disabled={editable === "false" ? true : false}
              className={"form-control"}
              placeholder={"Box"}
              style={{ width: "100%" }}
              value={sectionLearning[index_1].content.colors.box}
              onChange={(e) => {
                sectionLearning[index_1].content.colors.box = e.target.value;
                this.setState({ sectionLearning });
                this.props.setValue(sectionLearning);
              }}
            />
          </div>

          <div className="form-group mt-2">
            <label>Checked Color</label>
            <input
              type={"color"}
              disabled={editable === "false" ? true : false}
              className={"form-control"}
              placeholder={"Checked"}
              style={{ width: "100%" }}
              value={sectionLearning[index_1].content.colors.checked}
              onChange={(e) => {
                sectionLearning[index_1].content.colors.checked =
                  e.target.value;
                this.setState({ sectionLearning });
                this.props.setValue(sectionLearning);
              }}
            />
          </div>

          <div className="form-group mt-2">
            <label>Text Color</label>
            <input
              type={"color"}
              disabled={editable === "false" ? true : false}
              className={"form-control"}
              placeholder={"Text"}
              style={{ width: "100%" }}
              value={sectionLearning[index_1].content.colors.text}
              onChange={(e) => {
                sectionLearning[index_1].content.colors.text = e.target.value;
                this.setState({ sectionLearning });
                this.props.setValue(sectionLearning);
              }}
            />
          </div>

          <div className="form-group mt-2">
            <label>Unchecked Color</label>
            <input
              type={"color"}
              disabled={editable === "false" ? true : false}
              className={"form-control"}
              placeholder={"UnChecked"}
              style={{ width: "100%" }}
              value={sectionLearning[index_1].content.colors.unChecked}
              onChange={(e) => {
                sectionLearning[index_1].content.colors.unChecked =
                  e.target.value;
                this.setState({ sectionLearning });
                this.props.setValue(sectionLearning);
              }}
            />
          </div>
        </div>
      </React.Fragment>
    );

    arrayvalue.push(
      <React.Fragment>
        <div className="form-group mt-3">
          <label>Question Title</label>
          <div>
            <EditorContent
              text={sectionLearning[index_1].content.questionTitle}
              themeType={"ChooseCheckboxQuestions"}
              questionTitle={true}
              index={index_1}
              sectionLearning={sectionLearning}
              textOnchange={(value) => {
                sectionLearning[index_1].content.questionTitle = value;
                this.props.setValue(sectionLearning);
              }}
            />

            <span
              style={{
                color: "red",
                fontSize: 12,
                float: "inherit",
                marginTop: 10,
              }}
            >
              {sectionLearning[index_1].content.error_questionTitle}
            </span>
          </div>
        </div>
        <div className="form-group mt-2">
          <label>Class Name </label>
          <div>
            <ClassNameSelect
              value={sectionLearning[index_1].content.nameClassName}
              onChange={(e) => {
                sectionLearning[index_1].content.nameClassName = e;
                this.setState({ sectionLearning });
                this.props.setValue(sectionLearning);
              }}
            />
          </div>
        </div>
      </React.Fragment>
    );

    arrayvalue.push(
      <div className="row mt-5">
        <div className="col-sm-8">
          <h6>Boxes Option</h6>{" "}
        </div>
        <div className="col-sm-4">
          {editable !== "false" ? (
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => {
                const { LevelStage, sectionLearning } = this.props;
                sectionLearning[index_1].content.checkBoxesOption.push("");
                this.props.setValue(sectionLearning);
                this.setState({ LevelStage });
              }}
            >
              Add Check box
            </button>
          ) : null}
        </div>
      </div>
    );

    sectionLearning[index_1].content.checkBoxesOption.map((ival, index) => {
      arrayvalue.push(
        <div className="mt-2" style={{ background: "#eee", padding: 10 }}>
          <div className="form-group">
            <label>Text </label>
            <EditorContent
              text={
                sectionLearning[index_1].content.checkBoxesOption[index].content
              }
              themeType={"ChooseCheckboxQuestions"}
              content={true}
              index={index_1}
              secondindex={index}
              sectionLearning={sectionLearning}
              textOnchange={(value) => {
                sectionLearning[index_1].content.checkBoxesOption[
                  index
                ].content = value;
                this.props.setValue(sectionLearning);
              }}
            />

            <span
              style={{
                color: "red",
                fontSize: 12,
                float: "inherit",
                marginTop: 10,
              }}
            >
              {ival.error_content}
            </span>
          </div>

          <div className="form-group">
            <label>Class Name </label>

            <ClassNameSelect
              value={sectionLearning[index_1].content.nameClassName}
              onChange={(e) => {
                sectionLearning[index_1].content.checkBoxesOption[
                  index
                ].nameClassName = e;
                this.setState({ sectionLearning });
                this.props.setValue(sectionLearning);
              }}
            />
            <span
              style={{
                color: "red",
                fontSize: 12,
                float: "inherit",
                marginTop: 10,
              }}
            >
              {ival.error_bgcolor}
            </span>
          </div>

          <div className="form-group">
            <label>Background color</label>
            <input
              type={"color"}
              disabled={editable === "false" ? true : false}
              className={"form-control"}
              placeholder={"Bg color"}
              style={{ width: "100%" }}
              value={ival.bgcolor}
              onChange={(e) => {
                if (editable !== "false") {
                  sectionLearning[index_1].content.checkBoxesOption[
                    index
                  ].bgcolor = e.target.value;
                  this.setState({ sectionLearning });
                  this.props.setValue(sectionLearning);
                }
              }}
            />
            <span
              style={{
                color: "red",
                fontSize: 12,
                float: "inherit",
                marginTop: 10,
              }}
            >
              {ival.error_bgcolor}
            </span>
          </div>
          <div className="text-center">
            {editable !== "false" && (
              <button
                onClick={() => {
                  delete sectionLearning[index_1].content.checkBoxesOption[
                    index
                  ];
                  this.setState({ sectionLearning });
                  this.props.setValue(sectionLearning);
                }}
                className="btn btn-danger"
              >
                <i className="fa fa-close"></i>Delete
              </button>
            )}
          </div>
        </div>
      );
      return true;
    });

    return <React.Fragment> {arrayvalue} </React.Fragment>;
  }
}

export default ChooseCheckboxQuestions;
