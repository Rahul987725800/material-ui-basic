import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import Controls from '../components/controls/Controls';
const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
  },
}));
export default function Popup({ title, children, openPopup, setOpenPopup }) {
  const classes = useStyles();
  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{
        paper: classes.dialogWrapper,
      }}
    >
      <DialogTitle>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Controls.ActionButton
            color="secondary"
            onClick={() => setOpenPopup(false)}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>

      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
