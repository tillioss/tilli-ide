import React from "react";
import { render } from "@testing-library/react";
import ModelView from "./ModelView";
import { BrowserRouter as Router } from "react-router-dom";

describe("ModelView", () => {
  it("renders the component", () => {
    render(
      <Router>
        <ModelView />
      </Router>
    );
  });
});
