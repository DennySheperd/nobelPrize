// api.ts
import axios from "axios";
import { FilterYearI, SearchLaureateI } from "@/types";

const API_BASE_URL = "https://api.nobelprize.org/2.1";

// could be done by using axios interceptor

export const fetchTimeSeriesData = async ({ from, to }: FilterYearI) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/nobelPrizes`, {
      params: {
        nobelPrizeYear: from,
        yearTo: to,
        limit: 55,
      },
    });
    return response.data.nobelPrizes;
  } catch (error) {
    console.error("Error fetching time series data:", error);
    return null;
  }
};

export const fetchLaureates = async ({
  name,
  residence,
  offset,
}: SearchLaureateI) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/laureates`, {
      params: {
        name,
        residence,
        offset,
      },
    });
    return {
      laureates: response.data.laureates,
      pagination: {
        ...response.data.meta,
        count: Math.floor(response.data.meta.count / response.data.meta.limit),
      },
    };
  } catch (error) {
    console.error("Error searching laureates:", error);
    return null;
  }
};
