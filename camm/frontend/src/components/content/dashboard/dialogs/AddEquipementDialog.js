import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { equipementValidator } from "../../validators/assetValidator";
import { useSelector, useDispatch } from "react-redux";
import { addEquipement } from "../../../../actions/assetAction";

const AddEquipementDialog = ({ open, setOpen }) => {
  const [code, setCode] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [supplier, setSupplier] = useState("");
  const [brand, setBrand] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const [comment, setComment] = useState("");
  const [equipementErrors, setEquipementErrors] = useState(null);

  const { errors, data } = useSelector((state) => state.asset);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors) {
      setEquipementErrors(errors);
    }
    if (data && data.id) {
      setOpen(false);
    }
  }, [errors, data]);

  const onChange = (e) => {
    switch (e.target.name) {
      case "code":
        setCode(e.target.value);
        break;
      case "localisation":
        setLocalisation(e.target.value);
        break;
      case "supplier":
        setSupplier(e.target.value);
        break;
      case "brand":
        setBrand(e.target.value);
        break;
      case "serial_number":
        setSerialNumber(e.target.value);
        break;
      case "comment":
        setComment(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { isValid, validationErrors } = equipementValidator(
      code,
      localisation,
      supplier,
      brand,
      serial_number,
      comment
    );
    if (isValid) {
      dispatch(
        addEquipement({
          code,
          localisation,
          supplier,
          brand,
          serial_number,
          comment,
        })
      );
    } else {
      setEquipementErrors(validationErrors);
    }
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add An Equipement</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add an equipement please fill the form bellow.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="code"
          label="Equipement's code"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={equipementErrors && equipementErrors.code ? true : false}
          helperText={
            equipementErrors && equipementErrors.code
              ? equipementErrors.code
              : ""
          }
        />
        <TextField
          autoFocus
          margin="dense"
          name="localisation"
          label="localisation"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={
            equipementErrors && equipementErrors.localisation ? true : false
          }
          helperText={
            equipementErrors && equipementErrors.localisation
              ? equipementErrors.localisation
              : ""
          }
        />
        <TextField
          autoFocus
          margin="dense"
          name="supplier"
          label="Supplier"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={equipementErrors && equipementErrors.supplier ? true : false}
          helperText={
            equipementErrors && equipementErrors.supplier
              ? equipementErrors.supplier
              : ""
          }
        />
        <TextField
          autoFocus
          margin="dense"
          name="brand"
          label="Brand"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={equipementErrors && equipementErrors.brand ? true : false}
          helperText={
            equipementErrors && equipementErrors.brand
              ? equipementErrors.brand
              : ""
          }
        />
        <TextField
          autoFocus
          margin="dense"
          name="serial_number"
          label="Serial Number"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={
            equipementErrors && equipementErrors.serial_number ? true : false
          }
          helperText={
            equipementErrors && equipementErrors.serial_number
              ? equipementErrors.serial_number
              : ""
          }
        />
        <TextField
          autoFocus
          margin="dense"
          name="comment"
          label="Comment"
          type="text"
          multiline
          fullWidth
          variant="standard"
          onChange={onChange}
          error={equipementErrors && equipementErrors.comment ? true : false}
          helperText={
            equipementErrors && equipementErrors.comment
              ? equipementErrors.comment
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

export default AddEquipementDialog;
