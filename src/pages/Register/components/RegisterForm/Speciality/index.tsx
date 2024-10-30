import { Autocomplete, TextField, Typography } from "@mui/material";
import { professions } from "../../../../../mocks/profession";

export const Speciality = () => {
  const professionData = professions.map((professions) => professions);

  return (
    <div>
      <Typography variant="h6">Especialidade</Typography>
      <Autocomplete
        disablePortal
        options={professionData}
        sx={{ width: 300}}
        renderInput={(params) => (
          <TextField {...params} />
        )}
      />
    </div>
  );
};
