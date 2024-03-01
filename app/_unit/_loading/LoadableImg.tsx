import {Loadable, LoadableProps} from "./Loadable";
import {Img} from "../Img";

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
}