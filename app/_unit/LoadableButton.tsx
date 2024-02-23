import {OverrideProps} from "@mui/types";
import {Button, CircularProgress} from "@mui/material";
import {ButtonTypeMap} from "@mui/material/Button/Button";
import {ExtendButtonBaseTypeMap} from "@mui/material/ButtonBase/ButtonBase";
import {MouseEventHandler, ReactNode} from "react";

export function LoadableButton(
  {
    loading,
    children,
    loadingLabel,
    ...props
  }: LoadableButtonProps,
) {


  return (
    <Button
      variant={"contained"} disabled={loading}
      {...props}
    >{
      loading
        ? loadingLabel || <><CircularProgress color={"secondary"} size={20} sx={{marginRight: "10px"}}/> ロード中</>
        : children
    }</Button>
  );
}

export interface LoadableButtonProps extends OverrideProps<ExtendButtonBaseTypeMap<ButtonTypeMap>, any> {
  loading: boolean;
  loadingLabel?: ReactNode | undefined;
  onClick?: MouseEventHandler<any> | undefined;
}
