"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {useResponsive} from "../_hook/useMedia";

export interface MainProps extends OverrideProps<BoxTypeMap, any> {
}

export function Main(
  {
    component,
    paddingX,
    ...props
  }: MainProps,
) {

  const responsive = useResponsive({
    def: {pad: 50},
    smartphone: {pad: 10},
  });

  return (
    <Box
      {...props}
      component={component || "main"}
      padding={`60px ${paddingX || `${responsive.pad}px`} 300px ${paddingX || `${responsive.pad}px`}`}
      maxWidth={"1300px"}
      margin={"auto"}
      boxShadow={3}
      flex={1}
      width={"97%"}
      boxSizing={"border-box"}
    />
  );
}