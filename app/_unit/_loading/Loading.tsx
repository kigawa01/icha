import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {CircularProgress} from "@mui/material";

export function Loading(
  {
    fontSize,
    ...props
  }: LoadingProps,
) {
  fontSize = fontSize || 20;

  return (
    <Box
      {...props}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={fontSize}
    >
      <CircularProgress color={"secondary"} size={fontSize} sx={{marginRight: "10px"}}/> ロード中
    </Box>
  );
}

export interface LoadingProps extends OverrideProps<BoxTypeMap, any> {
  fontSize?: number;
}
