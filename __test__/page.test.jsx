import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";

describe("적용 테스트", () => {
  test("적용 테스트1", () => {
    render(<Page />);
    const docs = screen.getByText("Docs");
    expect(docs).toBeInTheDocument();
  });
});
