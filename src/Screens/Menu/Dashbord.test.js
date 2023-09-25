import React from "react";
import { render } from "@testing-library/react";
import Dashbord from "./Dashbord";
import { BrowserRouter as Router } from "react-router-dom";

describe("Dashbord", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Dashbord />
      </Router>
    );
  });
});
