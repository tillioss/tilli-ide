import React from "react";
import { doConnect } from "../../config/Common";

export default class CloneTheme extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sectionLearning: [],
            sectionBuildStory: [],
            themeSelected: [],
            themeSelectedJson: {}
        }
    }

    componentDidMount() {
        let { levelId } = this.props;
        this.getLevelMappingData(levelId)
    }

    componentDidUpdate(prevProps) {
        if (this.props.levelId !== prevProps.levelId) {
            let { levelId } = this.props;
            this.setState({
                themeSelected: [],
                themeSelectedJson: {}
            }, () => {
                this.getLevelMappingData(levelId)
            })
        }
    }
    async getLevelMappingData(levelId) {
        let postJson = { levelId: levelId, sessionId: '1223' };
        let responseData = await doConnect("getLevelMappingData", "POST", postJson);

        let contentdata = responseData.response;
        if (contentdata) {
            let JsonParseData = JSON.parse(contentdata);
            let { stage } = JsonParseData
            let withOutStory = []
            let withStory = []
            stage.map((ival, index) => {
                if (ival.theme === "StoryCard" || ival.theme === "Ask Age" || ival.theme === "Ask Gender") {
                    withStory.push(ival)
                }
                else {
                    withOutStory.push(ival)
                }
                return true
            })

            this.setState({
                sectionLearning: withOutStory,
                sectionBuildStory: withStory,
            })
        }
    }

    themeSelect(id, theme) {
        let { themeSelected, themeSelectedJson } = this.state;

        if (themeSelected.includes(id)) {
            let index = themeSelected.indexOf(id);
            themeSelected.splice(index, 1);

            delete themeSelectedJson[id];
        } else {
            themeSelected.push(id)
            themeSelectedJson[id] = theme;
        }

        this.setState({
            themeSelected,
            themeSelectedJson
        }, () => {
            this.props.setThemeSelected(themeSelected, themeSelectedJson)
        })

    }

    render() {
        let { sectionBuildStory, sectionLearning, themeSelected } = this.state;

        return <div>
            <div className="row my-2" style={{ background: '#3f51b5', color: '#fff', padding: 10 }}>
                <div className="col-6" style={{ borderRight: '1px solid' }}>
                    <b>LEARNING (Add Learning Card)</b>
                </div>
                <div className="col-6">
                    <b>Apply (Building a story flow)</b>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    {
                        sectionLearning.map((theme, themeIndex) => {
                            return <div className="row  my-2" key={themeIndex}>
                                <div className="col-9">
                                    {`Theme ${themeIndex + 1}`} <br />
                                    <b>{theme.theme}</b>
                                </div>
                                <div className="col-3">
                                    <input type="checkbox" checked={themeSelected.includes("theme-" + themeIndex)} onChange={(e) => { this.themeSelect("theme-" + themeIndex, theme) }} />
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="col-6">
                    {
                        sectionBuildStory.map((story, storyIndex) => {
                            return <div className="row my-2" key={storyIndex}>
                                <div className="col-9">
                                    {`Story ${storyIndex + 1}`}
                                    <br />
                                    <b>{story.theme}</b>
                                </div>
                                <div className="col-3">
                                    <input type="checkbox" checked={themeSelected.includes("story-" + storyIndex)} onChange={(e) => { this.themeSelect("story-" + storyIndex, story) }} />
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>;
    }
}
