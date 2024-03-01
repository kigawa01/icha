import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {useEffect, useRef, useState} from "react";

export function TextareaLabel(
  {
    borderColor,
    sx,
    ...props
  }: TextareaLabelProps,
) {
  const defaultBorderColor = borderColor || "rgba(0, 0, 0, 0.23)";
  const hoverBorderColor = "black";
  const [borderColorState, setBorderColorState] = useState<string>(defaultBorderColor);
  const labelRef = useRef<HTMLElement>();

  useEffect(() => {
    const element = labelRef.current;

    function onOut(ev: MouseEvent) {
      setBorderColorState(defaultBorderColor);
    }

    function onHover(ev: MouseEvent) {
      console.debug("aaaa")
      setBorderColorState(hoverBorderColor);
    }

    element?.addEventListener("mouseout", onOut);
    element?.addEventListener("mouseover", onHover);
    return () => {
      element?.removeEventListener("mouseout", onOut);
      element?.removeEventListener("mouseover", onHover);

    };
  }, [labelRef.current]);
  return (
    <Box
      margin={"5px 0 10px 0"} component={"label"} display={"block"} ref={labelRef} borderColor={borderColorState}
      borderRadius={"4px"} overflow={"hidden"} boxSizing={"border-box"} padding={"0"} {...props}
      sx={{borderStyle: "solid", borderWidth: "1px", ...sx}}
    />
  );
}

export interface TextareaLabelProps extends OverrideProps<BoxTypeMap, any> {
  borderColor?: string | undefined;
}
