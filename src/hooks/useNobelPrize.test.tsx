import { renderHook, act, waitFor } from "@testing-library/react";
import { useNobelPrize } from "./useNobelPrize";
import { vi } from "vitest";
import { fetchTimeSeriesData } from "@/api";
import { MAX_DATE } from "@/constants";
import { mockNobelPrizesResponse } from "@/mocks/nobelPrizes";

const mocks = vi.hoisted(() => {
  return {
    fetchTimeSeriesData: vi.fn(),
  };
});

vi.mock("@/api", () => {
  return {
    fetchTimeSeriesData: mocks.fetchTimeSeriesData,
  };
});

describe("useNobelPrize", () => {
  beforeEach(() => {
    vi.mocked(fetchTimeSeriesData).mockImplementation(() =>
      Promise.resolve(mockNobelPrizesResponse)
    );
  });

  it("should initialize with default values", async () => {
    const { result } = renderHook(() => useNobelPrize());

    waitFor(() => {
      expect(result.current.nobelPrizes).toEqual(mockNobelPrizesResponse);

      expect(result.current.numberOfLaureatesChartData).toStrictEqual({
        years: [2020],
        values: [2],
      });
      expect(result.current.amountOfAwardsChartData).toStrictEqual({
        years: [2020],
        values: [3000000],
      });
      expect(result.current.pipeChartData).toStrictEqual([
        { id: 0, value: 1, label: "Physics" },
        { id: 1, value: 1, label: "Chemistry" },
      ]);
    });
  });

  it("should handle date range change", async () => {
    const { result } = renderHook(() => useNobelPrize());

    act(() => {
      result.current.handleDateRange(2019, "from");
    });

    waitFor(() => {
      expect(result.current.dateRange).toEqual({
        from: 2019,
        to: MAX_DATE,
      });
      expect(fetchTimeSeriesData).toHaveBeenCalledWith({
        from: 2019,
        to: MAX_DATE,
      });
    });
  });

  it("should handle chart details index change", async () => {
    const { result } = renderHook(() => useNobelPrize());

    act(() => {
      result.current.setChartDetailsindex(0);
    });

    waitFor(() =>
      expect(result.current.getChartDetails).toEqual([
        {
          awardYear: "2020",
          category: { en: "Physics" },
          laureates: [{ id: "1", name: "Laureate 1" }],
          prizeAmountAdjusted: 1000000,
        },
        {
          awardYear: "2020",
          category: { en: "Chemistry" },
          laureates: [{ id: "2", name: "Laureate 2" }],
          prizeAmountAdjusted: 2000000,
        },
      ])
    );
  });

  it("should handle filter", async () => {
    const { result } = renderHook(() => useNobelPrize());

    act(() => {
      result.current.handleFilter();
    });

    waitFor(() =>
      expect(result.current.nobelPrizes).toStrictEqual(mockNobelPrizesResponse)
    );
  });
});
