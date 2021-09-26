import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { supplierValidator } from "../../validators/assetValidator";
import { useSelector, useDispatch } from "react-redux";
import { addSupplier } from "../../../../actions/assetAction";

const AddSupplierDialog = ({ open, setOpen }) => {
  const [full_name, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [supplierErrors, setSupplierErrors] = useState(null);

  const { errors, data } = useSelector((state) => state.asset);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors) {
      setSupplierErrors(errors);
    }
    if (data && data.id) {
      setOpen(false);
    }
  }, [errors, data]);

  const onChange = (e) => {
    switch (e.target.name) {
      case "full_name":
        setFullName(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
        break;
      case "phone_number":
        setPhoneNumber(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "comment":
        setComment(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { isValid, validationErrors } = supplierValidator(
      full_name,
      address,
      phone_number,
      email
    );
    if (isValid) {
      dispatch(
        addSupplier({
          full_name,
          address,
          phone_number,
          email,
          comment,
        })
      );
    } else {
      setSupplierErrors(validationErrors);
    }
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add A Supplier</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a supplier please fill the form bellow.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="full_name"
          label="Supplier's Name *"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={supplierErrors && supplierErrors.full_name ? true : false}
          helperText={
            supplierErrors && supplierErrors.full_name
              ? supplierErrors.full_name
              : ""
          }
        />
        <TextField
          margin="dense"
          name="address"
          label="Address *"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={supplierErrors && supplierErrors.address ? true : false}
          helperText={
            supplierErrors && supplierErrors.address
              ? supplierErrors.address
              : ""
          }
        />
        <TextField
          margin="dense"
          name="phone_number"
          label="Phone Number *"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={supplierErrors && supplierErrors.phone_number ? true : false}
          helperText={
            supplierErrors && supplierErrors.phone_number
              ? supplierErrors.phone_number
              : ""
          }
        />
        <TextField
          margin="dense"
          name="email"
          label="Email (Optional)"
          type="email"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={supplierErrors && supplierErrors.email ? true : false}
          helperText={
            supplierErrors && supplierErrors.email ? supplierErrors.email : ""
          }
        />
        <TextField
          margin="dense"
          name="comment"
          label="Comment (Optional)"
          type="text"
          multiline
          fullWidth
          variant="standard"
          onChange={onChange}
          error={supplierErrors && supplierErrors.comment ? true : false}
          helperText={
            supplierErrors && supplierErrors.comment
              ? supplierErrors.comment
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

export default AddSupplierDialog;
