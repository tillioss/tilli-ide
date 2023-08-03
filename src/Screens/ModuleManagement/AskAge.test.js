import React from "react";
import { render } from "@testing-library/react";
import AskAge from "./AskAge";
import { BrowserRouter as Router } from "react-router-dom";

const dummySectionLearning = [
  {
    content: {
      image: {
        title: "Image Title 1",
      },
      imagestyle: "Image Style 1",
      imageclassname: "Image Class Name 1",
      question: "Question 1",
      questionClassName: "Question Class Name 1",
      question_2: "Select Age 1",
      question_2_ClassName: "Select Age Class Name 1",
      chooseType_1: "Ask Older 1",
      chooseType_1_ClassName: "Ask Older Class Name 1",
    },
  },
];

describe("AskAge", () => {
  it("renders the component", () => {
    render(
      <Router>
        <AskAge index={0} sectionLearning={dummySectionLearning} />
      </Router>
    );
  });
});
