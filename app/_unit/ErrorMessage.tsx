import {HTMLAttributes} from "react";
import {Typography} from "@mui/material";
import {Box} from "@mui/system";
import {Property} from "csstype";

export interface ErrorMessageProps extends HTMLAttributes<any> {
  error?: string | undefined;
  width?: Property.Width<string | number> | undefined;
  flex?: Property.Flex<string | number> | undefined;
}

export function ErrorMessage(props: ErrorMessageProps) {
  const {
    width,
    error,
    flex,
    ...parentProps
  } = props;
  return error && <Typography {...parentProps} sx={{width: width, flex: flex, display: "block"}}>
    <Box color={"error"} component={"strong"}>Error: {error}</Box>
  </Typography>;
}