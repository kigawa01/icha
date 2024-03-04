import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Property} from "csstype";
import {SystemCssProperties} from "@mui/system/styleFunctionSx/styleFunctionSx";

export function Img(
  {
    src, img, alt, margin, marginBottom, sx, justifyContent, alignItems, aspectRatio,
    ...props
  }: ImgProps,
) {

  margin = margin || `0 0 ${marginBottom || 0} 0`;

  return (
    <Box
      {...props} margin={margin} component={"figure"} display={"flex"} justifyContent={justifyContent || "center"}
      alignItems={alignItems || "center"} overflow={"hidden"}
      sx={{
        "img": {
          maxWidth: "100%",
          maxHeight: "100%",
          display: "block",
          flex: "none",
        },
        aspectRatio: aspectRatio || sx?.aspectRatio || "",
        ...sx,
      }}
    >
      <img
        alt={alt}
        src={src}
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
  aspectRatio?: Property.AspectRatio | undefined;
  sx?: SystemCssProperties;
}
