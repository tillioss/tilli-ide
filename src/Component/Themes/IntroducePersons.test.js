import React from "react";
import { render } from "@testing-library/react";
import IntroducePersons from "./IntroducePersons";
import { BrowserRouter as Router } from "react-router-dom";

const dummyOptionSelect = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

const dummyContentdata = [
  {
    content: {
      persons: [
        {
          name: "John Doe",
          error_name: "",
          imageBg: "image1.png",
          error_imageBg: "",
          bg: "#FFFFFF",
          error_bg: "",
          says: "Hello",
          error_says: "",
          image: {
            title: "Image Title 1",
            fileName: "image1.png",
            fileType: "png",
          },
          error_image: "",
        },
        {
          name: "Jane Doe",
          error_name: "",
          imageBg: "image2.png",
          error_imageBg: "",
          bg: "#FF0000",
          error_bg: "",
          says: "Hi there!",
          error_says: "",
          image: {
            title: "Image Title 2",
            fileName: "image2.png",
            fileType: "png",
          },
          error_image: "",
        },
      ],
    },
  },
];

const props = {
  LevelStage: [
    {
      content: {
        persons: [
          {
            name: "John Doe",
            error_name: "",
            imageBg: "image1.png",
            error_imageBg: "",
            bg: "#FFFFFF",
            error_bg: "",
            says: "Hello",
            error_says: "",
            image: {
              title: "Image Title 1",
              fileName: "image1.png",
              fileType: "png",
            },
            error_image: "",
          },
          {
            name: "Jane Doe",
            error_name: "",
            imageBg: "image2.png",
            error_imageBg: "",
            bg: "#FF0000",
            error_bg: "",
            says: "Hi there!",
            error_says: "",
            image: {
              title: "Image Title 2",
              fileName: "image2.png",
              fileType: "png",
            },
            error_image: "",
          },
        ],
      },
    },
  ],
  OptionSelect: [],
  Contentdata: dummyContentdata,
  index_1: 0,
  option: dummyOptionSelect,
  editable: true,
};

describe("IntroducePersons", () => {
  it("renders the component", () => {
    render(
      <Router>
        <IntroducePersons {...props} />
      </Router>
    );
  });
});
