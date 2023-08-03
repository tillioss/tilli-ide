import React from "react";
import { render } from "@testing-library/react";
import Success from "./Success";
import { BrowserRouter as Router } from "react-router-dom";

const props = {
  LevelStage: [
    {
      content: {
        title: {
          bColor: "title_bColor",
          style: [
            {
              color: "title_style_color",
            },
          ],
          value: "title_value",
        },
        message: {
          bColor: "message_bColor",
          style: [
            {
              color: "message_style_color",
            },
          ],
          value: "message_value",
        },
      },
    },
  ],
  found_index: 0,
  Contentdata: [
    {
      content: {
        title: {
          bColor: "title_bColor",
          style: [
            {
              color: "title_style_color",
            },
          ],
          value: "title_value",
        },
        message: {
          bColor: "message_bColor",
          style: [
            {
              color: "message_style_color",
            },
          ],
          value: "message_value",
        },
      },
    },
  ],
  index_1: 0,
};

describe("Success", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Success {...props} />
      </Router>
    );
  });
});
