import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {TextareaAutosize} from "@mui/base";
import {ChangeEventHandler} from "react";
import {Typography} from "@mui/material";

export function Textarea(
  {
    value,
    onChange,
    label,
    required,
    name,
    ...props
  }: TextareaProps,
) {

  return (
    <Box
      margin={"5px 0 10px 0"}
      borderRadius={"5px"} overflow={"hidden"} boxSizing={"border-box"} padding={"0"} sx={{
      "textarea": {
        resize: "none",
        width: "100%",
        display: "block",
        padding: "3px",
        boxSizing: "border-box",
      },
    }} {...props}
    >
      {label && <Typography padding={"3px 5px"}>{label}</Typography>}
      <TextareaAutosize
        name={name} value={value} placeholder={label} maxRows={"20"} minRows={2}
        onChange={onChange} required={required}
      />
    </Box>
  );
}

export interface TextareaProps extends OverrideProps<BoxTypeMap, any> {
  value?: string | undefined;
  onChange?: ChangeEventHandler<any> | undefined;
  label?: string | undefined;
  name: string;
  required?: boolean;
}
