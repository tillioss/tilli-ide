import React from "react";
import { render } from "@testing-library/react";
import TopMenu from "./TopMenu";
import { BrowserRouter as Router } from "react-router-dom";

describe("TopMenu", () => {
  it("renders the component", () => {
    render(
      <Router>
        <TopMenu />
      </Router>
    );
  });
});
