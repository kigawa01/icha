import {Typography} from "@mui/material";
import {LabeledItem, LabeledItemProps} from "./LabeledItem";

export interface LabeledTextProps extends LabeledItemProps{
  text: string | undefined
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