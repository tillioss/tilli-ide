import React from "react";
import { render } from "@testing-library/react";
import Menu from "./Menu";
import { BrowserRouter as Router } from "react-router-dom";

describe("Menu", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Menu />
      </Router>
    );
  });
});
