import FormControlLabel, {FormControlLabelProps} from "@mui/material/FormControlLabel";
import React from "preact/compat";

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
