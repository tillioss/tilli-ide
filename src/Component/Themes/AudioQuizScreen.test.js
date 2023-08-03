import React from "react";
import { render } from "@testing-library/react";
import AudioQuizScreen from "./AudioQuizScreen";
import { BrowserRouter as Router } from "react-router-dom";

const props = {
  LevelStage: [
    {
      theme: "StoryCard",
    },
  ],
  found_index: 0,
  Contentdata: [
    {
      content: [
        {
          title: "Title 1",
        },
        {
          content: {
            feelingsDataList: [
              {
                questions: "Question 1",
                results: [],
              },
            ],
          },
        },
      ],
    },
    {
      content: {
        feelingsDataList: [
          {
            questions: "Question 2",
            results: [],
          },
        ],
      },
    },
  ],
  index_1: 0,
  editable: "true",
};

describe("AudioQuizScreen", () => {
  it("renders the component", () => {
    render(
      <Router>
        <AudioQuizScreen {...props} />
      </Router>
    );
  });
});
