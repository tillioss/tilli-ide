import React from "react";
import { render } from "@testing-library/react";
import LanguageMapping from "./LanguageMapping";
import { BrowserRouter as Router } from "react-router-dom";

describe("LanguageMapping", () => {
  it("renders the component", () => {
    render(
      <Router>
        <LanguageMapping />
      </Router>
    );
  });
});
