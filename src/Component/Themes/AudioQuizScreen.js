import React from 'react';
import CloseImage from "../../../src/images/close.png";


class AudioQuizScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

  }
  render() {

    const { LevelStage, found_index, Contentdata, index_1, editable } = this.props;
    let arrayvalue = [];


    if (LevelStage[found_index].theme === "StoryCard") {



      arrayvalue.push(
        <React.Fragment>
          <div className="row item form-group" style={{ width: "100%" }}>
            <div className="col-sm-2 text-ali-left"> Title </div>
            <div className="col-sm-6">
              <input type={'text'} className={'form-control'} value={Contentdata[index_1].content[1].title} placeholder={'Enter Title'} style={{ width: '100%' }}
                onChange={(e) => {
                  Contentdata[index_1].content[1].title = e.target.value;
                  this.setState({ Contentdata })
                }} />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}></span>
            </div>
            <div className="col-sm-4"> </div>

          </div>
        </React.Fragment>
      )


      arrayvalue.push(
        <React.Fragment>
          <div className="col-sm-3" style={{ marginTop: 15, marginBottom: 10 }}> <h4> Add Question</h4> </div>
          <div className="col-sm-5"> </div>
          <div className="col-sm-3" style={{ marginTop: 10, marginBottom: 10 }}>
            <button type="button" class="btn btn-success " onClick={() => {

              if (editable !== "false") {
                Contentdata[index_1].content[1].content.feelingsDataList.push({ questions: '', results: [] })
                this.setState({ Contentdata })
              }


            }} >Add questions</button>
          </div>
          <div className="col-sm-1"> </div>
        </React.Fragment>
      )


      Contentdata[index_1].content[1].content.feelingsDataList.map((ival, index) => {
        arrayvalue.push(
          <React.Fragment>
            <div className="row form-group" style={{ width: '100%' }}>
              <div className="col-sm-2 marginspace"></div>
              <div className="col-sm-8 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'Question'} style={{ width: '100%' }}
                  value={ival.questions}
                  onChange={(e) => {
                    Contentdata[index_1].content[1].content.feelingsDataList[index].questions = e.target.value;
                    this.setState({ Contentdata })

                  }} />
                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{ival.questions_error}</span>
              </div>
              <div className="col-sm-2 marginspace" onClick={() => {


                if (editable !== "false") {
                  delete Contentdata[index_1].content[1].content.feelingsDataList[index]

                  let remove_undef = Contentdata[index_1].content[1].content.feelingsDataList.filter(function (element) {
                    return element !== null;
                  });
                  Contentdata[index_1].content[1].content.feelingsDataList = remove_undef


                  this.setState({ Contentdata })
                }
              }}>
                <img src={CloseImage} style={{ width: 30, height: 30 }} alt="loading" />

              </div>
            </div>

          </React.Fragment>
        )
        return true
      })


    }
    else {

      arrayvalue.push(
        <React.Fragment>
          <div className="col-sm-3" style={{ marginTop: 15, marginBottom: 10 }}> <h4> Add Question</h4> </div>
          <div className="col-sm-5"> </div>
          <div className="col-sm-3" style={{ marginTop: 10, marginBottom: 10 }}>
            {editable !== "false" ? <button type="button" class="btn btn-success " onClick={() => {
              Contentdata[index_1].content.feelingsDataList.push({ questions: '', results: [] })
              this.setState({ LevelStage, Contentdata })
            }} >Add questions</button> : null}

          </div>
          <div className="col-sm-1"> </div>
        </React.Fragment>
      )

      Contentdata[index_1].content.feelingsDataList.map((ival, index) => {
        arrayvalue.push(
          <React.Fragment>
            <div className="row form-group" style={{ width: '100%' }}>
              <div className="col-sm-2 marginspace"></div>
              <div className="col-sm-8 marginspace">
                <input type={'text'} className={'form-control'} placeholder={'Question'} style={{ width: '100%' }} value={ival.questions}
                  onChange={(e) => {
                    Contentdata[index_1].content.feelingsDataList[index].questions = e.target.value;
                    this.setState({ LevelStage, Contentdata })

                  }} />
                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{Contentdata[index_1].content.feelingsDataList[index].questions_error}</span>
              </div>
              <div className="col-sm-2 marginspace" onClick={() => {

                if (editable !== "false") {
                  delete Contentdata[index_1].content.feelingsDataList[index]
                  this.setState({ LevelStage, Contentdata })
                }
              }}>


                {editable !== "false" ? <img src={CloseImage} style={{ width: 30, height: 30 }} alt="loading" /> : null}


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


export default AudioQuizScreen