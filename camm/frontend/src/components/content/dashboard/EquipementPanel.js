import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Dialog from "./dialogs/AddEquipementDialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const EquipementPanel = () => {
  const { user, users } = useSelector((state) => state.auth);
  const { equipements, suppliers, data } = useSelector((state) => state.asset);
  const { localisations } = useSelector((state) => state.pref);
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
          Equipement Created Succefully!
        </MuiAlert>
      </Snackbar>
      <Toolbar>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Equipements
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Equipement
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell align="center">Localisation</TableCell>
              <TableCell align="center">Supplier</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Serial Number</TableCell>
              <TableCell align="center">Comment</TableCell>
              <TableCell align="center">Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipements &&
              equipements.map((equipement) => (
                <TableRow key={equipement.id}>
                  <TableCell component="th" scope="row">
                    {equipement.code}
                  </TableCell>
                  <TableCell align="right">
                    {localisations.map((localisation) => {
                      if (localisation.id === equipement.localisation)
                        return localisation.name;
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {suppliers.map((supplier) => {
                      if (supplier.id === equipement.supplier)
                        return supplier.full_name;
                    })}
                  </TableCell>
                  <TableCell align="right">{equipement.brand}</TableCell>
                  <TableCell align="right">
                    {equipement.serial_number}
                  </TableCell>
                  <TableCell align="right">
                    {equipement.comment ? equipement.comment : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {users.map((user) => {
                      if (equipement.created_by === user.id)
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

export default EquipementPanel;
