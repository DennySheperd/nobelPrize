import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LaureateDataI, PaginationI } from "@/types";
import { Pagination } from "@mui/material";

interface PropsI {
  data: LaureateDataI[];
  showDetails: (id: string) => void;
  onChange: (page: number) => void;
  pagination: PaginationI;
}

export default function BaseTable({
  data,
  pagination,
  onChange,
  showDetails,
}: PropsI) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">DOB</TableCell>
            <TableCell align="right">Death</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ cursor: "pointer" }}
              hover
              onClick={() => showDetails(row.id)}
            >
              <TableCell component="th" scope="row">
                {row.fullName?.en}
              </TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.birth?.date}</TableCell>
              <TableCell align="right">{row.death?.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        size="large"
        count={pagination.count}
        onChange={(_, page) => onChange(page)}
      />
    </TableContainer>
  );
}
