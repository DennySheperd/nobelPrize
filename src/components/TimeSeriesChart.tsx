import { LineChart } from "@mui/x-charts/LineChart";

interface PropsI {
  data: {
    years: number[];
    values: number[];
  };
  onClick: (index: number) => void;
}

export default function TimeSeriesChart({ data, onClick }: PropsI) {
  return (
    <LineChart
      xAxis={[
        { data: data.years, valueFormatter: (value) => value.toString() },
      ]}
      series={[
        {
          data: data.values,
        },
      ]}
      height={300}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}
      onMarkClick={(_, d) => onClick(d.dataIndex as number)}
    />
  );
}
