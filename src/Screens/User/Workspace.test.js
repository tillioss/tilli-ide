import React from "react";
import { render } from "@testing-library/react";
import Workspace from "./Workspace";
import { BrowserRouter as Router } from "react-router-dom";

describe("Workspace", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Workspace />
      </Router>
    );
  });
});
