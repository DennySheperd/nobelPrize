import { render } from "@testing-library/react";
import BaseTable from "./BaseTable";
import { mockLaureatesResponse } from "@/mocks/laureates";

describe("", () => {
  const onChange = vi.fn();
  const showDetails = vi.fn();

  it("should render <BaseTable />", () => {
    const { container } = render(
      <BaseTable
        data={mockLaureatesResponse.laureates}
        onChange={onChange}
        showDetails={showDetails}
        pagination={mockLaureatesResponse.pagination}
      />
    );

    expect(container).toBeVisible();
  });
});
