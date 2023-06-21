import React from 'react';
import MyConstant from "../../config/MyConstant";
import DropDown from "../../Component/DropDown";
import ModuleMeetSinglePerson from "./ModuleMeetSinglePerson";
import ModuleAudioQuizScreen from "./ModuleAudioQuizScreen";
import ModuleCircleWithInfoAnimations from "./ModuleCircleWithInfoAnimations";
import DoubleBoxOverlapWithImage from "./DoubleBoxOverlapWithImage";
import QuestionsList from "./QuestionsList";
import IntroducePersons from "./IntroducePersons";
import ChooseCheckboxQuestions from "./ChooseCheckboxQuestions";
import SingleTextImagePage from "./SingleTextImagePage";
import { toast, ToastContainer } from "react-toastify";
import EditorContent from "../EditorContent";
import './style.css'
import ThemeJson from "../Json/Theme.json";
import AskAge from "./AskAge";
import AskGender from "./AskGender";
import { doConnect } from '../../config/Common';
import { Link } from "react-router-dom";


export default class LanguageJsonMapping extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      OptionData: [{ label: "Video", value: "Video" }, { label: "Image", value: "Image" }],
      SelectType: {}, themeSelected: "",
      sectionLearning: [],
      levelsJson: {},
      dummyOptionSelect: [], contentTextValidate: [],
      errorlevelSelect: "", imageView: [],
      sectionBuildStory: [],
      storyThemeSelect: [],
      LevelStage_1: [],
      languageSelect: {},
      viewState: false

    }

  }


  componentDidMount() {

    this.getThemes()
    this.getImages()
    this.getLevels()
    this.getLanguageList();
    this.getLevelMappingData(this.props.match.params.levelid)


  }



  async LanguageChange(e) {
    let { moduleJson, levelSelect, removeThemeText } = this.state;
    let postJson = { levelId: levelSelect.value, languageId: e.value, sessionId: '1223' };
    let responseData = await doConnect("getModuleLanguageMapping", "POST", postJson);

    var json = responseData;
    var response = json.response;
    // console.log('responseData', JSON.parse(response))
    // console.log('moduleJson', moduleJson)
    // console.log('removeThemeText', removeThemeText)
    if (response) {
      let storydata = [];
      let otherdata = [];
      Object.keys(moduleJson).forEach(val => {
        if (JSON.parse(response)[val]) {
          if (moduleJson[val].theme === JSON.parse(response)[val].theme) {
            if (JSON.parse(response)[val]) {
              // console.log(JSON.parse(response)[val])
              removeThemeText[val] = JSON.parse(response)[val];
            }
          }
          else {
            console.log("sss-->" + JSON.parse(response)[val])
            //console.log('un')
            console.log("deleted")
          }
        }
      })

      removeThemeText.map((val, i) => {
        if (removeThemeText[i].theme === "StoryCard" || removeThemeText[i].theme === "Ask Age" || removeThemeText[i].theme === "Ask Gender") {
          storydata[i] = removeThemeText[i]
        }
        else {
          otherdata[i] = removeThemeText[i]
        }
        return true
      })
      var filtered = removeThemeText.filter(function (el) {
        return el !== null;
      });
      storydata = storydata.filter(function (el) {
        return el !== null;
      });

      //console.log('tamilData',tamilData)
      // console.log('storydata', storydata)
      // console.log('otherdata', otherdata)
      // console.log('removeThemeText->', filtered)
      this.setState({
        moduleJson: filtered, languageSelect: e, viewState: true,
        sectionLearning: otherdata, sectionBuildStory: storydata
        // Contentdata: this.state.tamilData
      })
    }
    else {
      if (moduleJson.length !== 0) {
        //console.log('removeThemeText', removeThemeText)
        let storydata = [];
        let otherdata = [];



        moduleJson.map((val, i) => {
          if (moduleJson[i].theme === "StoryCard" || moduleJson[i].theme === "Ask Age" || moduleJson[i].theme === "Ask Gender") {
            storydata[i] = moduleJson[i]
          }
          else {
            otherdata[i] = moduleJson[i]
          }
          return true
        })

        storydata = storydata.filter(function (el) {
          return el !== null;
        });

        // console.log('storydata', storydata)
        // console.log('otherdata', otherdata)

        this.setState({
          languageSelect: e, viewState: true, moduleJson
          , sectionLearning: otherdata, sectionBuildStory: storydata
        })
      }
    }

  }



  async getLevelMappingData(levelId) {
    const { imageView } = this.state;
    let { storyThemeSelect } = this.state
    let postJson = { levelId: levelId, sessionId: '1223' };
    let that = this;
    let responseData = await doConnect("getLevelMappingData", "POST", postJson);

    let removeThemeText = []
    let responceJsonData = responseData.response;

    let getStageData = responseData.response;
    if (getStageData) {
      getStageData = JSON.parse(getStageData);
      if (Array.isArray(getStageData)) {
        responceJsonData = getStageData
      }
      else {
        responceJsonData = getStageData.stage
      }
    }

    if (responceJsonData) {
      let changeIndex = 0
      let withOutStory = []
      let withStory = []
      responceJsonData.map((ival, index) => {
        //console.log("s",ival)
        var found_index = this.state.themeOptions.findIndex((a) =>
          a.label === ival.theme)
        imageView[index] = this.state.themeOptions[found_index]

        let checkindex = ThemeJson.Tamil.findIndex((a) =>
          a.theme === ival.theme)

        if (checkindex !== "-1") {
          let removetext = this.dataremoveField(ival.theme, ival)
          removeThemeText[index] = removetext
        }


        if (ival.theme === "StoryCard" || ival.theme === "Ask Age" || ival.theme === "Ask Gender") {
          withStory.push(ival)
          storyThemeSelect[changeIndex] = { label: ival.theme, value: ival.theme }
          changeIndex++;
        }
        else {
          withOutStory.push(ival)
        }
        return true

      })
      // console.log("with",withStory)
      // console.log("withour",withOutStory)
      // console.log('responceJsonData', JSON.parse(responceJsonData))
      // console.log('removeThemeText', removeThemeText)
      //console.log('ThemeJson',ThemeJson.Tamil)
      //tamilData: ThemeJson.Tamil
      let moduleJson = [...responceJsonData]
      that.setState({ moduleJson, imageView, removeThemeText, storyThemeSelect })

    }

  }



  dataremoveField(theme, data) {

    //        console.log(theme,data )
    if (theme === "IntroducePersons") {
      data.title = "";
      data.content.persons.map(ival => {
        ival.name = "";
        ival.says = "";
        return true
      })

      return data
    }

    if (theme === "DoubleBoxOverlapWithImage" || theme === "ImageWithThinking") {
      data.title = "";
      data.content.text = "";
      return data
    }

    if (theme === "QuestionsList") {
      data.title = "";
      data.content.questionList.map(ival => {
        ival.question = "";
        return true
      })

      return data
    }

    if (theme === "ChooseCheckboxQuestions") {
      data.title = "";
      data.content.checkBoxesOption.map(ival => {
        ival.content = "";
        return true
      })

      return data
    }


    if (theme === "CircleWithInfoAnimations" || theme === "DropToSelection") {
      data.title = "";
      data.content.circles.map(ival => {
        ival.name = "";
        return true
      })



      if (theme === "CircleWithInfoAnimations") {
        data.content.text.map(ival => {
          ival.value = "";
          return true
        })
      }


      if (theme === "DropToSelection") {

        data.content.text1 = ""
        data.content.text2 = ""
        data.content.message.failure_body_1 = ""; data.content.message.failure_body_2 = "";
        data.content.message.failure_button_1 = ""; data.content.message.failure_button_2 = "";
        data.content.message.failure_header_1 = ""; data.content.message.failure_header_2 = "";
        data.content.message.success_body_1 = ""; data.content.message.success_body_2 = "";
        data.content.message.success_button_1 = ""; data.content.message.success_button_2 = "";
        data.content.message.success_header_1 = ""; data.content.message.success_header_2 = "";
        //console.log(theme,"data",data.content )

      }



      return data
    }

    if (theme === "MeetSinglePerson") {
      data.title = "";
      data.content.body = "";
      data.content.bottomText = "";
      data.content.personName = "";
      data.content.question = "";

      return data
    }

    if (theme === "AudioQuizScreen") {


      data.title = "";
      Object.keys(data.content.feelingsDataList).map(ival => {
        data.content.feelingsDataList[ival].questions = '';
        return true
      })


      return data
    }

    if (theme === "SingleTextImage") {
      data.title = "";
      data.content.text = "";
      data.content.bottomtext = "";
      return data
    }

    if (theme === "StoryCard") {
      // data.content[2]
      data.content[0].title = "";
      data.content[0].content.body = "";
      data.content[0].content.bottomText = "";
      data.content[0].content.personName = "";
      data.content[0].content.question = "";

      data.content[1].title = "";
      data.content[1].content.feelingsDataList.map(ival => {
        ival.questions = '';
        return true
      })

      data.content[2].content.circles.map(ival => {
        ival.name = "";
        return true
      })

      data.content[2].content.message.failure_body_1 = ""; data.content[2].content.message.failure_body_2 = "";
      data.content[2].content.message.failure_button_1 = ""; data.content[2].content.message.failure_button_2 = "";
      data.content[2].content.message.failure_header_1 = ""; data.content[2].content.message.failure_header_2 = "";
      data.content[2].content.message.success_body_1 = ""; data.content[2].content.message.success_body_2 = "";
      data.content[2].content.message.success_button_1 = ""; data.content[2].content.message.success_button_2 = "";
      data.content[2].content.message.success_header_1 = ""; data.content[2].content.message.success_header_2 = "";

      data.content[2].content.text1 = ""
      data.content[2].content.text2 = ""

      return data

    }
    if (theme === "Ask Age") {
      data.title = "";
      data.content.question = "";
      data.content.question_2 = "";
      data.content.chooseType_1 = "";
      return data
    }
    if (theme === "Ask Gender") {
      data.title = "";
      data.content.question = "";
      data.content.question_2 = "";
      data.content.chooseType_1 = "";
      data.content.chooseType_2 = "";
      data.content.chooseType_3 = "";
      return data
    }

    return data

  }


  async getThemes() {
    let postJson = { sessionId: '1223', themeId: '' };
    let responseData = await doConnect("getThemes", "POST", postJson);
    let that = this;

    let json = responseData;
    if (Object.keys(json).length > 0 && json['themesMap'] !== null && json['themesMap'] !== undefined) {
      let themesMap = json['themesMap'];
      //console.log('themesList ==>',themesMap)
      let options = []
      let storyOption = []
      Object.keys(themesMap).forEach(value => {
        // console.log('themesList ==>', themesMap[value].name)
        if (themesMap[value].name !== "StoryCard" && themesMap[value].name !== "Ask Age" && themesMap[value].name !== "Ask Gender") {
          options.push({ label: themesMap[value].name, value: themesMap[value].name, json: themesMap[value] })
        }
        else {
          storyOption.push({ label: themesMap[value].name, value: themesMap[value].name, json: themesMap[value] })
        }

      })
      //console.log('options',options)
      // console.log('storyOption', storyOption)
      //storyThemeSelect
      that.setState({ themeOptions: options, storyOption })
    }
  }


  async getLanguageList() {
    let postJson = { sessionId: '1223' };
    let responseData = await doConnect("getLanguages", "POST", postJson);
    this.setState({ "languagesData": JSON.parse(responseData.response) })
  }

  removeFunction(value) {
    const { sectionLearning } = this.state;

    console.log(value)
    delete sectionLearning[value]

    let RemoveData = sectionLearning.filter(function (el) {
      return el !== null;
    });


    this.setState({ sectionLearning: RemoveData })

  }


  getImageOption() {
    let imageOptions = [];
    Object.keys(this.state.fileData).map((ival, index) => {
      let image = this.state.fileData[ival];
      imageOptions.push({ value: MyConstant.keyList.apiURL + "vp?action=module&key=" + image.fileName + "&id=" + image.fileType, label: image.title, json: image })
      return true
    });
    return imageOptions
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


  async submitFuntion() {
    const { sectionLearning, levelSelect, languageSelect } = this.state
    let addData = ""
    addData = [...sectionLearning, ...this.state.sectionBuildStory]

    let postJson = {
      levelId: levelSelect.value,
      languageId: languageSelect.value, jsonData: JSON.stringify(addData),
      sessionId: '1223'
    };

    console.log('postJson==>', postJson)
    let responseData = await doConnect("updateModuleLanguageMapping", "POST", postJson);

    var json = responseData;
    var response = json.response;
    if (response === 'Success') {
      toast.success('Added data !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      //this.setState({enableLoader:false})

    } else {
      alert(response);
    }

  }

  async getLevels() {
    let postJson = { sessionId: '1223', levelId: '' };
    let that = this;
    let responseData = await doConnect("getGameLevels", "POST", postJson);
    let json = responseData;
    if (Object.keys(json).length > 0 && json['levelsMap'] !== null && json['levelsMap'] !== undefined) {
      let levelsMap = json['levelsMap'];
      let level_Id = this.props.match.params.levelid
      let select_Level = {}
      if (level_Id) {
        select_Level.value = level_Id;
        select_Level.label = levelsMap[level_Id].name;
      }
      that.setState({ levelsJson: levelsMap, levelSelect: select_Level })
      this.getLevelMappingData(level_Id)

    }
  }



  addTheme() {
    const { sectionLearning } = this.state
    sectionLearning.push({ title: "", theme: "", content: {} })
    this.setState({ sectionLearning })
  }
  changeTheme(index, e) {

  }

  return_Content_doublebox(Select, index_1) {
    const { LevelStage_1, dummyOptionSelect, ImageValidate, contentText, contentTextValidate, sectionLearning } = this.state;
    var found_index = LevelStage_1.findIndex((a) =>
      a.theme === Select
    )
    let imageOptions = this.getImageOption()
    let checkindex = imageOptions.findIndex(x => x.json.id === sectionLearning[index_1].content.image.id);
    if (checkindex !== "-1") {
      dummyOptionSelect[index_1] = imageOptions[checkindex]

    }



    return <DoubleBoxOverlapWithImage
      OptionSelect={dummyOptionSelect}
      index_1={index_1}
      Option={imageOptions}
      LevelStage={LevelStage_1}
      found_index={found_index}
      ImageValidate={ImageValidate}
      contentText={contentText}
      sectionLearning={sectionLearning}
      contentTextValidate={contentTextValidate}
    />

  }


  return_qustioncontent(value, index_1) {
    const { LevelStage_1, sectionLearning, contentTextValidate } = this.state;
    let remove_undef = sectionLearning[index_1].content.questionList.filter(function (element) {
      return element !== null;
    });
    sectionLearning[index_1].content.questionList = remove_undef

    return <QuestionsList
      LevelStage={LevelStage_1}
      sectionLearning={sectionLearning}
      index_1={index_1}
      contentTextValidate={contentTextValidate}
      editable={"false"}
    />

  }


  return_Content_introduce(value, index_1) {
    const { LevelStage_1, dummyOptionSelect, sectionLearning } = this.state;
    let imageOptions = this.getImageOption()
    //bg,imageBg,name,says
    return <IntroducePersons
      LevelStage={LevelStage_1}
      sectionLearning={sectionLearning}
      index_1={index_1}
      OptionSelect={dummyOptionSelect}
      option={imageOptions}
    />;

  }



  return_Content_choose_checkbox(value, index_1) {
    const { sectionLearning } = this.state;
    let remove_undef = sectionLearning[index_1].content.checkBoxesOption.filter(function (element) {
      return element !== null;
    });
    sectionLearning[index_1].content.checkBoxesOption = remove_undef
    return <ChooseCheckboxQuestions
      index_1={index_1}
      sectionLearning={sectionLearning}
      editable={"false"}
    />
  }


  return_content_circle(value, index_1, type) {
    const { dummyOptionSelect, sectionLearning } = this.state;
    let imageOptions = this.getImageOption()
    if (Object.keys(sectionLearning[index_1].content).length !== 0) {
      let checkindex = imageOptions.findIndex(x => x.json.id === sectionLearning[index_1].content.image.id);
      if (checkindex !== "-1") {
        dummyOptionSelect[index_1] = imageOptions[checkindex]
      }
    }

    return <ModuleCircleWithInfoAnimations
      optionSelect={dummyOptionSelect}
      option={imageOptions}
      index_1={index_1}
      sectionLearning={sectionLearning}
      type={type}

    />

  }



  MeetSinglePersonFunction(Value, index_1) {
    const { sectionLearning, dummyOptionSelect } = this.state;
    let imageOptions = this.getImageOption()

    let checkindex = imageOptions.findIndex(x => x.json.id === sectionLearning[index_1].content.image.id);
    if (checkindex !== "-1") {
      dummyOptionSelect[index_1] = imageOptions[checkindex]
    }


    return <ModuleMeetSinglePerson
      optionSelect={dummyOptionSelect}
      option={imageOptions}
      index_1={index_1}
      sectionLearning={sectionLearning}

    />

  }


  return_content_audioscreen(Value, index_1) {
    const { LevelStage_1, sectionLearning, dummyOptionSelect } = this.state;
    let remove_undef = sectionLearning[index_1].content.feelingsDataList.filter(function (element) {
      return element !== null;
    });
    sectionLearning[index_1].content.feelingsDataList = remove_undef


    let imageOptions = this.getImageOption()
    if (sectionLearning[index_1].content.id) {
      let checkindex = imageOptions.findIndex(x => x.json.id === sectionLearning[index_1].content.image.id);
      if (checkindex !== "-1") {
        //console.log('checkindex',imageOptions[checkindex])
        dummyOptionSelect[index_1] = imageOptions[checkindex]
      }
    }


    return <ModuleAudioQuizScreen
      LevelStage={LevelStage_1}
      index_1={index_1}
      sectionLearning={sectionLearning}
      optionSelect={dummyOptionSelect}
      option={imageOptions}
    />

  }



  indexChange(index, type) {
    const { sectionLearning } = this.state;

    //alert(type)

    if (type === "Down") {

      let value = [...sectionLearning]

      console.log('index', index)
      console.log('Move index', index + 1)
      console.log(index, "--", sectionLearning[index])
      console.log(index + 1, "--", sectionLearning[index + 1])

      value[index] = sectionLearning[index + 1]
      value[index + 1] = sectionLearning[index]
      this.setState({ sectionLearning: value })

    }

    if (type === "Up") {

      let value = [...sectionLearning]

      console.log('index', index)
      console.log('Move index', index - 1)

      value[index] = sectionLearning[index - 1]
      value[index - 1] = sectionLearning[index]
      this.setState({ sectionLearning: value })


    }

  }


  addStoyTheme() {
    const { sectionBuildStory } = this.state;

    //let content=[{ title: '', theme: 'MeetSinglePerson',}]
    sectionBuildStory.push({ title: "", theme: "", content: {} })

    console.log("sectionBuildStory", sectionBuildStory)

    this.setState({ sectionBuildStory })


  }


  StoryCardReturnData(fullData, jindex) {
    const { sectionBuildStory } = this.state

    let dataContentReturn = ""
    let imageOptions = this.getImageOption()

    //console.log("Function Pass",sectionBuildStory)

    dataContentReturn = <div className="row" style={{ width: "100%" }}>

      <div className="row" style={{ width: "100%", border: "1px solid #fed8b1", padding: 10, margin: 10 }}>
        <ModuleMeetSinglePerson
          LevelStage={sectionBuildStory[jindex]}
          themeType={sectionBuildStory[jindex].theme}
          optionSelect={[]}
          option={imageOptions}
          index_1={0}
          found_index={0}
          loopIndex={jindex}
          staticIndex={0}
          //sectionBuildStory[jindex].content
          //Contentdata={sectionBuildStory}
          sectionBuildStory={sectionBuildStory}
          editable={"false"}

        />
      </div>

      <div className="row" style={{ width: "100%", border: "1px solid #fed8b1", padding: 10, margin: 10 }}>

        <ModuleAudioQuizScreen
          LevelStage={sectionBuildStory[jindex]}
          index_1={0}
          found_index={0}
          // Contentdata={sectionBuildStory[jindex].themeData}
          sectionBuildStory={sectionBuildStory}
          loopIndex={jindex}
          staticIndex={1}
          themeType={sectionBuildStory[jindex].theme}
          option={imageOptions}
          editable={"false"}
        />
      </div>
      <div className="row" style={{ width: "100%", border: "1px solid #fed8b1", padding: 10, margin: 10 }}>

        <ModuleCircleWithInfoAnimations
          LevelStage={sectionBuildStory[jindex].themeData}
          optionSelect={[]}
          option={imageOptions}
          index_1={0}
          found_index={0}
          // Contentdata={sectionBuildStory[jindex].themeData}
          type={true}
          sectionBuildStory={sectionBuildStory}
          loopIndex={jindex}
          staticIndex={2}
          themeType={sectionBuildStory[jindex].theme}
          editable={"false"}
        />
      </div>

    </div>

    return dataContentReturn

  }



  storyCardRemove(value) {
    const { sectionBuildStory } = this.state;

    console.log(value)
    delete sectionBuildStory[value]

    let RemoveData = sectionBuildStory.filter(function (el) {
      return el !== null;
    });


    this.setState({ sectionBuildStory: RemoveData })

  }

  storySwaping(index, type) {
    const { sectionBuildStory } = this.state;

    //alert(type)

    if (type === "Down") {

      let value = [...sectionBuildStory]

      console.log('index', index)
      console.log('Move index', index + 1)
      console.log(index, "--", sectionBuildStory[index])
      console.log(index + 1, "--", sectionBuildStory[index + 1])

      value[index] = sectionBuildStory[index + 1]
      value[index + 1] = sectionBuildStory[index]
      this.setState({ sectionBuildStory: value })

    }



    if (type === "Up") {

      let value = [...sectionBuildStory]

      console.log('index', index)
      console.log('Move index', index - 1)

      value[index] = sectionBuildStory[index - 1]
      value[index - 1] = sectionBuildStory[index]
      this.setState({ sectionBuildStory: value })


    }

  }

  contentRefilData(e, index) {

  }



  SingleTextImageReturn(Value, index) {
    const { sectionLearning, dummyOptionSelect } = this.state;
    let imageOptions = this.getImageOption()
    let checkindex = imageOptions.findIndex(x => x.json.id === sectionLearning[index].content.image.id);
    if (checkindex !== "-1") {
      dummyOptionSelect[index] = imageOptions[checkindex]
    }

    return <SingleTextImagePage
      optionSelect={dummyOptionSelect}
      option={imageOptions}
      index={index}
      sectionLearning={sectionLearning}

    />
  }

  theme_AgeReturn(Value, index) {
    const { sectionBuildStory } = this.state;
    let imageOptions = this.getImageOption()
    return <AskAge
      option={imageOptions}
      index={index}
      sectionLearning={sectionBuildStory}
      themeName={Value}
      editable={"false"}
    />
  }

  theme_GenderReturn(Value, index) {
    const { sectionBuildStory } = this.state;
    let imageOptions = this.getImageOption()
    return <AskGender
      option={imageOptions}
      index={index}
      sectionLearning={sectionBuildStory}
      themeName={Value}
      editable={"false"}
    />
  }


  render() {

    const { OptionData, themeOptions, sectionLearning, sectionBuildStory, storyThemeSelect, languagesData, languageSelect } = this.state;


    let languagesOption = []
    if (languagesData) {
      Object.keys(languagesData).map((ival, index) => {
        languagesOption.push({ value: ival, label: languagesData[ival], })
        return true
      });
    }



    let sectionOneData = []
    let sectionDataTwo = []
    if (sectionLearning.length) {
      sectionLearning.map((ival, index) => {
        let chooseDataview = ""
        let selectBoxConditon = ""

        if (sectionLearning[index].theme === "DoubleBoxOverlapWithImage" || sectionLearning[index].theme === "DoubleBoxUnderWithImage") {
          if (sectionLearning[index].content.chooseType && sectionLearning[index].content.chooseType.label === "Image") {
            let imageOptions = this.getImageOption()
            chooseDataview = <>
              <div className="row" style={{ width: "100%" }}>
                <div className="col-sm-3 topalign">
                  <label for="text">Image</label>
                  <DropDown
                    selectedOption={sectionLearning[index].content.image.title ?
                      { label: sectionLearning[index].content.image.title, value: sectionLearning[index].content.image.title } : []}
                    onChange={(e) => {
                      sectionLearning[index].content.image = e.json;

                      this.setState({ sectionLearning })
                      // console.log('this',sectionLearning[index])
                    }}
                    options={imageOptions}
                  />
                  <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errorimage}</span>
                </div>
                <div className="col-sm-3 topalign">
                  <label for="text">Image Style</label>

                  <textarea rows="1" cols="50" className="form-control" placeholder="style"
                    value={sectionLearning[index].content.imagestyle}
                    onChange={e => {
                      sectionLearning[index].content.imagestyle = e.target.value;
                      this.setState({ sectionLearning })
                    }}
                  />
                </div>
                <div className="col-sm-3 topalign">
                  <label for="text">Image ClassName</label>

                  <input type="text" className="form-control" placeholder="classname"
                    value={sectionLearning[index].content.imageclassname}
                    onChange={e => {
                      sectionLearning[index].content.imageclassname = e.target.value;
                      this.setState({ sectionLearning })
                    }} />
                </div>

              </div>

            </>

            selectBoxConditon = <>
              <div className="col-sm-3 topalign">
                <label for="Text">Text</label>
                <EditorContent text={sectionLearning[index].content.text}
                  index={index} sectionLearning={sectionLearning} />

                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errortext}</span>
              </div>

              <div className="col-sm-3 topalign">
                <label for="Text">nameClassName</label>
                <input type="text" className="form-control" placeholder="nameClassName"
                  value={sectionLearning[index].content.nameClassName}
                  onChange={e => {
                    sectionLearning[index].content.nameClassName = e.target.value;
                    this.setState({ sectionLearning })
                  }} /> *

              </div>
            </>

          }
          else if (Object.keys(sectionLearning[index]).length !== 0 && sectionLearning[index].content.chooseType && sectionLearning[index].content.chooseType.label === "Video") {
            chooseDataview = <>
              <div className="col-sm-3 topalign">
                <label for="Video">Video</label>
                <DropDown
                  selectedOption={[]}
                  options={[]}
                />
              </div>
            </>

            selectBoxConditon = "";

          }
        }
        let ThemeChooseData = "";
        if (sectionLearning[index].theme === "DoubleBoxOverlapWithImage") {
          ThemeChooseData = <>
            {selectBoxConditon}
            <div className="col-sm-3 topalign">
              <label for="Color">Bgcolor</label>
              <input type="text" className="form-control" id="Color" value={sectionLearning[index].content.color} placeholder="Color" onChange={(e) => {
                sectionLearning[index].content.color = e.target.value
                this.setState({ sectionLearning })
              }} />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errorcolor}</span>
            </div>

            <div className="col-sm-3 topalign">
              <label for="text">Select</label>
              <DropDown
                selectedOption={sectionLearning[index].content.chooseType}
                onChange={(e) => {
                  sectionLearning[index].content.chooseType = e;

                  this.setState({ sectionLearning })
                  // console.log('this',sectionLearning[index])
                }}
                options={OptionData}
              />
            </div>
            {chooseDataview}
          </>

        }
        else if (sectionLearning[index].theme === "DoubleBoxUnderWithImage") {
          ThemeChooseData = <>
            {selectBoxConditon}
            <div className="col-sm-3 topalign">
              <label for="BoxBgColor_1">BoxBg Color 1</label>
              <input type="text" className="form-control" id="BoxBgColor_1"
                value={sectionLearning[index].content.boxBgColor_1} placeholder="BoxBgColor1" onChange={(e) => {
                  sectionLearning[index].content.boxBgColor_1 = e.target.value
                  this.setState({ sectionLearning })
                }} />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errorcolor}</span>
            </div>

            <div className="col-sm-3 topalign">
              <label for="BoxBgColor_1">BoxBg Color 2</label>
              <input type="text" className="form-control" id="BoxBgColor_2"
                value={sectionLearning[index].content.boxBgColor_2} placeholder="BoxBgColor2" onChange={(e) => {
                  sectionLearning[index].content.boxBgColor_2 = e.target.value
                  this.setState({ sectionLearning })
                }} />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errorcolor}</span>
            </div>

            <div className="col-sm-3 topalign">
              <label for="text">Select</label>
              <DropDown
                selectedOption={sectionLearning[index].content.chooseType}
                onChange={(e) => {
                  sectionLearning[index].content.chooseType = e;

                  this.setState({ sectionLearning })
                  // console.log('this',sectionLearning[index])
                }}
                options={OptionData}
              />
            </div>
            {chooseDataview}
          </>

        }
        else if (sectionLearning[index].theme === "ImageWithThinking") {

          ThemeChooseData = <> {this.return_Content_doublebox(sectionLearning[index].theme, index)} </>
        }
        else if (sectionLearning[index].theme === "QuestionsList") {

          ThemeChooseData = <> {this.return_qustioncontent(sectionLearning[index].theme, index)}  </>

        }
        else if (sectionLearning[index].theme === "IntroducePersons") {
          ThemeChooseData = <> {this.return_Content_introduce(sectionLearning[index].theme, index)}  </>

        }
        else if (sectionLearning[index].theme === "ChooseCheckboxQuestions") {
          ThemeChooseData = <> {this.return_Content_choose_checkbox(sectionLearning[index].theme, index)}  </>
        }
        else if (sectionLearning[index].theme === "CircleWithInfoAnimations") {
          ThemeChooseData = <> {this.return_content_circle(sectionLearning[index].theme, index, false)}  </>
        }
        else if (sectionLearning[index].theme === "MeetSinglePerson") {
          ThemeChooseData = <> {this.MeetSinglePersonFunction(sectionLearning[index].theme, index)}  </>
        }
        else if (sectionLearning[index].theme === "AudioQuizScreen") {
          ThemeChooseData = <> {this.return_content_audioscreen(sectionLearning[index].theme, index)}  </>
        }
        else if (sectionLearning[index].theme === "DropToSelection") {
          ThemeChooseData = <> {this.return_content_circle(sectionLearning[index].theme, index, true)}  </>
        }
        else if (sectionLearning[index].theme === "SingleTextImage") {
          ThemeChooseData = <> {this.SingleTextImageReturn(sectionLearning[index].theme, index)}  </>
        }



        sectionOneData.push(
          <>
            <div className="panel panel-info">
              <div className="panel-heading">

                <div className="row" style={{ padding: 20, }}>
                  <div className="col-sm-1 "> Title </div>
                  <div className="col-sm-4">
                    <EditorContent text={sectionLearning[index].title} themeType={"TitleText"}
                      index={index} sectionLearning={sectionLearning} />

                    {sectionLearning[index].title.length === 0 ?
                      <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].errorTitle}</span>
                      : null}

                  </div>

                  <div className="col-sm-2">  </div>
                  <div className="col-sm-2"></div>

                  <div className="col-sm-1"> <p style={{ fontWeight: "bold", color: "#00008b" }}> Theme {index + 1}</p> </div>
                  <div className="col-sm-1">

                  </div>
                  <div className="col-sm-1" style={{ cursor: "pointer" }} onClick={(e) => {
                    //this.removeFunction(index)
                  }}>
                  </div>
                </div>

                <div className="row" style={{ padding: 20, }}>
                  <div className="col-sm-1"> Theme </div>
                  <div className="col-sm-4">
                    <DropDown
                      selectedOption={sectionLearning[index].theme ? { label: sectionLearning[index].theme, value: sectionLearning[index].theme }
                        : []}
                      onChange={(e) => {
                        this.changeTheme(index, e)
                      }}
                      options={themeOptions}
                      isDisabled={true}
                    />
                    <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].errorTheme}</span>
                  </div>
                  <div className="col-sm-2">

                    {this.state.imageView[index] && this.state.imageView[index] ?
                      <img style={{ width: '100%', height: 100 }}
                        src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.imageView[index].json.image.fileName + "&id=" + this.state.imageView[index].json.image.fileType}
                        alt={'loading'} className="img-responsive" onClick={() => {
                          this.setState({ imageBigView: this.state.imageView[index], displayImage: 'block' })
                        }} />
                      : null}

                  </div>
                  <div className="col-sm-4">  </div>
                  <div className="col-sm-1">  </div>
                </div>

              </div>
              <div className="panel-body">

                <div className="row">

                  {ThemeChooseData}
                </div>
              </div>
            </div>
          </>
        )
        return true
      })
    }


    sectionBuildStory.map((jval, jindex) => {
      let titleContentVew = "";
      let storyCardContent = "";
      if (sectionBuildStory[jindex].theme === "StoryCard" && sectionBuildStory[jindex].theme.length !== 0 && Object.keys(sectionBuildStory[jindex].content).length !== 0) {
        storyCardContent = this.StoryCardReturnData(sectionBuildStory, jindex)
      }
      else if (sectionBuildStory[jindex].theme === "Ask Age") {
        storyCardContent = this.theme_AgeReturn(sectionBuildStory[jindex].theme, jindex)
      }
      else if (sectionBuildStory[jindex].theme === "Ask Gender") {
        storyCardContent = this.theme_GenderReturn(sectionBuildStory[jindex].theme, jindex)
      }
      if (Object.keys(sectionBuildStory[jindex]).length !== 0) {
        titleContentVew = <>
          <div className="row" style={{ padding: 20, }}>
            <div className="col-sm-1 "> Title  </div>
            <div className="col-sm-4">
              {sectionBuildStory[jindex].theme && sectionBuildStory[jindex].theme !== "StoryCard" ?
                <EditorContent text={sectionBuildStory[jindex].title} themeType={sectionBuildStory[jindex].theme}
                  index={jindex}
                  textOnchange={(value) => {
                    sectionBuildStory[jindex].title = value
                    this.setState({ sectionBuildStory })
                  }} />
                :
                <input type={'text'} className={'form-control'} value={sectionBuildStory[jindex].title} placeholder={'Enter Title'} style={{ width: '100%' }}
                  onChange={(e) => {
                    sectionBuildStory[jindex].title = e.target.value
                    this.setState({ sectionBuildStory })
                  }} />
              }




              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[jindex].errorTitle}</span>
            </div>

            <div className="col-sm-1 "> Demo </div>
            <div className="col-sm-1 ">
              <input type="checkbox" style={{ cursor: "pointer" }} checked={sectionBuildStory[jindex].demoPage} onChange={() => {

                if (sectionBuildStory[jindex].demoPage) {
                  sectionBuildStory[jindex].demoPage = false
                }
                else {
                  sectionBuildStory[jindex].demoPage = true
                }

                this.setState({ sectionBuildStory })

              }} /> </div>

            <div className="col-sm-2"></div>
            <div className="col-sm-1"> <p style={{ fontWeight: "bold", color: "#00008b" }}> Theme {jindex + 1}</p> </div>
            <div className="col-sm-1">
            </div>

            <div className="col-sm-1" style={{ cursor: "pointer" }} onClick={() => {
              // this.storyCardRemove(jindex)
            }} >
            </div>

          </div>
        </>
      }



      sectionDataTwo.push(
        <>

          <div className="panel panel-info">
            <div className="panel-heading">
              {titleContentVew}
              <div className="row" style={{ padding: 20, }}>

                <div className="col-sm-1"> Theme</div>
                <div className="col-sm-4">
                  <DropDown
                    selectedOption={storyThemeSelect[jindex]}
                    onChange={(e) => {
                      this.contentRefilData(e, jindex)
                    }}
                    options={this.state.storyOption}
                    isDisabled={true}
                  />

                  <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[jindex].errortheme}</span>
                </div>
                <div className="col-sm-5"></div>
                <div className="col-sm-1">  </div>
                <div className="col-sm-1" onClick={(e) => {

                }}>  </div>
              </div>

            </div>
            <div className="panel-body">

              {storyCardContent}

            </div>
          </div>
        </>
      )
      return true
    })




    let levelOption = [];
    Object.keys(this.state.levelsJson).map((ival, index) => {
      let levelData = this.state.levelsJson[ival];
      levelOption.push({ value: levelData.id, label: levelData.name, })
      return true
    });


    return (
      <React.Fragment>
        <div className="main-content">
          <div className="right_col" role="main">
            <div className="">

              <div className="clearfix"></div>

              <div className="row">
                <div className="col-md-12 col-sm-12  ">
                  <div className="x_panel">
                    <div className="x_title">
                      <h2>Module Management</h2>
                      <ToastContainer />
                      <ul className="nav navbar-right panel_toolbox">
                        <li><Link className="collapse-link"><i className="fa fa-chevron-up"></i></Link>
                        </li>
                        <li className="dropdown">
                          <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></Link>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link className="dropdown-item" to="#">Settings 1</Link>
                            <Link className="dropdown-item" to="#">Settings 2</Link>
                          </div>
                        </li>
                        <li><Link className="close-link"><i className="fa fa-close"></i></Link>
                        </li>
                      </ul>
                      <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                      {/*Content*/}


                      <div className="row item form-group" style={{ marginTop: 20 }}>

                        <div className="col-sm-1">Module</div>
                        <div className="col-sm-5">
                          <DropDown
                            selectedOption={this.state.levelSelect}
                            onChange={(e) => {
                              this.setState({ levelSelect: e })

                            }}
                            options={levelOption}
                            isDisabled={true}
                          />

                          <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{this.state.errorlevelSelect}</span>
                        </div>
                        <div className="col-sm-6"> </div>
                      </div>


                      <div className="row item form-group" style={{ marginTop: 20 }}>
                        <div className="col-sm-1">Language Select</div>
                        <div className="col-sm-5">
                          <DropDown
                            selectedOption={languageSelect}
                            onChange={(e) => {

                              this.LanguageChange(e)
                            }}
                            options={languagesOption}
                          />

                          <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}> {this.state.errorLanguage}</span>
                        </div>
                        <div className="col-sm-6"> </div>
                      </div>
                      {this.state.viewState ? <>
                        <div className="panel panel-default">
                          <h2 style={{ color: "black" }}> Section 1: LEARNING </h2>
                          <div className="panel-body">Add Learning Card </div>
                          {/* {JSON.stringify(sectionLearning)} */}
                          {sectionOneData}
                          <div className="row mt-3 mb-3">
                            <div className="col-sm-4"> </div>
                            <div className="col-sm-4">
                            </div>
                            <div className="col-sm-4"> </div>
                          </div>
                        </div>

                        <div className="panel panel-default">
                          <h2 style={{ color: "black" }}> Section 2:  Apply (Building a story flow)  </h2>
                          <div className="panel-body">
                            {sectionDataTwo}
                          </div>
                          {/* {JSON.stringify([...sectionLearning, ...this.state.sectionBuildStory])} */}
                          <br /><br />
                        </div>
                        <div className="row">
                          <div className="col-sm-4"> </div>
                          <div className="col-sm-4">
                            <button type="button" className="btn btn-primary" onClick={() => { this.submitFuntion() }}>Submit</button>
                          </div>
                          <div className="col-sm-4"> </div>
                        </div>

                      </> : null}

                      {/*Image View*/}
                      <div id="myModal" className="modal_image" style={{ display: this.state.displayImage }} >
                        <span className="close" onClick={() => {
                          this.setState({ displayImage: "none" })
                        }}  >&times;</span>
                        {this.state.imageBigView ?

                          <img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.imageBigView.json.image.fileName + "&id=" + this.state.imageBigView.json.image.fileType} className="modal-content_image" id="img01" alt="loading" />
                          : null}
                        <div id="caption"></div>
                      </div>
                      {/*Image View*/}

                      {/*Content*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /page content --> */}
        </div>
      </React.Fragment>
    )

  }

}