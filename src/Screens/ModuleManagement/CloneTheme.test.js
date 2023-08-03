import React from "react";
import { render } from "@testing-library/react";
import CloneTheme from "./CloneTheme";
import { BrowserRouter as Router } from "react-router-dom";

describe("CloneTheme", () => {
  it("renders the component", () => {
    render(
      <Router>
        <CloneTheme />
      </Router>
    );
  });
});
