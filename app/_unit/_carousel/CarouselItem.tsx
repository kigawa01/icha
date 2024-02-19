import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ReactNode} from "react";

export function CarouselItem(
  {
    node,
    ...props
  }: CarouselItemProps,
) {


  return (
    <Box
      {...props}
      width={"100%"}
      flex={"none"}
      boxSizing={"border-box"}
      padding={"10px"}
    >
      {node}
    </Box>
  );
}

export interface CarouselItemProps extends OverrideProps<BoxTypeMap, any> {
  node: ReactNode;
}
