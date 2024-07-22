import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "@/App";

describe("renders <App />", () => {
  it("should render", () => {
    const { container } = render(<App />);
    expect(container).toBeVisible();
  });
});
