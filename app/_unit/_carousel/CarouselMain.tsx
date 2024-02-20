import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ReactNode} from "react";
import {CarouselItem} from "./CarouselItem";
import {CarouselFooter} from "./CarouselFooter";
import {StateObject} from "../../util";

export function CarouselMain(
  {
    nodes,
    page,
    next,
    progressState,
    period,
    ...props
  }: CarouselMainProps,
) {
  return (
    <Box
      {...props}
      display={"flex"}
      flexDirection={"column"}
    >

      <Box flex={"auto"} overflow={"visible"} minHeight={0}>
        <Box
          sx={{transform: `translate3d(${-100 * (page - 1)}%, 0, 0)`, transition: "transform 1s"}}
          height={"100%"} display={"flex"}
        >
          {nodes.map((value, index) => <CarouselItem node={value} key={index}/>)}
        </Box>
      </Box>
      <CarouselFooter
        progressState={progressState}
        flex={"none"}
        next={next}
        period={period}
        page={page}
        pageSize={nodes.length}
      />

    </Box>
  );
}

export interface CarouselMainProps extends OverrideProps<BoxTypeMap, any> {
  progressState: StateObject<number>;
  period: number;
  nodes: ReactNode[];
  page: number;


  next(): void;
}

