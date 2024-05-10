import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ConfirmationModal = ({ open, handleClose, title, bodyText, disagreeText, agreeText, onDisagree, onAgree }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {bodyText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDisagree || handleClose} color='secondary'>{disagreeText}</Button>
        <Button onClick={onAgree || handleClose} autoFocus>
          {agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
