import {TextField} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";

export function TextInput(
  {
    color,
    margin,
    ...props
  }: TextInputProps & TextFieldProps,
) {
  return (
    <TextField
      {...props}
      color={color || "secondary"}
      sx={{
        width: "100%",
        margin: margin || "10px 0",
      }}
    />
  );
}

export interface TextInputProps {
}
