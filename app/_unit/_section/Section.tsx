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
    >
      <Typography variant={"h2"}>{sectionTitle}</Typography>
      {children}
    </Box>
  );
}

export interface SectionProps extends OverrideProps<BoxTypeMap, any> {
  sectionTitle: string;
}
