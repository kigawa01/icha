import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {TextareaAutosize} from "@mui/base";
import {ChangeEventHandler, useState} from "react";
import {Typography} from "@mui/material";
import {TextareaFieldSet} from "./TextareaFieldSet";
import {Box} from "@mui/system";

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
  const [focused, setFocused] = useState(false);
  const [valueState, setValueState] = useState("");
  const moved: boolean = !!(focused || (value == undefined ? valueState : value));
  return (
    <Box
      {...props} component={"label"} position={"relative"} display={"block"} margin={"5px 0 10px 0"}
      boxSizing={"border-box"} maxHeight={"100%"}
      sx={{
        "textarea": {
          resize: "none",
          width: "100%",
          display: "block",
          padding: "8.5px 14px 8.5px 14px",
          minHeight: "1.4375em",
          opacity: "100%",
          border: "0",
          lineHeight: "1.4375em",
          outline: "none",
        },
      }}
    >
      {label && <Typography
        fontWeight={"400"} color={"rgba(0, 0, 0, 0.6)"} position={"absolute"} zIndex={1}
        sx={{
          pointerEvents: "none", transformOrigin: "top left",
          transform: moved ? "translate(14px, -9px) scale(0.75)" : "translate(14px, 16px) scale(1)",
          transition: `color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,
          transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,
          max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms`,
        }}
      >
        {label}
      </Typography>}
      <Box padding={"8px 0 8px 0"} overflow={"hidden"} maxHeight={"100%"} boxSizing={"border-box"}>
        <TextareaAutosize
          name={name} value={value} maxRows={"20"} minRows={2}
          onChange={event => {
            onChange && onChange(event);
            setValueState(event.currentTarget.value);
          }} required={required} onFocus={_ => setFocused(true)}
          onBlur={_ => setFocused(false)}
        />
      </Box>
      <TextareaFieldSet
        moved={moved} position={"absolute"} width={"100%"} height={"100%"} top={"-5px"} label={label}
        whiteSpace={"nowrap"} focused={focused}
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
