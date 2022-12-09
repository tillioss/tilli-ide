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
import { doConnect } from '../../config/Common';
import { Link } from "react-router-dom";




export default class ModuleManager extends React.Component {
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
      sectionTab: "learning",
      storyCardTab: "meetPerson",
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
      ]


    }

  }


  componentDidMount() {
    this.getThemes()
    this.getImages()
    this.getLevels()

  }


  async getThemes() {
    let postJson = { sessionId: '1223', themeId: '' };
    let responseData = await doConnect("getThemes", "POST", postJson);
    let json = responseData;
    let that = this;
    if (Object.keys(json).length > 0 && json['themesMap'] !== null && json['themesMap'] !== undefined) {
      let themesMap = json['themesMap'];
      let options = []
      let storyOption = []
      Object.keys(themesMap).forEach(value => {
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


  async submitFuntion() {
    const { sectionLearning, sectionBuildStory } = this.state

    if (sectionBuildStory.length === 0 && sectionLearning.length === 0) {
      alert("Add story")
      return false
    }

    if (!this.state.levelSelect) {
      let errorlevelSelect = "Please select Level"
      this.setState({ errorlevelSelect })
      return false
    } else {
      let errorlevelSelect = ""
      this.setState({ errorlevelSelect })
    }



    let checkReturn = true
    sectionLearning.map((ival, index) => {
      if (!ival.title) {
        ival.errorTitle = "Please Enter Title";
        checkReturn = false
      }
      else {
        delete ival.errorTitle
      }

      if (!ival.theme) {
        ival.errorTheme = "Please Select Theme";
        checkReturn = false
      }
      else {
        delete ival.errorTheme
      }



      if (ival.theme === "DoubleBoxOverlapWithImage" || ival.theme === "ImageWithThinking") {

        if (ival.content.text.trim() === '') {
          ival.content.errortext = "Please Enter Text"
          checkReturn = false
        } else {
          delete ival.content.errortext
          //contentTextValidate[index]="";
        }


        if (Object.keys(ival.content.image).length === 0) {

          ival.content.errorimage = "Please Select Image"
          checkReturn = false

        } else {
          delete ival.content.errorimage

        }


      }

      if (ival.theme === "QuestionsList") {

        if (ival.content.questionTitle.trim() === "") {
          ival.content.errorquestionTitle = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.errorquestionTitle
        }
        ival.content.questionList.map((value, index_1) => {
          if (value.question.trim() === '') {
            value.qustionlist_error = "Please Enter Text";
            checkReturn = false
          } else {
            delete value.qustionlist_error
          }

          if (value.color.trim() === '') {
            value.qustion_color_error = "Please Enter Text";
          } else {
            delete value.qustion_color_error
          }
          return true;
        })

      }

      if (ival.theme === "IntroducePersons") {

        ival.content.persons.map((value, index_1) => {
          if (value.name.trim() === '') {
            value.error_name = "Please Enter Text";
            checkReturn = false
          } else {
            delete value.error_name
          }

          if (value.says.trim() === '') {
            value.error_says = "Please Enter Text";
            checkReturn = false
          } else {
            delete value.error_says
          }

          if (Object.keys(value.image).length === 0) {
            value.error_image = "Please Select image";
            checkReturn = false
          } else {
            delete value.error_image
          }

          if (value.imageBg.trim() === '') {
            value.error_imageBg = "Please Enter Text";
            checkReturn = false
          } else {
            delete value.error_imageBg
          }


          if (value.bg.trim() === '') {
            value.error_bg = "Please Enter Text";
            checkReturn = false
          } else {
            delete value.error_bg
          }
          return true

        })


      }
      //theme

      if (ival.theme === "ChooseCheckboxQuestions") {
        if (ival.content.questionTitle.trim("") === "") {
          ival.content.error_questionTitle = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.error_questionTitle
        }

        ival.content.checkBoxesOption.map((value, index_1) => {
          if (value.bgcolor.trim() === '') {
            value.error_bgcolor = "Please Enter Text";
            checkReturn = false
          } else {
            delete value.error_bgcolor
          }

          if (value.content.trim() === '') {
            value.error_content = "Please Enter Text";
            checkReturn = false
          } else {
            delete value.error_content
          }
          return true;
        })


      }


      //theme 

      if (ival.theme === "CircleWithInfoAnimations") {

        //console.log("ival",ival.content)

        if (Object.keys(ival.content.image).length === 0) {
          ival.content.image_error = "Please Select";
          checkReturn = false
        }
        else {
          delete ival.content.image_error
        }

        ival.content.circles.map((value, index_1) => {
          if (value.name.trim("") === "") {
            value.name_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete value.name_error
          }

          if (value.color.trim("") === "") {
            value.color_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete value.color_error
          }
          return true;

        })


        ival.content.text.map((value, index_1) => {
          if (value.value.trim("") === "") {
            value.value_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete value.value_error
          }

          if (value.style.color.trim("") === "") {
            value.style.color_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete value.style.color_error
          }
          return true;

        })
      }

      //theme 

      if (ival.theme === "DropToSelection") {

        //console.log("ival",ival.content)

        if (Object.keys(ival.content.image).length === 0) {
          ival.content.image_error = "Please Select";
          checkReturn = false
        }
        else {
          delete ival.content.image_error
        }


        if (ival.content.text1.trim("") === "") {
          ival.content.text1_error = "Please Select";
          checkReturn = false
        }
        else {
          delete ival.content.text1_error
        }


        if (ival.content.text2.trim("") === "") {
          ival.content.text2_error = "Please Select";
          checkReturn = false
        }
        else {
          delete ival.content.text2_error
        }


        ival.content.circles.map((value, index_1) => {
          if (value.name.trim("") === "") {
            value.name_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete value.name_error
          }

          if (value.color.trim("") === "") {
            value.color_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete value.color_error
          }
          return true;
        })

        if (ival.content.message.failure_header_1.trim("") === "") {
          ival.content.message.failure_header_1_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.message.failure_header_1_error
        }

        if (ival.content.message.failure_body_1.trim("") === "") {
          ival.content.message.failure_body_1_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.message.failure_body_1_error
        }

        if (ival.content.message.failure_button_1.trim("") === "") {
          ival.content.message.failure_button_1_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.message.failure_button_1_error
        }


        if (ival.content.message.failure_header_2.trim("") === "") {
          ival.content.message.failure_header_2_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.message.failure_header_2_error
        }

        if (ival.content.message.failure_body_2.trim("") === "") {
          ival.content.message.failure_body_2_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.message.failure_body_2_error
        }

        if (ival.content.message.failure_button_2.trim("") === "") {
          ival.content.message.failure_button_2_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.message.failure_button_2_error
        }

        if (ival.content.message.success_header_2.trim("") === "") {
          ival.content.message.success_header_2_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.message.success_header_2_error
        }

        if (ival.content.message.success_body_2.trim("") === "") {
          ival.content.message.success_body_2_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.message.success_body_2_error
        }

        if (ival.content.message.success_button_2.trim("") === "") {
          ival.content.message.success_button_2_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.message.success_button_2_error
        }

      }


      if (ival.theme === "AudioQuizScreen") {
        //console.log("ival",ival) 
        ival.content.feelingsDataList.map((value, index_1) => {
          if (value.questions.trim("") === "") {
            value.questions_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete value.questions_error
          }
          return true;
        })

      }

      if (ival.theme === "MeetSinglePerson") {
        //console.log("ival",ival) 
        if (Object.keys(ival.content.image).length === 0) {
          ival.content.image_error = "Please Select";
          checkReturn = false
        }
        else {
          delete ival.content.image_error
        }

        if (ival.content.color_1.trim("") === "") {
          ival.content.color_1_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.color_1_error
        }

        // if (ival.content.color_2.trim("") === "") {
        //   ival.content.color_2_error = "Please Enter Text";
        //   checkReturn = false
        // }
        // else {
        //   delete ival.content.color_2_error
        // }

        if (ival.content.bottomText.trim("") === "") {
          ival.content.bottomText_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.bottomText_error
        }

        if (ival.content.personName.trim("") === "") {
          ival.content.personName_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.personName_error
        }

        if (ival.content.body.trim("") === "") {
          ival.content.body_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.body_error
        }

        if (ival.content.question.trim("") === "") {
          ival.content.question_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.question_error
        }

      }

      //theme
      //console.log("data",ival.content) 
      return true;
    })

    //console.log("checkReturn",checkReturn)


    console.log("storydatacheck", sectionBuildStory.length)
    sectionBuildStory.length !== 0 && sectionBuildStory.map((ival, index) => {
      if (!ival.title) {
        ival.errorTitle = "Please Enter Title";
        checkReturn = false
      }
      else {
        delete ival.errorTitle
      }

      if (!ival.theme) {
        ival.errortheme = "Please Select Theme";
        checkReturn = false
      }
      else {
        delete ival.errortheme
      }

      if (ival.theme === "StoryCard") {

        if (ival.content[0].theme === "MeetSinglePerson") {

          if (ival.content[0].title.trim("") === "") {
            ival.content[0].title_error = "Please Select";
            checkReturn = false
          }
          else {
            delete ival.content[0].title_error
          }


          if (Object.keys(ival.content[0].content.image).length === 0) {
            ival.content[0].content.image_error = "Please Select";
            checkReturn = false
          }
          else {
            delete ival.content[0].content.image_error
          }
          if (ival.content[0].content.color_1.trim("") === "") {
            ival.content[0].content.color_1_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[0].content.color_1_error
          }

          // if(ival.content[0].content.color_2.trim("") ==="")
          // {
          //   ival.content[0].content.color_2_error="Please Enter Text";
          //   checkReturn= false
          // }
          // else
          // {
          //   delete ival.content[0].content.color_2_error
          // }

          if (ival.content[0].content.bottomText.trim("") === "") {
            ival.content[0].content.bottomText_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[0].content.bottomText_error
          }

          if (ival.content[0].content.personName.trim("") === "") {
            ival.content[0].content.personName_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[0].content.personName_error
          }

          if (ival.content[0].content.body.trim("") === "") {
            ival.content[0].content.body_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[0].content.body_error
          }

          if (ival.content[0].content.question.trim("") === "") {
            ival.content[0].content.question_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[0].content.question_error
          }

        }


        // sub theme
        if (ival.content[1].theme === "AudioQuizScreen") {
          if (ival.content[1].title.trim("") === "") {
            ival.content[1].title_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[1].title_error
          }

          ival.content[1].content.feelingsDataList.map((value, index_1) => {
            if (value.questions.trim("") === "") {
              value.questions_error = "Please Enter Text";
              checkReturn = false
            }
            else {
              delete value.questions_error
            }
            return true;
          })

        }



        // // sub theme

        if (ival.content[2].theme === "DropToSelection") {

          if (Object.keys(ival.content[2].content.image).length === 0) {
            ival.content[2].content.image_error = "Please Select";
            checkReturn = false
          }
          else {
            delete ival.content[2].content.image_error
          }

          ival.content[2].content.circles.map((value, index_1) => {

            if (value.name.trim("") === "") {
              value.name_error = "Please Enter Text";
              checkReturn = false
            }
            else {
              delete value.name_error
            }

            if (value.color.trim("") === "") {
              value.color_error = "Please Enter Text";
              checkReturn = false
            }
            else {
              delete value.color_error
            }
            return true;
          })


          if (ival.content[2].content.text1.trim("") === "") {
            ival.content[2].content.text1_error = "Please Select";
            checkReturn = false
          }
          else {
            delete ival.content[2].content.text1_error
          }


          if (ival.content[2].content.text2.trim("") === "") {
            ival.content[2].content.text2_error = "Please Select";
            checkReturn = false
          }
          else {
            delete ival.content[2].content.text2_error
          }



          if (ival.content[2].content.message.failure_header_1.trim("") === "") {
            ival.content[2].content.message.failure_header_1_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[2].content.message.failure_header_1_error
          }

          if (ival.content[2].content.message.failure_body_1.trim("") === "") {
            ival.content[2].content.message.failure_body_1_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[2].content.message.failure_body_1_error
          }

          if (ival.content[2].content.message.failure_button_1.trim("") === "") {
            ival.content[2].content.message.failure_button_1_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[2].content.message.failure_button_1_error
          }


          if (ival.content[2].content.message.failure_header_2.trim("") === "") {
            ival.content[2].content.message.failure_header_2_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[2].content.message.failure_header_2_error
          }

          if (ival.content[2].content.message.failure_body_2.trim("") === "") {
            ival.content[2].content.message.failure_body_2_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[2].content.message.failure_body_2_error
          }

          if (ival.content[2].content.message.failure_button_2.trim("") === "") {
            ival.content[2].content.message.failure_button_2_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[2].content.message.failure_button_2_error
          }

          if (ival.content[2].content.message.success_header_2.trim("") === "") {
            ival.content[2].content.message.success_header_2_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[2].content.message.success_header_2_error
          }

          if (ival.content[2].content.message.success_body_2.trim("") === "") {
            ival.content[2].content.message.success_body_2_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[2].content.message.success_body_2_error
          }

          if (ival.content[2].content.message.success_button_2.trim("") === "") {
            ival.content[2].content.message.success_button_2_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[2].content.message.success_button_2_error
          }


        }


      }

      return true;
    })

    console.log("checkReturn", checkReturn)

    if (!checkReturn) {
      this.setState({ sectionBuildStory, sectionLearning })
      return false
    }

    let addData = ""
    addData = [...sectionLearning, ...this.state.sectionBuildStory,]
    let postJson = { levelId: this.state.levelSelect.value, stagesData: JSON.stringify(addData), sessionId: '1223' };
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


      that.setState({ levelsJson: levelsMap, levelSelect: select_Level })

      this.getLevelMappingData(level_Id)

    }
  }


  async getLevelMappingData(levelId) {
    const { storyThemeSelect } = this.state;
    console.log('levelId', levelId)
    let postJson = { levelId: levelId, sessionId: '1223' };
    let responseData = await doConnect("getLevelMappingData", "POST", postJson);
    let that = this;
    // alert(JSON.stringify(responseData))
    let contentdata = responseData.response;
    if (contentdata) {
      let imageViews = []
      let withOutStory = []
      let withStory = []
      let changeIndex = 0
      JSON.parse(contentdata).map((ival, index) => {
        var found_index = this.state.themeOptions.findIndex((a) =>
          a.label === ival.theme)
        imageViews[index] = this.state.themeOptions[found_index]

        if (ival.theme === "StoryCard" || ival.theme === "Ask Age" || ival.theme === "Ask Gender") {
          withStory.push(ival)
          storyThemeSelect[changeIndex] = { label: ival.theme, value: ival.theme }
          changeIndex++;
        }
        else {
          withOutStory.push(ival)
        }
        //"StoryCard"
        return true;
      })
      console.log(withStory)
      console.log(withOutStory)
      that.setState({
        sectionLearning: withOutStory, sectionBuildStory: withStory,
        imageView: imageViews, storyThemeSelect
      })

    }

  }




  addTheme() {
    const { sectionLearning } = this.state
    sectionLearning.push({ title: "", theme: "", content: {} })
    this.setState({
      sectionLearning,
      themeIndex: (sectionLearning.length - 1)
    })
  }

  changeTheme(index, e) {

    const { sectionLearning, imageView } = this.state;

    sectionLearning[index].theme = e.label;
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

    this.setState({ sectionLearning })

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
    sectionBuildStory.push({ title: "", theme: "", content: {} })
    this.setState({
      sectionBuildStory,
      themeIndex: (sectionBuildStory.length - 1)
    })
  }


  StoryCardReturnData(fullData, jindex) {
    const { sectionBuildStory, storyCardTab } = this.state

    let dataContentReturn = ""
    let imageOptions = this.getImageOption()

    //console.log("Function Pass",sectionBuildStory)

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
          Circel With info
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

    let RemoveData = sectionBuildStory.filter(function (el) {
      return el !== null;
    });


    this.setState({ sectionBuildStory: RemoveData })

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
      this.setState({ sectionBuildStory: value, storyThemeSelect: themeValue })

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
      this.setState({ sectionBuildStory: value, storyThemeSelect: themeValue })


    }

  }

  contentRefilData(e, index) {
    const { sectionBuildStory, storyThemeSelect } = this.state;
    sectionBuildStory[index].theme = e.label
    storyThemeSelect[index] = e;
    let contentStoryData = ""

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

    }
    else if (e.label === "Ask Age") {
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
    }
    else if (e.label === "Ask Gender") {
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
    }

    sectionBuildStory[index].content = contentStoryData
    this.setState({ sectionBuildStory, storyThemeSelect })
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


  askAgereturn(Value, index) {
    const { sectionLearning, } = this.state;
    let imageOptions = this.getImageOption()
    return <AskAge
      option={imageOptions}
      index={index}
      sectionLearning={sectionLearning}
      themeName={Value}
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
    />
  }

  buildContent() {
    let { OptionData, themeOptions, sectionLearning, sectionBuildStory, storyThemeSelect, sectionTab, themeIndex } = this.state;
    let returnContent;
    if (sectionTab === "learning" && sectionLearning.length > 0) {
      let index = themeIndex;
      let chooseDataview = ""
      let selectBoxConditon = ""

      if (sectionLearning[index].theme === "DoubleBoxOverlapWithImage" || sectionLearning[index].theme === "DoubleBoxUnderWithImage") {
        if (sectionLearning[index].content.chooseType && sectionLearning[index].content.chooseType.label === "Image") {
          let imageOptions = this.getImageOption()
          chooseDataview = <>
            <div className="row" style={{ width: "100%" }}>
              <div className="col-sm-3 topalign">
                <label htmlFor="text">Image</label>
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
                <label htmlFor="text">Image Style</label>

                <textarea rows="1" cols="50" className="form-control" placeholder="style"
                  value={sectionLearning[index].content.imagestyle}
                  onChange={e => {
                    sectionLearning[index].content.imagestyle = e.target.value;
                    this.setState({ sectionLearning })
                  }}
                />
              </div>
              <div className="col-sm-3 topalign">
                <label htmlFor="text">Image ClassName</label>

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
              <label htmlFor="Text">Text</label>

              {/* <input type="text" className="form-control" id="Text" placeholder="Text"
                value={sectionLearning[index].content.text}
                onChange={e => {
                  sectionLearning[index].content.text = e.target.value;
                  this.setState({ sectionLearning })
                }} /> */}
              {/* {JSON.stringify(sectionLearning[index].content.text)} */}
              <EditorContent text={sectionLearning[index].content.text}
                index={index} sectionLearning={sectionLearning} />

              <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errortext}</span>
            </div>

            <div className="col-sm-3 topalign">
              <label htmlFor="Text">nameClassName</label>
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
          <div className="col-sm-3 topalign">
            <label htmlFor="Color">Bgcolor</label>
            <input type="text" className="form-control" id="Color" value={sectionLearning[index].content.color} placeholder="Color" onChange={(e) => {
              sectionLearning[index].content.color = e.target.value
              this.setState({ sectionLearning })
            }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errorcolor}</span>
          </div>

          <div className="col-sm-3 topalign">
            <label htmlFor="text">Select</label>
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
            <label htmlFor="BoxBgColor_1">BoxBg Color 1</label>
            <input type="text" className="form-control" id="BoxBgColor_1"
              value={sectionLearning[index].content.boxBgColor_1} placeholder="BoxBgColor1" onChange={(e) => {
                sectionLearning[index].content.boxBgColor_1 = e.target.value
                this.setState({ sectionLearning })
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errorcolor}</span>
          </div>

          <div className="col-sm-3 topalign">
            <label htmlFor="BoxBgColor_1">BoxBg Color 2</label>
            <input type="text" className="form-control" id="BoxBgColor_2"
              value={sectionLearning[index].content.boxBgColor_2} placeholder="BoxBgColor2" onChange={(e) => {
                sectionLearning[index].content.boxBgColor_2 = e.target.value
                this.setState({ sectionLearning })
              }} />
            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{sectionLearning[index].content.errorcolor}</span>
          </div>

          <div className="col-sm-3 topalign">
            <label htmlFor="text">Select</label>
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
      else if (sectionLearning[index].theme === "Ask Age") {
        ThemeChooseData = <> {this.askAgereturn(sectionLearning[index].theme, index)}  </>
      }
      else if (sectionLearning[index].theme === "Ask Gender") {
        ThemeChooseData = <> {this.askGenderReturn(sectionLearning[index].theme, index)}  </>
      }

      returnContent = <div className="panel panel-info">
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
            <div className="col-sm-1" style={{ cursor: "pointer" }} onClick={(e) => {
              this.removeFunction(index)
            }}>  <i className="fa fa-close" style={{ fontSize: 20, color: "#FFF", backgroundColor: "#f95a2b", padding: 5, cursor: "pointer" }}></i> </div>
          </div>

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
    } else if (sectionTab === "storyFlow" && sectionBuildStory.length > 0) {
      let jindex = themeIndex;
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
                <>
                  <EditorContent text={sectionBuildStory[jindex].title} themeType={sectionBuildStory[jindex].theme}
                    index={jindex}
                    sectionBuildStory={sectionBuildStory}
                    textOnchange={(value) => {
                      sectionBuildStory[jindex].title = value
                      this.setState({ sectionBuildStory })
                    }}

                  />
                </>
                :
                <input type={'text'} className={'form-control'} value={sectionBuildStory[jindex].title} placeholder={'Enter Title'} style={{ width: '100%' }}
                  onChange={(e) => {
                    sectionBuildStory[jindex].title = e.target.value
                    this.setState({ sectionBuildStory })
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
                this.setState({ sectionBuildStory })

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


      returnContent = <div className="panel panel-info">
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
                options={[{ value: 'StoryCard', label: 'StoryCard' }, { value: 'Ask Age', label: 'Ask Age' }, { value: 'Ask Gender', label: 'Ask Gender' }]}
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
    }
    return returnContent;
  }
  render() {
    const { sectionTab, sectionLearning, sectionBuildStory, themeIndex } = this.state;
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
                          />

                          <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{this.state.errorlevelSelect}</span>
                        </div>
                        <div className="col-sm-6"> </div>
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
                        {this.buildContent()}

                        {
                          sectionTab === "learning" && <div className="row mt-3 mb-3">
                            <div className="col-sm-4"> </div>
                            <div className="col-sm-4">
                              <button type="button" className="btn btn-success" onClick={() => {
                                this.addTheme()
                              }}>Add Theme</button>
                            </div>
                            <div className="col-sm-4"> </div>
                          </div>
                        }
                        {
                          sectionTab === "storyFlow" && <div className="row mt-3 mb-3">
                            <div className="col-sm-4"> </div>
                            <div className="col-sm-4">
                              <button type="button" className="btn btn-success" onClick={() => {
                                this.addStoyTheme()
                              }}>Add Story Theme</button>
                            </div>
                            <div className="col-sm-4"> </div>
                          </div>
                        }
                      </div>

                      <div className="row">
                        <div className="col-sm-4"> </div>
                        <div className="col-sm-4">
                          <button type="button" className="btn btn-primary" onClick={() => { this.submitFuntion() }}>Submit</button>
                        </div>
                        <div className="col-sm-4"> </div>
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
      </React.Fragment>
    )

  }

}