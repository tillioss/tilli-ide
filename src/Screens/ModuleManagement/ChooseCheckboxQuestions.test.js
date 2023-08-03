import React from "react";
import { render } from "@testing-library/react";
import ChooseCheckboxQuestions from "./ChooseCheckboxQuestions";
import { BrowserRouter as Router } from "react-router-dom";

const dummySectionLearning = [
  {
    content: {
      colors: {
        box: "#ffffff",
        checked: "#00ff00",
        text: "#000000",
        unChecked: "#ff0000",
      },
      questionTitle: "Question Title 1",
      nameClassName: "Name Class Name 1",
      checkBoxesOption: [
        {
          content: "Option 1-1",
          nameClassName: "Option Class Name 1-1",
          bgcolor: "#ffff00",
        },
        {
          content: "Option 1-2",
          nameClassName: "Option Class Name 1-2",
          bgcolor: "#00ffff",
        },
      ],
    },
  },
];

export default dummySectionLearning;

describe("ChooseCheckboxQuestions", () => {
  it("renders the component", () => {
    render(
      <Router>
        <ChooseCheckboxQuestions
          index_1={0}
          sectionLearning={dummySectionLearning}
        />
      </Router>
    );
  });
});
