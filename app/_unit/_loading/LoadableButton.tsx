import {Button} from "@mui/material";
import {MouseEventHandler, ReactNode} from "react";
import {Loadable} from "./Loadable";
import {OverrideProps} from "@mui/types";
import {ExtendButtonBaseTypeMap} from "@mui/material/ButtonBase/ButtonBase";
import {ButtonTypeMap} from "@mui/material/Button/Button";

export function LoadableButton(
  {
    loading,
    children,
    loadingLabel,
    fontSize,
    sx,
    ...props
  }: LoadableButtonProps,
) {
  return (
    <Button
      variant={"contained"} disabled={loading} sx={{fontSize: fontSize, ...sx}}
      {...props}
    >
      <Loadable loading={loading} loadingLabel={loadingLabel} fontSize={fontSize}>{children}</Loadable>
    </Button>
  );
}

export interface LoadableButtonProps extends OverrideProps<ExtendButtonBaseTypeMap<ButtonTypeMap>, any> {
  onClick?: MouseEventHandler<any> | undefined;
  loading: boolean;
  loadingLabel?: ReactNode | undefined;
  fontSize?: number;
}
