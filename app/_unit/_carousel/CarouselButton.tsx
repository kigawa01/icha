import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Button, SxProps} from "@mui/material";
import {Property} from "csstype";
import {StateObject} from "../../util";
import {useResponsive} from "../../_hook/useMedia";

export function CarouselButton(
  {
    zIndex,
    height,
    progressState,
    page,
    onClick,
    buttonPosition,
    disabled,
    ...props
  }: CarouselButtonProps,
) {

  const buttonBoxSx: SxProps = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };
  const zIndexUse = zIndex || 1;
  const responsive = useResponsive({
    def: {pad: 20, font: 2.5},
    tablet: {pad: 15, font: 2},
    smartphone: {pad: 5, font: 2},
  });

  return (
    <Box {...props} sx={buttonBoxSx} zIndex={zIndexUse + 1}>
      <Button
        variant={"outlined"} sx={{
        fontWeight: "bold", fontSize: `${responsive.font}rem`, height: height || "100%", color: "text.primary",
        bgcolor: "#fff6", "&:hover": {bgcolor: "#ccc9"}, padding: `5px ${responsive.pad}px`, minWidth: 0
      }} onClick={onClick} disabled={disabled}
      >
        {buttonPosition == "left" ? "<" : ">"}
      </Button>
    </Box>
  );
}

export interface CarouselButtonProps extends OverrideProps<BoxTypeMap, any> {
  progressState: StateObject<number>;
  page: number;
  height?: Property.Height | undefined;
  zIndex?: number | undefined;
  buttonPosition: "left" | "right";
  disabled?: boolean;

  onClick(): void;
}
