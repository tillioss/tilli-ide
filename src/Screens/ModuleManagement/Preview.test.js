import React from "react";
import { render } from "@testing-library/react";
import Preview from "./Preview";
import { BrowserRouter as Router } from "react-router-dom";

describe("Preview", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Preview />
      </Router>
    );
  });
});
