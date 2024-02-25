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
        boxShadow: "1",
        boxSizing: "border-box",
      },
    }}
      {...props}
    >
      {label && <Typography padding={"3px 5px"}>{label}</Typography>}
      <TextareaAutosize
        name={"licence_text"} value={value} placeholder={"本文"} maxRows={"20"} minRows={2}
        onChange={onChange}
      />
    </Box>
  );
}

export interface TextareaProps extends OverrideProps<BoxTypeMap, any> {
  value?: string | undefined;
  onChange?: ChangeEventHandler<any> | undefined;
  label?: string | undefined;
}
