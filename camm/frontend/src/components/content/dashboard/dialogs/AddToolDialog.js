import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toolValidator } from "../../validators/assetValidator";
import { useSelector, useDispatch } from "react-redux";
import { addTool } from "../../../../actions/assetAction";
import MenuItem from "@mui/material/MenuItem";

const AddToolDialog = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState("");
  const [shelf, setShelf] = useState("");
  const [supplier, setSupplier] = useState("");
  const [comment, setComment] = useState("");
  const [toolErrors, setToolErrors] = useState(null);

  const { errors, data, suppliers } = useSelector((state) => state.asset);
  const { stocks } = useSelector((state) => state.pref);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors) {
      setToolErrors(errors);
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
      case "number":
        setNumber(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "shelf":
        setShelf(e.target.value);
        break;
      case "supplier":
        setSupplier(e.target.value);
        break;
      case "comment":
        setComment(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { isValid, validationErrors } = toolValidator(
      name,
      number,
      price,
      shelf,
      supplier
    );
    if (isValid) {
      dispatch(
        addTool({
          full_name: name,
          number,
          price,
          shelf,
          supplier,
          comment,
        })
      );
    } else {
      setToolErrors(validationErrors);
    }
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add A Tool</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a tool please fill the form bellow.
        </DialogContentText>
        <TextField
          margin="dense"
          name="name"
          label="Tool's Name *"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={toolErrors && toolErrors.full_name ? true : false}
          helperText={
            toolErrors && toolErrors.full_name ? toolErrors.full_name : ""
          }
        />
        <TextField
          margin="dense"
          name="number"
          label="Quantity *"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={toolErrors && toolErrors.number ? true : false}
          helperText={toolErrors && toolErrors.number ? toolErrors.number : ""}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price *"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={toolErrors && toolErrors.price ? true : false}
          helperText={toolErrors && toolErrors.price ? toolErrors.price : ""}
        />
        <TextField
          select
          label="Select A Shelf"
          name="shelf"
          value={shelf}
          onChange={onChange}
          fullWidth
          error={toolErrors && toolErrors.shelf ? true : false}
          helperText={
            toolErrors && toolErrors.shelf
              ? toolErrors.shelf
              : "Please select a shelf in the stock"
          }
        >
          {stocks.map((stock) => (
            <MenuItem key={stock.id} value={stock.id}>
              {stock.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Select A Supplier"
          name="supplier"
          value={supplier}
          onChange={onChange}
          fullWidth
          error={toolErrors && toolErrors.supplier ? true : false}
          helperText={
            toolErrors && toolErrors.supplier
              ? toolErrors.supplier
              : "Please select a supplier"
          }
        >
          {suppliers.map((supplier) => (
            <MenuItem key={supplier.id} value={supplier.id}>
              {supplier.full_name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          name="comment"
          label="Comment (Optional)"
          type="text"
          multiline
          fullWidth
          variant="standard"
          onChange={onChange}
          error={toolErrors && toolErrors.comment ? true : false}
          helperText={
            toolErrors && toolErrors.comment ? toolErrors.comment : ""
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

export default AddToolDialog;
