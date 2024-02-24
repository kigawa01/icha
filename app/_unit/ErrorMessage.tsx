import {HTMLAttributes} from "react";
import {Typography} from "@mui/material";
import {Box} from "@mui/system";

export interface ErrorMessageProps extends HTMLAttributes<any> {
  error?: string | undefined;
}

export function ErrorMessage(props: ErrorMessageProps) {
  const {
    error,
    ...parentProps
  } = props;
  return error && <Typography {...parentProps}>
    <Box color={"error"} component={"strong"}>Error: {error}</Box>
  </Typography>;
}