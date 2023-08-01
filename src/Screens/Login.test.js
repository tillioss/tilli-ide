import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter as Router } from "react-router-dom";

describe("Login", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });
});
