import React from "react";
import { render } from "@testing-library/react";
import ModuleCircleWithInfoAnimations from "./ModuleCircleWithInfoAnimations";
import { BrowserRouter as Router } from "react-router-dom";

const dummyOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

// Sample data for OptionSelect prop
const dummyOptionSelect = {
  0: { label: "Option 1", value: "option1" },
  1: { label: "Option 2", value: "option2" },
};

const dummySectionLearning = [
  {
    content: {
      changeColorBox: "#ffffff",
      image: { label: "Option 1", value: "option1" },
      imagestyle: "Image Style 1",
      imageclassname: "Image Class Name 1",
      feelingsDataList: [
        { questions: "Question 1", nameClassName: "Name Class Name 1" },
        { questions: "Question 2", nameClassName: "Name Class Name 2" },
        // Add more questions as needed
      ],
    },
  },
  {
    content: {
      changeColorBox: "#ff0000",
      image: { label: "Option 2", value: "option2" },
      imagestyle: "Image Style 2",
      imageclassname: "Image Class Name 2",
      feelingsDataList: [
        { questions: "Question 3", nameClassName: "Name Class Name 3" },
      ],
    },
  },
];

const isEditable = "true";

const dummySectionBuildStory = [
  {
    content: [
      {
        title: "Title 1",
        content: {
          circles: [],
          message: { failure_header_1: "Option 1" },
          image: { title: "Option 2" },
          imagestyle: "Image Style 1",
          imageclassname: "Image Class Name 1",
          feelingsDataList: [
            { questions: "Question 1", nameClassName: "Name Class Name 1" },
            { questions: "Question 2", nameClassName: "Name Class Name 2" },
          ],
        },
      },
    ],
  },
];

const dummyProps = {
  sectionLearning: dummySectionLearning,
  index_1: 0,
  editable: isEditable,
  themeType: "StoryCard",
  sectionBuildStory: dummySectionBuildStory,
  staticIndex: 0,
  loopIndex: 0,
  optionSelect: dummyOptionSelect,
  option: dummyOptions,
  setValue: jest.fn(),
};

describe("ModuleCircleWithInfoAnimations", () => {
  it("renders the component", () => {
    render(
      <Router>
        <ModuleCircleWithInfoAnimations {...dummyProps} />
      </Router>
    );
  });
});
