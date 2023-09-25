import React from "react";
import { render } from "@testing-library/react";
import ModuleMeetSinglePerson from "./ModuleMeetSinglePerson";
import { BrowserRouter as Router } from "react-router-dom";

const dummySectionLearning = [
  {
    content: {
      image: { label: "Image 1", value: "Image 1" },
      imagestyle: "image-style-1",
      imageclassname: "image-class-1",
      bottomText: "Bottom Text 1",
      bottomclassName: "bottom-class-1",
      body: "Content body 1",
      bodyclassname: "body-class-1",
      question: "Content question 1",
      questionclassname: "question-class-1",
      chooseType: { label: "Image", value: "Image" },
      color_1: "#ffffff",
      color_2: "#000000",
      personName: "Person Name 1",
      personclassname: "person-class-1",
    },
  },
];

const dummyOptions = [
  { label: "Image 1", value: "Image 1" },
  { label: "Image 2", value: "Image 2" },
  { label: "Video 1", value: "Video 1" },
];

const dummyProps = {
  index_1: 0,
  sectionLearning: dummySectionLearning,
  option: dummyOptions,
};

export default dummyProps;

describe("ModuleMeetSinglePerson", () => {
  it("renders the component", () => {
    render(
      <Router>
        <ModuleMeetSinglePerson {...dummyProps} />
      </Router>
    );
  });
});
