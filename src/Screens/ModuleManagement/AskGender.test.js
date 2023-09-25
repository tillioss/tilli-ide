import React from "react";
import { render } from "@testing-library/react";
import AskGender from "./AskGender";
import { BrowserRouter as Router } from "react-router-dom";

const dummySectionLearning = [
  {
    content: {
      image: {
        title: "Image Title 2",
      },
      imagestyle: "Image Style 2",
      imageclassname: "Image Class Name 2",
      question: "Question 2",
      questionClassName: "Question Class Name 2",
      question_2: "Select Age 2",
      question_2_ClassName: "Select Age Class Name 2",
      chooseType_1: "Ask Older 2",
      chooseType_1_ClassName: "Ask Older Class Name 2",
    },
  },
];

describe("AskGender", () => {
  it("renders the component", () => {
    render(
      <Router>
        <AskGender index={0} sectionLearning={dummySectionLearning} />
      </Router>
    );
  });
});
