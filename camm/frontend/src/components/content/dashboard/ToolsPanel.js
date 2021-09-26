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
import Dialog from "./dialogs/AddToolDialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ToolsPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const { tools, suppliers, data } = useSelector((state) => state.asset);
  const { stocks } = useSelector((state) => state.pref);
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
          Tool Created Succefully!
        </MuiAlert>
      </Snackbar>
      <Toolbar>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Tools
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Tool
        </Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Shelf</TableCell>
              <TableCell align="center">Supplier</TableCell>
              <TableCell align="center">Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tools &&
              tools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell component="th" scope="row">
                    {tool.full_name}
                  </TableCell>
                  <TableCell align="right">{tool.number}</TableCell>
                  <TableCell align="right">{tool.price}</TableCell>
                  <TableCell align="right">
                    {stocks.map((stock) => {
                      if (stock.id === tool.shelf) return stock.name;
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {suppliers.map((supplier) => {
                      if (supplier.id === tool.supplier)
                        return supplier.full_name;
                    })}
                  </TableCell>
                  <TableCell align="right">{tool.comment}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} setOpen={setOpen} />
    </Box>
  );
};

export default ToolsPanel;
