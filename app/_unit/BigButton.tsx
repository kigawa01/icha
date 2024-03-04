import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Typography} from "@mui/material";
import {LoadableButton} from "./_loading/LoadableButton";
import {MouseEventHandler} from "react";
import {useResponsive} from "../_hook/useMedia";

export function BigButton(
  {
    loading,
    onClick,
    children,
    disabled,
    ...props
  }: BigButtonProps,
) {
  const responsive = useResponsive({
    def: {fontRem: 4.5, font: 30},
    smartphone: {fontRem: 4, font: 20},
  });


  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} {...props}>
      <Typography sx={{fontSize: `${responsive.fontRem}rem`}}>&gt;&gt;</Typography>
      <LoadableButton
        loading={loading} variant={"contained"}
        onClick={onClick} disabled={disabled}
        sx={{height: "fit-content", margin: "0 10px"}} fontSize={responsive.font}
      >
        {children}
      </LoadableButton>
      <Typography sx={{fontSize: `${responsive.fontRem}rem`}}>&lt;&lt;</Typography>
    </Box>
  );
}

export interface BigButtonProps extends OverrideProps<BoxTypeMap, any> {
  loading: boolean;
  onClick?: MouseEventHandler<any> | undefined;
  disabled?: boolean;
}
