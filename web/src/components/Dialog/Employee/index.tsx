import {DialogContainer} from "../../index.ts";
import {Autocomplete, RadioGroup, Stack, TextField, FormControlLabel, Radio} from "@mui/material";
import {EmployeeDialogProp} from "../../../utils";

export default ({isOpen, onClose, employee, setEmployee, onSave}: EmployeeDialogProp) => {

  const onChange = (event: any) => {
    setEmployee({...employee, [event.target.name]: event.target.value})
  }

  const positions: string[] = [
    'Sale', 'Hr', 'Warehouse', 'Accountant', 'Director'
  ]

  return (
    <DialogContainer
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
    >
      <Stack sx={{ width: 450 }} spacing={2}>
        <TextField
          fullWidth name={'name'} label="Name" variant="outlined" value={employee.name} onChange={onChange}
        />
        <TextField
          fullWidth name={'age'} label="Age" variant="outlined" value={employee.age} onChange={onChange}
        />
        <TextField
          fullWidth name={'address'} label="Address" variant="outlined" value={employee.address} onChange={onChange}
        />
        <TextField
          fullWidth name={'salary'} label="Salary" variant="outlined" value={employee.salary} onChange={onChange}
        />
        <Autocomplete
          value={'Member'}
          fullWidth options={positions}
          renderInput={(params) => <TextField {...params} label="Position" />}
          onChange={(_, newValue) => {
            setEmployee({...employee, position: newValue});
          }}
        />
        <RadioGroup row>
          <FormControlLabel value="active" control={<Radio />} label="Active" />
          <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
        </RadioGroup>
      </Stack>
    </DialogContainer>
  )
}