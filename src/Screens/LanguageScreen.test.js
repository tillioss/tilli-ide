import React from "react";
import { render } from "@testing-library/react";
import LanguageScreen from "./LanguageScreen";
import { BrowserRouter as Router } from "react-router-dom";

describe("LanguageScreen", () => {
  it("renders the component", () => {
    render(
      <Router>
        <LanguageScreen />
      </Router>
    );
  });
});
