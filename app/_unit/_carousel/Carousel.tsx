"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ReactNode} from "react";
import {CarouselMain} from "./CarouselMain";
import {CarouselButton} from "./CarouselButton";
import {useStateObjectDef} from "../../util";

export function Carousel(
  {
    nodes,
    zindex,
    period,
    disabled,
    ...props
  }: CarouselProps,
) {
  const progressState = useStateObjectDef(0);
  const pageState = useStateObjectDef(1);

  function setNextPage() {
    pageState.setValue(pageState.value >= nodes.length ? 1 : pageState.value + 1);
  }

  const zIndexUse = zindex || 1;

  return (
    <Box
      {...props}
      display={"flex"}
      overflow={"hidden"}
    >

      <CarouselButton
        disabled={disabled} onClick={() => {
        pageState.setValue(pageState.value <= 1 ? nodes.length : pageState.value - 1);
        progressState.setValue(0);
      }} progressState={progressState} page={pageState.value} buttonPosition={"left"}
      />

      <CarouselMain
        flex={1} nodes={nodes} progressState={progressState} zIndex={zIndexUse}
        next={() => setNextPage()} period={period} page={pageState.value} minWidth={0}
      />

      <CarouselButton
        disabled={disabled} onClick={() => {
        setNextPage();
        progressState.setValue(0);
      }} progressState={progressState} page={pageState.value} buttonPosition={"right"}
      />

    </Box>
  );
}

export interface CarouselProps extends OverrideProps<BoxTypeMap, any> {
  nodes: ReactNode[];
  zindex?: number | undefined;
  period: number;
  disabled?: boolean;
}