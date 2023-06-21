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

import AskAge from "./AskAge";
import AskGender from "./AskGender";


import DoubleBoxOverlapWithImageTheme from './Themes/DoubleBoxOverlapWithImage';
import ImageWithThinkingTheme from './Themes/ImageWithThinking';
import QuestionsListTheme from './Themes/QuestionsList';
import ChooseCheckboxQuestionsTheme from './Themes/ChooseCheckboxQuestions';
import CircleWithInfoAnimationsTheme from './Themes/CircleWithInfoAnimations';
import IntroducePersonsTheme from './Themes/IntroducePersons';
import AudioQuizScreenTheme from './Themes/AudioQuizScreen';
import DropToSelectionTheme from './Themes/DropToSelection';
import MeetSinglePersonTheme from './Themes/MeetSinglePerson';
import DoubleBoxUnderWithImageTheme from './Themes/DoubleBoxUnderWithImage';
import SingleTextImageTheme from './Themes/SingleTextImage';
import AskGenderTheme from './Themes/AskGender';
import AskAgeTheme from './Themes/AskAge';
import Modal from '../../Component/Modal';
import Preview from './Preview';
import CloneTheme from './CloneTheme';
import ClassNameSelect from './Component/ClassNameSelect';
import RectangleForm from './ThemeBuilder/Elements/RectangleForm';
import LableAnimationForm from './ThemeBuilder/Elements/LableAnimationForm';
import DragAndDropForm from './ThemeBuilder/Elements/DragAndDropForm';
import EllipseForm from './ThemeBuilder/Elements/EllipseForm';
import CircleForm from './ThemeBuilder/Elements/CircleForm';
import TextForm from './ThemeBuilder/Elements/TextForm';
import ImageForm from './ThemeBuilder/Elements/ImageForm';
import VideoForm from './ThemeBuilder/Elements/VideoForm';
import DragAndDrop from './ThemeBuilder/ThemeView/DragAndDrop';
import LabelAnimation from './ThemeBuilder/ThemeView/LabelAnimation';
import GroupedInput from './ThemeBuilder/ThemeView/GroupedInput';
import drag_drop from '../../images/drag_drop.png';
import { doConnect } from '../../config/Common';


export default class ModuleManagerIDE extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      OptionData: [{ label: "Video", value: "Video" }, { label: "Image", value: "Image" }],
      SelectType: {},
      sectionLearning: [],
      levelsJson: {},
      dummyOptionSelect: [], contentTextValidate: [],
      errorlevelSelect: "", imageView: [],
      sectionBuildStory: [],
      storyThemeSelect: [],
      sectionTab: "learning",
      storyCardTab: "",
      themeIndex: 0,
      LevelStage_1: [
        {
          title: "", theme: "DoubleBoxOverlapWithImage", content: { text: "", image: "", chooseType: "", video: "", color: "" }
        },
        {
          title: "", theme: "DoubleBoxUnderWithImage", content: { text: "", image: "", chooseType: "", video: "", boxBgColor_1: "", boxBgColor_2: "" }
        },
        {
          title: 'What is trust',
          theme: 'ImageWithThinking',
          content: {
            text:
              'This is Raji, she feels safe when her father lifts her into the air, that is because Raji TRUSTS her father not to let her go. .',
            image: '',
          },
        },
        {
          title: 'What is trust',
          theme: 'QuestionsList',
          content: {
            questionTitle:
              'Four questions you can ask yourself, when figuring out who you can trust:',
            questionList: [
              {
                question: 'Is this person dependable?',
                color: '#FFC737',
              },
              {
                question: 'Does this person always say the truth?',
                color: '#C4D63E',
              },
              {
                question:
                  'Will you trust this person with a secret? Are you sure they will not tell it to someone else?',
                color: '#A9F2F9',
              },
              {
                question:
                  "Are you sure this person won't do something that will make you feel sad, unsafe or angry?",
                color: '#FF5C5C',
              },
            ],
          },
        },
        {
          title: 'Trust',
          theme: 'IntroducePersons',
          content: {
            persons: [
              {
                name: 'Tilly',
                image: '',
                imageBg: '#8AC381',
                bg: '#30DEC9',
                says:
                  'She is eight years old and today you will be help her make some smart choices about who she can trust and can not trust in her life.',
              },
              {
                name: 'Sameera',
                image: '',
                imageBg: '#FFBD12',
                bg: '#FFC737',
                says:
                  "He is Tilly's best friend. They have known each other since Grade 1. Sameera often goes to Tilly to get advice or to tell a secret. Sameera is always helpful and kind to those around him.",
              },
            ],
          },
        },
        {
          title: 'Trust',
          theme: 'ChooseCheckboxQuestions',
          content: {
            questionTitle:
              'How do you think Tilly will answer these questions about Sameera?',
            checkBoxesOption: [
              { content: "Does he change his mind often?", bgcolor: "#FFC737" },
              { content: "Does he always tell the truth?", bgcolor: "#C4D63E" },
              { content: "Will you trust this person with a secret?", bgcolor: "#A9F2F9" },
              { content: "Are you sure this person won't do something to make you feel sad, angry or unsafe?", bgcolor: "#FF5C5C" },
            ],
            colors: {
              checked: '#FF89BB',
              unChecked: '#FFBD12',
              text: '#000',
              box: '#00C6AE',
            },
          },
        },
        {
          title: 'TRUST CIRCLE',
          theme: 'CircleWithInfoAnimations',
          content: {
            "text": [
              {
                "value": "THIS IS THE",
                "style": { "color": "#474A57" }
              },
              {
                "value": "TRUST CIRCLE",
                "style": { "color": "#E35B77" }
              }
            ],
            circles: [
              {
                name: 'HIGH TRUST',
                color: '#F4ED31',
              },
              {
                name: 'LOW TRUST',
                color: '#527FC7',
              },
              {
                name: 'NO TRUST',
                color: '#F75A5B',
              },

            ],
            image: '',
            imageText: ""
          },
        },
        {
          title: 'Help Tily',
          theme: 'MeetSinglePerson',
          content: {
            personName: "", body: "", question: "", bottomText: "", color_1: "", color_2: "", image: '', chooseType: {}, video: "",
          },
        },

        {
          title: 'Tilly',
          theme: 'PersonWithTextAnimation',
          content: {
            image: '',
            text: [
              {
                value: 'How much does Tilly trust herself?',
                style: { color: '#474A57' },
              },
              {
                value: 'Test text1',
                style: { color: '#474A57', paddingTop: 10 },
              },
              {
                value: 'Test text2',
                style: { color: '#474A57', paddingTop: 10 },
              },
            ],
          },
        },
        {
          title: 'Tilly',
          theme: 'AudioQuizScreen',
          content: {
            feelingsDataList: [
              {
                questions: 'Can Tilli trust herself?',
                results: [],
              },
              {
                questions: 'Why do you think so?',
                results: [],
              },
              {
                questions: 'What about you? Can you trust yourself?',
                results: [],
              },
            ],
            changeColorBox: "",
            image: ""
          },
        },
        {
          title: 'TRUST CIRCLE',
          theme: 'DropToSelection',
          content: {
            text1: "",
            text2: "",
            circles: [
              {
                name: 'HIGH TRUST',
                color: '#F4ED31',
                isCorrectanswer: false,
              },
              {
                name: 'LOW TRUST',
                color: '#527FC7',
                isCorrectanswer: false,
              },
              {
                name: 'NO TRUST',
                color: '#F75A5B',
                isCorrectanswer: false,
              },
            ],
            image: '',
            message: {
              failure_header_1: "Are you sure?", failure_body_1: "Think again!", failure_button_1: "Try again",
              failure_header_2: "Ooops",
              failure_body_2: "No one is allowed to touch you in a way that makes you feel uncomfortable. Even if they are family. Your body is yours and Tilli should say no to Aunty Nita’s hugs. If the way someone touches you is not okay, usually your Gut Feeling will give you a signal.",
              failure_button_2: "Try again",
              success_header_1: "Awesome Job!", success_body_1: "You just helped Tilly learn how to listen to her inner voice. You have also added a new tool to your saefty toolbox.",
              success_button_1: "Unlock Learning Point!",
              success_header_2: "Learning Point", success_body_2: "No one is allowed to touch you in a way that makes you feel uncomfortable. Even if they are family. Your body is yours and Tilli should say no to Aunty Nita’s hugs. If the way someone touches you is not okay, usually your Gut Feeling will give you a signal.",
              success_button_2: "Next Story"
            },
            changeColorStoryBox: "",
            ChangeColorQuestionBox: "",
            numberOfPoints: "",
            learningPoint: "",
            correctAnswermsg: "",
            wrongAnswermsg: "",
            imageBgColor: ""
          },
        },
        {
          title: 'What is trust',
          theme: 'SingleTextImage',
          content: {
            text:
              'This is Raji, she feels safe when her father lifts her into the air, that is because Raji TRUSTS her father not to let her go. .',
            image: '',
            bottomtext: ""
          },
        },
        {
          title: 'Success',
          theme: 'Success',
          content: {
            title: {
              value: 'LEVEL PASSED',
              style: [{ color: '#fddc24' }],
              bColor: '#93c884',
            },
            message: {
              value:
                'The person you can trust most in the world is you! You have the power to decide who you trust and don’t trust',
              style: [{ color: '#8dbaaf' }],
              bColor: '#2b4850',
            },
          },
        },
      ],
      history: [],
      historyRedo: [],
      previewModal: false,
      cloneModal: false,
      moduleJson: {},
      cloneLevelSelect: {},
      themeSelected: [],
      themeSelectedJson: {},
      deviceHeight: "",
      deviceWidth: "",
      audioFiles: [],
      selectAudioFiles: "",
      audioJsonFiles: {},
      sectionAudioSelected: {},
      storySelectAudioFiles: {},
      welcomeScreenCheck: true,
      apiPostOptions: [{ label: "Yes", value: "emotion" }]
    }

    this.setThemeSelected = this.setThemeSelected.bind(this);
    this.setValue = this.setValue.bind(this);
  }


  componentDidMount() {
    let height = this.mobile.clientHeight;
    let width = this.mobile.clientWidth;
    this.setState({
      deviceHeight: height,
      deviceWidth: width,
    }, async () => {
      await this.getImages()
      await this.getAudioFils()
      await this.getThemes()
      await this.getLevels()
    });
  }


  async getThemes() {
    let postJson = { sessionId: '1223', themeId: '' };
    let that = this;
    let responseData = await doConnect("getThemes", "POST", postJson);
    let json = responseData;
    if (Object.keys(json).length > 0 && json['themesMap'] !== null && json['themesMap'] !== undefined) {
      let themesMap = json['themesMap'];
      //console.log('themesList ==>',themesMap)
      let options = []
      let storyOption = []
      Object.keys(themesMap).forEach(value => {
        //   console.log('themesList ==>',themesMap[value].name)
        if (themesMap[value].name !== "StoryCard") {
          options.push({ label: themesMap[value].name, value: themesMap[value].name, json: themesMap[value] })
        }
        else {
          storyOption.push({ label: themesMap[value].name, value: themesMap[value].name, json: themesMap[value] })
        }

      })
      //console.log('options',options)
      that.setState({ themeOptions: options, storyOption })
    }
  }

  removeFunction(value) {
    let { sectionLearning, sectionAudioSelected } = this.state;
    sectionLearning = sectionLearning.filter((e, i) => { return i !== value })
    if (sectionAudioSelected[value]) {
      sectionAudioSelected[value] = {}
    }
    this.setState({
      sectionLearning,
      sectionAudioSelected
    }, () => {
      this.historyCapture();
    })

  }


  getImageOption() {
    let imageOptions = [];
    Object.keys(this.state.fileData).map((ival, index) => {
      let image = this.state.fileData[ival];
      imageOptions.push({ value: MyConstant.keyList.apiURL + "vp?action=module&key=" + image.fileName + "&id=" + image.fileType, label: image.title, json: image })
      return true;
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

  async getAudioFils() {
    let postJson = { fileType: 'audio', sessionId: '1223' };
    console.log("postJson", postJson)
    let responseData = await doConnect("getGameFilesList", "POST", postJson);
    let audioJsonFiles = {}
    let audioFiles = []
    console.log("json", responseData)
    if (responseData && responseData.filesMap) {
      audioJsonFiles = responseData.filesMap;
      Object.keys(audioJsonFiles).map((key) => {
        let fileObj = audioJsonFiles[key];
        let filePath = MyConstant.keyList.apiURL + "vp?action=module&key=" + fileObj.fileName + "&id=" + fileObj.fileType;
        fileObj.previewAudioPath = filePath
        audioFiles.push({ value: key, label: fileObj.title, json: fileObj })
        return true;
      })
    }
    this.setState({ audioFiles, audioJsonFiles })
  }



  async submitFuntion() {
    const { sectionLearning, sectionBuildStory } = this.state
    let { welcomeScreenCheck } = this.state
    if (sectionBuildStory.length === 0 && sectionLearning.length === 0) {
      alert("Add story")
      return false
    }

    // let addData = { sectionLearning, sectionBuildStory };
    let addData = [...sectionLearning, ...sectionBuildStory];
    let stagesData = { welcomeScreen: welcomeScreenCheck, stage: addData }
    let postJson = { levelId: this.state.levelSelect.value, stagesData: JSON.stringify(stagesData), sessionId: '1223' };
    let responseData = await doConnect("updateLevelMapping", "POST", postJson);
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
      this.setState({ enableLoader: false })

    } else {
      alert(response);
    }
  }

  async getLevels() {
    let postJson = { sessionId: '1223', levelId: '' };
    let responseData = await doConnect("getGameLevels", "POST", postJson);
    let that = this;
    let json = responseData;
    if (Object.keys(json).length > 0 && json['levelsMap'] !== null && json['levelsMap'] !== undefined) {
      let levelsMap = json['levelsMap'];
      let level_Id = this.props.match.params.levelid
      let select_Level = {}
      if (level_Id) {
        select_Level.value = level_Id;
        select_Level.label = levelsMap[level_Id].name;
      }

      that.setState({ levelsJson: levelsMap, levelSelect: select_Level }, () => {
        this.getLevelMappingData(level_Id)
      })
    }
  }


  async getLevelMappingData(levelId) {
    const { storyThemeSelect } = this.state;
    let { welcomeScreenCheck } = this.state
    let { audioFiles } = this.state
    let postJson = { levelId: levelId, sessionId: '1223' };
    let that = this;
    let responseData = await doConnect("getLevelMappingData", "POST", postJson);

    // alert(JSON.stringify(responseData))
    let contentdata = responseData.response;
    let getStageData = responseData.response;
    if (getStageData) {
      getStageData = JSON.parse(getStageData);
      /*restructure change */
      if (Array.isArray(getStageData) || typeof (getStageData.welcomeScreen) === "undefined") {
        getStageData = { welcomeScreen: true, stage: getStageData }
      }
      /*restructure change */
    }
    if (getStageData) {
      welcomeScreenCheck = getStageData.welcomeScreen;
      contentdata = getStageData.stage;
      let imageViews = []
      let withOutStory = []
      let withStory = []
      let changeIndex = 0

      let sectionAudioSelected = {}
      let storySelectAudioFiles = {}

      if (Array.isArray(contentdata)) {
        contentdata.map((ival, index) => {
          var found_index = this.state.themeOptions.findIndex((a) =>
            a.label === ival.theme)
          imageViews[index] = this.state.themeOptions[found_index]

          if (ival.themeType && ival.themeType === "Dynamic") {
            if (ival.backgroundAudio && ival.backgroundAudio !== "") {
              let prevAudPath = ival.backgroundAudio;
              let findAudPath = ""
              let splitAnd = prevAudPath.split("&")[1]
              if (splitAnd) {
                splitAnd = splitAnd.split("key=");
                findAudPath = splitAnd[1];
              }

              let filterAudioIndex = audioFiles.findIndex((e) => { return e.json.fileName === findAudPath })
              if (filterAudioIndex !== "-1") {
                let selectedFile = audioFiles[filterAudioIndex]
                sectionAudioSelected[index] = { ...selectedFile }
              }
            }
          }

          if (ival.theme === "StoryCard" || ival.theme === "Ask Age" || ival.theme === "Ask Gender") {
            withStory.push(ival)
            storyThemeSelect[changeIndex] = { label: ival.theme, value: ival.theme }
            changeIndex++;
          }
          else {
            withOutStory.push(ival)
          }
          return true;
        })


        let filterInsideContentThemes = contentdata.filter((e) => { return e.content && Object.keys(e.content).length > 0 })
        if (filterInsideContentThemes && filterInsideContentThemes.length > 0) {
          filterInsideContentThemes.map((ival, index) => {
            let filterDynamicData = ival.content.themes && ival.content.themes.filter((e) => { return e.themeType === "Dynamic" })
            if (filterDynamicData && filterDynamicData.length > 0) {
              filterDynamicData.map((dtheme, dindex) => {
                if (dtheme.backgroundAudio && dtheme.backgroundAudio !== "") {
                  let filterAudioIndex = audioFiles.findIndex((e) => { return e.json.previewAudioPath === dtheme.backgroundAudio })
                  if (filterAudioIndex !== "-1") {
                    let selectedFile = audioFiles[filterAudioIndex]
                    storySelectAudioFiles[index] = {}
                    storySelectAudioFiles[index][dindex] = { ...selectedFile }
                  }
                }
                return true;
              })
            }
            return true;
          })

        }

      } else {
        let { sectionLearning, sectionBuildStory } = contentdata;
        withOutStory = sectionLearning;
        withStory = sectionBuildStory;

        sectionBuildStory.map((ival) => {
          storyThemeSelect.push({ label: ival.theme, value: ival.theme })
          return true;
        })
      }

      that.setState({
        sectionLearning: withOutStory,
        sectionBuildStory: withStory,
        imageView: imageViews,
        storyThemeSelect,
        sectionAudioSelected,
        storySelectAudioFiles,
        welcomeScreenCheck
      }, () => {
        that.historyCapture()
      })

    }

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

  async changeTheme(index, e) {
    const { sectionLearning, imageView, sectionTab } = this.state;

    sectionLearning[index].theme = e.label;
    sectionLearning[index].themeType = e.json.themeType;
    imageView[index] = e

    if (sectionLearning[index].theme === "DoubleBoxOverlapWithImage") {
      let content = {
        text: "", image: "", chooseType: "", video: "", color: "", imagestyle: "",
        imageclassname: "", nameClassName: ""
      }
      sectionLearning[index].content = content
      sectionLearning[index].content.chooseType = { label: "Image", value: "Image" }
    }
    else if (sectionLearning[index].theme === "DoubleBoxUnderWithImage") {
      let content = {
        text: "", image: "", chooseType: "", video: "", boxBgColor_1: "", boxBgColor_2: "",
        imagestyle: "", imageclassname: "", nameClassName: ""
      }
      sectionLearning[index].content = content
      sectionLearning[index].content.chooseType = { label: "Image", value: "Image" }
    }
    else if (sectionLearning[index].theme === "ImageWithThinking") {
      let content = { text: '', image: '', imagestyle: "", imageclassname: "", nameClassName: "" }
      sectionLearning[index].content = content
    }
    else if (sectionLearning[index].theme === "QuestionsList") {


      let content = {
        questionTitle:
          'Four questions you can ask yourself, when figuring out who you can trust:',
        className: 'p-2',
        questionList: [
          {
            question: 'Is this person dependable?',
            color: '#FFC737',
            className: 'p-2'
          },
          {
            question: 'Does this person always say the truth?',
            color: '#C4D63E',
            className: 'p-2'
          },
          {
            question:
              'Will you trust this person with a secret? Are you sure they will not tell it to someone else?',
            color: '#A9F2F9',
            className: 'p-2'
          },
          {
            question:
              "Are you sure this person won't do something that will make you feel sad, unsafe or angry?",
            color: '#FF5C5C',
            className: 'p-2'
          },
        ],
      }

      sectionLearning[index].content = content
    }
    else if (sectionLearning[index].theme === "IntroducePersons") {
      let content = {
        persons: [
          {
            name: 'Tilly',
            nameClassName: 'align-end',
            image: '',
            imageBg: '#8AC381',
            bg: '#30DEC9',
            says:
              'She is eight years old and today you will be help her make some smart choices about who she can trust and can not trust in her life.',
          },
          {
            name: 'Sameera',
            nameClassName: 'align-end',
            image: '',
            imageBg: '#FFBD12',
            bg: '#FFC737',
            says:
              "He is Tilly's best friend. They have known each other since Grade 1. Sameera often goes to Tilly to get advice or to tell a secret. Sameera is always helpful and kind to those around him.",
          },
        ],
      }
      sectionLearning[index].content = content

    }

    else if (sectionLearning[index].theme === "ChooseCheckboxQuestions") {

      let content = {
        questionTitle:
          'How do you think Tilly will answer these questions about Sameera?',
        nameClassName: "",
        checkBoxesOption: [
          { content: "Does he change his mind often?", bgcolor: "#FFC737", nameClassName: "" },
          { content: "Does he always tell the truth?", bgcolor: "#C4D63E", nameClassName: "" },
          { content: "Will you trust this person with a secret?", bgcolor: "#A9F2F9", nameClassName: "" },
          { content: "Are you sure this person won't do something to make you feel sad, angry or unsafe?", bgcolor: "#FF5C5C", nameClassName: "" },
        ],
        colors: {
          checked: '#FF89BB',
          unChecked: '#FFBD12',
          text: '#000',
          box: '#00C6AE',
        },
      }
      sectionLearning[index].content = content

    }
    else if (sectionLearning[index].theme === "CircleWithInfoAnimations") {

      let content = {
        "text": [
          {
            "value": "THIS IS THE",
            "style": { "color": "#474A57" },
            nameClassName: ""
          },
          {
            "value": "TRUST CIRCLE",
            "style": { "color": "#E35B77" },
            nameClassName: ""
          }
        ],
        circles: [
          {
            name: 'HIGH TRUST',
            color: '#F4ED31',
            nameClassName: ""
          },
          {
            name: 'LOW TRUST',
            color: '#527FC7',
            nameClassName: ""
          },
          {
            name: 'NO TRUST',
            color: '#F75A5B',
            nameClassName: ""
          },

        ],
        image: '',
        imagestyle: "", imageclassname: ""
      }

      sectionLearning[index].content = content

    }
    else if (sectionLearning[index].theme === "MeetSinglePerson") {
      let content = {
        personName: "", body: "", question: "", bottomText: "", color_1: "", color_2: "", image: '',
        imagestyle: "", imageclassname: "", personclassname: "", bottomclassName: "",
        bodyclassname: "", questionclassname: ""
      }
      sectionLearning[index].content = content
    }

    else if (sectionLearning[index].theme === "AudioQuizScreen") {

      let content = {
        feelingsDataList: [
          {
            questions: 'Can Tilli trust herself?',
            results: [],
            nameClassName: ""
          },
          {
            questions: 'Why do you think so?',
            results: [],
            nameClassName: ""
          },
          {
            questions: 'What about you? Can you trust yourself?',
            results: [],
            nameClassName: ""
          },
        ],
        changeColorBox: "",
        image: "",
        imagestyle: "", imageclassname: ""
      }
      sectionLearning[index].content = content
    }
    else if (sectionLearning[index].theme === "DropToSelection") {
      let content = {
        text1: "",
        text2: "",
        circles: [
          {
            name: 'HIGH TRUST',
            color: '#F4ED31',
            isCorrectanswer: false,
          },
          {
            name: 'LOW TRUST',
            color: '#527FC7',
            isCorrectanswer: false,
          },
          {
            name: 'NO TRUST',
            color: '#F75A5B',
            isCorrectanswer: false,
          },
        ],
        image: '',
        message: {
          failure_header_1: "Are you sure?", failure_body_1: "Think again!", failure_button_1: "Try again",
          failure_header_2: "Ooops",
          failure_body_2: "No one is allowed to touch you in a way that makes you feel uncomfortable. Even if they are family. Your body is yours and Tilli should say no to Aunty Nita’s hugs. If the way someone touches you is not okay, usually your Gut Feeling will give you a signal.",
          failure_button_2: "Try again",
          success_header_1: "Awesome Job!", success_body_1: "You just helped Tilly learn how to listen to her inner voice. You have also added a new tool to your saefty toolbox.",
          success_button_1: " Unlock Learning Point!",
          success_header_2: "Learning Point", success_body_2: "No one is allowed to touch you in a way that makes you feel uncomfortable. Even if they are family. Your body is yours and Tilli should say no to Aunty Nita’s hugs. If the way someone touches you is not okay, usually your Gut Feeling will give you a signal.",
          success_button_2: "Next Story"
        },
        changeColorStoryBox: "",
        ChangeColorQuestionBox: "",
        numberOfPoints: "",
        learningPoint: "",
        correctAnswermsg: "",
        wrongAnswermsg: "",
        imageBgColor: "",
        imagestyle: "", imageclassname: ""
      };

      sectionLearning[index].content = content
    }
    else if (sectionLearning[index].theme === "SingleTextImage") {
      let content = {
        text: 'Hi! It’s me Tilly.I need some help with knowing who to Trust.',
        image: '',
        bottomtext: "Let’s Go!",
        imagestyle: "", imageclassname: "", textClassName: "", bottomClassName: ""
      }
      sectionLearning[index].content = content
    }
    else if (sectionLearning[index].theme === "Ask Age") {
      let content = {
        question: '',
        image: '',
        imagestyle: "", imageclassname: "",
        questionClassName: "",
        question_2: "",
        question_2_ClassName: "",
        chooseType_1: "",
        chooseType_1_ClassName: "",
      }
      sectionLearning[index].content = content
    }
    else if (sectionLearning[index].theme === "Ask Gender") {
      let content = {
        question: '',
        image: '',
        question_2: "",
        askGirl: "",
        imagestyle: "", imageclassname: "", questionClassName: "", question_2_ClassName: "",
        chooseType_1: "", chooseType_1_ClassName: "",
        chooseType_2: "", chooseType_2_ClassName: "",
        chooseType_3: "", chooseType_3_ClassName: "",

      }
      sectionLearning[index].content = content
    }

    if (e.json.themeType === "Dynamic") {
      let themeId = e.json.id;
      let postJson = { themeId };
      let responseData = await doConnect("getThemeContent", "POST", postJson);
      responseData = JSON.parse(responseData)
      let layers = [];
      if (responseData.response !== null) {
        layers = JSON.parse(responseData.response);
      }

      if (sectionTab === "learning") {
        sectionLearning[index].layers = layers;
      }
      this.setState({
        sectionLearning
      })
    }
    else if (e.json.themeType === "godot") {
      sectionLearning[index].gameFileInfo = {}
      let getFileName = e.json.gameFile.fileName;
      getFileName = getFileName.split(".")
      if (Array.isArray(getFileName)) {
        let gameId = getFileName[0]
        let themeId = e.json.id
        sectionLearning[index].gameFileInfo = { gameId, themeId }
      }
      this.setState({
        sectionLearning
      })
    }
    else {
      this.setState({
        sectionLearning
      }, () => {
        this.historyCapture();
      })
    }

  }




  return_Content_doublebox(Select, index_1) {
    const { LevelStage_1, dummyOptionSelect, ImageValidate, contentText, contentTextValidate, sectionLearning } = this.state;
    var found_index = LevelStage_1.findIndex((a) =>
      a.theme === Select
    )


    let imageOptions = this.getImageOption()


    let checkindex = imageOptions.findIndex(x => x.json.id === sectionLearning[index_1].content.image.id);
    if (checkindex !== "-1") {
      //console.log('checkindex',imageOptions[checkindex])
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
      setValue={(value) => {
        this.setState({
          sectionLearning: value
        }, () => {
          this.historyCapture();
        })
      }}
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
      setValue={(value) => {
        this.setState({
          sectionLearning: value
        }, () => {
          this.historyCapture();
        })
      }}
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
      setValue={(value) => {
        this.setState({
          sectionLearning: value
        }, () => {
          this.historyCapture();
        })
      }}
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
      setValue={(value) => {
        this.setState({
          sectionLearning: value
        }, () => {
          this.historyCapture();
        })
      }}
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
      setValue={(value) => {
        this.setState({
          sectionLearning: value
        }, () => {
          this.historyCapture();
        })
      }}
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
    const { sectionLearning, themeIndex } = this.state;

    if (type === "Down") {
      let value = [...sectionLearning]
      value[index] = sectionLearning[index + 1]
      value[index + 1] = sectionLearning[index]
      this.setState({
        sectionLearning: value,
        themeIndex: themeIndex + 1
      }, () => {
        this.historyCapture();
      })
    } else if (type === "Up") {
      let value = [...sectionLearning]
      value[index] = sectionLearning[index - 1]
      value[index - 1] = sectionLearning[index]
      this.setState({
        sectionLearning: value,
        themeIndex: themeIndex - 1
      }, () => {
        this.historyCapture();
      })
    }

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


  StoryCardReturnData(fullData, jindex) {
    const { sectionBuildStory, storyCardTab } = this.state

    let dataContentReturn = ""
    let imageOptions = this.getImageOption()

    dataContentReturn = <div className="my-3">
      <div className="tabs">
        <div className={`tab ${storyCardTab === "meetPerson" ? "active" : ""}`} onClick={() => this.setState({
          storyCardTab: "meetPerson"
        })}>
          Meet Person
        </div>
        <div className={`tab ${storyCardTab === "audioQuiz" ? "active" : ""}`} onClick={() => this.setState({
          storyCardTab: "audioQuiz"
        })}>
          Audio Quiz
        </div>
        <div className={`tab ${storyCardTab === "circleWithInfo" ? "active" : ""}`} onClick={() => this.setState({
          storyCardTab: "circleWithInfo"
        })}>
          Circle With info
        </div>
      </div>
      <div className="p-2" style={{ border: '1px solid #d9edf7' }}>
        {
          storyCardTab === "meetPerson" && <ModuleMeetSinglePerson
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
            setValue={(value) => {
              this.setState({
                sectionLearning: value
              }, () => {
                this.historyCapture();
              })
            }}
          />
        }

        {
          storyCardTab === "audioQuiz" && <ModuleAudioQuizScreen
            LevelStage={sectionBuildStory[jindex]}
            index_1={0}
            found_index={0}
            // Contentdata={sectionBuildStory[jindex].themeData}
            sectionBuildStory={sectionBuildStory}
            loopIndex={jindex}
            staticIndex={1}
            themeType={sectionBuildStory[jindex].theme}
            option={imageOptions}
            setValue={(value) => {
              this.setState({
                sectionLearning: value
              }, () => {
                this.historyCapture();
              })
            }}
          />
        }
        {
          storyCardTab === "circleWithInfo" && <ModuleCircleWithInfoAnimations
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
            setValue={(value) => {
              this.setState({
                sectionLearning: value
              }, () => {
                this.historyCapture();
              })
            }}
          />
        }
      </div>
    </div>

    return dataContentReturn

  }



  storyCardRemove(value) {
    const { sectionBuildStory } = this.state;
    console.log(value)
    delete sectionBuildStory[value]
    let { storySelectAudioFiles } = this.state
    let RemoveData = sectionBuildStory.filter(function (el) {
      return el !== null;
    });

    if (storySelectAudioFiles[value]) {
      delete storySelectAudioFiles[value];
      let newObj = {}
      Object.keys(storySelectAudioFiles).map((key, index) => {
        newObj[index] = {}
        newObj[index] = { ...storySelectAudioFiles[key] }
        return true;
      })
      storySelectAudioFiles = newObj
    }


    this.setState({
      sectionBuildStory: RemoveData,
      storySelectAudioFiles
    }, () => {
      this.historyCapture();
    })

  }

  storySwaping(index, type) {
    const { sectionBuildStory, storyThemeSelect } = this.state;

    //alert(type)

    if (type === "Down") {

      let value = [...sectionBuildStory]
      let themeValue = [...storyThemeSelect]

      console.log('index', index)
      console.log('Move index', index + 1)
      // console.log(index, "--", sectionBuildStory[index])
      // console.log(index + 1, "--", sectionBuildStory[index + 1])

      value[index] = sectionBuildStory[index + 1]
      value[index + 1] = sectionBuildStory[index]
      themeValue[index] = storyThemeSelect[index + 1]
      themeValue[index + 1] = storyThemeSelect[index]
      this.setState({
        sectionBuildStory: value,
        storyThemeSelect: themeValue
      }, () => {
        this.historyCapture();
      })

    }

    if (type === "Up") {
      let value = [...sectionBuildStory]
      let themeValue = [...storyThemeSelect]

      console.log('index', index)
      console.log('Move index', index - 1)

      value[index] = sectionBuildStory[index - 1]
      value[index - 1] = sectionBuildStory[index]
      themeValue[index] = storyThemeSelect[index - 1]
      themeValue[index - 1] = storyThemeSelect[index]
      this.setState({
        sectionBuildStory: value,
        storyThemeSelect: themeValue
      }, () => {
        this.historyCapture();
      })
    }

  }

  contentRefilData(e, index) {
    const { sectionBuildStory, storyThemeSelect } = this.state;
    sectionBuildStory[index].theme = e.label
    sectionBuildStory[index].themeType = e.themeType;
    storyThemeSelect[index] = e;
    let contentStoryData = ""

    let storyCardTab = "meetPerson";
    if (e.label === "StoryCard") {
      contentStoryData = [
        {
          title: '',
          theme: 'MeetSinglePerson',
          content: {
            personName: "",
            body: "",
            question: "",
            bottomText: "", color_1: "", color_2: "", image: '',
            chooseType: {}, video: "",
            imagestyle: "", imageclassname: "",
            personclassname: "", bottomclassName: "",
            bodyclassname: "", questionclassname: ""
          },
        },

        {
          title: 'Tilly',
          theme: 'AudioQuizScreen',
          content: {
            feelingsDataList: [
              {
                questions: 'Can Tilli trust herself?',
                results: [],
                nameClassName: ""
              },
              {
                questions: 'Why do you think so?',
                results: [],
                nameClassName: ""
              },
              {
                questions: 'What about you? Can you trust yourself?',
                results: [],
                nameClassName: ""
              },
            ],
            changeColorBox: "",
            image: "",
            imagestyle: "", imageclassname: ""
          },
        },

        {
          title: 'TRUST CIRCLE',
          theme: 'DropToSelection',
          content: {
            text1: "",
            text2: "",
            storyclassName: "",
            questionclassName: "",
            circles: [
              {
                name: 'HIGH TRUST',
                color: '#F4ED31',
                isCorrectanswer: false,
              },
              {
                name: 'LOW TRUST',
                color: '#527FC7',
                isCorrectanswer: false,
              },
              {
                name: 'NO TRUST',
                color: '#F75A5B',
                isCorrectanswer: false,
              },
            ],
            image: '',
            message: {
              failure_header_1: "Are you sure?", failure_body_1: "Think again!", failure_button_1: "Try again",
              failure_header_2: "Ooops",
              failure_body_2: "No one is allowed to touch you in a way that makes you feel uncomfortable. Even if they are family. Your body is yours and Tilli should say no to Aunty Nita’s hugs. If the way someone touches you is not okay, usually your Gut Feeling will give you a signal.",
              failure_button_2: "Try again",
              success_header_1: "Awesome Job!", success_body_1: "You just helped Tilly learn how to listen to her inner voice. You have also added a new tool to your saefty toolbox.",
              success_button_1: " Unlock Learning Point!",
              success_header_2: "Learning Point", success_body_2: "No one is allowed to touch you in a way that makes you feel uncomfortable. Even if they are family. Your body is yours and Tilli should say no to Aunty Nita’s hugs. If the way someone touches you is not okay, usually your Gut Feeling will give you a signal.",
              success_button_2: "Next Story"
            },
            changeColorStoryBox: "",
            ChangeColorQuestionBox: "",
            numberOfPoints: "",
            learningPoint: "",
            correctAnswermsg: "",
            wrongAnswermsg: "",
            imageBgColor: "",
            imagestyle: "", imageclassname: ""
          },
        },
      ]
    } else if (e.label === "Ask Age") {
      let content = {
        question: '',
        image: '',
        imagestyle: "", imageclassname: "",
        questionClassName: "",
        question_2: "",
        question_2_ClassName: "",
        chooseType_1: "",
        chooseType_1_ClassName: "",
      }
      contentStoryData = content
    } else if (e.label === "Ask Gender") {
      let content = {
        question: '',
        image: '',
        question_2: "",
        askGirl: "",
        imagestyle: "", imageclassname: "", questionClassName: "", question_2_ClassName: "",
        chooseType_1: "", chooseType_1_ClassName: "",
        chooseType_2: "", chooseType_2_ClassName: "",
        chooseType_3: "", chooseType_3_ClassName: "",

      }
      contentStoryData = content
    } else if (e.label === "Dynamic Theme") {
      contentStoryData = {
        themes: [{
          theme: ""
        }]
      }
      storyCardTab = 0
    }

    sectionBuildStory[index].content = contentStoryData
    this.setState({
      sectionBuildStory,
      storyThemeSelect,
      storyCardTab
    }, () => {
      this.historyCapture();
    })
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
      setValue={(value) => {
        this.setState({
          sectionLearning: value
        }, () => {
          this.historyCapture();
        })
      }}
    />
  }


  askAgereturn(Value, index) {
    const { sectionLearning, } = this.state;
    let imageOptions = this.getImageOption()
    return <AskAge
      option={imageOptions}
      index={index}
      sectionLearning={sectionLearning}
      themeName={Value}
      setValue={(value) => {
        this.setState({
          sectionLearning: value
        }, () => {
          this.historyCapture();
        })
      }}
    />
  }

  askGenderReturn(Value, index) {
    const { sectionLearning, } = this.state;
    let imageOptions = this.getImageOption()
    return <AskGender
      option={imageOptions}
      index={index}
      sectionLearning={sectionLearning}
      themeName={Value}
      setValue={(value) => {
        this.setState({
          sectionLearning: value
        }, () => {
          this.historyCapture();
        })
      }}
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
      setValue={(value) => {
        this.setState({
          sectionLearning: value
        }, () => {
          this.historyCapture();
        })
      }}
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
      setValue={(value) => {
        this.setState({
          sectionLearning: value
        }, () => {
          this.historyCapture();
        })
      }}
    />
  }

  async changeStoryTheme(index, themeIndex, e) {
    let { sectionBuildStory } = this.state;
    let themeId = e.json.id;
    let getThemeType = e.json.themeType;
    if (getThemeType === "godot") {
      sectionBuildStory[index].content.themes[themeIndex].theme = e.label;
      if (sectionBuildStory[index].content.themes[themeIndex].layers) {
        delete sectionBuildStory[index].content.themes[themeIndex].layers
      }
      sectionBuildStory[index].content.themes[themeIndex].themeType = "godot"
      sectionBuildStory[index].content.themes[themeIndex].gameFileInfo = {}
      let getFileName = e.json.gameFile.fileName;
      getFileName = getFileName.split(".")
      if (Array.isArray(getFileName)) {
        let gameId = getFileName[0]
        let themeId = e.json.id
        sectionBuildStory[index].content.themes[themeIndex].gameFileInfo = { gameId, themeId }
      }
      this.setState({
        sectionBuildStory
      })
    } else {
      if (sectionBuildStory[index].content.themes[themeIndex] && sectionBuildStory[index].content.themes[themeIndex].themeType) {
        delete sectionBuildStory[index].content.themes[themeIndex].themeType
        delete sectionBuildStory[index].content.themes[themeIndex].gameFileInfo
      }
      let postJson = { themeId };
      let responseData = await doConnect("getThemeContent", "POST", postJson);
      let layers = [];
      if (responseData.response !== null) {
        layers = JSON.parse(responseData.response);
      }
      sectionBuildStory[index].content.themes[themeIndex].theme = e.label;
      sectionBuildStory[index].content.themes[themeIndex].layers = layers;
      this.setState({
        sectionBuildStory
      })
    }

  }

  buildContent() {
    let { OptionData, themeOptions, sectionLearning, sectionBuildStory, storyThemeSelect, sectionTab, themeIndex, storyCardTab, sectionAudioSelected, storySelectAudioFiles, apiPostOptions } = this.state;
    let returnContent;
    if (sectionTab === "learning" && sectionLearning.length > 0) {
      let index = themeIndex;
      let chooseDataview = "";
      let selectBoxConditon = "";
      console.log(sectionLearning[index])
      if (!sectionLearning[index]) {
        return false
      }
      if (sectionLearning[index].theme === "DoubleBoxOverlapWithImage" || sectionLearning[index].theme === "DoubleBoxUnderWithImage") {
        if (sectionLearning[index].content.chooseType && sectionLearning[index].content.chooseType.label === "Image") {
          let imageOptions = this.getImageOption()
          chooseDataview = <>
            <div className="mt-2">
              <label htmlFor="text">Image</label>
              <DropDown
                selectedOption={sectionLearning[index].content.image.title ?
                  { label: sectionLearning[index].content.image.title, value: sectionLearning[index].content.image.title } : []}
                onChange={(e) => {
                  sectionLearning[index].content.image = e.json;

                  this.setState({
                    sectionLearning
                  }, () => {
                    this.historyCapture();
                  })
                  // console.log('this',sectionLearning[index])
                }}
                options={imageOptions}
              />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errorimage}</span>
            </div>
            <div className="mt-2">
              <label htmlFor="text">Image Style</label>
              <textarea rows="1" cols="50" className="form-control" placeholder="style"
                value={sectionLearning[index].content.imagestyle}
                onChange={e => {
                  sectionLearning[index].content.imagestyle = e.target.value;
                  this.setState({
                    sectionLearning
                  }, () => {
                    this.historyCapture();
                  })
                }}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="text">Image ClassName</label>
              <ClassNameSelect
                value={sectionLearning[index].content.imageclassname}
                onChange={e => {
                  sectionLearning[index].content.imageclassname = e;
                  this.setState({
                    sectionLearning
                  }, () => {
                    this.historyCapture();
                  })
                }}
              />
            </div>
          </>

          selectBoxConditon = <>

            <div>
              <label htmlFor="Text">Text</label>
              <EditorContent
                text={sectionLearning[index].content.text}
                index={index}
                sectionLearning={sectionLearning}
                textOnchange={(value) => {
                  sectionLearning[index].content.text = value
                  this.setState({
                    sectionLearning
                  }, () => {
                    this.historyCapture();
                  })
                }}
              />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errortext}</span>
            </div>

            <div className="mt-2">
              <label htmlFor="Text">Class Name</label>

              <ClassNameSelect
                value={sectionLearning[index].content.nameClassName}
                onChange={e => {
                  sectionLearning[index].content.nameClassName = e;
                  this.setState({
                    sectionLearning
                  }, () => {
                    this.historyCapture();
                  })
                }}
              />
            </div>
          </>

        }
        else if (Object.keys(sectionLearning[index]).length !== 0 && sectionLearning[index].content.chooseType && sectionLearning[index].content.chooseType.label === "Video") {
          chooseDataview = <>
            <div className="mt-2">
              <label htmlFor="Video">Video</label>
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
          <div className="mt-2">
            <label htmlFor="Color">Background Color</label>
            <input type="color" className="form-control" id="Color" value={sectionLearning[index].content.color} placeholder="Color" onChange={(e) => {
              sectionLearning[index].content.color = e.target.value
              this.setState({
                sectionLearning
              }, () => {
                this.historyCapture();
              })
            }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errorcolor}</span>
          </div>

          <div className="mt-2">
            <label htmlFor="text">Select</label>
            <DropDown
              selectedOption={sectionLearning[index].content.chooseType}
              onChange={(e) => {
                sectionLearning[index].content.chooseType = e;

                this.setState({
                  sectionLearning
                }, () => {
                  this.historyCapture();
                })
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
            <label htmlFor="BoxBgColor_1">BoxBg Color 1</label>
            <input type="text" className="form-control" id="BoxBgColor_1"
              value={sectionLearning[index].content.boxBgColor_1} placeholder="BoxBgColor1" onChange={(e) => {
                sectionLearning[index].content.boxBgColor_1 = e.target.value
                this.setState({
                  sectionLearning
                }, () => {
                  this.historyCapture();
                })
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errorcolor}</span>
          </div>

          <div className="col-sm-3 topalign">
            <label htmlFor="BoxBgColor_1">BoxBg Color 2</label>
            <input type="text" className="form-control" id="BoxBgColor_2"
              value={sectionLearning[index].content.boxBgColor_2} placeholder="BoxBgColor2" onChange={(e) => {
                sectionLearning[index].content.boxBgColor_2 = e.target.value
                this.setState({
                  sectionLearning
                }, () => {
                  this.historyCapture();
                })
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errorcolor}</span>
          </div>

          <div className="col-sm-3 topalign">
            <label htmlFor="text">Select</label>
            <DropDown
              selectedOption={sectionLearning[index].content.chooseType}
              onChange={(e) => {
                sectionLearning[index].content.chooseType = e;

                this.setState({
                  sectionLearning
                }, () => {
                  this.historyCapture();
                })
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
      else if (sectionLearning[index].theme === "Ask Age") {
        ThemeChooseData = <> {this.askAgereturn(sectionLearning[index].theme, index)}  </>
      }
      else if (sectionLearning[index].theme === "Ask Gender") {
        ThemeChooseData = <> {this.askGenderReturn(sectionLearning[index].theme, index)}  </>
      }

      if (sectionLearning[index].themeType === "godot") {
        ThemeChooseData = <>
          <div className='zipfile-center'><i class="fa fa-file-zip-o"></i></div>
        </>
      }

      returnContent = <div className="panel panel-info" style={{ height: 780, overflowY: 'auto' }}>
        <div className="panel-heading">
          <div className="row" style={{ padding: 20, }}>
            <div className="col-sm-1"> Theme </div>
            {/* {JSON.stringify(sectionLearning[index].theme)} */}
            <div className="col-sm-4">
              <DropDown
                selectedOption={sectionLearning[index].theme ? { label: sectionLearning[index].theme, value: sectionLearning[index].theme }
                  : []}
                onChange={(e) => {
                  this.changeTheme(index, e)
                }}
                options={themeOptions}
              />
              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].errorTheme}</span>
            </div>
            <div className="col-sm-2">

              {this.state.imageView[index] && this.state.imageView[index] ?
                <img className={"img-responsive"}
                  style={{ width: '100%', height: 100 }}
                  src={MyConstant.keyList.apiURL + 'vp?action=module&key=' + this.state.imageView[index].json.image.fileName + '&id=' + this.state.imageView[index].json.image.fileType}
                  alt={'loading'}
                  onClick={() => {
                    this.setState({ imageBigView: this.state.imageView[index], displayImage: 'block' })
                  }} />
                : null}

            </div>
            <div className="col-sm-4 d-flex">
              <div style={{ fontWeight: "bold", color: "#00008b" }}> Theme {index + 1}</div>
              <div className="pl-2" >
                {index === '0' && sectionLearning.length - 1 !== 0 ?
                  <React.Fragment>
                    <span onClick={() => { this.indexChange(index, "Down") }} >
                      <i className="fa fa-arrow-down" aria-hidden="true" style={{ fontSize: 25, color: "black", cursor: "pointer", }}></i>
                    </span>
                  </React.Fragment>
                  : sectionLearning.length - 1 !== 0 && sectionLearning.length - 1 === index ?
                    <React.Fragment>
                      <span onClick={() => { this.indexChange(index, "Up") }}>
                        <i className="fa fa-arrow-up" aria-hidden="true" style={{ fontSize: 25, color: "black", cursor: "pointer", }}></i>

                      </span>
                    </React.Fragment>
                    : sectionLearning.length - 1 !== 0 ? <React.Fragment>
                      <span style={{ padding: 4 }} onClick={() => { this.indexChange(index, "Up") }}>
                        <i className="fa fa-arrow-up" aria-hidden="true" style={{ fontSize: 25, color: "black", cursor: "pointer", }}></i>
                      </span>
                      <span style={{ padding: 4 }} onClick={() => { this.indexChange(index, "Down") }}>

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

          {sectionLearning[index].themeType && sectionLearning[index].themeType === "Dynamic" && <div className='row pl-4'>
            <div className="col-sm-4">
              <div className='form-group'>
                <div> Background Audio</div>
                <DropDown
                  selectedOption={sectionAudioSelected[index] ? sectionAudioSelected[index] : []}
                  onChange={(e) => {
                    sectionAudioSelected[index] = {}
                    sectionAudioSelected[index] = { ...e }
                    let backgroundAudio = e.json.previewAudioPath
                    sectionLearning[index].backgroundAudio = backgroundAudio;
                    this.setState({ sectionLearning, sectionAudioSelected })
                  }}
                  options={this.state.audioFiles}
                />
              </div>
            </div>
          </div>}


          {sectionLearning[index].themeType && sectionLearning[index].themeType === "Dynamic" && <div className='row pl-4'>
            <div className="col-sm-4">
              <div className='form-group'>
                <div> Is this Emotion page?</div>
                <DropDown
                  selectedOption={apiPostOptions.filter((e) => { return e.value === sectionLearning[index].apiPredict })}
                  onChange={(e) => {
                    sectionLearning[index].apiPredict = e.value
                    this.setState({ sectionLearning, })
                  }}
                  options={apiPostOptions}
                />
              </div>
            </div>
            {typeof (sectionLearning[index].apiPredict) !== "undefined" && sectionLearning[index].apiPredict !== "" && <div className="col-sm-3 mt-3">
              <button className='btn btn-primary' onClick={() => {
                delete sectionLearning[index].apiPredict
                this.setState({ sectionLearning, })
              }}>Rest emotion</button>
            </div>}
          </div>}

        </div>
        <div className="panel-body">
          {
            sectionLearning[index].themeType === "Dynamic" ? <div>
              {
                sectionLearning[index].layers !== undefined && sectionLearning[index].layers.length > 0 && <div>
                  {
                    sectionLearning[index].layers.map((layer, themeIndex) => {
                      return <div className="" key={themeIndex}>
                        {
                          this.buildDesign(sectionLearning[index].layers, layer, themeIndex)
                        }
                      </div>
                    })
                  }
                </div>
              }
            </div> :
              <React.Fragment>
                <div className="row" style={{ padding: 20, }}>
                  <div className="col-sm-1 "> Title </div>
                  <div className="col-sm-7">
                    <EditorContent
                      text={sectionLearning[index].title}
                      themeType={"TitleText"}
                      index={index}
                      sectionLearning={sectionLearning}
                      textOnchange={(value) => {
                        sectionLearning[index].title = value
                        this.setState({
                          sectionLearning
                        }, () => {
                          this.historyCapture();
                        })
                      }}
                    />

                    {sectionLearning[index].title.length === 0 ?
                      <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].errorTitle}</span>
                      : null}

                  </div>
                </div>
                {ThemeChooseData}
              </React.Fragment>
          }
        </div>
      </div>
    } else if (sectionTab === "storyFlow" && sectionBuildStory.length > 0) {
      let jindex = themeIndex;
      let titleContentVew = "";
      let storyCardContent = "";
      if (!sectionBuildStory[jindex]) {
        return false
      }
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
                <>
                  <EditorContent text={sectionBuildStory[jindex].title} themeType={sectionBuildStory[jindex].theme}
                    index={jindex}
                    sectionBuildStory={sectionBuildStory}
                    textOnchange={(value) => {
                      sectionBuildStory[jindex].title = value
                      this.setState({
                        sectionBuildStory
                      }, () => {
                        this.historyCapture();
                      })
                    }}

                  />
                </>
                :
                <input type={'text'} className={'form-control'} value={sectionBuildStory[jindex].title} placeholder={'Enter Title'} style={{ width: '100%' }}
                  onChange={(e) => {
                    sectionBuildStory[jindex].title = e.target.value
                    this.setState({
                      sectionBuildStory
                    }, () => {
                      this.historyCapture();
                    })
                  }} />}

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
                this.setState({
                  sectionBuildStory
                }, () => {
                  this.historyCapture();
                })

              }} /> </div>


            <div className="col-sm-2"></div>
            <div className="col-sm-1"> <p style={{ fontWeight: "bold", color: "#00008b" }}> Theme {jindex + 1}</p> </div>
            <div className="col-sm-1">
              {jindex === '0' && sectionBuildStory.length - 1 !== 0 ?
                <React.Fragment>
                  <span onClick={() => {
                    this.storySwaping(jindex, "Down")
                  }} >
                    <i className="fa fa-arrow-down" aria-hidden="true" style={{ fontSize: 25, color: "black", cursor: "pointer", }}></i>
                  </span>
                </React.Fragment>
                : sectionBuildStory.length - 1 !== 0 && sectionBuildStory.length - 1 === jindex ?
                  <React.Fragment>
                    <span
                      onClick={() => {

                        this.storySwaping(jindex, "Up")
                      }}>
                      <i className="fa fa-arrow-up" aria-hidden="true" style={{ fontSize: 25, color: "black", cursor: "pointer", }}></i>

                    </span>
                  </React.Fragment>
                  : sectionBuildStory.length - 1 !== 0 ? <React.Fragment>
                    <span style={{ padding: 4 }} onClick={() => {
                      this.storySwaping(jindex, "Up")
                    }}>
                      <i className="fa fa-arrow-up" aria-hidden="true" style={{ fontSize: 25, color: "black", cursor: "pointer", }}></i>
                    </span>
                    <span style={{ padding: 4 }} onClick={() => {
                      this.storySwaping(jindex, "Down")
                    }}>
                      <i className="fa fa-arrow-down" aria-hidden="true" style={{ fontSize: 25, color: "black", cursor: "pointer", }}></i>
                    </span>
                  </React.Fragment>
                    : null

              }

            </div>

            <div className="col-sm-1" style={{ cursor: "pointer" }} onClick={() => {
              this.storyCardRemove(jindex)
            }} >  <i className="fa fa-close" style={{ fontSize: 20, color: "#FFF", backgroundColor: "#f95a2b", padding: 5, cursor: "pointer" }}></i> </div>

          </div>
        </>
      }

      returnContent = <div className="panel panel-info" style={{ height: 780, overflowY: 'auto' }}>
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
                options={[{ value: 'Dynamic Theme', label: 'Dynamic Theme', themeType: "Dynamic" }, { value: 'StoryCard', label: 'StoryCard', themeType: "Static" }, { value: 'Ask Age', label: 'Ask Age', themeType: "Static" }, { value: 'Ask Gender', label: 'Ask Gender', themeType: "Static" }]}
              />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionBuildStory[jindex].errortheme}</span>
            </div>
          </div>
        </div>
        <div className="panel-body">
          {
            sectionBuildStory[jindex].themeType === "Dynamic" ? <React.Fragment>
              <div className="row">
                <div className="col-12">
                  <button className="btn btn-success" onClick={() => {
                    sectionBuildStory[jindex].content.themes.push({ theme: "" })
                    this.setState({
                      sectionBuildStory
                    })
                  }}>Add Theme</button>
                </div>
              </div>
              <div className="my-3">
                <div className="tabs">
                  {
                    sectionBuildStory[jindex].content && sectionBuildStory[jindex].content.themes.map((theme, themeIndex) => {
                      return <div key={themeIndex} className={`tab ${storyCardTab === themeIndex ? "active" : ""}`} onClick={() => this.setState({
                        storyCardTab: themeIndex
                      })}>
                        Theme {themeIndex + 1}
                      </div>
                    })
                  }
                </div>
                <div className="p-2" style={{ border: '1px solid #d9edf7' }}>
                  <DropDown
                    selectedOption={(sectionBuildStory[jindex].content !== undefined && sectionBuildStory[jindex].content.themes !== undefined) ? { label: sectionBuildStory[jindex].content.themes[storyCardTab].theme, value: sectionBuildStory[jindex].content.themes[storyCardTab].theme } : []}
                    onChange={(e) => {
                      this.changeStoryTheme(jindex, storyCardTab, e)
                    }}
                    options={themeOptions}
                  />
                  {sectionBuildStory[jindex].content && sectionBuildStory[jindex].content.themes !== undefined && sectionBuildStory[jindex].content.themes[storyCardTab] && sectionBuildStory[jindex].content.themes[storyCardTab].themeType === "Dynamic" && <div className="mt-2 mb-2">
                    <div className='form-group'>
                      <div> Background Audio</div>
                      <DropDown
                        selectedOption={storySelectAudioFiles[jindex] && storySelectAudioFiles[jindex][storyCardTab] ? storySelectAudioFiles[jindex][storyCardTab] : []}
                        onChange={(e) => {
                          storySelectAudioFiles[jindex] = {}
                          storySelectAudioFiles[jindex][storyCardTab] = { ...e }
                          let backgroundAudio = e.json.previewAudioPath
                          sectionBuildStory[jindex].content.themes[storyCardTab].backgroundAudio = backgroundAudio;
                          this.setState({ sectionBuildStory, storySelectAudioFiles })
                        }}
                        options={this.state.audioFiles}
                      />
                    </div>
                  </div>}

                  {sectionBuildStory[jindex].content && sectionBuildStory[jindex].content.themes !== undefined && sectionBuildStory[jindex].content.themes[storyCardTab] && sectionBuildStory[jindex].content.themes[storyCardTab].themeType === "Dynamic" && <div className="mt-2 mb-2 row">
                    <div className='col-sm-6 form-group'>
                      <div> Is this Emotion page?</div>
                      <DropDown
                        selectedOption={(sectionBuildStory[jindex].content !== undefined && sectionBuildStory[jindex].content.themes !== undefined && sectionBuildStory[jindex].content.themes[storyCardTab] !== undefined) ? apiPostOptions.filter((e) => { return e.value === sectionBuildStory[jindex].content.themes[storyCardTab].apiPredict }) : []}
                        onChange={(e) => {
                          sectionBuildStory[jindex].content.themes[storyCardTab].apiPredict = e.value;
                          this.setState({ sectionBuildStory, storySelectAudioFiles })
                        }}
                        options={apiPostOptions}
                      />
                    </div>

                    {typeof (sectionBuildStory[jindex].content.themes[storyCardTab].apiPredict) !== "undefined" && sectionBuildStory[jindex].content.themes[storyCardTab].apiPredict !== "" && <div className="col-sm-3 mt-3">
                      <button className='btn btn-primary' onClick={() => {
                        delete sectionBuildStory[jindex].content.themes[storyCardTab].apiPredict
                        this.setState({ sectionBuildStory, })
                      }}>Rest emotion</button>
                    </div>}
                  </div>}


                  <div>
                    {
                      (sectionBuildStory[jindex].content && sectionBuildStory[jindex].content.themes !== undefined && sectionBuildStory[jindex].content.themes[storyCardTab] !== undefined && sectionBuildStory[jindex].content.themes[storyCardTab].layers !== undefined) && sectionBuildStory[jindex].content.themes[storyCardTab].layers.length > 0 && <div>
                        {
                          sectionBuildStory[jindex].content.themes[storyCardTab].layers.map((layer, themeIndex) => {
                            return <div className="" key={themeIndex}>
                              {
                                this.buildDesign(sectionBuildStory[jindex].content.themes[storyCardTab].layers, layer, themeIndex)
                              }
                            </div>
                          })
                        }
                      </div>
                    }
                    {
                      (sectionBuildStory[jindex].content && sectionBuildStory[jindex].content.themes !== undefined && sectionBuildStory[jindex].content.themes[storyCardTab] && sectionBuildStory[jindex].content.themes[storyCardTab].themeType && sectionBuildStory[jindex].content.themes[storyCardTab].themeType === "godot") && <div>
                        <div className='zipfile-center' style={{ top: "auto", left: "25%" }} ><i class="fa fa-file-zip-o"></i></div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </React.Fragment> : storyCardContent
          }
        </div>
      </div>
    }
    return returnContent;
  }

  setValue(layers) {
    let { sectionBuildStory, sectionLearning, sectionTab, themeIndex, storyCardTab } = this.state;
    if (sectionTab === "learning") {
      sectionLearning[themeIndex].layers = layers;
    } else if (sectionTab === "storyFlow") {
      sectionBuildStory[themeIndex].content.themes[storyCardTab].layers = layers;
    }

    this.setState({
      sectionLearning,
      sectionBuildStory
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
        default:
      }
    }
    return builder;
  }

  layerBuild(layer, index) {
    let builder;
    let { deviceHeight, deviceWidth } = this.state;
    switch (layer.type) {
      case "rectangle":
        builder = <div
          className={`layer`}
          style={{
            visibility: layer.visibility,
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
          }} key={index}
        >
        </div>
        break;
      case "groupedInput":
        builder = <GroupedInput deviceHeight={deviceHeight} index={index} layer={layer} />
        break;
      case "labelAnimation":
        builder = <LabelAnimation deviceHeight={deviceHeight} index={index} layer={layer} />
        break;
      case "dragAndDrop":
        builder = <DragAndDrop deviceHeight={deviceHeight} index={index} layer={layer} />
        break;
      case "ellipse":
        builder = <div
          className={`layer`}
          style={{
            visibility: layer.visibility,
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
          }} key={index}
        >
        </div>
        break;
      case "circle":
        builder = <div
          className={`layer`}
          style={{
            visibility: layer.visibility,
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
          }} key={index}
        >
        </div>
        break;
      case "text":
        builder = <div
          className={`layer`}
          style={{
            visibility: layer.visibility,
            position: "absolute",
            top: layer.y + "%",
            left: layer.x + "%",
            width: layer.width + "%",
            minHeight: parseInt((layer.height / 100) * deviceHeight) + "px",
          }} key={index} dangerouslySetInnerHTML={{ __html: layer.text }}
        >
        </div>
        break;
      case "image":
        builder = <div
          className={`layer`}
          style={{
            visibility: layer.visibility,
            position: "absolute",
            top: layer.y + "%",
            left: layer.x + "%",
            width: layer.width + "%",
            height: parseInt((layer.height / 100) * deviceHeight) + "px",
          }} key={index}
        >
          <img style={{ width: "100%", height: "100%" }} src={layer.image ? layer.image : drag_drop} alt="loading" />
        </div>
        break;
      case "video":
        builder = <div
          className={`layer`}
          style={{
            visibility: layer.visibility,
            position: "absolute",
            top: layer.y + "%",
            left: layer.x + "%",
            width: layer.width + "%",
            height: parseInt((layer.height / 100) * deviceHeight) + "px",
          }} key={index}
        >
          <video style={{ width: "100%", height: "100%" }} >
            <source src={layer.video ? layer.video : drag_drop} />
          </video>
        </div>
        break;
      default:
    }
    return builder;
  }

  buildIDEcontent() {
    const { sectionTab, sectionLearning, sectionBuildStory, themeIndex, storyCardTab } = this.state;
    let buildSection = sectionTab === "learning" ? sectionLearning : sectionBuildStory
    let content;
    if (buildSection.length > 0 && typeof buildSection[themeIndex] !== "undefined") {
      let stage = buildSection[themeIndex];
      let theme = stage.theme;
      let themeType = stage.themeType;
      if (themeType === "Dynamic") {
        if (buildSection[themeIndex].theme === "Dynamic Theme") {
          let theme = buildSection[themeIndex].content.themes[storyCardTab];
          let currentThemeType = false
          if (theme) {
            currentThemeType = buildSection[themeIndex].content.themes[storyCardTab].themeType;
          }
          if (theme.layers !== undefined) {
            content = <div>
              {
                theme.layers.map((layer, index) => {
                  return <div className="" key={index}>
                    {
                      this.layerBuild(layer, index)
                    }
                  </div>
                })
              }
            </div>
          }
          if (currentThemeType && currentThemeType === "godot") {
            return (<div className='zipfile-center'><i class="fa fa-file-zip-o"></i>
            </div>)
          }
        } else {
          if (buildSection[themeIndex].layers !== undefined) {
            content = <div>
              {
                buildSection[themeIndex].layers.map((layer, index) => {
                  return <div className="" key={index}>
                    {
                      this.layerBuild(layer, index)
                    }
                  </div>
                })
              }
            </div>
          }
        }
      }
      else if (themeType === "godot") {
        content = <>
          <div className='zipfile-center'><i class="fa fa-file-zip-o"></i>
          </div>
        </>
      }
      else {
        switch (theme) {
          case 'DoubleBoxOverlapWithImage':
            content = <div>
              <DoubleBoxOverlapWithImageTheme
                data={stage} />
            </div>
            break;
          case 'DoubleBoxUnderWithImage':
            content = <div>
              <DoubleBoxUnderWithImageTheme
                data={stage} />
            </div>
            break;
          case 'ImageWithThinking':
            content = <div>
              <ImageWithThinkingTheme
                data={stage} />
            </div>
            break;
          case 'QuestionsList':
            content = <div>
              <QuestionsListTheme
                data={stage} />
            </div>
            break;
          case 'ChooseCheckboxQuestions':
            content = <div>
              <ChooseCheckboxQuestionsTheme
                data={stage} />
            </div>
            break;
          case 'CircleWithInfoAnimations':
            content = <div>
              <CircleWithInfoAnimationsTheme
                data={stage} />
            </div>
            break;
          case 'IntroducePersons':
            content = <div>
              <IntroducePersonsTheme
                data={stage} />
            </div>
            break;
          case 'DropToSelection':
            content = <div>
              <DropToSelectionTheme
                data={stage} />
            </div>
            break;
          case 'AudioQuizScreen':
            content = <div>
              <AudioQuizScreenTheme
                data={stage} />
            </div>
            break;
          case 'MeetSinglePerson':
            content = <div>
              <MeetSinglePersonTheme
                data={stage} />
            </div>
            break;
          case 'StoryCard':
            content = <div>
              {
                storyCardTab === "meetPerson" && <MeetSinglePersonTheme
                  data={stage.content[0]} />
              }
              {
                storyCardTab === "audioQuiz" && <AudioQuizScreenTheme
                  themeType="StoryCard"
                  data={stage.content[1]} />
              }
              {
                storyCardTab === "circleWithInfo" && <DropToSelectionTheme
                  themeType="StoryCard"
                  data={stage.content[2]} />
              }

            </div>
            break;
          case 'SingleTextImage':
            content = <div>
              <SingleTextImageTheme
                data={stage} />
            </div>
            break;
          case 'Ask Gender':
            content = <div>
              <AskGenderTheme
                data={stage} />
            </div>
            break;
          case 'Ask Age':
            content = <div>
              <AskAgeTheme
                data={stage} />
            </div>
            break;
          default:
            break;
        }
      }
    }
    return content;
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

  undo() {
    let { history, historyRedo } = this.state;
    if (history.length > 0) {
      let lastElement = history[history.length - 1];
      let lastSecondElement = history[history.length - 2];
      if (lastSecondElement !== undefined) {
        let { sectionLearning, sectionBuildStory } = lastSecondElement;
        historyRedo.push(lastElement);
        history.splice(-1)

        this.setState({
          sectionLearning,
          sectionBuildStory,
          history,
          historyRedo
        })
      }
    }
  }

  redo() {
    let { history, historyRedo } = this.state;
    if (historyRedo.length > 0) {
      let lastElement = historyRedo[historyRedo.length - 1];
      let { sectionLearning, sectionBuildStory } = lastElement;
      history.push(lastElement);
      historyRedo.splice(-1)

      this.setState({
        sectionLearning,
        sectionBuildStory,
        history,
        historyRedo
      })
    }
  }

  preview() {
    let { sectionLearning, sectionBuildStory } = this.state;
    let stages = [];

    sectionLearning.map((theme) => {
      stages.push(theme)
      return true;
    })
    sectionBuildStory.map((theme) => {
      if (theme.theme === "Dynamic Theme") {
        let themes = theme.content.themes;
        themes.forEach((storyTheme) => {
          stages.push(storyTheme)
        })
      } else {
        stages.push(theme)
      }
      return true;
    })

    this.setState({
      previewModal: true,
      moduleJson: { stages }
    })

  }
  cloneModalOpen() {
    this.setState({
      cloneModal: true
    })
  }

  setThemeSelected(themeSelected, themeSelectedJson) {
    this.setState({
      themeSelected,
      themeSelectedJson
    })
  }

  clone() {
    let { themeSelectedJson, sectionLearning, sectionBuildStory } = this.state;
    Object.keys(themeSelectedJson).map((key) => {
      let json = themeSelectedJson[key];
      if (key.includes("theme-")) {
        sectionLearning.push(json);
      } else if (key.includes("story-")) {
        sectionBuildStory.push(json);
      }
      return true;
    })

    this.setState({
      cloneModal: false,
      sectionLearning,
      sectionBuildStory
    })
  }

  render() {
    const { sectionTab, sectionLearning, sectionBuildStory, themeIndex, previewModal, moduleJson, cloneModal, cloneLevelSelect } = this.state;
    let { welcomeScreenCheck } = this.state
    let levelOption = [];
    Object.keys(this.state.levelsJson).map((ival, index) => {
      let levelData = this.state.levelsJson[ival];
      levelOption.push({ value: levelData.id, label: levelData.name, })
      return true;
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
                          />

                          <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{this.state.errorlevelSelect}</span>
                        </div>
                        <div className="col-sm-6"> </div>
                      </div>

                      <div className="row item form-group" >
                        <div className="col-sm-5">Welcome Screen
                          <span className='ml-3'>
                            <input type={"checkbox"} checked={welcomeScreenCheck} onChange={(e) => {
                              welcomeScreenCheck = e.target.checked;
                              this.setState({ welcomeScreenCheck })
                            }} />
                          </span>
                        </div>
                      </div>

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
                            themeIndex: 0,
                            storyCardTab: sectionBuildStory[0] !== undefined ? (sectionBuildStory[0].theme === "Dynamic Theme" ? 0 : "meetPerson") : 0
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
                                  storyCardTab: sectionBuildStory[themeIndex] !== undefined ? (sectionBuildStory[themeIndex].label === "Dynamic Theme" ? 0 : "meetPerson") : ""
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

        {
          previewModal && <Modal
            visible={previewModal}
            closeModal={() => this.setState({ previewModal: false })}
            heading={`Preview`}
            body={<React.Fragment>
              <Preview moduleJson={moduleJson} />
            </React.Fragment>
            }
          />
        }
        {
          cloneModal && <Modal
            visible={cloneModal}
            size={"modal-lg"}
            closeModal={() => this.setState({ cloneModal: false })}
            heading={`Clone`}
            body={<React.Fragment>
              <div className="row">
                <div className="col-sm-4">Module</div>
                <div className="col-sm-8">
                  <DropDown
                    selectedOption={cloneLevelSelect}
                    onChange={(e) => {
                      this.setState({ cloneLevelSelect: e })

                    }}
                    options={levelOption}
                  />
                </div>
              </div>
              {
                typeof cloneLevelSelect.value !== "undefined" && <CloneTheme
                  levelId={cloneLevelSelect.value}
                  setThemeSelected={this.setThemeSelected} />
              }
            </React.Fragment>
            }
            footer={<React.Fragment>
              <button type="button" className="btn btn-primary" onClick={() => this.clone()}>Save changes</button>
              <button type="button" className="btn btn-secondary" onClick={() => this.setState({ cloneModal: false })}>Close</button>
            </React.Fragment>}
          />
        }
      </React.Fragment>
    )
  }
}