import { Autocomplete, TextField, Typography } from "@mui/material";
import { professions } from "../../../../../mocks/profession";

export const Speciality = ({ value, onChange, error, helperText }) => {
  const professionData = professions.map((profession) => profession);

  return (
    <div>
      <Autocomplete
        disablePortal
        options={professionData}
        value={value || null} 
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        sx={{
          width: { xs: "100%", sm: "200%", md: "100%" },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Especialidade"
            error={error}
            helperText={helperText}
          />
        )}
      />
    </div>
  )
}
