import React from 'react';
import { doConnect } from '../config/Common';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MachingLearning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
      emotionText: "",
      feedBackText: "",
      errors: {},
      getResponse: {},
      showRest: false,
      apiKeyText: "",
    }
  }


  async submitData() {
    let { feedBackText, emotionText, apiKeyText } = this.state
    let validText = false;
    let errors = {};
    if (feedBackText === "") {
      validText = true;
      errors.emotion = "Please enter text"
    } else {
      delete validText.emotion
    }
    if (emotionText === "") {
      validText = true;
      errors.feedback = "Please enter text"
    } else {
      delete errors.feedback
    }

    if (apiKeyText === "") {
      validText = true;
      errors.apiKeyText = "Please enter text"
    } else {
      delete errors.apiKeyText
    }

    if (!validText) {
      errors = {};
    }
    this.setState({ errors })

    if (Object.keys(errors).length === 0) {
      let postJson = { 'emotion': emotionText, 'feedback': feedBackText, apiKey: apiKeyText }
      console.log("postData ", postJson)
      let getResponse = await doConnect("predict", "POST", postJson)
      if (getResponse) {
        toast.success('Date submited!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        console.log("getResponse", getResponse)
        this.setState({
          getResponse, showRest: true
        })
      }

    }

  }

  render() {

    let { feedBackText, emotionText, errors, getResponse, showRest, apiKeyText } = this.state


    return (
      <React.Fragment>
        <div className="main-content">
          <div className="right_col" role="main">
            <div className="">
              <div className="clearfix"></div>
              {/* <!--content --> */}

              <div className="row">
                <div className="col-md-12 col-sm-12  ">
                  <div className="x_panel">
                    <div className="x_title">
                      <h2>Machine Learning Demo</h2>
                      <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                      <ToastContainer />
                      <div className='row'>
                        <div className="col-2" />
                        <div className="col-6">
                          <div className="form-group">
                            <label>Emotion</label>
                            <textarea type={'text'} placeholder={'Enter Emotion'} rows="4" cols="20" className={'form-control predict-placeholder'}
                              value={emotionText} onChange={(e) => {
                                this.setState({ emotionText: e.target.value.toLowerCase() })
                              }} />
                            <span style={{ color: 'red', fontSize: 12, float: "inherit", marginTop: 5 }}> {errors.emotion} </span>
                          </div>
                        </div>
                      </div>

                      <div className='row pt-3'>
                        <div className="col-2" />
                        <div className="col-6">
                          <div className="form-group">
                            <label>Feedback</label>
                            <textarea type={'text'} placeholder={'Enter Feedback'} rows="4" cols="20" className={'form-control predict-placeholder'}
                              value={feedBackText} onChange={(e) => {
                                this.setState({ feedBackText: e.target.value.toLowerCase() })
                              }} />
                            <span style={{ color: 'red', fontSize: 12, float: "inherit", marginTop: 5 }}> {errors.feedback} </span>
                          </div>
                        </div>
                      </div>

                      <div className='row pt-3'>
                        <div className="col-2" />
                        <div className="col-6">
                          <div className="form-group">
                            <label>Api key</label>
                            <textarea type={'text'} placeholder={'Enter api key'} rows="4" cols="20" className={'form-control predict-placeholder'}
                              value={apiKeyText} onChange={(e) => {
                                this.setState({ apiKeyText: e.target.value })
                              }} />
                            <span style={{ color: 'red', fontSize: 12, float: "inherit", marginTop: 5 }}> {errors.apiKeyText} </span>
                          </div>
                        </div>
                      </div>

                      <div className='row pt-3'>
                        <div className="col-3" />
                        <div className="col-3">
                          <button type="button" className={'btn btn-success '} onClick={() => {
                            this.submitData()
                          }}>Submit
                          </button>
                        </div>
                        <div className="col-3">
                          {
                            showRest && <button type="button" className={'btn btn-danger '} onClick={() => {
                              this.setState({
                                emotionText: "",
                                feedBackText: "",
                                errors: {},
                                getResponse: {}, showRest: false, apiKeyText: ""
                              })
                            }}>Reset
                            </button>
                          }
                        </div>
                        <div className="col-3"></div>
                      </div>

                      <div className='row pt-4'>
                        <div className="col-2" />
                        <div className="col-6">
                          {getResponse && Object.keys(getResponse).length > 0 && <div className='mt-2 mb-2'>
                            {JSON.stringify(getResponse)}
                          </div>}
                        </div>
                        <div className="col-2" />
                      </div>


                    </div>
                  </div>
                </div>
              </div>

              {/* <!--content --> */}

            </div>
          </div>
        </div>
      </React.Fragment>

    );

  }

}

export default MachingLearning;
