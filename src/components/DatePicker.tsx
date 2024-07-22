import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { MAX_DEFAULT_DATE, MIN_DEFAULT_DATE } from "@/constants";

interface PropsI {
  name: string;
  onChange: (year: number, name: string) => void;
}

export default function BaseDateRangePicker({ onChange, name }: PropsI) {
  const dayMin = dayjs(MIN_DEFAULT_DATE);
  const dayMax = dayjs(MAX_DEFAULT_DATE);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <DatePicker
          minDate={dayMin}
          maxDate={dayMax}
          views={["year"]}
          onYearChange={(year) => onChange(year.year(), name)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
