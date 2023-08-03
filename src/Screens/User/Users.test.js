import React from "react";
import { render } from "@testing-library/react";
import Users from "./Users";
import { BrowserRouter as Router } from "react-router-dom";

describe("Users", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Users />
      </Router>
    );
  });
});
