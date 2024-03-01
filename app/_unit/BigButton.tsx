import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Typography} from "@mui/material";
import {LoadableButton} from "./_loading/LoadableButton";
import {MouseEventHandler} from "react";

export function BigButton(
  {
    loading,
    onClick,
    children,
    disabled,
    ...props
  }: BigButtonProps,
) {


  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} {...props}>
      <Typography sx={{fontSize: "4.5rem"}}>&gt;&gt;</Typography>
      <LoadableButton
        loading={loading} variant={"contained"}
        onClick={onClick} disabled={disabled}
        sx={{height: "fit-content", margin: "0 10px"}} fontSize={30}
      >
        {children}
      </LoadableButton>
      <Typography sx={{fontSize: "4.5rem"}}>&lt;&lt;</Typography>
    </Box>
  );
}

export interface BigButtonProps extends OverrideProps<BoxTypeMap, any> {
  loading: boolean;
  onClick?: MouseEventHandler<any> | undefined;
  disabled?: boolean;
}
