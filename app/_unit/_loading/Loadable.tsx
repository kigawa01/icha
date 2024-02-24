import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Loading} from "./Loading";
import {ReactNode} from "react";

export function Loadable(
  {
    loading,
    children,
    loadingLabel,
  }: LoadableProps,
) {


  return (
    loading
      ? loadingLabel || <Loading/>
      : children
  );
}

export interface LoadableProps extends OverrideProps<BoxTypeMap, any> {
  loading: boolean;
  loadingLabel?: ReactNode | undefined;
}
