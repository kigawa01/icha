import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Carousel} from "./_unit/_carousel/Carousel";

export interface GachaCarouselProps extends OverrideProps<BoxTypeMap, any> {
}

export function GachaCarousel(
  {
    ...props
  }: GachaCarouselProps,
) {


  return (
    <Carousel period={10} {...props} nodes={[<Box>aa</Box>, <Box>b</Box>, <Box>c</Box>]}/>
  );
}