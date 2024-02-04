import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";

export interface GachaCarouselProps extends OverrideProps<BoxTypeMap, any> {
}

export function GachaCarousel(
  {
    ...props
  }: GachaCarouselProps,
) {


  return (
    <Box
      {...props}
    >
    </Box>
  );
}