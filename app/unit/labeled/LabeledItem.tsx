import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import {OverrideProps} from "@mui/types";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {Property} from "csstype";

export interface LabeledItemProps extends OverrideProps<BoxTypeMap, any> {
  label: string;
  labelProps?: {
    fontSize?: Property.FontSize | undefined
    width?: Property.Width | undefined
    margin?: Property.Margin | undefined
  } | undefined;
  multiline?: boolean | undefined;
}

export function LabeledItem(
  {
    children,
    label,
    multiline,
    labelProps,
    ...props
  }: LabeledItemProps,
) {
  const multilineUse = multiline == undefined ? false : multiline;

  return (
    <Box
      {...props}
      display={"flex"}
      flexDirection={multilineUse ? "column" : "row"}
    >
      <Typography
        component={"span"}
        width={labelProps?.width || "100px"}
        {...labelProps}
      >{label}</Typography>
      {!multilineUse && <Typography margin={"0 5px"} display={"block"}>:</Typography>}
      {children}
    </Box>
  );
}