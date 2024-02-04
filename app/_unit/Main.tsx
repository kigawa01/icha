import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";

export interface MainProps extends OverrideProps<BoxTypeMap, any> {
}

export function Main(
  {
    ...props
  }: MainProps,
) {


  return (
    <Box
      {...props}
      component={"main"}
      padding={"30px 50px"}
      maxWidth={"1000px"}
      margin={"0 auto"}
      boxShadow={3}
      flex={1}
    />
  );
}