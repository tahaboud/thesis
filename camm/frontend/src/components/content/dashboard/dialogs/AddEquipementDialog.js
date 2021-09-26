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
import MenuItem from "@mui/material/MenuItem";

const AddEquipementDialog = ({ open, setOpen }) => {
  const [code, setCode] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [supplier, setSupplier] = useState("");
  const [brand, setBrand] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const [comment, setComment] = useState("");
  const [equipementErrors, setEquipementErrors] = useState(null);

  const { errors, data, suppliers } = useSelector((state) => state.asset);
  const { localisations } = useSelector((state) => state.pref);
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
      serial_number
    );
    console.log(isValid);
    console.log(validationErrors);
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
          label="Equipement's code *"
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
          select
          label="Select Localisation *"
          name="localisation"
          value={localisation}
          onChange={onChange}
          fullWidth
          error={
            equipementErrors && equipementErrors.localisation ? true : false
          }
          helperText={
            equipementErrors && equipementErrors.localisation
              ? equipementErrors.localisation
              : ""
          }
        >
          {localisations.map((localisation) => (
            <MenuItem key={localisation.id} value={localisation.id}>
              {localisation.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Select Supplier *"
          name="supplier"
          value={supplier}
          onChange={onChange}
          fullWidth
          error={equipementErrors && equipementErrors.supplier ? true : false}
          helperText={
            equipementErrors && equipementErrors.supplier
              ? equipementErrors.supplier
              : ""
          }
        >
          {suppliers.map((supplier) => (
            <MenuItem key={supplier.id} value={supplier.id}>
              {supplier.full_name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          autoFocus
          margin="dense"
          name="brand"
          label="Brand *"
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
          label="Serial Number *"
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
          label="Comment (Optional)"
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
