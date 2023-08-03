import React from "react";
import { render } from "@testing-library/react";
import PersonWithTextAnimation from "./PersonWithTextAnimation";
import { BrowserRouter as Router } from "react-router-dom";

const dummyOptionSelect = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

const props = {
  LevelStage: [
    {
      content: {
        image: {
          title: "Image Title",
          fileName: "dummyFileName.png",
          fileType: "png",
        },
        text: [
          {
            value: "Text Value 1",
            style: {
              color: "#000000",
            },
          },
          {
            value: "Text Value 2",
            style: {
              color: "#FF0000",
            },
          },
        ],
      },
    },
  ],
  dummyOptionSelect: dummyOptionSelect,
  index_1: 0,
  option: dummyOptionSelect,
  Contentdata: [
    {
      content: {
        image: {
          title: "Image Title",
          fileName: "dummyFileName.png",
          fileType: "png",
        },
        text: [
          {
            value: "Text Value 1",
            style: {
              color: "#000000",
            },
          },
          {
            value: "Text Value 2",
            style: {
              color: "#FF0000",
            },
          },
        ],
      },
    },
  ],
};

describe("PersonWithTextAnimation", () => {
  it("renders the component", () => {
    render(
      <Router>
        <PersonWithTextAnimation {...props} />
      </Router>
    );
  });
});
