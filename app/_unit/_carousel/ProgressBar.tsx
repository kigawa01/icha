import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {useEffect} from "react";
import {StateObject} from "../../util";

export function ProgressBar(
  {
    progressState,
    next,
    period,
    ...props
  }: ProgressBarProps,
) {

  useEffect(function () {
    const id = setTimeout(function () {
      if (progressState.value >= period * 40) {
        progressState.setValue(0);
        next();
        return;
      }
      progressState.setValue(progressState.value + 1);
    }, 25);
    return function () {
      clearTimeout(id);
    };
  }, [progressState]);


  return (
    <Box
      {...props}
    >
      <Box
        bgcolor={"grey"} sx={{opacity: "50%", transition: "all 25ms"}} borderRadius={"2px"} height={"3px"}
        width={`${progressState.value / (period * 40) * 100}%`}
      />
    </Box>
  );
}

export interface ProgressBarProps extends OverrideProps<BoxTypeMap, any> {
  progressState: StateObject<number>;
  period: number;

  next(): void;
}
