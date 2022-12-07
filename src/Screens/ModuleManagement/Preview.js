import React from "react";
import DoubleBoxOverlapWithImage from './Themes/DoubleBoxOverlapWithImage';
import ImageWithThinking from './Themes/ImageWithThinking';
import QuestionsList from './Themes/QuestionsList';
import ChooseCheckboxQuestions from './Themes/ChooseCheckboxQuestions';
import CircleWithInfoAnimations from './Themes/CircleWithInfoAnimations';
import IntroducePersons from './Themes/IntroducePersons';
import AudioQuizScreen from './Themes/AudioQuizScreen';
import DropToSelection from './Themes/DropToSelection';
import MeetSinglePerson from './Themes/MeetSinglePerson';
import StoryCardScreen from './Themes/StoryCardScreen';
import DoubleBoxUnderWithImage from './Themes/DoubleBoxUnderWithImage';
import SingleTextImage from './Themes/SingleTextImage';
import AskGender from './Themes/AskGender';
import AskAge from './Themes/AskAge';
import DragAndDrop from "./ThemeBuilder/ThemeView/DragAndDrop";
import LabelAnimation from "./ThemeBuilder/ThemeView/LabelAnimation";
import drag_drop from '../../images/drag_drop.png';
import GroupedInput from "./ThemeBuilder/ThemeView/GroupedInput";
import outlineRightIcon from '../../images/outlineRightIcon.png';


export default class Preview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            moduleJson: { stages: [] },
            stage: 1,
            deviceHeight: "",
            deviceWidth: "",
        }
        this.dynamicThemeAction = this.dynamicThemeAction.bind(this)
    }

    componentDidMount() {
        let height = this.mobile.clientHeight;
        let width = this.mobile.clientWidth;
        let { moduleJson } = this.props;
        this.setState({
            moduleJson,
            deviceHeight: height,
            deviceWidth: width,
        })
    }

    changeStage = (action, currentStage, Type) => {
        if (action == 'Next') {
            let { moduleJson } = this.state;
            let stages = moduleJson.stages;
            let scoreBordScreen = false

            if (currentStage == stages.length) {
                // this.completeFinalStage();
            } else {
                this.setState({ stage: currentStage + 1, PreviousPages: false });
            }
        } else if (action == 'Previous') {
            let { moduleJson } = this.state;
            let scoreBordScreen = false
            this.setState({ stage: currentStage - 1, PreviousPages: true, scorePointsView: scoreBordScreen });
        }
    };

    storyPoints(jindex, point) {
        let { moduleJson } = this.state
        if (!moduleJson.stages[jindex - 1].demoPage) {
            moduleJson.stages[jindex - 1].storyPoints = point
        }
        this.setState({ moduleJson: moduleJson })
    }

    changeScreen(action, cstage) {

        let { moduleJson } = this.state
        let stages = moduleJson.stages;
        let scorePoint = true


        this.changeStage("Next", cstage)

        // if (stages && stages[cstage] && stages[cstage].theme) {
        //     let findNextThemeIndex = cstage
        //     let getUserGender = localStorage.getItem("userGender")
        //     let getUserAge = localStorage.getItem("userAge")
        //     if (stages[findNextThemeIndex].theme == "Ask Age" || stages[findNextThemeIndex].theme == "Ask Gender") {
        //         if (action != "Previous" && getUserAge == "" || getUserGender == "") {
        //             scorePoint = false
        //             this.changeStage("Next", cstage, true)
        //         }
        //         if (action == "Next") {
        //             cstage = cstage + 1
        //         }
        //         else if (action == "Previous") {
        //             scorePoint = true
        //         }
        //     }
        // }

        // this.setState({ scoreCurrentStage: action == "Previous" ? cstage - 1 : cstage, scorePointsView: scorePoint })
    }


    updateUserDetailsInfo() {

    }

    dynamicThemeAction(layer) {
        let { stage, moduleJson } = this.state;
        let action = layer.action;
        let visible;
        let hidden;
        let currentStage;
        switch(action) {
            case "Next":
                this.changeStage("Next", stage);
                break;
            case "Previous":
                this.changeStage("Previous", stage);
                break;
            case "Change Layout":
                 visible = layer.layers.visible;
                 hidden = layer.layers.hidden;
                currentStage = parseInt(stage - 1);
                visible.map((row)=> {
                    moduleJson.stages[currentStage].layers[row].visibility = "visible";
                })
                hidden.map((row)=> {
                    moduleJson.stages[currentStage].layers[row].visibility = "hidden";
                })
                break;
            case "Checked Layout":
                visible = layer.layers.visible;
                hidden = layer.layers.hidden;
                currentStage = parseInt(stage - 1);
                visible.map((row)=> {
                    moduleJson.stages[currentStage].layers[row].visibility = moduleJson.stages[currentStage].layers[row].visibility === "hidden" ? "visible" : "hidden";
                })
                hidden.map((row)=> {
                    moduleJson.stages[currentStage].layers[row].visibility = moduleJson.stages[currentStage].layers[row].visibility === "hidden" ? "visible" : "hidden";
                })
                break;
        }

        this.setState({
            moduleJson
        })
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
                    onClick={() => {
                        this.dynamicThemeAction(layer)
                    }}
                >
                </div>
                break;
            case "groupedInput":
                builder = <GroupedInput dynamicThemeAction={this.dynamicThemeAction} deviceHeight={deviceHeight} index={index} layer={layer} />
                break;
            case "labelAnimation":
                builder = <LabelAnimation dynamicThemeAction={this.dynamicThemeAction}  deviceHeight={deviceHeight} index={index} layer={layer} />
                break;
            case "dragAndDrop":
                builder = <DragAndDrop dynamicThemeAction={this.dynamicThemeAction} deviceHeight={deviceHeight} index={index} layer={layer} />
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
                    onClick={() => {
                        this.dynamicThemeAction(layer)
                    }}
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
                    onClick={() => {
                        this.dynamicThemeAction(layer)
                    }}
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
                    onClick={() => {
                        this.dynamicThemeAction(layer)
                    }}
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
                    onClick={() => {
                        this.dynamicThemeAction(layer)
                    }}
                    >
                    <img style={{ width: "100%", height: "100%" }} src={layer.image ? layer.image : drag_drop} />
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
                    onClick={() => {
                        this.dynamicThemeAction(layer)
                    }}
                    >
                    <video style={{ width: "100%", height: "100%" }} >
                        <source src={layer.video ? layer.video : drag_drop} />
                    </video>
                </div>
                break;
        }
        return builder;
    }

    render() {
        let storyCount = 0
        let totalPoint = 0
        let PercentageTotal = 0
        let trustPointText = "";
        if (this.state.moduleJson) {
            this.state.moduleJson.stages.map((kval, k) => {
                if (kval.theme == "StoryCard") {
                    storyCount = storyCount + 1
                }

                if (kval.storyPoints) {
                    totalPoint = totalPoint + kval.storyPoints
                }
            })
        }

        let displayPage = this.state.moduleJson && this.state.moduleJson.stages.map((stage, index) => {
            let stageIndex = parseInt(index) + 1;
            if (this.state.stage == stageIndex) {
                let themeType = stage.themeType;
                let layers = stage.layers;
                if (themeType === "Dynamic" || (layers !== undefined && layers.length > 0)) {
                    return <div>
                        {
                            stage.layers.map((layer, layerIndex) => {
                                return <div className="" key={layerIndex}>
                                    {
                                        this.layerBuild(layer, layerIndex)
                                    }
                                </div>
                            })
                        }
                    </div>
                } 
                else if (themeType === "godot") {
                    return <>
                        <div className='zipfile-center'><i class="fa fa-file-zip-o"></i>
                        </div>
                        {this.state.moduleJson.stages.length !== stageIndex &&
                            <div style={{ position: "absolute", top: "85%", left: "85%", width: "12%", height: "64px" }}>
                                <img src={outlineRightIcon} style={{ width: "100%", height: "100%" }} onClick={() => {
                                    this.changeStage("Next", this.state.stage);
                                }} />
                            </div>
                        }

                    </>

                }
                else {
                    let theme = stage.theme;
                    let total = totalPoint / parseInt(storyCount * 200)
                    PercentageTotal = total.toString().substring(0, 5) * 100
                    let progressDiv = ""
                    switch (theme) {
                        case 'DoubleBoxOverlapWithImage':
                            return (
                                <div key={index.toString()}>
                                    <DoubleBoxOverlapWithImage
                                        changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}
                                    />
                                </div>
                            );

                        case 'DoubleBoxUnderWithImage':
                            return (
                                <div key={index.toString()}>
                                    <DoubleBoxUnderWithImage
                                        changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                    />
                                    {progressDiv}
                                </div>
                            );
                        case 'ImageWithThinking':
                            return (
                                <div key={index.toString()}>
                                    <ImageWithThinking
                                        changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}
                                    />
                                </div>
                            );
                        case 'QuestionsList':
                            return (
                                <div key={index.toString()}>
                                    <QuestionsList changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}
                                    />
                                </div>
                            );
                        case 'ChooseCheckboxQuestions':
                            return (
                                <div key={index.toString()}>
                                    <ChooseCheckboxQuestions changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}
                                    />
                                </div>
                            );
                        case 'CircleWithInfoAnimations':
                            return (
                                <div key={index.toString()}>
                                    <CircleWithInfoAnimations changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}
                                    />
                                </div>
                            );


                        case 'IntroducePersons':
                            return (
                                <div key={index.toString()}>
                                    <IntroducePersons changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}
                                    />
                                </div>
                            );

                        //         case 'PersonWithTextAnimation':
                        //         return (
                        //             <PersonWithTextAnimation
                        //             
                        //             changeStage={this.changeStage}
                        //             stage={this.state.stage}
                        //             key={stageIndex}
                        //             data={stage}
                        //             />
                        //         );


                        case 'DropToSelection':
                            return (
                                <div key={index.toString()}>
                                    <DropToSelection
                                        changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        changeindex={() => {
                                            this.changeStage('Next', this.state.stage);
                                        }}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}
                                    />

                                    {progressDiv}
                                </div>
                            );


                        case 'AudioQuizScreen':
                            return (
                                <div key={index.toString()}>
                                    <AudioQuizScreen changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}
                                    />
                                    {progressDiv}
                                </div>
                            );




                        // case 'Success':
                        //     return (
                        //         <Success
                        //             
                        //             changeStage={this.changeStage}
                        //             stage={this.state.stage}
                        //             key={stageIndex}
                        //             data={stage}
                        //         />
                        //     );

                        case 'MeetSinglePerson':
                            return (
                                <div key={index.toString()}>
                                    <MeetSinglePerson changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}
                                    />
                                    {progressDiv}
                                </div>
                            );

                        case 'StoryCard':
                            return (
                                <div key={index.toString()}>
                                    <StoryCardScreen changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        moduleJson={this.state.moduleJson}
                                        PreviousPages={this.state.PreviousPages}
                                        storyPoints={(jindex, point) => { this.storyPoints(jindex, point) }}
                                        changeScreen={(action, cstage) => { this.changeScreen(action, cstage) }}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}

                                    />
                                    {progressDiv}
                                </div>
                            );
                        // return null;

                        case 'SingleTextImage':
                            return (
                                <div key={index.toString()}>
                                    <SingleTextImage changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        moduleJson={this.state.moduleJson}
                                        PreviousPages={this.state.PreviousPages}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}
                                    />
                                </div>
                            );


                        case 'Ask Gender':
                            return (
                                <div key={index.toString()}>
                                    <AskGender changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        moduleJson={this.state.moduleJson}
                                        PreviousPages={this.state.PreviousPages}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}
                                        updateUserDetailsInfo={(post) => { this.updateUserDetailsInfo(post) }}
                                        previousScorePage={(typeValue, stage_Index) => { this.previousScorePagefun(typeValue, stage_Index) }}
                                    />
                                </div>
                            );

                        case 'Ask Age':
                            return (
                                <div key={index.toString()}>
                                    <AskAge changeStage={this.changeStage}
                                        stage={this.state.stage}
                                        key={stageIndex}
                                        data={stage}
                                        moduleJson={this.state.moduleJson}
                                        PreviousPages={this.state.PreviousPages}
                                        PercentageTotal={PercentageTotal}
                                        trustPointText={trustPointText}
                                        totalPoint={totalPoint}
                                        updateUserDetailsInfo={(post) => { this.updateUserDetailsInfo(post) }}
                                        previousScorePage={(typeValue, stage_Index) => { this.previousScorePagefun(typeValue, stage_Index) }}
                                    />
                                </div>
                            );
                    }
                }
            }
        });

        return <div className="smartphone">
            <div className="smartphone-content tilli-web" ref={(e) => { this.mobile = e }}>
                {displayPage}
            </div>
        </div>
    }
}
