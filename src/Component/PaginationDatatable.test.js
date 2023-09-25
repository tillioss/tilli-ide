import React from "react";
import { render } from "@testing-library/react";
import PaginationDatatable from "./PaginationDatatable";
import { BrowserRouter as Router } from "react-router-dom";

describe("PaginationDatatable", () => {
  it("renders the component", () => {
    render(
      <Router>
        <PaginationDatatable data={[]} />
      </Router>
    );
  });
});
