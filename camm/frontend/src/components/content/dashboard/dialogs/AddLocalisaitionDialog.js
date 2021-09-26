import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { localisationValidator } from "../../validators/assetValidator";
import { useSelector, useDispatch } from "react-redux";
import { addLocalisation } from "../../../../actions/preferencesAction";
import MenuItem from "@mui/material/MenuItem";

const AddLocalisaitionDialog = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [localisationErrors, setLocalisationErrors] = useState(null);

  const { errors, data } = useSelector((state) => state.pref);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors) {
      setLocalisationErrors(errors);
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
    const { isValid, validationErrors } = localisationValidator(name);
    if (isValid) {
      dispatch(addLocalisation({ name }));
    } else {
      setLocalisationErrors(validationErrors);
    }
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add A Localisation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a Localisation please fill the form bellow.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Localisation Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={localisationErrors && localisationErrors.name ? true : false}
          helperText={
            localisationErrors && localisationErrors.name
              ? localisationErrors.name
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

export default AddLocalisaitionDialog;
