import { LaureateResponseI } from "@/types";

export const mockLaureatesResponse: LaureateResponseI = {
  laureates: [
    {
      id: "1",
      fullName: { en: "Laureate 1" },
      birth: {
        date: "1992",
        place: { city: { en: "Test city" }, country: { en: "Argentina" } },
      },
      fileName: "",
      gender: "",
      givenName: { en: "test1" },
      knownName: { en: "test1" },
      nobelPrizes: [],
      wikidata: {
        id: "1",
        url: "string",
      },
    },
    {
      id: "2",
      fullName: { en: "Laureate 2" },
      birth: {
        date: "1992",
        place: { city: { en: "Test city" }, country: { en: "Argentina" } },
      },
      fileName: "",
      gender: "",
      givenName: { en: "test1" },
      knownName: { en: "test1" },
      nobelPrizes: [],
      wikidata: {
        id: "1",
        url: "string",
      },
    },
  ],
  pagination: {
    page: 1,
    limit: 25,
    offset: 0,
    count: 2,
  },
};
