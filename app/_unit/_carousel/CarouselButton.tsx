import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Button, SxProps} from "@mui/material";
import {Property} from "csstype";
import {StateObject} from "../../util";

export function CarouselButton(
  {
    zIndex,
    height,
    progressState,
    page,
    onClick,
    buttonPosition,
    ...props
  }: CarouselButtonProps,
) {

  const buttonBoxSx: SxProps = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };
  const zIndexUse = zIndex || 1;

  return (
    <Box {...props} sx={buttonBoxSx} zIndex={zIndexUse + 1}>
      <Button variant={"outlined"} sx={{
        fontWeight: "bold", fontSize: "2rem", height: height || "100%", color: "text.primary",
        bgcolor: "#fff6", "&:hover": {bgcolor: "#ccc9"},
      }} onClick={onClick}>
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

  onClick(): void;
}
