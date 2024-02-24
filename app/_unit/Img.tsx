import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ImgHTMLAttributes} from "react";

export function Img(
  {
    src,
    img,
    alt,
    margin,
    ...props
  }: ImgProps,
) {
  const imgUse = img || {};

  return (
    <Box
      {...props} margin={margin || 0} component={"figure"} display={"flex"} justifyContent={"center"}
      alignItems={"center"} overflow={"hidden"}
      sx={{
        "img": {
          maxWidth: "100%",
          maxHeight: "100%",
          display: "block",
          flex: "none",
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
