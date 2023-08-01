import React from "react";
import { render } from "@testing-library/react";
import MachingLearning from "./MachingLearning";
import { BrowserRouter as Router } from "react-router-dom";

describe("MachingLearning", () => {
  it("renders the component", () => {
    render(
      <Router>
        <MachingLearning />
      </Router>
    );
  });
});
