import React from "react";
import { render } from "@testing-library/react";
import Modal from "./Modal";
import { BrowserRouter as Router } from "react-router-dom";

describe("Modal", () => {
  it("renders the component", () => {
    render(
      <Router>
        <Modal />
      </Router>
    );
  });
});
