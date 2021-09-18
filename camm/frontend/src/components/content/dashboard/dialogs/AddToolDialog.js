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

const AddToolDialog = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState("");
  const [shelf, setShelf] = useState("");
  const [supplier, setSupplier] = useState("");
  const [comment, setComment] = useState("");
  const [toolErrors, setToolErrors] = useState(null);

  const { errors, data } = useSelector((state) => state.asset);
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
      supplier,
      comment
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
          autoFocus
          margin="dense"
          name="name"
          label="Tool's Name"
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
          autoFocus
          margin="dense"
          name="number"
          label="Quantity"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={toolErrors && toolErrors.number ? true : false}
          helperText={toolErrors && toolErrors.number ? toolErrors.number : ""}
        />
        <TextField
          autoFocus
          margin="dense"
          name="price"
          label="Price"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={toolErrors && toolErrors.price ? true : false}
          helperText={toolErrors && toolErrors.price ? toolErrors.price : ""}
        />
        <TextField
          autoFocus
          margin="dense"
          name="shelf"
          label="Shelf"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={toolErrors && toolErrors.shelf ? true : false}
          helperText={toolErrors && toolErrors.shelf ? toolErrors.shelf : ""}
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
          error={toolErrors && toolErrors.supplier ? true : false}
          helperText={
            toolErrors && toolErrors.supplier ? toolErrors.supplier : ""
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
