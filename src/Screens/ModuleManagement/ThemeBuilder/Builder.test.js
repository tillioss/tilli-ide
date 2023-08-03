import React from "react";
import { render } from "@testing-library/react";
import Builder from "./Builder";
import { BrowserRouter as Router } from "react-router-dom";

describe("Builder", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Builder match={{ params: "" }} />
      </Router>
    );
  });
});
