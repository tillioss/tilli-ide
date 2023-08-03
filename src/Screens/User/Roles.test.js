import React from "react";
import { render } from "@testing-library/react";
import Roles from "./Roles";
import { BrowserRouter as Router } from "react-router-dom";

describe("Roles", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Roles />
      </Router>
    );
  });
});
