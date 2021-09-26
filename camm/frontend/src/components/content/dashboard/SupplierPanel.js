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
import Dialog from "./dialogs/AddSupplierDialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const SupplierPanel = () => {
  const { user, users } = useSelector((state) => state.auth);
  const { suppliers, data } = useSelector((state) => state.asset);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    if (data && data.id) {
      setSnackbarOpen(true);
    }
  }, [data]);
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
          Supplier Created Succefully!
        </MuiAlert>
      </Snackbar>
      <Toolbar>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Suppliers
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Supplier
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Comment</TableCell>
              <TableCell align="center">Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers &&
              suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell component="th" scope="row">
                    {supplier.full_name}
                  </TableCell>
                  <TableCell align="right">{supplier.address}</TableCell>
                  <TableCell align="right">{supplier.phone_number}</TableCell>
                  <TableCell align="right">
                    {supplier.email ? supplier.email : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {supplier.comment ? supplier.comment : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {users.map((user) => {
                      if (supplier.created_by === user.id) return user.username;
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

export default SupplierPanel;
