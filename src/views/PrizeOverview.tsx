import { useState } from "react";
import { Stack, Button, Grid } from "@mui/material";
import BasicDateRangePicker from "@/components/DatePicker";
import TimeSeriesChart from "@/components/TimeSeriesChart";
import BaseAccordion from "@/components/Accordion";

import { useNobelPrize } from "@/hooks/useNobelPrize";
import PieChart from "@/components/PieChart";
import BaseModal from "@/components/BaseModal";

export default function PrizeOverview() {
  const {
    pipeChartData,
    numberOfLaureatesChartData,
    amountOfAwardsChartData,
    getChartDetails,
    handleDateRange,
    setChartDetailsindex,
    handleFilter,
  } = useNobelPrize();

  const [openChartsModal, setChartsModal] = useState(false);

  const viewChartDetails = (index: number) => {
    setChartDetailsindex(index);
    setChartsModal(true);
  };

  return (
    <>
      <h1>Prize Overview</h1>
      <Stack direction="row" alignItems="center" spacing={2}>
        <BasicDateRangePicker name="from" onChange={handleDateRange} />
        <BasicDateRangePicker name="to" onChange={handleDateRange} />
        <Button variant="contained" size="large" onClick={handleFilter}>
          Filter
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <TimeSeriesChart
          data={amountOfAwardsChartData}
          onClick={viewChartDetails}
        />

        <TimeSeriesChart
          data={numberOfLaureatesChartData}
          onClick={viewChartDetails}
        />
      </Stack>
      <Grid maxWidth="50%" justifyContent="center">
        <PieChart data={pipeChartData} />
      </Grid>

      <BaseModal
        open={openChartsModal}
        title={`Chart info ${getChartDetails[0]?.awardYear}`}
        onClose={() => setChartsModal(false)}
      >
        <Stack>
          <BaseAccordion data={getChartDetails} />
        </Stack>
      </BaseModal>
    </>
  );
}
