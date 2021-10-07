import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "./dialogs/AddWorkOrderDialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const WorkOrderPanel = () => {
  const { user, users } = useSelector((state) => state.auth);
  const { workOrders, equipements, data } = useSelector((state) => state.asset);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    if (data && data.id) {
      setSnackbarOpen(true);
    }
  }, [data]);
  const onDownload = (code, date_created) => {
    code = equipements.filter((equipement) => {
      return equipement.id == code;
    })[0].code;
    const url =
      "/static/" +
      code +
      "'s Work Order " +
      date_created
        .replace("-", "_")
        .replace("-", "_")
        .replace(":", "_")
        .replace("T", "_")
        .substr(0, 16) +
      ".pdf";
    window.open(url);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Work Order Created Succefully!
        </MuiAlert>
      </Snackbar>
      <Toolbar>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Work Orders
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Work Order
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Equipement</TableCell>
              <TableCell align="center">Failed Piece</TableCell>
              <TableCell align="center">Repair Piece</TableCell>
              <TableCell align="center">Maintenance Start At</TableCell>
              <TableCell align="center">Maintenance End At</TableCell>
              <TableCell align="center">Comment</TableCell>
              <TableCell align="center">Work Order</TableCell>
              <TableCell align="center">Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workOrders &&
              workOrders.map((workOrder) => (
                <TableRow key={workOrder.id}>
                  <TableCell component="th" scope="row">
                    {equipements.map((equipement) => {
                      if (equipement.id === workOrder.equipement)
                        return equipement.code;
                    })}
                  </TableCell>
                  <TableCell align="right">{workOrder.failed_piece}</TableCell>
                  <TableCell align="right">{workOrder.repair_piece}</TableCell>
                  <TableCell align="right">
                    {workOrder.maintenance_start_time
                      .replace("T", " ")
                      .replace("Z", "")}
                  </TableCell>
                  <TableCell align="right">
                    {workOrder.maintenance_end_time}
                  </TableCell>
                  <TableCell align="right">{workOrder.comment}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() =>
                        onDownload(workOrder.equipement, workOrder.date_created)
                      }
                    >
                      Download
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    {users.map((user) => {
                      if (user.id === workOrder.created_by)
                        return user.username;
                    })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} setOpen={setOpen} />
    </Box>
  );
};

export default WorkOrderPanel;
