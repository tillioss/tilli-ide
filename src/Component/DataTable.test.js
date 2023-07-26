import React from "react";
import { render } from "@testing-library/react";
import DataTable from "./DataTable";
import { BrowserRouter as Router } from "react-router-dom";

describe("DataTable", () => {
  it("renders the component", () => {
    render(
      <Router>
        <DataTable />
      </Router>
    );
  });
});
