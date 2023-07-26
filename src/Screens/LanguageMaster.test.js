import React from "react";
import { render } from "@testing-library/react";
import LanguageMaster from "./LanguageMaster";
import { BrowserRouter as Router } from "react-router-dom";

describe("LanguageMaster", () => {
  it("renders the component", () => {
    render(
      <Router>
        <LanguageMaster />
      </Router>
    );
  });
});
