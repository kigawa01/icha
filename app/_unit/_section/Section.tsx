import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Typography} from "@mui/material";

export function Section(
  {
    children,
    sectionTitle,
    ...props
  }: SectionProps,
) {


  return (
    <Box
      {...props}
      component={"section"}
      margin={"40px 10px"}
    >
      <Typography variant={"h2"}>{sectionTitle}</Typography>
      <Box padding={"20px 10px"}>{children}</Box>
    </Box>
  );
}

export interface SectionProps extends OverrideProps<BoxTypeMap, any> {
  sectionTitle: string;
}
