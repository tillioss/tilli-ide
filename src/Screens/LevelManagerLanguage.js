import React from 'react';
import DropDown from "../Component/DropDown";
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
import MeetSinglePerson from "../Component/Themes/MeetSinglePerson";
import ThemeJson from "../Screens/Json/Theme.json";
import { doConnect } from '../config/Common';

const options = [
    { value: 'DoubleBoxOverlapWithImage', label: 'DoubleBoxOverlapWithImage' },
    { value: 'QuestionsList', label: 'QuestionsList' }, { value: 'ImageWithThinking', label: 'ImageWithThinking' },
    { value: 'IntroducePersons', label: 'IntroducePersons' }, { value: 'ChooseCheckboxQuestions', label: 'ChooseCheckboxQuestions' },
    { value: 'CircleWithInfoAnimations', label: 'CircleWithInfoAnimations' }, { value: 'PersonWithTextAnimation', label: 'PersonWithTextAnimation' },
    { value: 'AudioQuizScreen', label: 'AudioQuizScreen' }, { value: 'DropToSelection', label: 'DropToSelection' }, { value: 'Success', label: 'Success' }
];



const dummyOption = [
    { value: 'https://picsum.photos/200', label: 'Image_1' },
    { value: 'https://picsum.photos/id/237/200/300', label: 'Image_2' },
    { value: 'https://picsum.photos/seed/picsum/200/300', label: 'Image_3' },
    { value: 'https://picsum.photos/200/300/?blur=2', label: 'Image_4' }
]

class LevelManagerLanguage extends React.Component {

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
            languageOption: [{ label: "Tamil", value: 'Tamil' }, { label: "English", value: 'English' }], languageSelect: {},
            viewState: false,
            LevelStage: ThemeJson.English,
            tamilData: []




        }
    }


    componentDidMount() {

        console.log(this.props.match.params.levelid)
        this.getThemes()
        this.getLevels();
        this.getImages();
        this.getLanguageList();

        this.getLevelMappingData(this.props.match.params.levelid)



    }
    async getImages() {
        let postJson = { fileType: 'image', sessionId: '1223' };
        let responseData = await doConnect("getGameFilesList", "POST", postJson);
        let json = responseData;
        this.setState({ fileData: json.filesMap })

    }

    async getLevels() {
        let postJson = { sessionId: '1223', levelId: '' };
        let that = this;
        let responseData = await doConnect("getGameLevels", "POST", postJson);
        let json = responseData;
        if (Object.keys(json).length > 0 && json['levelsMap'] != null && json['levelsMap'] != undefined) {
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
        if (Object.keys(json).length > 0 && json['themesMap'] != null && json['themesMap'] != undefined) {
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
        let postJson = { levelId: levelId, sessionId: '1223' };
        let that = this;
        let responseData = await doConnect("getLevelMappingData", "POST", postJson);
        let json = responseData;

        // alert(JSON.stringify(responseData))
        let tamildataClone = []
        let contentdata = responseData.response;
        if (contentdata) {
            JSON.parse(contentdata).map((ival, index) => {
                //console.log("s",ival)
                var found_index = this.state.options.findIndex((a) =>
                    a.label === ival.theme)
                imageView[index] = this.state.options[found_index]

                let checkindex = ThemeJson.Tamil.findIndex((a) =>
                    a.theme === ival.theme)

                if (checkindex != "-1") {
                    let removetext = this.dataremoveField(ival.theme, ival)
                    tamildataClone[index] = removetext
                }


            })
            console.log('Contentdata', JSON.parse(contentdata))
            console.log('tamildataClone', tamildataClone)
            //console.log('ThemeJson',ThemeJson.Tamil)
            //tamilData: ThemeJson.Tamil
            let olddata = [...JSON.parse(contentdata)]
            that.setState({ Contentdata: JSON.parse(contentdata), imageView, olddata, tamilData: tamildataClone })

        }
    }

    dataremoveField(theme, data) {

        //        console.log(theme,data )
        if (theme == "IntroducePersons") {
            data.title = "";
            data.content.persons.map(ival => {
                ival.name = "";
                ival.says = "";
            })

            return data
        }

        if (theme == "DoubleBoxOverlapWithImage" || theme == "ImageWithThinking") {
            data.title = "";
            data.content.text = "";

            return data
        }

        if (theme == "QuestionsList") {
            data.title = "";
            data.content.questionList.map(ival => {
                ival.question = "";
            })

            return data
        }

        if (theme == "ChooseCheckboxQuestions") {
            data.title = "";
            data.content.checkBoxesOption.map(ival => {
                ival.content = "";
            })

            return data
        }


        if (theme == "CircleWithInfoAnimations" || theme == "DropToSelection") {
            data.title = "";
            data.content.circles.map(ival => {
                ival.name = "";
            })



            if (theme == "CircleWithInfoAnimations") {
                data.content.text.map(ival => {
                    ival.value = "";
                })
            }


            if (theme == "DropToSelection") {

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

        if (theme == "MeetSinglePerson") {
            data.title = "";
            data.content.body = "";
            data.content.bottomText = "";
            data.content.personName = "";
            data.content.question = "";

            return data
        }

        if (theme == "AudioQuizScreen") {


            data.title = "";
            Object.keys(data.content.feelingsDataList).map(ival => {
                data.content.feelingsDataList[ival].questions = '';
            })


            return data
        }


        if (theme == "StoryCard") {


            // data.content[2]


            data.content[0].title = "";
            data.content[0].content.body = "";
            data.content[0].content.bottomText = "";
            data.content[0].content.personName = "";
            data.content[0].content.question = "";

            data.content[1].title = "";
            data.content[1].content.feelingsDataList.map(ival => {
                ival.questions = '';
            })

            data.content[2].content.circles.map(ival => {
                ival.name = "";
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

        return data





    }

    async submit() {

        const { stagesArray, LevelStage, levelContent, levelSelect, SelectedValue, inputValue, Contentdata,
            dummyOptionSelect, titleValidate, ThemeValidate, ImageValidate, contentText, contentTextValidate,
            errorLanguage, languageSelect } = this.state;

        if (!languageSelect.label) {
            this.setState({ errorLanguage: "Select Field" })
            return false
        }
        if (!levelSelect) {

            this.setState({ levelSelectError: "Enter Select Level" })
            return false
        }
        else {
            this.setState({ levelSelectError: "" })
        }


        Contentdata.map((ival, index) => {
            if (!ival.title) {
                titleValidate[index] = "Please Select Title";
                return false
            }
            else {
                titleValidate[index] = ""
            }

            if (!ival.theme) {
                ThemeValidate[index] = "Please Select Theme";
                return false
            }
            else {
                ThemeValidate[index] = "";
            }

            if (!dummyOptionSelect[index]) {

                ImageValidate[index] = "Please Select Image";
                //return false

            } else {
                ImageValidate[index] = "";

            }


            if (ival.theme == "DoubleBoxOverlapWithImage" || ival.theme == "ImageWithThinking") {

                if (ival.content.text.trim() === '') {
                    contentTextValidate[index] = "Please Enter Text";
                    //return false
                } else {
                    contentTextValidate[index] = "";
                }


            }

            if (ival.theme == "QuestionsList") {

                ival.content.questionList.map((value, index_1) => {


                    if (value.question.trim() === '') {
                        value.qustionlist_error = "Please Enter Text";
                        //return false
                    } else {
                        delete value.qustionlist_error
                    }

                    if (value.color.trim() === '') {
                        value.qustion_color_error = "Please Enter Text";
                        //return false
                    } else {
                        delete value.qustion_color_error
                    }

                })

            }
            //console.log(ival.content.questionList)



        })



        // let Changesvalue = [];
        // SelectedValue.map((ival, index) => {
        //   var found_index = LevelStage.findIndex((a) =>
        //     a.theme === ival.value
        //   )
        //   Changesvalue.push(LevelStage[found_index])

        // })

        levelContent[0].name = levelSelect.value
        levelContent[0].structure = Contentdata
        //this.setState({enableLoader:true})
        let postJson = {
            levelId: levelSelect.value,
            languageId: languageSelect.value, jsonData: JSON.stringify(Contentdata),
            sessionId: '1223'
        };

        let responseData = await doConnect("updateModuleLanguageMapping", "POST", postJson);
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

        if (found_index != '-1') {

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
        const { inputValue, SelectedValue, Contentdata } = this.state;
        inputValue[index] = e;
        Contentdata[index].title = inputValue[index]
        this.setState({ inputValue, Contentdata });


    }

    addMoreContent() {

        const { Contentdatacount, Contentdata, selectedOption } = this.state;
        Contentdata.push({ title: '', theme: '', content: {} })
        this.setState({ Contentdatacount, Contentdata })

    }


    removeIndex(index) {
        const { Contentdata, SelectedValue, inputValue } = this.state;

        SelectedValue[index] = '';
        inputValue[index] = ''

        let Contentdata_array = [...this.state.Contentdata]
        delete Contentdata_array[index];
        Contentdata_array = [...Contentdata_array]
        Contentdata_array = Contentdata_array.filter(function (el) {
            return el != null;
        });

        let Selected_Value = SelectedValue.filter(function (el) {
            return el != "";
        });

        let input_Value = inputValue.filter(function (el) {
            return el != "";
        });


        this.setState({ SelectedValue: Selected_Value, inputValue: input_Value, Contentdata: Contentdata_array })


    }

    getImageOption() {
        let imageOptions = [];
        Object.keys(this.state.fileData).map((ival, index) => {
            let image = this.state.fileData[ival];
            imageOptions.push({ value: MyConstant.keyList.apiURL + "vp?action=module&key=" + image.fileName + "&id=" + image.fileType, label: image.title, json: image })
        });
        return imageOptions
    }

    return_Content_doublebox(Select, index_1) {
        const { Contentdata, LevelStage, dummyOptionSelect, ImageValidate, contentText, contentTextValidate } = this.state;
        var found_index = LevelStage.findIndex((a) =>
            a.theme === Select
        )
        let imageOptions = this.getImageOption()
        let checkindex = imageOptions.findIndex(x => x.json.id == Contentdata[index_1].content.image.id);
        if (checkindex != "-1") {
            //console.log('checkindex',imageOptions[checkindex])
            dummyOptionSelect[index_1] = imageOptions[checkindex]
            // console.log(dummyOptionSelect)
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
            editable={"false"}
        />
    }

    return_Content_doubleboxUnderImage(Select, index_1) {
        const { Contentdata, LevelStage, dummyOptionSelect, ImageValidate, contentText, contentTextValidate } = this.state;
        var found_index = LevelStage.findIndex((a) =>
            a.theme === Select
        )
        let imageOptions = this.getImageOption()
        let checkindex = imageOptions.findIndex(x => x.json.id == Contentdata[index_1].content.image.id);
        if (checkindex != "-1") {
            //console.log('checkindex',imageOptions[checkindex])
            dummyOptionSelect[index_1] = imageOptions[checkindex]
            // console.log(dummyOptionSelect)
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
            editable={"false"}
        />
    }

    return_qustioncontent(value, index_1) {
        let arrayvalue = [];

        const { LevelStage, Contentdata } = this.state;
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
            editable={"false"}


        />

    }

    return_Content_introduce(value, index_1) {

        let arrayvalue = [];

        const { LevelStage, Contentdata, dummyOptionSelect, OptionSelect } = this.state;
        var found_index = LevelStage.findIndex((a) =>
            a.theme === value
        )

        let imageOptions = this.getImageOption()



        let remove_undef = Contentdata[index_1].content.persons.filter(function (element) {
            return element !== null;
        });
        Contentdata[index_1].content.persons = remove_undef;
        console.log(Contentdata[index_1])
        //bg,imageBg,name,says
        return <IntroducePersons
            LevelStage={LevelStage}
            found_index={found_index}
            Contentdata={Contentdata}
            index_1={index_1}
            OptionSelect={dummyOptionSelect}
            option={imageOptions}
            editable={"false"}
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
            editable={"false"}


        />
    }


    return_content_circle(value, index_1, type) {

        const { LevelStage, dummyOptionSelect, Contentdata } = this.state;
        var found_index = LevelStage.findIndex((a) =>
            a.theme === value
        )


        let arrayvalue = []
        let imageOptions = this.getImageOption()


        let checkindex = imageOptions.findIndex(x => x.json.id == Contentdata[index_1].content.image.id);
        if (checkindex != "-1") {
            //console.log('checkindex',imageOptions[checkindex])
            dummyOptionSelect[index_1] = imageOptions[checkindex]
            // console.log(dummyOptionSelect)
        }

        console.log("thata", Contentdata[index_1])

        return <CircleWithInfoAnimations
            LevelStage={LevelStage}
            optionSelect={dummyOptionSelect}
            option={imageOptions}
            index_1={index_1}
            found_index={found_index}
            Contentdata={Contentdata}
            type={type}
            editable={"false"}


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
            editable={"false"}
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

        let checkindex = imageOptions.findIndex(x => x.json.id == Contentdata[index_1].content.image.id);
        if (checkindex != "-1") {
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
            editable={"false"}

        />

    }


    indexChange(index, type) {
        const { Contentdata } = this.state;

        //alert(type)

        if (type == "Down") {

            let value = [...Contentdata]

            console.log('index', index)
            console.log('Move index', index + 1)
            console.log(index, "--", Contentdata[index])
            console.log(index + 1, "--", Contentdata[index + 1])

            value[index] = Contentdata[index + 1]
            value[index + 1] = Contentdata[index]
            this.setState({ Contentdata: value })

        }

        if (type == "Up") {

            let value = [...Contentdata]

            console.log('index', index)
            console.log('Move index', index - 1)

            value[index] = Contentdata[index - 1]
            value[index - 1] = Contentdata[index]
            this.setState({ Contentdata: value })


        }

    }


    Story_Function(Value, index_1) {
        const { LevelStage, Contentdata, dummyOptionSelect } = this.state;

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
        let checkindex = imageOptions.findIndex(x => x.json.id == Contentdata[index_1].content[0].content.image.id);
        if (checkindex != "-1") {
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
            editable={"false"}

        />)

        test.push(<React.Fragment>
            <div className="row item form-group col-12">
                <h4 style={{ color: 'black' }}> {LevelStage[found_index].content[1].theme} :  </h4>
            </div>
        </React.Fragment>
        )



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
        let checkindex_2 = imageOptions.findIndex(x => x.json.id == Contentdata[index_1].content[2].content.image.id);
        if (checkindex_2 != "-1") {
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
            type={true}
            editable={"false"}

        />)

        return test

    }



    async getLanguageList() {
        let postJson = { sessionId: '1223' };
        let responseData = await doConnect("getLanguages", "POST", postJson);
        this.setState({ "languagesData": JSON.parse(responseData.response) })
    }
    async LanguageChange(e) {
        const { olddata, levelSelect, tamilData, Contentdata } = this.state;
        let postJson = { levelId: levelSelect.value, languageId: e.value, sessionId: '1223' };
        let responseData = await doConnect("getModuleLanguageMapping", "POST", postJson);
        var json = responseData;
        var response = json.response;
        console.log('responseData', JSON.parse(response))
        console.log('olddata', olddata)


        if (response) {
            Object.keys(olddata).forEach(val => {

                if (JSON.parse(response)[val]) {

                    if (olddata[val].theme == JSON.parse(response)[val].theme) {
                        if (JSON.parse(response)[val]) {
                            //console.log(JSON.parse(response)[val])
                            tamilData[val] = JSON.parse(response)[val];


                        }
                    }

                    else {
                        console.log("sss-->" + JSON.parse(response)[val])
                        //console.log('un')
                        console.log("deleted")
                    }

                }


            })
            //console.log('tamilData',tamilData)

            this.setState({
                Contentdata: tamilData, languageSelect: e, viewState: true,
                // Contentdata: this.state.tamilData

            })

        }
        else {
            console.log('tamilData', tamilData)

            if (Contentdata.length != 0) {

                this.setState({ languageSelect: e, viewState: true, Contentdata: olddata })

            }

        }

    }


    render() {

        const { selectedOption, Contentdata, levelSelect, SelectedValue, inputValue, languageSelect, languageOption,
            errorLanguage, viewState, languagesData } = this.state;

        let levelOption = [];
        Object.keys(this.state.levelsJson).map((ival, index) => {
            let levelData = this.state.levelsJson[ival];
            levelOption.push({ value: levelData.id, label: levelData.name, })
        });

        let languagesOption = []
        if (languagesData) {
            Object.keys(languagesData).map((ival, index) => {
                languagesOption.push({ value: ival, label: languagesData[ival], })
            });
        }


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
                                            <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                                            </li>
                                            <li className="dropdown">
                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item" href="#">Settings 1</a>
                                                    <a className="dropdown-item" href="#">Settings 2</a>
                                                </div>
                                            </li>
                                            <li><a className="close-link"><i className="fa fa-close"></i></a>
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
                                                    // onChange={(e) => {
                                                    //   this.setState({ levelSelect: e })
                                                    //   this.getLevelMappingData(e.value)
                                                    // }}
                                                    options={levelOption}
                                                    isDisabled={true}
                                                />

                                                <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}> {this.state.levelSelectError}</span>
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





                                        <br />

                                        {viewState ?
                                            <React.Fragment>
                                                {console.log(Contentdata)}

                                                {Contentdata && Contentdata.map((val, index) => {

                                                    return (<React.Fragment>

                                                        <div className="container">
                                                            <div className="card">
                                                                <div className="card-body">

                                                                    <div className="row item form-group" style={{ marginBottom: 10 }}>
                                                                        <div className="col-sm-1 text-ali-left">  <h4> Stage {index + 1} </h4>  </div>
                                                                        <div className="col-sm-6"></div>
                                                                        <div className="col-sm-3"> </div>

                                                                        <div className="col-sm-2">



                                                                        </div>
                                                                    </div>

                                                                    <div className="row item form-group">
                                                                        <div className="col-sm-1 text-ali-left"> Title </div>
                                                                        <div className="col-sm-5">
                                                                            <input type={'text'} className={'form-control'} value={Contentdata[index].title} placeholder={'Enter Title'} style={{ width: '100%' }}
                                                                                onChange={(e) => { this.titleOnchange(e.target.value, index) }}
                                                                            />
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
                                                                                {Contentdata[index].theme == Contentdata[index].theme ? { label: Contentdata[index].theme, value: Contentdata[index].theme } : !SelectedValue[index] ? { label: "Select", value: "Select" } : SelectedValue[index]}
                                                                                //   onChange={(e) => this.handleChange(e, index)}
                                                                                options={this.state.options}
                                                                                isDisabled={true}
                                                                            />
                                                                            <span style={{ color: 'red', fontSize: 12, float: 'inherit', marginTop: 10 }}>{this.state.ThemeValidate[index]}</span>
                                                                        </div>
                                                                        <div className="col-sm-2">

                                                                            {this.state.imageView[index] ?
                                                                                <img style={{ width: '100%', height: 100 }}
                                                                                    src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.imageView[index].json.image.fileName + "&id=" + this.state.imageView[index].json.image.fileType}

                                                                                    alt={'No Image'} className="img-responsive" onClick={() => {
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

                                                                    {Contentdata[index] && Contentdata[index].theme == "DoubleBoxOverlapWithImage" ?
                                                                        this.return_Content_doublebox(Contentdata[index].theme, index)
                                                                        : null}

                                                                    {Contentdata[index] && Contentdata[index].theme == "DoubleBoxUnderWithImage" ?
                                                                        this.return_Content_doubleboxUnderImage(Contentdata[index].theme, index)
                                                                        : null}

                                                                    {Contentdata[index] && Contentdata[index].theme == "ImageWithThinking" ?
                                                                        this.return_Content_doublebox(Contentdata[index].theme, index)
                                                                        :
                                                                        null}


                                                                    {Contentdata[index] && Contentdata[index].theme == "QuestionsList" ?

                                                                        <div className="row item form-group">
                                                                            <div className="col-sm-10">
                                                                                <div className="row item form-group" style={{ marginTop: 20 }}>
                                                                                    {this.return_qustioncontent(Contentdata[index].theme, index)}  </div>
                                                                            </div>

                                                                            <div className="col-sm-1">
                                                                                <div className="row">
                                                                                    {/* <button type="button" className="btn btn-primary active" onClick={() => {
                                    const { LevelStage, Contentdata } = this.state;
 
                                }} >Add Question</button> */}
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                        : null}


                                                                    {Contentdata[index] && Contentdata[index].theme == "IntroducePersons" ?
                                                                        <div className="row item form-group">
                                                                            <div className="col-sm-10">
                                                                                <div className="row item form-group">

                                                                                    {this.return_Content_introduce(Contentdata[index].theme, index)}

                                                                                </div>

                                                                            </div>

                                                                            <div className="col-sm-2">
                                                                                {/* <button type="button" className="btn btn-primary active" onClick={() => {
                                const { LevelStage } = this.state;

                            }} >Add</button> */}


                                                                            </div>

                                                                        </div>
                                                                        :
                                                                        null}

                                                                    {Contentdata[index] && Contentdata[index].theme == "ChooseCheckboxQuestions" ?

                                                                        <div className="row" style={{ marginTop: 15 }}>
                                                                            <div className="col-sm-1"><h4>Setting</h4></div>
                                                                            <div className="col-sm-10">
                                                                                {this.return_Content_choose_checkbox(Contentdata[index].theme, index)}
                                                                            </div>

                                                                        </div>

                                                                        : null
                                                                    }


                                                                    {Contentdata[index] && Contentdata[index].theme == "CircleWithInfoAnimations" ?
                                                                        <div className="row ">
                                                                            {this.return_content_circle(Contentdata[index].theme, index, false)}
                                                                        </div>
                                                                        : null
                                                                    }


                                                                    {Contentdata[index] && Contentdata[index].theme == "PersonWithTextAnimation" ?
                                                                        <div className="row item form-group">
                                                                            {this.return_content_person(Contentdata[index].theme, index)}
                                                                        </div>
                                                                        : null
                                                                    }

                                                                    {Contentdata[index] && Contentdata[index].theme == "AudioQuizScreen" ?
                                                                        <div className="row item form-group">
                                                                            {this.return_content_audioscreen(Contentdata[index].theme, index)}
                                                                        </div>
                                                                        : null
                                                                    }


                                                                    {Contentdata[index] && Contentdata[index].theme == "DropToSelection" ?
                                                                        <div className="row item form-group">
                                                                            {this.return_content_circle(Contentdata[index].theme, index, true)}
                                                                        </div>
                                                                        : null
                                                                    }



                                                                    {Contentdata[index] && Contentdata[index].theme == "Success" ?
                                                                        <div className="row item form-group">
                                                                            {this.return_content_Success(Contentdata[index].theme, index)}
                                                                        </div>
                                                                        : null
                                                                    }

                                                                    {Contentdata[index] && Contentdata[index].theme == "MeetSinglePerson" ?
                                                                        <div className="row item form-group">
                                                                            {this.MeetSinglePersonFunction(Contentdata[index].theme, index)}
                                                                        </div>
                                                                        : null
                                                                    }


                                                                    {Contentdata[index] && Contentdata[index].theme == "StoryCard" ?

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




                                            </React.Fragment>
                                            : null}


                                        <br />



                                        <div className="row item form-group">
                                            <div className="col-sm-2">  </div>

                                            <div className="col-sm-3">
                                                <button type="button" className="btn btn-primary active" disabled={this.state.enableLoader} onClick={(e) => { this.submit() }} >
                                                    {this.state.enableLoader ? <i className="fa fa-spinner fa-spin"></i> : null} Submit</button>
                                            </div>

                                            <div className="col-sm-3">
                                                {/* <button type="button" className="btn btn-primary active" style={{ backgroundColor: '#FF4500', borderColor: '#FF4500' }} onClick={(e) => { 
                                                        //this.addMoreContent()
                                                         }} >Add New Stage </button> */}
                                            </div>

                                            <div className="col-sm-4"> </div>
                                        </div>


                                        {/*Image View*/}
                                        <div id="myModal" className="modal_image" style={{ display: this.state.displayImage }} >
                                            <span className="close" onClick={() => {
                                                this.setState({ displayImage: "none" })
                                            }}  >&times;</span>
                                            {this.state.imageBigView ?

                                                <img src={MyConstant.keyList.apiURL + "vp?action=module&key=" + this.state.imageBigView.json.image.fileName + "&id=" + this.state.imageBigView.json.image.fileType} className="modal-content_image" id="img01" />

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

export default LevelManagerLanguage
