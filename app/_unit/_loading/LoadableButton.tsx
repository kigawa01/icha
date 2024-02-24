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
    ...props
  }: LoadableButtonProps,
) {


  return (
    <Button
      variant={"contained"} disabled={loading}
      {...props}
    >
      <Loadable loading={loading} loadingLabel={loadingLabel}>{children}</Loadable>
    </Button>
  );
}

export interface LoadableButtonProps extends OverrideProps<ExtendButtonBaseTypeMap<ButtonTypeMap>, any> {
  onClick?: MouseEventHandler<any> | undefined;
  loading: boolean;
  loadingLabel?: ReactNode | undefined;
}
