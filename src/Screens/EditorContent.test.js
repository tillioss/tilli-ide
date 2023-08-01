import React from "react";
import { render } from "@testing-library/react";
import EditorContent from "./EditorContent";
import { BrowserRouter as Router } from "react-router-dom";

describe("EditorContent", () => {
  it("renders the component", () => {
    render(
      <Router>
        <EditorContent />
      </Router>
    );
  });
});
