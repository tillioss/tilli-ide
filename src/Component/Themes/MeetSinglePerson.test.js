import React from "react";
import { render } from "@testing-library/react";
import MeetSinglePerson from "./MeetSinglePerson";
import { BrowserRouter as Router } from "react-router-dom";

const props = {
  LevelStage: [
    {
      theme: "StoryCard",
      content: [
        {
          title: "Story Title",
          title_error: "",
          content: {
            image: {
              title: "Image Title",
              fileName: "dummyFileName.png",
              fileType: "png",
            },
            image_error: "",
            color_1: "#FFFFFF",
            color_1_error: "",
            color_2: "#000000",
            color_2_error: "",
            bottomText: "Some text here",
            bottomText_error: "",
            personName: "John Doe",
            personName_error: "",
            body: "Some content body here",
            body_error: "",
            question: "Some question here",
            question_error: "",
          },
        },
      ],
    },
  ],
  found_index: 0,
  index_1: 0,
  Contentdata: [
    {
      content: [
        {
          title: "Story Title",
          title_error: "",
          content: {
            image: {
              title: "Image Title",
              fileName: "dummyFileName.png",
              fileType: "png",
            },
            image_error: "",
            color_1: "#FFFFFF",
            color_1_error: "",
            color_2: "#000000",
            color_2_error: "",
            bottomText: "Some text here",
            bottomText_error: "",
            personName: "John Doe",
            personName_error: "",
            body: "Some content body here",
            body_error: "",
            question: "Some question here",
            question_error: "",
          },
        },
      ],
    },
  ],
  optionSelect: [],
  option: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ],
  editable: "true",
};

describe("MeetSinglePerson", () => {
  it("renders the component", () => {
    render(
      <Router>
        <MeetSinglePerson {...props} />
      </Router>
    );
  });
});
