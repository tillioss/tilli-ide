import React from "react";
import { render } from "@testing-library/react";
import LevelManager from "./LevelManager";
import { BrowserRouter as Router } from "react-router-dom";

describe("LevelManager", () => {
  it("renders the component", () => {
    render(
      <Router>
        <LevelManager />
      </Router>
    );
  });
});
