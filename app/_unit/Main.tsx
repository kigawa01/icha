import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";

export interface MainProps extends OverrideProps<BoxTypeMap, any> {
}

export function Main(
  {
    paddingX,
    ...props
  }: MainProps,
) {


  return (
    <Box
      {...props}
      component={"main"}
      padding={`30px ${paddingX || "50px"} 250px ${paddingX || "50px"}`}
      maxWidth={"1000px"}
      margin={"auto"}
      boxShadow={3}
      flex={1}
      width={"97%"}
    />
  );
}