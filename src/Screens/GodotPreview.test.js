import React from "react";
import { render } from "@testing-library/react";
import GodotPreview from "./GodotPreview";
import { BrowserRouter as Router } from "react-router-dom";

describe("GodotPreview", () => {
  it("renders the component", () => {
    render(
      <Router>
        <GodotPreview />
      </Router>
    );
  });
});
