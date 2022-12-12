import React from 'react';
import DropDown from "../Component/DropDown";
import CloseImage from "../../src/images/close.png";
import DoubleBoxOverlapWithImage from "../Component/Themes/DoubleBoxOverlapWithImage";
import QuestionsList from "../Component/Themes/QuestionsList";
import IntroducePersons from "../Component/Themes/IntroducePersons";
import ChooseCheckboxQuestions from "../Component/Themes/ChooseCheckboxQuestions";
import CircleWithInfoAnimations from "../Component/Themes/CircleWithInfoAnimations";
import PersonWithTextAnimation from "../Component/Themes/PersonWithTextAnimation";
import AudioQuizScreen from "../Component/Themes/AudioQuizScreen";
import Success from "../Component/Themes/Success";
import { toast, ToastContainer } from "react-toastify";
import MyConstant from "../config/MyConstant";
import downArrow from "../../src/images/downArrow.png";
import upArrow from "../../src/images/upArrow.png";
import MeetSinglePerson from "../Component/Themes/MeetSinglePerson";
import { doConnect } from '../config/Common';
import { Link } from "react-router-dom";


class LevelManager extends React.Component {

  constructor(props) {
    super(props);
    this.state =
    {
      levelsJson: {},
      fileData: {},
      stagesObject: {}, stagesArray: [], selectedOption: null,
      datavalue: [{ "id": "62d9e896-a8a7-494a-a2d0-aa1925b7bf0a", "title": "df", "theme": "theme", "image": "" }],
      Contentdata: [{ title: '', theme: '', content: {} }], Contentdatacount: [],
      SelectedValue: [], inputValue: [], ContentTextSelect: [], questions_List: [],
      levelSelect: null, levelContent: [{ "id": "bca97131-7802-406b-8ebd-b23ebf2cca5c", "name": "trust", "color": "red", "image": "", structure: {} }],
      dummyOptionSelect: [], levelSelectError: "", titleValidate: [], ThemeValidate: [], ImageValidate: [],
      contentText: [], contentTextValidate: [], options: [], imageView: [], displayImage: 'none', enableLoader: false,
      LevelStage: [
        {
          title: 'What is trust',
          theme: 'DoubleBoxOverlapWithImage',
          content: {
            text:
              'Trust is a feeling you experience towards someone or something\n' +
              'that makes you feel safe, happy and comfortable.',
            image: '',
          },
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
          },
        },
        {
          title: 'Help Tily',
          theme: 'MeetSinglePerson',
          content: {
            personName: "", body: "", question: "", bottomText: "", color_1: "", color_2: "", image: '',
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
              success_button_1: " Unlock Learning Point!",
              success_header_2: "Learning Point", success_body_2: "No one is allowed to touch you in a way that makes you feel uncomfortable. Even if they are family. Your body is yours and Tilli should say no to Aunty Nita’s hugs. If the way someone touches you is not okay, usually your Gut Feeling will give you a signal.",
              success_button_2: "Next Story"
            }
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

        {
          title: 'Story Card',
          theme: 'StoryCard',
          content: [

            {
              title: 'Help Tily',
              theme: 'MeetSinglePerson',
              content: {
                personName: "AUNTY NITA",
                body: "She always hugs Tilli but Tilli doesn’t like it. The hugs are too long and don’t make her feel happy",
                question: "Where would Aunty Nita be on Tilly’s Trust Circle?",
                bottomText: "Let’s talk a bit", color_1: "#f95a2b", color_2: "#61e4c5", image: '',
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
                  success_button_1: " Unlock Learning Point!",
                  success_header_2: "Learning Point", success_body_2: "No one is allowed to touch you in a way that makes you feel uncomfortable. Even if they are family. Your body is yours and Tilli should say no to Aunty Nita’s hugs. If the way someone touches you is not okay, usually your Gut Feeling will give you a signal.",
                  success_button_2: "Next Story"
                }

              },
            },
          ],
        },



      ]


    }
  }


  componentDidMount() {
    this.getThemes()
    this.getLevels();
    this.getImages();


  }
  async getImages() {
    let postJson = { fileType: 'image', sessionId: '1223' };
    let responseData = await doConnect("getGameFilesList", "POST", postJson);
    let json = responseData;
    this.setState({ fileData: json.filesMap })
  }

  async getLevels() {
    let postJson = { sessionId: '1223', levelId: '' };
    let responseData = await doConnect("getGameLevels", "POST", postJson);
    let json = responseData;
    let that = this;
    if (Object.keys(json).length > 0 && json['levelsMap'] !== null && json['levelsMap'] !== undefined) {
      let levelsMap = json['levelsMap'];
      let level_Id = this.props.match.params.levelid
      let select_Level = {}
      select_Level.value = level_Id;
      select_Level.label = levelsMap[level_Id].name;
      // console.log('levelsMap',levelsMap[level_Id])
      that.setState({ levelsJson: levelsMap, levelSelect: select_Level })

      this.getLevelMappingData(level_Id)

    }
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
      Object.keys(themesMap).forEach(value => {
        //   console.log('themesList ==>',themesMap[value].name)
        options.push({ label: themesMap[value].name, value: themesMap[value].name, json: themesMap[value] })
      })
      //console.log('options',options)
      that.setState({ options: options })
    }
  }


  async getLevelMappingData(levelId) {
    const { imageView } = this.state;
    console.log('levelId', levelId)
    let postJson = { levelId: levelId, sessionId: '1223' };
    let responseData = await doConnect("getLevelMappingData", "POST", postJson);
    let that = this;
    let contentdata = responseData.response;
    if (contentdata) {
      JSON.parse(contentdata).map((ival, index) => {
        var found_index = this.state.options.findIndex((a) =>
          a.label === ival.theme)
        imageView[index] = this.state.options[found_index]
        return true
      })
      //console.log('Contentdata',JSON.parse(contentdata))
      console.log('contetndata ', JSON.parse(contentdata))

      that.setState({ Contentdata: JSON.parse(contentdata), imageView })

    }

  }


  async submit() {

    const { levelContent, levelSelect, Contentdata,
      titleValidate, ThemeValidate, ImageValidate, contentTextValidate } = this.state;


    if (!levelSelect) {

      this.setState({ levelSelectError: "Enter Select Level" })
      return false
    }
    else {
      this.setState({ levelSelectError: "" })
    }

    let checkReturn = true

    Contentdata.map((ival, index) => {
      if (!ival.title) {
        titleValidate[index] = "Please Select Title";
        checkReturn = false
      }
      else {
        titleValidate[index] = ""
      }

      if (!ival.theme) {
        ThemeValidate[index] = "Please Select Theme";
        checkReturn = false
      }
      else {
        ThemeValidate[index] = "";
      }



      if (ival.theme === "DoubleBoxOverlapWithImage" || ival.theme === "ImageWithThinking") {

        if (ival.content.text.trim() === '') {
          contentTextValidate[index] = "Please Enter Text";
          checkReturn = false
        } else {
          contentTextValidate[index] = "";
        }


        if (Object.keys(ival.content.image).length === 0) {

          ImageValidate[index] = "Please Select Image";
          checkReturn = false

        } else {
          ImageValidate[index] = "";

        }


      }

      if (ival.theme === "QuestionsList") {

        if (ival.content.questionTitle.trim() === "") {
          contentTextValidate[index] = "Please Enter Text";
          checkReturn = false
        }
        else {
          contentTextValidate[index] = "";
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
            //return false
          } else {
            delete value.qustion_color_error
          }
          return true
        })

      }
      //console.log(ival.content.questionList)

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

          return true
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

          return true
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
          return true

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
          return true
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
          return true
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

        if (ival.content.color_2.trim("") === "") {
          ival.content.color_2_error = "Please Enter Text";
          checkReturn = false
        }
        else {
          delete ival.content.color_2_error
        }

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


      if (ival.theme === "StoryCard") {

        //console.log("ival",ival) 


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

          if (ival.content[0].content.color_2.trim("") === "") {
            ival.content[0].content.color_2_error = "Please Enter Text";
            checkReturn = false
          }
          else {
            delete ival.content[0].content.color_2_error
          }

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
            return true
          })


        }
        // sub theme

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
            return true
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

      //theme
      //console.log("data",ival.content) 
      return true
    })

    console.log("checkReturn", checkReturn)

    if (!checkReturn) {
      return false
    }
    console.log("true")


    levelContent[0].name = levelSelect.value
    levelContent[0].structure = Contentdata
    this.setState({ enableLoader: true })
    let postJson = { levelId: levelSelect.value, stagesData: JSON.stringify(Contentdata), sessionId: '1223' };
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

  handleChange(e, index) {
    const { SelectedValue, inputValue, LevelStage, Contentdata, imageView } = this.state;

    SelectedValue[index] = e;
    imageView[index] = e


    var found_index = LevelStage.findIndex((a) =>
      a.theme === e.label
    )
    //console.log(e, index)

    if (inputValue[index]) {
      LevelStage[found_index].title = inputValue[index]
    }

    if (found_index !== '-1') {

      Contentdata[index].theme = e.label
      Contentdata[index].content = { ...LevelStage[found_index].content }

    }
    else {
      Contentdata[index].theme = e.label

    }
    //console.log('found_index', Contentdata[index])
    this.setState({ selectedOption: e, SelectedValue, LevelStage, Contentdata });

  };


  titleOnchange(e, index) {
    const { inputValue, Contentdata } = this.state;
    inputValue[index] = e;
    Contentdata[index].title = inputValue[index]
    this.setState({ inputValue, Contentdata });


  }

  addMoreContent() {

    const { Contentdatacount, Contentdata, } = this.state;
    Contentdata.push({ title: '', theme: '', content: {} })
    this.setState({ Contentdatacount, Contentdata })

  }


  removeIndex(index) {
    const { SelectedValue, inputValue } = this.state;

    SelectedValue[index] = '';
    inputValue[index] = ''

    let Contentdata_array = [...this.state.Contentdata]
    delete Contentdata_array[index];
    Contentdata_array = [...Contentdata_array]
    Contentdata_array = Contentdata_array.filter(function (el) {
      return el !== null;
    });

    let Selected_Value = SelectedValue.filter(function (el) {
      return el !== "";
    });

    let input_Value = inputValue.filter(function (el) {
      return el !== "";
    });


    this.setState({ SelectedValue: Selected_Value, inputValue: input_Value, Contentdata: Contentdata_array })


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

  return_Content_doublebox(Select, index_1) {
    const { Contentdata, LevelStage, dummyOptionSelect, ImageValidate, contentText, contentTextValidate } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === Select
    )


    let imageOptions = this.getImageOption()


    let checkindex = imageOptions.findIndex(x => x.json.id === Contentdata[index_1].content.image.id);
    if (checkindex !== "-1") {
      //console.log('checkindex',imageOptions[checkindex])
      dummyOptionSelect[index_1] = imageOptions[checkindex]

    }



    return <DoubleBoxOverlapWithImage
      OptionSelect={dummyOptionSelect}
      index_1={index_1}
      Option={imageOptions}
      LevelStage={LevelStage}
      found_index={found_index}
      ImageValidate={ImageValidate}
      contentText={contentText}
      Contentdata={Contentdata}
      contentTextValidate={contentTextValidate}
    />

  }


  return_qustioncontent(value, index_1) {
    const { LevelStage, Contentdata, contentTextValidate } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === value
    )

    let remove_undef = Contentdata[index_1].content.questionList.filter(function (element) {
      return element !== null;
    });
    Contentdata[index_1].content.questionList = remove_undef

    return <QuestionsList
      LevelStage={LevelStage}
      found_index={found_index}
      Contentdata={Contentdata}
      index_1={index_1}
      contentTextValidate={contentTextValidate}


    />

  }

  return_Content_introduce(value, index_1) {
    const { LevelStage, Contentdata, dummyOptionSelect, } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === value
    )

    let imageOptions = this.getImageOption()

    let remove_undef = Contentdata[index_1].content.persons.filter(function (element) {
      return element !== null;
    });
    Contentdata[index_1].content.persons = remove_undef

    //bg,imageBg,name,says
    return <IntroducePersons
      LevelStage={LevelStage}
      found_index={found_index}
      Contentdata={Contentdata}
      index_1={index_1}
      OptionSelect={dummyOptionSelect}
      option={imageOptions}
    />;

  }

  return_Content_choose_checkbox(value, index_1) {


    const { LevelStage, Contentdata } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === value
    )

    let remove_undef = Contentdata[index_1].content.checkBoxesOption.filter(function (element) {
      return element !== null;
    });
    Contentdata[index_1].content.checkBoxesOption = remove_undef

    return <ChooseCheckboxQuestions
      found_index={found_index}
      LevelStage={LevelStage}
      index_1={index_1}
      Contentdata={Contentdata}


    />
  }


  return_content_circle(value, index_1, type) {

    const { LevelStage, dummyOptionSelect, Contentdata } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === value
    )
    let imageOptions = this.getImageOption()
    let checkindex = imageOptions.findIndex(x => x.json.id === Contentdata[index_1].content.image.id);
    if (checkindex && imageOptions[checkindex]) {
      //console.log('checkindex',imageOptions[checkindex])
      dummyOptionSelect[index_1] = imageOptions[checkindex]
      // console.log(dummyOptionSelect)
    }



    return <CircleWithInfoAnimations
      LevelStage={LevelStage}
      optionSelect={dummyOptionSelect}
      option={imageOptions}
      index_1={index_1}
      found_index={found_index}
      Contentdata={Contentdata}
      type={type}

    />

  }

  return_content_person(value, index_1) {

    const { LevelStage, dummyOptionSelect, Contentdata } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === value
    )

    let imageOptions = this.getImageOption();



    return <PersonWithTextAnimation
      LevelStage={LevelStage}
      found_index={found_index}
      dummyOptionSelect={dummyOptionSelect}
      option={imageOptions}
      index_1={index_1}
      Contentdata={Contentdata}
    />


  }


  return_content_audioscreen(Value, index_1) {

    const { LevelStage, Contentdata } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === Value
    )


    let remove_undef = Contentdata[index_1].content.feelingsDataList.filter(function (element) {
      return element !== null;
    });
    Contentdata[index_1].content.feelingsDataList = remove_undef

    return <AudioQuizScreen
      LevelStage={LevelStage}
      found_index={found_index}
      index_1={index_1}
      Contentdata={Contentdata}
    />

  }


  return_content_Success(value, index_1) {

    const { LevelStage, Contentdata } = this.state;
    var found_index = LevelStage.findIndex((a) =>
      a.theme === value
    )



    return <Success
      LevelStage={LevelStage}
      found_index={found_index}
      index_1={index_1}
      Contentdata={Contentdata}

    />

  }



  MeetSinglePersonFunction(Value, index_1) {

    const { LevelStage, Contentdata, dummyOptionSelect } = this.state;

    let imageOptions = this.getImageOption()

    let checkindex = imageOptions.findIndex(x => x.json.id === Contentdata[index_1].content.image.id);
    if (checkindex !== "-1") {
      dummyOptionSelect[index_1] = imageOptions[checkindex]
    }
    var found_index = LevelStage.findIndex((a) =>
      a.theme === Value
    )


    return <MeetSinglePerson
      LevelStage={LevelStage}
      optionSelect={dummyOptionSelect}
      option={imageOptions}
      found_index={found_index}
      index_1={index_1}
      Contentdata={Contentdata}

    />

  }


  indexChange(index, type) {
    const { Contentdata } = this.state;

    //alert(type)

    if (type === "Down") {

      let value = [...Contentdata]

      console.log('index', index)
      console.log('Move index', index + 1)
      console.log(index, "--", Contentdata[index])
      console.log(index + 1, "--", Contentdata[index + 1])

      value[index] = Contentdata[index + 1]
      value[index + 1] = Contentdata[index]
      this.setState({ Contentdata: value })

    }

    if (type === "Up") {

      let value = [...Contentdata]

      console.log('index', index)
      console.log('Move index', index - 1)

      value[index] = Contentdata[index - 1]
      value[index - 1] = Contentdata[index]
      this.setState({ Contentdata: value })


    }

  }


  Story_Function(Value, index_1) {
    const { LevelStage, Contentdata, } = this.state;

    let imageOptions = this.getImageOption()

    var found_index = LevelStage.findIndex((a) =>
      a.theme === Value
    )
    let test = []

    test.push(<React.Fragment>
      <div className="row item form-group col-12">
        <h4 style={{ color: 'black' }}> {LevelStage[found_index].content[0].theme} : </h4>
      </div>
    </React.Fragment>
    )

    let Select_data = [];
    let checkindex = imageOptions.findIndex(x => x.json.id === Contentdata[index_1].content[0].content.image.id);
    if (checkindex !== "-1") {
      //console.log('checkindex',imageOptions[checkindex])
      Select_data[index_1] = imageOptions[checkindex]

    }

    test.push(<MeetSinglePerson
      LevelStage={LevelStage}
      optionSelect={Select_data}
      option={imageOptions}
      found_index={found_index}
      index_1={index_1}
      Contentdata={Contentdata}

    />)

    test.push(<React.Fragment>
      <div className="row item form-group col-12">
        <h4 style={{ color: 'black' }}> {LevelStage[found_index].content[1].theme} :  </h4>
      </div>
    </React.Fragment>
    )
    //console.log("Contentdata lpp",Contentdata[index_1].content )


    test.push(<AudioQuizScreen
      LevelStage={LevelStage}
      found_index={found_index}
      index_1={index_1}
      Contentdata={Contentdata}
    />)

    test.push(<React.Fragment>
      <div className="row item form-group col-12">
        <h4 style={{ color: 'black' }}> {LevelStage[found_index].content[2].theme} : </h4>
      </div>
    </React.Fragment>
    )

    let Select_data_2 = [];
    let checkindex_2 = imageOptions.findIndex(x => x.json.id === Contentdata[index_1].content[2].content.image.id);
    if (checkindex_2 !== "-1") {
      //console.log('checkindex',imageOptions[checkindex])
      Select_data_2[index_1] = imageOptions[checkindex_2]

    }

    test.push(<CircleWithInfoAnimations
      LevelStage={LevelStage}
      optionSelect={Select_data_2}
      option={imageOptions}
      index_1={index_1}
      found_index={found_index}
      Contentdata={Contentdata}
      type={false}

    />)

    return test







  }


  render() {

    const { Contentdata, levelSelect, SelectedValue, } = this.state;

    let levelOption = [];
    Object.keys(this.state.levelsJson).map((ival, index) => {
      let levelData = this.state.levelsJson[ival];
      levelOption.push({ value: levelData.id, label: levelData.name, })
      return true
    });

    return (<React.Fragment>
      <div className="main-content">
        <div className="right_col" role="main">
          <div className="">

            <div className="clearfix"></div>
            <ToastContainer />
            <div className="row">
              <div className="col-md-12 col-sm-12  ">
                <div className="x_panel">
                  <div className="x_title">
                    <h2>Plain Page</h2>
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
                    {/* inside View*/}

                    <div className="row item form-group" style={{ marginTop: 20 }}>


                      <div className="col-sm-1">Level</div>
                      <div className="col-sm-5">
                        <DropDown
                          selectedOption={levelSelect}
                          onChange={(e) => {
                            this.setState({ levelSelect: e })
                            this.getLevelMappingData(e.value)
                          }}
                          options={levelOption}
                        />

                        <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}> {this.state.levelSelectError}</span>
                      </div>
                      <div className="col-sm-6"> </div>
                    </div>
                    <br />
                    {Contentdata.map((val, index) => {

                      return (<React.Fragment>

                        <div className="container">
                          <div className="card">
                            <div className="card-body">

                              <div className="row item form-group" style={{ marginBottom: 10 }}>
                                <div className="col-sm-1 text-ali-left">  <h4> Stage {index + 1} </h4>  </div>
                                <div className="col-sm-6"></div>
                                <div className="col-sm-3"> </div>

                                <div className="col-sm-2">


                                  {index === '0' && Contentdata.length - 1 !== 0 ?
                                    <React.Fragment>
                                      <span onClick={() => { this.indexChange(index, "Down") }} > <img src={downArrow} style={{ width: 30, height: 30 }} alt="loading" />  </span>
                                    </React.Fragment>
                                    : Contentdata.length - 1 === index ?
                                      <React.Fragment>
                                        <span onClick={() => { this.indexChange(index, "Up") }}> <img src={upArrow} style={{ width: 30, height: 30 }} alt="loading" />  </span>
                                      </React.Fragment>
                                      : null

                                  }
                                  <span> <img src={CloseImage} style={{ width: 30, height: 30 }} onClick={() => {
                                    this.removeIndex(index)
                                  }} alt="loading" /> </span> </div>
                              </div>

                              <div className="row item form-group">
                                <div className="col-sm-1 text-ali-left"> Title </div>
                                <div className="col-sm-5">
                                  <input type={'text'} className={'form-control'} value={Contentdata[index].title} placeholder={'Enter Title'} style={{ width: '100%' }}
                                    onChange={(e) => { this.titleOnchange(e.target.value, index) }} />
                                  <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{this.state.titleValidate[index]}</span>
                                </div>

                                <div className="col-sm-6"> </div>
                              </div>

                              <br />

                              <div className="row item form-group">
                                <div className="col-sm-1 text-ali-left">Theme </div>
                                <div className="col-sm-5">
                                  <DropDown
                                    selectedOption=
                                    {!SelectedValue[index] ? { label: "Select", value: "Select" } : SelectedValue[index]}
                                    onChange={(e) => this.handleChange(e, index)}
                                    options={this.state.options}
                                  />
                                  <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{this.state.ThemeValidate[index]}</span>
                                </div>
                                <div className="col-sm-2">

                                  {this.state.imageView[index] ?
                                    <img style={{ width: '100%', height: 100 }}
                                      src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.imageView[index].json.image.fileName + "&id=" + this.state.imageView[index].json.image.fileType}

                                      alt={'loading'} className="img-responsive" onClick={() => {
                                        this.setState({ imageBigView: this.state.imageView[index], displayImage: 'block' })
                                      }} />
                                    : null}

                                </div>
                                <div className="col-sm-4"> </div>
                              </div>

                              {Contentdata[index].theme ?

                                <div className="row item form-group" style={{ marginTop: 30, marginBottom: 0 }}>

                                  <div className="col-sm-2"></div>
                                  <div className="col-sm-5">
                                    <h4>Form Generator</h4>
                                  </div>

                                  <div className="col-sm-6"></div>


                                </div>
                                : null}

                              {Contentdata[index] && Contentdata[index].theme === "DoubleBoxOverlapWithImage" ?
                                this.return_Content_doublebox(Contentdata[index].theme, index)
                                : null}

                              {Contentdata[index] && Contentdata[index].theme === "ImageWithThinking" ?
                                this.return_Content_doublebox(Contentdata[index].theme, index)
                                :
                                null}


                              {Contentdata[index] && Contentdata[index].theme === "QuestionsList" ?

                                <div className="row item form-group">
                                  <div className="col-sm-10">
                                    <div className="row item form-group" style={{ marginTop: 20 }}>
                                      {this.return_qustioncontent(Contentdata[index].theme, index)}  </div>
                                  </div>

                                  <div className="col-sm-1">
                                    <div className="row">
                                      <button type="button" className="btn btn-primary active" onClick={() => {
                                        const { LevelStage, Contentdata } = this.state;

                                        Contentdata[index].content.questionList.push({ question: '', color: '' })
                                        this.setState({ LevelStage })
                                        console.log(LevelStage)

                                      }} >Add Question</button>
                                    </div>

                                  </div>

                                </div>
                                : null}


                              {Contentdata[index] && Contentdata[index].theme === "IntroducePersons" ?
                                <div className="row item form-group">
                                  <div className="col-sm-10">
                                    <div className="row item form-group">

                                      {this.return_Content_introduce(Contentdata[index].theme, index)}

                                    </div>

                                  </div>

                                  <div className="col-sm-2">
                                    <button type="button" className="btn btn-primary active" onClick={() => {
                                      const { LevelStage } = this.state;

                                      Contentdata[index].content.persons.push({ bg: "", imageBg: '', name: '', says: "", image: '', })
                                      this.setState({ LevelStage, Contentdata })
                                    }} >Add</button>


                                  </div>

                                </div>
                                :
                                null}

                              {Contentdata[index] && Contentdata[index].theme === "ChooseCheckboxQuestions" ?

                                <div className="row" style={{ marginTop: 15 }}>
                                  <div className="col-sm-1"><h4>Setting</h4></div>
                                  <div className="col-sm-10">
                                    {this.return_Content_choose_checkbox(Contentdata[index].theme, index)}
                                  </div>

                                </div>

                                : null
                              }


                              {Contentdata[index] && Contentdata[index].theme === "CircleWithInfoAnimations" ?
                                <div className="row ">
                                  {this.return_content_circle(Contentdata[index].theme, index, false)}
                                </div>
                                : null
                              }


                              {Contentdata[index] && Contentdata[index].theme === "PersonWithTextAnimation" ?
                                <div className="row item form-group">
                                  {this.return_content_person(Contentdata[index].theme, index)}
                                </div>
                                : null
                              }

                              {Contentdata[index] && Contentdata[index].theme === "AudioQuizScreen" ?
                                <div className="row item form-group">
                                  {this.return_content_audioscreen(Contentdata[index].theme, index)}
                                </div>
                                : null
                              }


                              {Contentdata[index] && Contentdata[index].theme === "DropToSelection" ?
                                <div className="row item form-group">
                                  {this.return_content_circle(Contentdata[index].theme, index, true)}
                                </div>
                                : null
                              }



                              {Contentdata[index] && Contentdata[index].theme === "Success" ?
                                <div className="row item form-group">
                                  {this.return_content_Success(Contentdata[index].theme, index)}
                                </div>
                                : null
                              }

                              {Contentdata[index] && Contentdata[index].theme === "MeetSinglePerson" ?
                                <div className="row item form-group">
                                  {this.MeetSinglePersonFunction(Contentdata[index].theme, index)}
                                </div>
                                : null
                              }


                              {Contentdata[index] && Contentdata[index].theme === "StoryCard" ?

                                <div className="row item form-group">
                                  {this.Story_Function(Contentdata[index].theme, index)}
                                </div>

                                : null
                              }

                            </div>
                          </div>
                        </div>
                        <br />
                      </React.Fragment>)
                    })}

                    <br />
                    <div className="row item form-group">
                      <div className="col-sm-2">  </div>

                      <div className="col-sm-3">
                        <button type="button" className="btn btn-primary active" disabled={this.state.enableLoader} onClick={(e) => { this.submit() }} >
                          {this.state.enableLoader ? <i className="fa fa-spinner fa-spin"></i> : null} Submit</button>
                      </div>

                      <div className="col-sm-3">
                        <button type="button" className="btn btn-primary active" style={{ backgroundColor: '#FF4500', borderColor: '#FF4500' }} onClick={(e) => { this.addMoreContent() }} >Add New Stage </button>
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



                    {/* inside View*/}
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

export default LevelManager
