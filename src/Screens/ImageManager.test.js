import React from "react";
import { render } from "@testing-library/react";
import ImageManager from "./ImageManager";
import { BrowserRouter as Router } from "react-router-dom";

describe("ImageManager", () => {
  it("renders the component", () => {
    render(
      <Router>
        <ImageManager />
      </Router>
    );
  });
});
