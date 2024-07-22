import { NobelPrizeI } from "@/types";

export const mockNobelPrizesResponse: NobelPrizeI[] = [
  {
    awardYear: "1907",
    category: { en: "Physics" },
    laureates: [
      {
        id: "1",
        fullName: { en: "Laureate 1" },
        knownName: { en: "Laureate 1" },
        motivation: { en: "test" },
        position: "",
        sortOrder: "",
      },
    ],
    prizeAmountAdjusted: 200000,
    dateAwarded: "",
    prizeAmount: 0,
  },
  {
    awardYear: "1908",
    category: { en: "Peace" },
    laureates: [
      {
        id: "2",
        fullName: { en: "Laureate 2" },
        knownName: { en: "Laureate 2" },
        motivation: { en: "test" },
        position: "",
        sortOrder: "",
      },
    ],
    prizeAmountAdjusted: 1000000,
    dateAwarded: "",
    prizeAmount: 0,
  },
];
