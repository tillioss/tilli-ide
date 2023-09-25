import React from "react";
import { render } from "@testing-library/react";
import QuestionsList from "./QuestionsList";
import { BrowserRouter as Router } from "react-router-dom";

const props = {
  LevelStage: [
    {
      content: {
        questionTitle: "Question Title",
        questionList: [
          {
            question: "Question 1",
            color: "Color 1",
            qustionlist_error: "Error message 1",
            qustion_color_error: "Error message color 1",
          },
          {
            question: "Question 2",
            color: "Color 2",
            qustionlist_error: "Error message 2",
            qustion_color_error: "Error message color 2",
          },
        ],
      },
    },
  ],
  index_1: 0,
  Contentdata: [
    {
      content: {
        questionTitle: "Question Title",
        questionList: [
          {
            question: "Question 1",
            color: "Color 1",
            qustionlist_error: "Error message 1",
            qustion_color_error: "Error message color 1",
          },
          {
            question: "Question 2",
            color: "Color 2",
            qustionlist_error: "Error message 2",
            qustion_color_error: "Error message color 2",
          },
        ],
      },
    },
  ],
  editable: "true", // Set "false" if the component should be non-editable
  contentTextValidate: [
    "Question Title Error Message", // Error message for questionTitle field
  ],
};

describe("QuestionsList", () => {
  it("renders the component", () => {
    render(
      <Router>
        <QuestionsList {...props} />
      </Router>
    );
  });
});
