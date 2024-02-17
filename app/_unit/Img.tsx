import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ImgHTMLAttributes} from "react";

export function Img(
  {
    src,
    img,
    alt,
    ...props
  }: ImgProps,
) {
  const imgUse = img || {};

  return (
    <Box
      {...props}
      component={"figure"}
      sx={{
        "img": {
          maxWidth: "100%",
          maxHeight: "100%",
        },
      }}
    >
      <img
        alt={alt}
        src={src}
        {...imgUse}
        color={"secondary"}
        width={"auto"}
        height={"auto"}
      />
    </Box>
  );
}

export interface ImgProps extends OverrideProps<BoxTypeMap, any> {
  src: string | undefined;
  alt: string | undefined;
  img?: ImgHTMLAttributes<HTMLImageElement>;
}
