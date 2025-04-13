import { useEffect, useState } from "react";
import { fetchImage } from "../services/api";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button } from "@mui/material";

interface TableDataProps {
  id: string;
  albumId: string;
  thumbnailUrl: string;
  title: string;
  url: string;
}

const TableData = () => {
  const [data, setData] = useState<TableDataProps[]>([]);
  const [visibleCount, setVisibleCount] = useState(50);
  const handleGetData = async () => {
    try {
      const res = await fetchImage();
      console.log(res);
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);
  const visibleData = data.slice(0, visibleCount);
  const remaining = data.length - visibleData.length;
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 50);
  };

  return (
    <Box
      sx={{
        margin: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">albumId</TableCell>
              <TableCell align="right">thumbnailUrl</TableCell>
              <TableCell align="right">title</TableCell>
              <TableCell align="right">url</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.albumId}
                </TableCell>
                <TableCell align="right">{row.thumbnailUrl}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.url}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {remaining > 0 && (
        <TableRow>
          <TableCell colSpan={5} align="center">
            {remaining} more items to load
          </TableCell>
          <TableCell align="center">
            <Button onClick={handleShowMore}>Show more</Button>
          </TableCell>
        </TableRow>
      )}
    </Box>
  );
};

export default TableData;
// import { DataGrid, GridColDef } from "@mui/x-data-grid";

// const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "albumId", headerName: "albumId", width: 70 },
//   { field: "thumbnailUrl", headerName: "thumbnailUrl", width: 400 },
//   { field: "title", headerName: "title", width: 350 },
//   { field: "url", headerName: "url", width: 350 },
// ];
// const paginationModel = { page: 0, pageSize: 100 };

// <Paper sx={{ height: 400, width: "100%" }} elevation={3}>
//   <DataGrid
//     rows={data}
//     columns={columns}
//     initialState={{ pagination: { paginationModel } }}
//     checkboxSelection
//     sx={{ border: 0 }}
//   />
// </Paper>
