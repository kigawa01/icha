import {Loading, LoadingProps} from "./Loading";
import {ReactNode} from "react";

export function Loadable(
  {
    loading,
    children,
    loadingLabel,
    ...props
  }: LoadableProps,
) {


  return (
    loading
      ? loadingLabel || <Loading {...props}/>
      : children
  );
}

export interface LoadableProps extends LoadingProps {
  loading: boolean;
  loadingLabel?: ReactNode | undefined;
}
