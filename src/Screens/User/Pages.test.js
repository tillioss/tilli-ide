import React from "react";
import { render } from "@testing-library/react";
import Pages from "./Pages";
import { BrowserRouter as Router } from "react-router-dom";

describe("Pages", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Pages />
      </Router>
    );
  });
});
