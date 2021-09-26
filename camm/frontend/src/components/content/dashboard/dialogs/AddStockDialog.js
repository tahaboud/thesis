import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { stockValidator } from "../../validators/assetValidator";
import { useSelector, useDispatch } from "react-redux";
import { addStock } from "../../../../actions/preferencesAction";

const AddStockDialog = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [stockErrors, setStockErrors] = useState(null);

  const { errors, data } = useSelector((state) => state.pref);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors) {
      setStockErrors(errors);
    }
    if (data && data.id) {
      setOpen(false);
    }
  }, [errors, data]);

  const onChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { isValid, validationErrors } = stockValidator(name);
    if (isValid) {
      dispatch(addStock({ name }));
    } else {
      setStockErrors(validationErrors);
    }
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add A Stock</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a Stock please fill the form bellow.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Stock's Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={stockErrors && stockErrors.name ? true : false}
          helperText={stockErrors && stockErrors.name ? stockErrors.name : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStockDialog;
