import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import {OverrideProps} from "@mui/types";
import {BoxTypeMap} from "@mui/system/Box/Box";

export interface LabeledItemProps extends OverrideProps<BoxTypeMap, any> {
  label: string;
}

export function LabeledItem(
  {
    children,
    label,
    ...props
  }: LabeledItemProps,
) {


  return (
    <Box
      {...props}
      display={"flex"}
    >
      <Typography component={"span"} width={"100px"}>{label}</Typography>
      <Typography margin={"0 5px"} display={"block"}>:</Typography>
      {children}
    </Box>
  );
}