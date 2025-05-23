import { Autocomplete, TextField, Typography } from "@mui/material";
import { professions } from "../../../../../mocks/profession";

interface SpecialityProps {
  value: string | null;
  onChange: (value: string | null) => void;
  error?: boolean;
  helperText?: string;
}

export const Speciality = ({
  value,
  onChange,
  error,
  helperText,
}: SpecialityProps) => {
  return (
    <div>
      <Autocomplete
        disablePortal
        options={professions}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
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
  );
};
