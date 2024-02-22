import FormControlLabel, {FormControlLabelProps} from "@mui/material/FormControlLabel";
import React from "react";

export function FormControlLabelWrap(
  {
    ...props
  }: FormControlLabelProps,
): React.JSX.Element {
  return (
    // @ts-ignore
    <FormControlLabel
      {...props}
    />
  );
}
