import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ProgressBar} from "./ProgressBar";
import {StateObject} from "../../util";
import {SectionBar} from "./SectionBar";

export function CarouselFooter(
  {
    progressState,
    next,
    period,
    page,
    pageSize,
    ...props
  }: CarouselFooterProps,
) {


  return (
    <Box
      {...props}
    >
      <SectionBar page={page} size={pageSize}/>
      <ProgressBar marginTop={"5px"}  progressState={progressState} period={period} next={next}/>
    </Box>
  );
}

export interface CarouselFooterProps extends OverrideProps<BoxTypeMap, any> {
  progressState: StateObject<number>;
  period: number;
  page: number;
  pageSize: number;

  next(): void;
}
