import React from "react";
import { render } from "@testing-library/react";
import ChooseCheckboxQuestions from "./ChooseCheckboxQuestions";
import { BrowserRouter as Router } from "react-router-dom";

const props = {
  LevelStage: "Your Level Stage Data",
  Contentdata: [
    {
      content: {
        colors: {
          box: "Box Value 1",
          checked: "Checked Value 1",
          text: "Text Value 1",
          unChecked: "UnChecked Value 1",
        },
        questionTitle: "Question Title 1",
        error_questionTitle: "Error for Question Title 1",
        checkBoxesOption: [
          {
            content: "Check Boxes Option 1",
            bgcolor: "Bg color 1",
            error_content: "Error for Check Boxes Option 1",
            error_bgcolor: "Error for Bg color 1",
          },
          {
            content: "Check Boxes Option 2",
            bgcolor: "Bg color 2",
            error_content: "Error for Check Boxes Option 2",
            error_bgcolor: "Error for Bg color 2",
          },
          // Add more check box options as needed
        ],
      },
    },
    {
      content: {
        colors: {
          box: "Box Value 2",
          checked: "Checked Value 2",
          text: "Text Value 2",
          unChecked: "UnChecked Value 2",
        },
        questionTitle: "Question Title 2",
        error_questionTitle: "Error for Question Title 2",
        checkBoxesOption: [
          {
            content: "Check Boxes Option 3",
            bgcolor: "Bg color 3",
            error_content: "Error for Check Boxes Option 3",
            error_bgcolor: "Error for Bg color 3",
          },
          {
            content: "Check Boxes Option 4",
            bgcolor: "Bg color 4",
            error_content: "Error for Check Boxes Option 4",
            error_bgcolor: "Error for Bg color 4",
          },
        ],
      },
    },
  ],
  index_1: 0,
  editable: "true",
};

describe("ChooseCheckboxQuestions", () => {
  it("renders the component", () => {
    render(
      <Router>
        <ChooseCheckboxQuestions {...props} />
      </Router>
    );
  });
});
