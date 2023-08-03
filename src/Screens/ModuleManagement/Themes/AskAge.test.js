import React from "react";
import { render } from "@testing-library/react";
import AskAge from "./AskAge";
import { BrowserRouter as Router } from "react-router-dom";

const dummyData = {
  stage: "your_current_stage",
  data: {
    content: {
      image: {
        fileName: "your_image_filename",
        fileType: "your_image_filetype",
      },
      imagestyle: "your_image_styles",
      question: "Your question here...",
      question_2: "Your additional question here...",
      chooseType_1: "Choose type text...",
      chooseType_1_ClassName: "your_classname_for_chooseType_1",
    },
    title: "Your title here...",
  },
  commonGroupLanguageMappingData: {},
  commonGroupLanguageBaseData: {},
  updateUserDetailsInfo: (userData) => {
    console.log("Updating user details:", userData);
  },
};

describe("AskAge", () => {
  it("renders the component", () => {
    render(
      <Router>
        <AskAge {...dummyData} />
      </Router>
    );
  });
});
