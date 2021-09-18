import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { registerValidator } from "../../validators/authValidator";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../../../actions/authAction";

const AddUserDialog = ({ open, setOpen }) => {
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [password, setPassword] = useState("");
  const [registerErrors, setRegisterErrors] = useState(null);

  const { errors, data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors) {
      setRegisterErrors(errors);
    }
    if (data && data.data === "User created succesfully") {
      setOpen(false);
    }
  }, [errors, data]);

  const onChange = (e) => {
    switch (e.target.name) {
      case "first_name":
        setFirst(e.target.value);
        break;
      case "last_name":
        setLast(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { isValid, validationErrors } = registerValidator(
      email,
      first,
      last,
      password
    );
    if (isValid) {
      dispatch(register(email, first, last, password));
    } else {
      setRegisterErrors(validationErrors);
    }
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add A User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a user please fill the form bellow.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={registerErrors && registerErrors.email ? true : false}
          helperText={
            registerErrors && registerErrors.email ? registerErrors.email : ""
          }
        />
        <TextField
          autoFocus
          margin="dense"
          name="first_name"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={registerErrors && registerErrors.first_name ? true : false}
          helperText={
            registerErrors && registerErrors.first_name
              ? registerErrors.first_name
              : ""
          }
        />
        <TextField
          autoFocus
          margin="dense"
          name="last_name"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={registerErrors && registerErrors.last_name ? true : false}
          helperText={
            registerErrors && registerErrors.last_name
              ? registerErrors.last_name
              : ""
          }
        />
        <TextField
          autoFocus
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={registerErrors && registerErrors.password ? true : false}
          helperText={
            registerErrors && registerErrors.password
              ? registerErrors.password
              : ""
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
