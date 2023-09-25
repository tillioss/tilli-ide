import React from "react";
import { render } from "@testing-library/react";
import DoubleBoxOverlapWithImage from "./DoubleBoxOverlapWithImage";
import { BrowserRouter as Router } from "react-router-dom";

const dummyOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

const dummyOptionSelect = {
  0: { label: "Option 1", value: "option1" },
  1: { label: "Option 2", value: "option2" },
};

const dummySectionLearning = [
  {
    content: {
      image: { json: { label: "Option 1", value: "option1" } },
      imagestyle: "Image Style 1",
      imageclassname: "Image Class Name 1",
      text: "Content text 1",
    },
  },
  {
    content: {
      image: { json: { label: "Option 2", value: "option2" } },
      imagestyle: "Image Style 2",
      imageclassname: "Image Class Name 2",
      text: "Content text 2",
    },
  },
];

const isEditable = "true";

const dummyProps = {
  OptionSelect: dummyOptionSelect,
  Option: dummyOptions,
  index_1: 0,
  editable: isEditable,
  sectionLearning: dummySectionLearning,
  setValue: jest.fn(),
};

describe("DoubleBoxOverlapWithImage", () => {
  it("renders the component", () => {
    render(
      <Router>
        <DoubleBoxOverlapWithImage {...dummyProps} />
      </Router>
    );
  });
});
