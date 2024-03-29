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
import Dialog from "./dialogs/AddLocalisaitionDialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const LocalisationPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const { localisations, data } = useSelector((state) => state.pref);
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
          Localisation Created Succefully!
        </MuiAlert>
      </Snackbar>
      <Toolbar>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Localisations
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Localisation
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localisations &&
              localisations.map((localisation) => (
                <TableRow key={localisation.id}>
                  <TableCell component="th" scope="row">
                    {localisation.name}
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

export default LocalisationPanel;
