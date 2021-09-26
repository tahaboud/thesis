import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { workOrderValidator } from "../../validators/assetValidator";
import { useSelector, useDispatch } from "react-redux";
import { addWorkOrder } from "../../../../actions/assetAction";
import MenuItem from "@mui/material/MenuItem";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";

const AddWorkOrderDialog = ({ open, setOpen }) => {
  const [equipement, setEquipement] = useState("");
  const [failed_piece, setFailedPiece] = useState("");
  const [repair_piece, setRepairPiece] = useState("");
  const [is_down, setIsDown] = useState(false);
  const [startTime, setStartTime] = useState(
    new Date("2014-08-18T21:11:54").toISOString().replace("Z", "")
  );
  const [endTime, setEndTime] = useState(
    new Date("2014-08-18T21:11:54").toISOString().replace("Z", "")
  );
  const [comment, setComment] = useState("");
  const [workOrderErrors, setWorkOrderErrors] = useState(null);

  const { errors, data, equipements } = useSelector((state) => state.asset);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors) {
      setWorkOrderErrors(errors);
    }
    if (data && data.id) {
      setOpen(false);
    }
  }, [errors, data]);

  const onChange = (e) => {
    switch (e.target.name) {
      case "equipement":
        setEquipement(e.target.value);
        break;
      case "failed_piece":
        setFailedPiece(e.target.value);
        break;
      case "repair_piece":
        setRepairPiece(e.target.value);
        break;
      case "is_down":
        setIsDown(e.target.value);
        break;
      case "maintenance_start_time":
        setStartTime(e.target.value);
        break;
      case "maintenance_end_time":
        setEndTime(e.target.value);
        break;
      case "comment":
        setComment(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { isValid, validationErrors } = workOrderValidator(
      equipement,
      failed_piece,
      repair_piece,
      startTime,
      endTime,
      comment
    );
    if (isValid) {
      dispatch(
        addWorkOrder({
          equipement,
          failed_piece,
          repair_piece,
          maintenance_start_time: startTime,
          maintenance_end_time: endTime,
          comment,
        })
      );
    } else {
      setWorkOrderErrors(validationErrors);
    }
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add A Work Order</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a work order please fill the form bellow.
        </DialogContentText>
        <TextField
          select
          label="Select An Equipement"
          name="equipement"
          value={equipement}
          onChange={onChange}
          fullWidth
          error={workOrderErrors && workOrderErrors.equipement ? true : false}
          helperText={
            workOrderErrors && workOrderErrors.equipement
              ? workOrderErrors.equipement
              : "Please select an equipement"
          }
        >
          {equipements.map((equipement) => (
            <MenuItem key={equipement.id} value={equipement.id}>
              {equipement.code}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          autoFocus
          margin="dense"
          name="failed_piece"
          label="Failed Piece"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={workOrderErrors && workOrderErrors.failed_piece ? true : false}
          helperText={
            workOrderErrors && workOrderErrors.failed_piece
              ? workOrderErrors.failed_piece
              : ""
          }
        />
        <TextField
          autoFocus
          margin="normal"
          name="repair_piece"
          label="Repair Piece"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChange}
          error={workOrderErrors && workOrderErrors.repair_piece ? true : false}
          helperText={
            workOrderErrors && workOrderErrors.repair_piece
              ? workOrderErrors.repair_piece
              : ""
          }
        />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            label="Maintenance Starts At"
            value={startTime}
            onChange={(value) =>
              setStartTime(value.toISOString().replace("Z", ""))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                name="maintenance_start_time"
                fullWidth
                margin="dense"
              />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            label="Maintenance Ends At"
            value={endTime}
            onChange={(value) =>
              setEndTime(value.toISOString().replace("Z", ""))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                name="maintenance_end_time"
                fullWidth
                margin="dense"
              />
            )}
          />
        </LocalizationProvider>

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
          error={workOrderErrors && workOrderErrors.comment ? true : false}
          helperText={
            workOrderErrors && workOrderErrors.comment
              ? workOrderErrors.comment
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

export default AddWorkOrderDialog;
