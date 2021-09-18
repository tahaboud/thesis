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
import Dialog from "./dialogs/AddUserDialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const UserPanel = () => {
  const { users, user, data } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  useEffect(() => {
    if (data && data.data === "User created succesfully") {
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
          User Created Succefully!
        </MuiAlert>
      </Snackbar>
      <Toolbar>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users
        </Typography>
        {user && user.user.is_admin ? (
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add User
          </Button>
        ) : (
          ""
        )}
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Naem</TableCell>
              <TableCell align="center">Is Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell align="right">{user.username}</TableCell>
                  <TableCell align="right">{user.first_name}</TableCell>
                  <TableCell align="right">{user.last_name}</TableCell>
                  <TableCell align="right">
                    {user.is_admin ? "Yes" : "No"}
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

export default UserPanel;
