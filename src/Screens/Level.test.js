import React from "react";
import { render } from "@testing-library/react";
import Level from "./Level";
import { BrowserRouter as Router } from "react-router-dom";

describe("Level", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Level />
      </Router>
    );
  });
});
