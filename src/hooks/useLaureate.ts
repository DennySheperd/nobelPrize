import { useEffect, useMemo, useState } from "react";
import {
  LaureateDataI,
  LaureateResponseI,
  LaureateTableI,
  PaginationI,
} from "@/types";
import { fetchLaureates } from "@/api";

export const useLaureate = () => {
  const [laureates, setLaureate] = useState<LaureateTableI>({
    laureates: [],
    searchBy: {
      name: "",
      residence: "",
    },
    pagination: {
      page: 1,
      limit: 25,
      offset: 0,
      count: 0,
    },
  });

  const [selectedLaureateId, setSelectedLaureateId] = useState("");

  const handleSearchByName = (value: string) => {
    setLaureate({
      ...laureates,
      pagination: {
        ...laureates.pagination,
        offset: 0,
      },
      searchBy: {
        ...laureates.searchBy,
        name: value,
      },
    });
  };

  const handleSearchByResidence = (value: string) => {
    setLaureate({
      ...laureates,
      pagination: {
        ...laureates.pagination,
        offset: 0,
        page: 1,
      },
      searchBy: {
        ...laureates.searchBy,
        residence: value,
      },
    });
  };

  const selectedLaureate = useMemo(() => {
    return laureates.laureates.find(
      (laureate) => laureate.id === selectedLaureateId
    );
  }, [laureates.laureates, selectedLaureateId]);

  const handlePagination = (page: number) => {
    setLaureate({
      ...laureates,
      pagination: {
        ...laureates.pagination,
        page: page,
        offset: (page - 1) * laureates.pagination.limit,
      },
    });
  };

  useEffect(() => {
    fetchLaureates({
      name: laureates.searchBy.name,
      residence: laureates.searchBy.residence,
      offset: laureates.pagination.offset,
    }).then((response: LaureateResponseI | null) => {
      setLaureate({
        searchBy: laureates.searchBy,
        laureates: response?.laureates as LaureateDataI[],
        pagination: response?.pagination as PaginationI,
      });
    });
  }, [laureates.pagination.offset, laureates.searchBy, setLaureate]);

  return {
    laureates: laureates.laureates,
    pagination: laureates.pagination,
    selectedLaureate,
    setSelectedLaureateId,
    handleSearchByName,
    handleSearchByResidence,
    handlePagination,
  };
};
