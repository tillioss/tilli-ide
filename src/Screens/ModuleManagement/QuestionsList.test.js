import React from "react";
import { render } from "@testing-library/react";
import QuestionsList from "./QuestionsList";
import { BrowserRouter as Router } from "react-router-dom";

const dummySectionLearning = [
  {
    content: {
      questionTitle: "Question Title 1",
      className: "Class Name 1",
      questionList: [
        {
          question: "Question 1",
          color: "#ffffff",
          className: "Question Class 1",
        },
        {
          question: "Question 2",
          color: "#ff0000",
          className: "Question Class 2",
        },
      ],
    },
  },
];

const dummyProps = {
  index_1: 0,
  sectionLearning: dummySectionLearning,
};

describe("QuestionsList", () => {
  it("renders the component", () => {
    render(
      <Router>
        <QuestionsList {...dummyProps} />
      </Router>
    );
  });
});
