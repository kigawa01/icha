import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Typography} from "@mui/material";

export function Section(
  {
    children,
    sectionTitle,
    marginTop,
    ...props
  }: SectionProps,
) {


  return (
    <Box
      {...props}
      component={"section"}
      margin={`${marginTop || "60px"} 10px 60px 10px`}
    >
      <Typography sx={{wordBreak: "break-word"}} variant={"h2"}>{sectionTitle}</Typography>
      <Box padding={"30px 10px"}>{children}</Box>
    </Box>
  );
}

export interface SectionProps extends OverrideProps<BoxTypeMap, any> {
  sectionTitle: string;
}
