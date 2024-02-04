import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Typography} from "@mui/material";
import {LabeledItem, LabeledItemProps} from "./LabeledItem";

export interface LabeledTextProps extends LabeledItemProps{
  text: string
}
export function LabeledText(
  {
    text,
    ...props
  }: LabeledTextProps,
) {


  return (
    <LabeledItem
      {...props}
      display={"flex"}
    >
      <Typography  component={"span"}>{text}</Typography>
    </LabeledItem>
  );
}