export interface FilterYearI {
  from: number;
  to: number;
}

export interface LocaleNameI {
  en: string;
  se?: string;
  no?: string;
}

export interface WikidataLinkI {
  id: string;
  url: string;
}

export interface LineChartDataI {
  years: number[];
  values: number[];
}

export interface LaureateI {
  fullName: LocaleNameI;
  id: string;
  knownName: LocaleNameI;
  motivation: LocaleNameI;
  position: string;
  sortOrder: string;
}

export interface NobelPrizeI {
  awardYear: string;
  dateAwarded: string;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  laureates: LaureateI[];
  category: LocaleNameI;
}

export interface PlaceI {
  city: LocaleNameI;
  country: LocaleNameI;
}

export interface DatePlaceI {
  date: string;
  place: PlaceI;
}

export interface PaginationI {
  page: number;
  count: number;
  limit: number;
  offset: number;
}

export interface LaureateSearchI {
  name: string;
  residence: string;
}

export interface LaureateResponseI {
  laureates: LaureateDataI[];
  pagination: PaginationI;
}

export interface LaureateTableI {
  laureates: LaureateDataI[];
  searchBy: LaureateSearchI;
  pagination: PaginationI;
}

export interface LaureateDataI {
  fileName: string;
  fullName: LocaleNameI;
  gender: string;
  id: string;
  birth: DatePlaceI;
  death?: DatePlaceI;
  givenName: LocaleNameI;
  knownName: LocaleNameI;
  nobelPrizes: NobelPrizeI[];
  wikidata: WikidataLinkI;
}

export interface CustomStateI {
  [key: string]: number;
}

export interface PipeChartDataI {
  id: number;
  value: number;
  label: string;
}

export interface SearchLaureateI {
  name: string;
  residence: string;
  offset: number;
}
