import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {TextareaAutosize} from "@mui/base";
import {ChangeEventHandler} from "react";
import {Typography} from "@mui/material";
import {TextareaLabel} from "./TextareaLabel";

export function Textarea(
  {
    value,
    onChange,
    label,
    required,
    name,
    minHeight,
    borderColor,
    ...props
  }: TextareaProps,
) {
  return (
    <TextareaLabel
      border={borderColor}
      sx={{
        "textarea": {
          resize: "none",
          width: "100%",
          display: "block",
          padding: "3px",
          boxSizing: "border-box",
          minHeight: minHeight,
          opacity: "100%",
          border: "none",
        },
      }} {...props}
    >
      {label && <Typography
        fontWeight={"400"} color={"rgba(0, 0, 0, 0.6)"} position={"absolute"} zIndex={1}
        sx={{pointerEvents: "none", transform: "translate(14px, 16px) scale(1)", transformOrigin: "top left"}}
      >
        {label}
      </Typography>}
      <TextareaAutosize
        name={name} value={value} maxRows={"20"} minRows={2}
        onChange={onChange} required={required}
      />
    </TextareaLabel>
  );
}

export interface TextareaProps extends OverrideProps<BoxTypeMap, any> {
  value?: string | undefined;
  onChange?: ChangeEventHandler<any> | undefined;
  borderColor?: string | undefined;
  label?: string | undefined;
  name: string;
  required?: boolean;
}
