import { TextField } from '@material-ui/core';
import React from 'react';

export default function Input(props) {
  const { name, label, value, onChange, error = null, ...other } = props;
  return (
    <TextField
      variant="outlined"
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      {...other}
    />
  );
}
