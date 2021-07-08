import React from 'react';
import {
  FormLabel,
  FormControl,
  RadioGroup as MuiRadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
export default function RadioGroup({ name, label, value, onChange, items }) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map(item => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
}
