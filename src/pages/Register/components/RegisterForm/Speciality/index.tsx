import { Autocomplete, TextField, Typography } from "@mui/material";
import { professions } from "../../../../../mocks/profession";

export const Speciality = ({ value, onChange }) => {
  const professionData = professions.map((profession) => profession);

  return (
    <div>
      <Typography variant="h6">Especialidade</Typography>
      <Autocomplete
        disablePortal
        options={professionData}
        value={value} 
        onChange={(event, newValue) => {
          onChange(newValue)
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
};
