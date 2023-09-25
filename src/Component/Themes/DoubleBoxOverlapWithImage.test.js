import React from "react";
import { render } from "@testing-library/react";
import DoubleBoxOverlapWithImage from "./DoubleBoxOverlapWithImage";
import { BrowserRouter as Router } from "react-router-dom";

const dummyOptionSelect = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

const dummyContentdata = [
  {
    content: {
      image: {
        title: "Image Title 1",
        fileName: "image1.png",
        fileType: "png",
      },
      text: "Sample text for DoubleBoxOverlapWithImage component",
    },
  },
];

const props = {
  OptionSelect: [],
  Option: dummyOptionSelect,
  LevelStage: dummyContentdata,
  index_1: 0,
  ImageValidate: [],
  contentTextValidate: [],
  Contentdata: dummyContentdata,
  editable: true,
};

describe("DoubleBoxOverlapWithImage", () => {
  it("renders the component", () => {
    render(
      <Router>
        <DoubleBoxOverlapWithImage {...props} />
      </Router>
    );
  });
});
