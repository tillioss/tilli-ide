import React from "react";
import { render } from "@testing-library/react";
import DropDown from "./DropDown";
import { BrowserRouter as Router } from "react-router-dom";

describe("DropDown", () => {
  it("renders the component", () => {
    render(
      <Router>
        <DropDown />
      </Router>
    );
  });
});
