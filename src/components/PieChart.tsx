import { PieChart } from "@mui/x-charts/PieChart";
import { PipeChartDataI } from "@/types";

interface PropsI {
  data: PipeChartDataI[];
}

export default function BasePieChart({ data }: PropsI) {
  return (
    <PieChart
      series={[
        {
          data: data,
        },
      ]}
      height={200}
    />
  );
}
