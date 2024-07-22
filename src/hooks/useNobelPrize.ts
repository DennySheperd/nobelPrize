import { useCallback, useEffect, useMemo, useState } from "react";
import { CustomStateI, FilterYearI, NobelPrizeI } from "@/types";
import { fetchTimeSeriesData } from "@/api";
import { MAX_DATE, MIN_DATE } from "@/constants";

export const useNobelPrize = () => {
  const [dateRange, setDateRange] = useState<FilterYearI>({
    from: MIN_DATE,
    to: MAX_DATE,
  });

  const [nobelPrizes, setNobelPrizes] = useState<NobelPrizeI[]>([]);

  const [chartDetailsindex, setChartDetailsindex] = useState(0);

  const handleDateRange = (year: number, name: string) => {
    setDateRange({
      ...dateRange,
      [name]: year,
    });
  };

  const pipeChartData = useMemo(() => {
    const categoryCounts: CustomStateI = {};

    nobelPrizes.forEach((prize) => {
      const category = prize.category.en;

      if (!categoryCounts[category]) {
        categoryCounts[category] = 0;
      }

      categoryCounts[category] += prize.laureates.length;
    });

    return Object.keys(categoryCounts).map((category, index) => {
      return {
        id: index,
        value: categoryCounts[category],
        label: category,
      };
    });
  }, [nobelPrizes]);

  const amountOfAwardsChartData = useMemo(() => {
    const categoryCounts: CustomStateI = {};

    nobelPrizes.forEach((prize) => {
      const awardYear = prize.awardYear;

      if (!categoryCounts[awardYear]) {
        categoryCounts[awardYear] = 0;
      }

      categoryCounts[awardYear] += prize.prizeAmountAdjusted;
    });

    return {
      years: Object.keys(categoryCounts).map((year) => parseInt(year)),
      values: Object.values(categoryCounts),
    };
  }, [nobelPrizes]);

  const numberOfLaureatesChartData = useMemo(() => {
    const categoryCounts: CustomStateI = {};

    nobelPrizes.forEach((prize) => {
      const awardYear = prize.awardYear;

      if (!categoryCounts[awardYear]) {
        categoryCounts[awardYear] = 0;
      }

      categoryCounts[awardYear] += prize.laureates.length;
    });

    return {
      years: Object.keys(categoryCounts).map((year) => parseInt(year)),
      values: Object.values(categoryCounts),
    };
  }, [nobelPrizes]);

  const getChartDetails = useMemo(() => {
    const selectedYear = amountOfAwardsChartData.years[chartDetailsindex];

    return nobelPrizes.filter(
      (prize) => prize.awardYear === selectedYear.toString()
    );
  }, [amountOfAwardsChartData.years, chartDetailsindex, nobelPrizes]);

  const handleFilter = useCallback(async () => {
    try {
      const data = await fetchTimeSeriesData(dateRange);
      setNobelPrizes(data);
    } catch (error) {
      setNobelPrizes([]);
    }
  }, [dateRange]);

  useEffect(() => {
    handleFilter();
  }, []);

  return {
    dateRange,
    nobelPrizes,
    numberOfLaureatesChartData,
    amountOfAwardsChartData,
    pipeChartData,
    getChartDetails,
    setChartDetailsindex,
    handleDateRange,
    handleFilter,
  };
};
