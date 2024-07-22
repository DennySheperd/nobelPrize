import { render } from "@testing-library/react";
import BaseAccordion from "./Accordion";
import { mockNobelPrizesResponse } from "@/mocks/nobelPrizes";

describe("", () => {
  it("should render <BaseAccordion />", () => {
    const { container } = render(
      <BaseAccordion data={mockNobelPrizesResponse} />
    );

    expect(container).toBeVisible();
  });
});
