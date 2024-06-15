import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

import { DialogProps } from '@/utils/type';

const UpdateStatusDialog: React.FC<DialogProps> = ({ open, onClose, onUpdate, statusType,options,handleUpdatedTable }) => {
  const [status, setStatus] = useState<string>('');

  const handleClose = () => {
    onClose();
    setStatus('');
  };

  const handleUpdate = () => {
    handleUpdatedTable();
    onUpdate(status);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{`Update ${statusType} Status`}</DialogTitle>
    <DialogContent>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as string)}
          label="Status"
        >
            {options.map((option)=>{
                return <MenuItem value={option}>{option}</MenuItem>
            })}
        </Select>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleUpdate} disabled={!status}>Update</Button>
    </DialogActions>
  </Dialog>
  );
};

export default UpdateStatusDialog;
