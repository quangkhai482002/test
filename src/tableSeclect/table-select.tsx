import * as React from "react";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Popover,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserPermissionModal from "./UserPermissionModal"; // import nếu cùng folder

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  // Popover state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "action-popover" : undefined;

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    handleClose(); // đóng popover trước
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          p: 5,
          backgroundColor: "#fff",
          borderRadius: 2,
          border: "none",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? "<" : ">"}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.calories}</TableCell>
        <TableCell>{row.fat}</TableCell>
        <TableCell>{row.carbs}</TableCell>
        <TableCell>{row.protein}</TableCell>
        <TableCell>
          <IconButton aria-label="more actions" onClick={handleActionClick}>
            ...
          </IconButton>
          <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose}>Update</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
            <MenuItem onClick={handleOpenModal}>Add User Permission</MenuItem>
          </Popover>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                      <TableCell>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <UserPermissionModal open={openModal} onClose={handleCloseModal} />
    </React.Fragment>
  );
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

const TableSelect = () => {
  return (
    <Box
      sx={{
        m: 2,
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TableContainer component={Paper}>
        <Table
          aria-label="collapsible table"
          sx={{
            tableLayout: "fixed",
            width: "100%",
          }}
        >
          <TableHead>
            <TableRow sx={{ height: 120 }}>
              <TableCell sx={{ width: "10%" }} />
              <TableCell sx={{ width: "15%" }}>
                Dessert (100g serving)
              </TableCell>
              <TableCell sx={{ width: "10%" }}>Calories</TableCell>
              <TableCell sx={{ width: "10%" }}>Fat (g)</TableCell>
              <TableCell sx={{ width: "20%" }}>Carbs (g)</TableCell>
              <TableCell sx={{ width: "20%" }}>Protein (g)</TableCell>
              <TableCell sx={{ width: "15%" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableSelect;
