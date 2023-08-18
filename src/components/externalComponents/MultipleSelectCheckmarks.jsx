import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
// import airportNames from '../../airportNames.json';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["🇬🇧 GBP Pound Sterling (£)", "	🇺🇸 USD US Dollar ($)", "🇪🇺 EUR Euro (€)", "🇨🇦 CAD Canadian Dollar ($)"] ;

export default function MultipleSelectCheckmarks({currency, setCurrency}) {

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrency(value);
  };

  return (
    <div className='w-[230px]'>
      <FormControl sx={{ m: 1, width: '90%' }}>
        <InputLabel id="demo-multiple-checkbox-label">Select currency</InputLabel>

        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currency}
            label="Age"
            onChange={handleChange}
            defaultValue={"🇬🇧 GBP Pound Sterling (£)"}
          >

          {names.map((name) => (
            <MenuItem key={name} value={name} style={{minWidth: '50px', height: '25px', padding: '3px' }}>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}