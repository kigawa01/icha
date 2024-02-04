import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";

export function ImageEdit(
  {
    ...props
  }: GachaTopImageEditProps,
) {


  return (
    <Box
      {...props}
    >
    </Box>
  );
}

export interface GachaTopImageEditProps extends OverrideProps<BoxTypeMap, any> {
}
