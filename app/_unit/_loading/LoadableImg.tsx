import {Loadable, LoadableProps} from "./Loadable";
import {Img} from "../Img";
import {SystemCssProperties} from "@mui/system/styleFunctionSx/styleFunctionSx";

export function LoadableImg(
  {
    src,
    alt,
    loading,
    ...props
  }: LoadableImgProps,
) {


  return (
    <Loadable
      loading={loading}      {...props}
    >
      <Img src={src} alt={alt} {...props} />
    </Loadable>
  );
}

export interface LoadableImgProps extends LoadableProps {
  loading: boolean;
  src: string | undefined;
  alt: string | undefined;
  sx?: SystemCssProperties;
}
