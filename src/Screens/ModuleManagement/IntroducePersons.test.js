import React from "react";
import { render } from "@testing-library/react";
import IntroducePersons from "./IntroducePersons";
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
      persons: [
        {
          name: "Person 1",
          nameClassName: "Name Class Name 1",
          imageBg: "#ffffff",
          bg: "#ff0000",
          says: "Person 1 says...",
          image: { json: { label: "Option 1", value: "option1" } },
          imagestyle: "Image Style 1",
          imageclassname: "Image Class Name 1",
        },
      ],
    },
  },
  {
    content: {
      persons: [
        {
          name: "Person 2",
          nameClassName: "Name Class Name 2",
          imageBg: "#ffff00",
          bg: "#00ff00",
          says: "Person 2 says...",
          image: { json: { label: "Option 2", value: "option2" } },
          imagestyle: "Image Style 2",
          imageclassname: "Image Class Name 2",
        },
      ],
    },
  },
];

const isEditable = "true";

const dummyProps = {
  LevelStage: {},
  OptionSelect: dummyOptionSelect,
  sectionLearning: dummySectionLearning,
  index_1: 0,
  option: dummyOptions,
  editable: isEditable,
  setValue: jest.fn(),
};

describe("IntroducePersons", () => {
  it("renders the component", () => {
    render(
      <Router>
        <IntroducePersons {...dummyProps} />
      </Router>
    );
  });
});
