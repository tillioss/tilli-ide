import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";
import { BrowserRouter as Router } from "react-router-dom";

describe("Card", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Card />
      </Router>
    );
  });
});
