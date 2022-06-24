import React from 'react';
import Card from '../../../Component/Card';
import DropDown from '../../../Component/DropDown';
import drag_drop from '../../../images/drag_drop.png';
import EllipseForm from './Elements/EllipseForm';
import RectangleForm from './Elements/RectangleForm';
import TextForm from './Elements/TextForm';
import ImageForm from './Elements/ImageForm';
import CircleForm from './Elements/CircleForm';
import LableAnimationForm from './Elements/LableAnimationForm';
import VideoForm from './Elements/VideoForm';
import DragAndDropForm from './Elements/DragAndDropForm';
import MyConstant from '../../../config/MyConstant';
import { toast, ToastContainer } from "react-toastify";
import LabelAnimation from './Theme/LabelAnimation';
import DragAndDrop from './Theme/DragAndDrop';
import { doConnect } from '../../../config/Common';

export default class ModuleManagerThemeIDE extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileData: [],
      sectionTab: "learning",
      sectionLearning: [],
      themeIndex: 0,
      sectionBuildStory: [],
      history: [],
      historyRedo: [],
      themeOptions: [],
      deviceHeight: "",
      deviceWidth: "",
    }
    this.setValue = this.setValue.bind(this);
  }
  componentDidMount() {
    let height = this.mobile.clientHeight;
    let width = this.mobile.clientWidth;
    this.setState({
      deviceHeight: height,
      deviceWidth: width,
    }, () => {
      this.getImages();
      this.getThemes();
      this.getLevelMappingData();
    })
  }

  async getLevelMappingData() {
    let levelId = this.props.match.params.levelid;
    const { imageView, sectionLearning, storyThemeSelect } = this.state;
    let postJson = { levelId: levelId, sessionId: '1223' };
    let responseData = await doConnect("getLevelMappingData", "POST", postJson);
    let contentdata = responseData.response;
    if (contentdata) {
      let { sectionLearning, sectionBuildStory } = JSON.parse(contentdata)
      this.setState({
        sectionLearning,
        sectionBuildStory
      }, () => {
        this.historyCapture()
      })

    }

  }
  async getThemes() {
    let postJson = { sessionId: '1223', themeId: '' };
    let responseData = await doConnect("getThemes", "POST", postJson);
        let json = responseData;
        if (Object.keys(json).length > 0 && json['themesMap'] != null && json['themesMap'] != undefined) {
          let themesMap = json['themesMap'];
          let options = []
          let storyOption = []
          Object.keys(themesMap).forEach(value => {
            if (themesMap[value].name != "StoryCard") {
              options.push({ label: themesMap[value].name, value: themesMap[value].name, json: themesMap[value] })
            }
            else {
              storyOption.push({ label: themesMap[value].name, value: themesMap[value].name, json: themesMap[value] })
            }

          })
          this.setState({ themeOptions: options, storyOption })
        }
  }

  async changeTheme(index, e) {
    const { sectionLearning, sectionBuildStory, sectionTab } = this.state;

    if (typeof e.json !== "undefined" && typeof e.json.id !== "undefined") {
      let themeId = e.json.id;
      let postJson = { themeId };
      let responseData = await doConnect("getThemeContent", "POST", postJson);
          let layers = [];
          if (responseData.response !== null) {
            layers = JSON.parse(responseData.response);
          }

          if (sectionTab === "learning") {
            sectionLearning[index].layers = layers;
            sectionLearning[index].theme = e.label;
          } else if (sectionTab === "storyFlow") {
            sectionBuildStory[index].layers = layers;
            sectionBuildStory[index].theme = e.label;
          }

          this.setState({
            sectionLearning,
            sectionBuildStory
          })
    }
  }

  async getImages() {
    let postJson = { fileType: 'image', sessionId: '1223' };
    let responseData = await doConnect("getGameFilesList", "POST", postJson);
    let json = responseData;
    this.setState({ fileData: json.filesMap })
    this.getGifImage()
  }


  async getGifImage() {
    let postJson = { fileType: 'gif', sessionId: '1223' };
    let responseData = await doConnect("getGameFilesList", "POST", postJson);
    
        let json = responseData;
        let data_merge = { ...this.state.fileData, ...json.filesMap }
        this.setState({ fileData: data_merge })
  }

  getImageOption() {
    let imageOptions = [];
    Object.keys(this.state.fileData).map((ival, index) => {
      let image = this.state.fileData[ival];
      imageOptions.push({ value: MyConstant.keyList.apiURL + "vp?action=module&key=" + image.fileName + "&id=" + image.fileType, label: image.title, json: image })
    });
    return imageOptions
  }
  getVideoOption() {
    let imageOptions = [];

    return imageOptions
  }


  buildContent() {
    let { sectionLearning, themeOptions, sectionTab, themeIndex, sectionBuildStory } = this.state;
    let returnContent;

    let buildObj;
    let index = themeIndex;
    if (sectionTab === "learning") {
      buildObj = sectionLearning;
    } else if (sectionTab === "storyFlow") {
      buildObj = sectionBuildStory;
    }

    if (buildObj.length > 0) {
      returnContent = <div className="panel panel-info" style={{ height: 780, overflowY: 'auto' }}>
        <div className="panel-heading">
          <div className="row" style={{ padding: 20, }}>
            <div className="col-sm-1"> Theme </div>
            <div className="col-sm-4">
              <DropDown
                selectedOption={buildObj[index].theme ? { label: buildObj[index].theme, value: buildObj[index].theme }
                  : []}
                onChange={(e) => {
                  this.changeTheme(index, e)
                }}
                options={themeOptions}
              />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{buildObj[index].errorTheme}</span>
            </div>
            <div className="col-sm-2">

            </div>
            <div className="col-sm-5 d-flex">
              <div style={{ fontWeight: "bold", color: "#00008b" }}> Theme {index + 1}</div>
              <div className="pl-2" >
                {index == '0' && buildObj.length - 1 != 0 ?
                  <React.Fragment>
                    <span onClick={() => { this.indexChange(index, "Down") }} >
                      {/* <img src={downArrow} style={{width:30,height:30}}/> */}
                      <i className="fa fa-arrow-down" aria-hidden="true" style={{ fontSize: 25, color: "black", cursor: "pointer", }}></i>
                    </span>
                  </React.Fragment>
                  : buildObj.length - 1 != 0 && buildObj.length - 1 == index ?
                    <React.Fragment>
                      <span onClick={() => { this.indexChange(index, "Up") }}>
                        {/* <img src={upArrow} style={{width:30,height:30}}/>  */}
                        <i className="fa fa-arrow-up" aria-hidden="true" style={{ fontSize: 25, color: "black", cursor: "pointer", }}></i>

                      </span>
                    </React.Fragment>
                    : buildObj.length - 1 != 0 ? <React.Fragment>
                      <span style={{ padding: 4 }} onClick={() => { this.indexChange(index, "Up") }}>
                        {/* <img src={upArrow} style={{width:30,height:30}}/> */}
                        <i className="fa fa-arrow-up" aria-hidden="true" style={{ fontSize: 25, color: "black", cursor: "pointer", }}></i>
                      </span>
                      <span style={{ padding: 4 }} onClick={() => { this.indexChange(index, "Down") }}>
                        {/* <img src={downArrow} style={{width:30,height:30}}/>  */}
                        <i className="fa fa-arrow-down" aria-hidden="true" style={{ fontSize: 25, color: "black", cursor: "pointer", }}></i>
                      </span>
                    </React.Fragment>
                      : null

                }
              </div>
              <div className="pl-2" style={{ cursor: "pointer" }} onClick={(e) => {
                this.removeFunction(index)
              }}>
                <i className="fa fa-close" style={{ fontSize: 20, color: "#FFF", backgroundColor: "#f95a2b", padding: 5, cursor: "pointer" }}></i>
              </div>
              <div className="pl-2" >
                <button className="btn btn-sm btn-success"
                  onClick={() => {
                    this.undo()
                  }}>Undo</button>
                <button className="btn btn-sm btn-secondary"
                  onClick={() => {
                    this.redo()
                  }}>Redo</button>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-body">
          {
            buildObj[index].layers !== undefined && buildObj[index].layers.length > 0 && <div>
              {
                buildObj[index].layers.map((layer, themeIndex) => {
                  return <div className="" key={themeIndex}>
                    {
                      this.buildDesign(buildObj[index].layers, layer, themeIndex)
                    }
                  </div>
                })
              }
            </div>
          }
        </div>
      </div>
    }
    return returnContent;
  }

  setValue(layers) {
    let { sectionLearning, sectionTab, themeIndex } = this.state;
    if (sectionTab === "learning") {
      sectionLearning[themeIndex].layers = layers
    }

    this.setState({
      sectionLearning
    })
  }
  buildDesign(layers, activeLayer, layerActive) {
    let builder;

    let x = 0;
    let y = 0;
    if (layerActive !== "") {
      let layerType = activeLayer.type;
      switch (layerType) {
        case "rectangle":
          builder = <RectangleForm layerActive={layerActive} layers={layers} setValue={this.setValue} />
          break;
        case "labelAnimation":
          builder = <LableAnimationForm layerActive={layerActive} layers={layers} setValue={this.setValue} />
          break;
        case "dragAndDrop":
          builder = <DragAndDropForm layerActive={layerActive} layers={layers} setValue={this.setValue} x={x} y={y} imageOptions={this.getImageOption()} />
          break;
        case "ellipse":
          builder = <EllipseForm layerActive={layerActive} layers={layers} setValue={this.setValue} />
          break;
        case "circle":
          builder = <CircleForm layerActive={layerActive} layers={layers} setValue={this.setValue} />
          break;
        case "text":
          builder = <TextForm layerActive={layerActive} layers={layers} setValue={this.setValue} />
          break;
        case "image":
          builder = <ImageForm layerActive={layerActive} layers={layers} imageOptions={this.getImageOption()} setValue={this.setValue} />
          break;
        case "video":
          builder = <VideoForm layerActive={layerActive} layers={layers} videoOptions={this.getVideoOption()} setValue={this.setValue} />
          break;
      }
    }
    return builder;
  }

  layerBuild(layer, index) {
    let builder;
    let { deviceHeight, layerHover, layerActive, deviceWidth } = this.state;
    switch (layer.type) {
      case "rectangle":
        builder = <div
          onClick={() => this.setActiveLayer(index)}
          className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
          onMouseEnter={() => this.onHoverLayer(index)}
          onMouseLeave={() => this.onLeaveLayer(index)}
          style={{
            position: "absolute",
            top: layer.y + "%",
            left: layer.x + "%",
            width: layer.width + "%",
            height: parseInt((layer.height / 100) * deviceHeight) + "px",
            backgroundColor: layer.backgroundColor,
            borderWidth: layer.borderWidth + "px",
            borderColor: layer.borderColor,
            borderStyle: layer.borderStyle,
            borderRadius: layer.borderRadius + "px",
          }} key={index}>
        </div>
        break;
      case "labelAnimation":
        builder = <LabelAnimation setActiveLayer={this.setActiveLayer} onHoverLayer={this.onHoverLayer} onLeaveLayer={this.onLeaveLayer} deviceHeight={deviceHeight} layerHover={layerHover} layerActive={layerActive} index={index} layer={layer} />
        break;
      case "dragAndDrop":
        builder = <DragAndDrop setActiveLayer={this.setActiveLayer} onHoverLayer={this.onHoverLayer} onLeaveLayer={this.onLeaveLayer} deviceHeight={deviceHeight} layerHover={layerHover} layerActive={layerActive} index={index} layer={layer} />
        break;
      case "ellipse":
        builder = <div
          onClick={() => this.setActiveLayer(index)}
          className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
          onMouseEnter={() => this.onHoverLayer(index)}
          onMouseLeave={() => this.onLeaveLayer(index)}
          style={{
            position: "absolute",
            top: layer.y + "%",
            left: layer.x + "%",
            width: layer.width + "px",
            height: layer.height + "px",
            backgroundColor: layer.backgroundColor,
            borderWidth: layer.borderWidth + "px",
            borderColor: layer.borderColor,
            borderStyle: layer.borderStyle,
            borderRadius: layer.borderRadius + "px",
          }} key={index}>
        </div>
        break;
      case "circle":
        builder = <div
          onClick={() => this.setActiveLayer(index)}
          className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
          onMouseEnter={() => this.onHoverLayer(index)}
          onMouseLeave={() => this.onLeaveLayer(index)}
          style={{
            position: "absolute",
            top: layer.y + "%",
            left: layer.x + "%",
            width: parseInt((layer.radius / 100) * deviceWidth) + "px",
            height: parseInt((layer.radius / 100) * deviceWidth) + "px",
            backgroundColor: layer.backgroundColor,
            borderWidth: layer.borderWidth + "px",
            borderColor: layer.borderColor,
            borderStyle: layer.borderStyle,
            borderRadius: "50%",
          }} key={index}>
        </div>
        break;
      case "text":
        builder = <div
          onClick={() => this.setActiveLayer(index)}
          className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
          onMouseEnter={() => this.onHoverLayer(index)}
          onMouseLeave={() => this.onLeaveLayer(index)}
          style={{
            position: "absolute",
            top: layer.y + "%",
            left: layer.x + "%",
            width: layer.width + "%",
            minHeight: parseInt((layer.height / 100) * deviceHeight) + "px",
          }} key={index} dangerouslySetInnerHTML={{ __html: layer.text }}>
        </div>
        break;
      case "image":
        builder = <div
          onClick={() => this.setActiveLayer(index)}
          className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
          onMouseEnter={() => this.onHoverLayer(index)}
          onMouseLeave={() => this.onLeaveLayer(index)}
          style={{
            position: "absolute",
            top: layer.y + "%",
            left: layer.x + "%",
            width: layer.width + "%",
            height: parseInt((layer.height / 100) * deviceHeight) + "px",
          }} key={index}>
          <img style={{ width: "100%", height: "100%" }} src={layer.image ? layer.image : drag_drop} />
        </div>
        break;
      case "video":
        builder = <div
          onClick={() => this.setActiveLayer(index)}
          className={`layer ${layerHover === index ? "hover" : ""} ${layerActive === index ? "active" : ""} `}
          onMouseEnter={() => this.onHoverLayer(index)}
          onMouseLeave={() => this.onLeaveLayer(index)}
          style={{
            position: "absolute",
            top: layer.y + "%",
            left: layer.x + "%",
            width: layer.width + "%",
            height: parseInt((layer.height / 100) * deviceHeight) + "px",
          }} key={index}>
          <video style={{ width: "100%", height: "100%" }} >
            <source src={layer.video ? layer.video : drag_drop} />
          </video>
        </div>
        break;
    }
    return builder;
  }

  buildIDEcontent() {
    let { sectionLearning, sectionTab, themeIndex, sectionBuildStory } = this.state;
    let builder;
    let buildObj = [];
    if (sectionTab === "learning") {
      buildObj = sectionLearning;
    } else if (sectionTab === "storyFlow") {
      buildObj = sectionBuildStory;
    }

    if (buildObj.length > 0) {
      let index = themeIndex;
      if (buildObj[index].layers !== undefined) {
        builder = <div>
          {
            buildObj[index].layers.map((layer, themeIndex) => {
              return <div className="" key={themeIndex}>
                {
                  this.layerBuild(layer, themeIndex)
                }
              </div>
            })
          }
        </div>
      }
    }

    return builder;
  }

  addTheme() {
    const { sectionLearning } = this.state
    sectionLearning.push({ title: "", theme: "", content: {} })

    this.setState({
      sectionLearning,
      themeIndex: (sectionLearning.length - 1)
    }, () => {
      this.historyCapture();
    })
  }

  addStoyTheme() {
    const { sectionBuildStory } = this.state;
    sectionBuildStory.push({ title: "", theme: "", content: {} })
    this.setState({
      sectionBuildStory,
      themeIndex: (sectionBuildStory.length - 1)
    }, () => {
      this.historyCapture();
    })
  }

  historyCapture() {
    let { history, sectionLearning, sectionBuildStory } = this.state;
    let build = { sectionLearning: JSON.parse(JSON.stringify(sectionLearning)), sectionBuildStory: JSON.parse(JSON.stringify(sectionBuildStory)) };
    if (history.length > 0) {
      let lastValue = history[history.length - 1];
      if (JSON.stringify(lastValue) !== JSON.stringify(build)) {
        history.push(build)
      }
    } else {
      history.push(build)
    }

    this.setState({
      history,
      historyRedo: []
    })
  }

  async submitFuntion() {
    const { sectionLearning, sectionBuildStory } = this.state
    let addData = { sectionLearning, sectionBuildStory };
    let postJson = { levelId: this.props.match.params.levelid, stagesData: JSON.stringify(addData), sessionId: '1223' };
    let responseData = await doConnect("updateLevelMapping", "POST", postJson);
    var json = responseData;
    var response = json.response;
    if (response == 'Success') {
      toast.success('Added data !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.setState({ enableLoader: false })

    } else {
      alert(response);
    }
  }
  render() {
    let { sectionTab, sectionLearning, themeIndex, sectionBuildStory } = this.state;

    return <div className="main-content">
      <ToastContainer />
      <Card title={"Module Management"}>
        <div className="my-3">
          <div className="tabs">
            <div className={`tab ${sectionTab === "learning" ? "active" : ""}`} onClick={() => this.setState({
              sectionTab: "learning",
              themeIndex: 0
            })}>
              Section 1: LEARNING (Add Learning Card)
                              </div>
            <div className={`tab ${sectionTab === "storyFlow" ? "active" : ""}`} onClick={() => this.setState({
              sectionTab: "storyFlow",
              themeIndex: 0
            })}>
              Section 2:  Apply (Building a story flow)
            </div>
          </div>

          <div className="tabs">
            {
              sectionTab === "learning" && sectionLearning.map((val, index) => {
                return <div key={index} className={`tab ${themeIndex === index ? "active" : ""}`} onClick={() => {
                  this.setState({
                    themeIndex: index
                  })
                }}>
                  Theme {index + 1}
                </div>
              })
            }
            {
              sectionTab === "storyFlow" && sectionBuildStory.map((val, index) => {
                return <div key={index} className={`tab ${themeIndex === index ? "active" : ""}`} onClick={() => {
                  this.setState({
                    themeIndex: index,
                    storyCardTab: "meetPerson"
                  })
                }}>
                  Story {index + 1}
                </div>
              })
            }
          </div>
          <div className="d-flex">
            <div style={{ flex: 1 }}>
              {this.buildContent()}
            </div>
            <div style={{ padding: 10 }}>
              <div className="smartphone">
                <div className="smartphone-content tilli-web" ref={(e) => { this.mobile = e }}>
                  {this.buildIDEcontent()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 text-center">
            {
              sectionTab === "learning" && <button type="button" className="btn btn-success" onClick={() => {
                this.addTheme()
              }}>Add Theme</button>
            }
            {
              sectionTab === "storyFlow" && <button type="button" className="btn btn-success" onClick={() => {
                this.addStoyTheme()
              }}>Add Story Theme</button>
            }
            <button type="button" className="btn btn-info" onClick={() => { this.cloneModalOpen() }}>Clone</button>
            <button type="button" className="btn btn-secondary" onClick={() => { this.preview() }}>Preview</button>
            <button type="button" className="btn btn-primary" onClick={() => { this.submitFuntion() }}>Submit</button>
          </div>
        </div>
      </Card>
    </div>
  }
}
