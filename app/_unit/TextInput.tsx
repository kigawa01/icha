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
    <div><TextField
      {...props}
      color={color || "secondary"}
      sx={{
        width: "100%",
        margin: margin || "10px 0",
      }}
    /></div>
  );
}

export interface TextInputProps {
}
