import React from "react";
import { render } from "@testing-library/react";
import ManageUsers from "./ManageUsers";
import { BrowserRouter as Router } from "react-router-dom";

describe("ManageUsers", () => {
  it("renders the component", () => {
    render(
      <Router>
        <ManageUsers />
      </Router>
    );
  });
});
