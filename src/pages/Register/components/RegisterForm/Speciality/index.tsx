import { Autocomplete, TextField, Typography } from "@mui/material";
import { professions } from "../../../../../mocks/profession";

export const Speciality = ({ value, onChange, error, helperText }) => {
  const professionData = professions.map((profession) => profession);

  return (
    <div>
      <Typography variant="h6">Especialidade</Typography>
      <Autocomplete
        disablePortal
        options={professionData}
        value={value || null} 
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        sx={{
          width: { xs: "90%", sm: "200%", md: "150%" },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
          />
        )}
      />
    </div>
  )
}
