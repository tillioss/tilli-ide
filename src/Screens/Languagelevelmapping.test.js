import React from "react";
import { render } from "@testing-library/react";
import Languagelevelmapping from "./Languagelevelmapping";
import { BrowserRouter as Router } from "react-router-dom";

describe("Languagelevelmapping", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Languagelevelmapping />
      </Router>
    );
  });
});
