import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import Radio from "@mui/material/Radio";
import {Typography} from "@mui/material";
import * as React from "react";
import {FocusEventHandler, MouseEventHandler} from "react";

export function LabeledRadio(
  {
    onClick,
    children,
    onBlur,
    checked,
    onFocus,
    ...props
  }: LabeledRadioProps,
) {


  return (
    <Box
      {...props} component={"label"} display={"flex"} height={"fit-content"} alignItems={"center"} margin={"0 3px"}
      sx={{cursor: "pointer"}} onClick={onClick} onFocus={onFocus} onBlur={onBlur}
    >
      <Radio checked={checked} color={"secondary"}/>
      <Typography>{children}</Typography>
    </Box>
  );
}

export interface LabeledRadioProps extends OverrideProps<BoxTypeMap, any> {
  checked?: boolean;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
  onFocus?: FocusEventHandler<HTMLElement> | undefined;
  onBlur?: FocusEventHandler<HTMLElement> | undefined;
}
