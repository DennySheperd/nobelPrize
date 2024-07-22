import { renderHook, act, waitFor } from "@testing-library/react";
import { useLaureate } from "./useLaureate";
import { fetchLaureates } from "@/api";
import { mockLaureatesResponse } from "@/mocks/laureates";

const mocks = vi.hoisted(() => {
  return {
    fetchLaureates: vi.fn(),
  };
});

vi.mock("@/api", () => {
  return {
    fetchLaureates: mocks.fetchLaureates,
  };
});

describe("useLaureate", () => {
  beforeEach(() => {
    vi.mocked(fetchLaureates).mockImplementation(() =>
      Promise.resolve(mockLaureatesResponse)
    );
  });

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  it("should initialize with default values", async () => {
    const { result } = renderHook(() => useLaureate());

    waitFor(() => {
      {
        expect(result.current.laureates).toStrictEqual(
          mockLaureatesResponse.laureates
        );
        expect(result.current.pagination).toStrictEqual(
          mockLaureatesResponse.pagination
        );
      }
    });

    expect(result.current.selectedLaureate).toBeUndefined();
  });

  it("should handle search by name", async () => {
    const { result } = renderHook(() => useLaureate());

    waitFor(() => {
      result.current.handleSearchByName("Laureate 1");
      expect(result.current.laureates).toEqual(mockLaureatesResponse.laureates);
      expect(fetchLaureates).toHaveBeenCalledWith({
        name: "Laureate 1",
        residence: "",
        offset: 0,
      });
    });
  });

  it("should handle search by residence", async () => {
    const { result } = renderHook(() => useLaureate());

    act(() => {
      result.current.handleSearchByResidence("City 1");
    });

    waitFor(() => {
      expect(result.current.laureates).toEqual(mockLaureatesResponse.laureates);
      expect(fetchLaureates).toHaveBeenCalledWith({
        name: "",
        residence: "City 1",
        offset: 0,
      });
    });
  });

  it("should handle pagination", async () => {
    const { result } = renderHook(() => useLaureate());

    act(() => {
      result.current.handlePagination(2);
    });

    expect(result.current.pagination.page).toBe(2);
    expect(fetchLaureates).toHaveBeenCalledWith({
      name: "",
      residence: "",
      offset: 25,
    });
  });

  it("should set selected laureate by id", async () => {
    const { result } = renderHook(() => useLaureate());

    act(() => {
      result.current.setSelectedLaureateId("1");
    });

    waitFor(() =>
      expect(result.current.selectedLaureate).toEqual({
        id: "1",
        name: "Laureate 1",
        residence: "City 1",
      })
    );
  });
});
