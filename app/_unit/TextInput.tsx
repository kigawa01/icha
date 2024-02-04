import {TextField} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";

export function TextInput(
  {
    color,
    ...props
  }: TextInputProps & TextFieldProps,
) {
  return (
    <TextField
      {...props}
      color={color || "secondary"}
    >
    </TextField>
  );
}

export interface TextInputProps {
}
