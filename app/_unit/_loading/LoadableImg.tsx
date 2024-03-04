import {Loadable, LoadableProps} from "./Loadable";
import {Img} from "../Img";
import {SystemCssProperties} from "@mui/system/styleFunctionSx/styleFunctionSx";
import {Property} from "csstype";

export function LoadableImg(
  {
    src,
    alt,
    loading,
    aspectRatio,
    ...props
  }: LoadableImgProps,
) {


  return (
    <Loadable
      loading={loading} {...props} sx={{aspectRatio: aspectRatio}}
    >
      <Img src={src} alt={alt} {...props} aspectRatio={aspectRatio}/>
    </Loadable>
  );
}

export interface LoadableImgProps extends LoadableProps {
  loading: boolean;
  src: string | undefined;
  alt: string | undefined;
  sx?: SystemCssProperties;
  aspectRatio?: Property.AspectRatio | undefined;
}
