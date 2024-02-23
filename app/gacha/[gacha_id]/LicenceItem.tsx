import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Typography} from "@mui/material";

export function LicenceItem(
  {
    label,
    ...props
  }: LicenceItemProps,
) {


  return (
    <Box
      {...props}
      display={"flex"}
    >
      <Typography width={"200px"}>{label}</Typography>
      <Typography >{label}</Typography>
    </Box>
  );
}

export interface LicenceItemProps extends OverrideProps<BoxTypeMap, any> {
  label: string;
  content: string
}
