import React from "react";
import { render } from "@testing-library/react";
import PageNotFound from "./PageNotFound";
import { BrowserRouter as Router } from "react-router-dom";

describe("PageNotFound", () => {
  it("renders the component", () => {
    render(
      <Router>
        <PageNotFound />
      </Router>
    );
  });
});
