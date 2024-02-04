import {Typography} from "@mui/material";
import {OverrideProps} from "@mui/types";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {Box} from "@mui/system";

export interface PageTitleProps extends OverrideProps<BoxTypeMap, any> {
  pageTitle: string;
}

export function PageTitle(props: PageTitleProps) {
  const {
    pageTitle,
    children,
    ...parentProps
  } = props;
  return (
    <Box
      {...parentProps}
      margin={"15px 0"}
    >
      <Typography variant={"h2"}>{pageTitle}</Typography>
      {children}
    </Box>
  );
}