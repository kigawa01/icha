import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {useEffect, useRef, useState} from "react";
import {Palette, useTheme} from "@mui/material/styles";
import {Typography} from "@mui/material";

export function TextareaFieldSet(
  {
    borderColor,
    sx,
    moved,
    focused,
    label,
    ...props
  }: TextareaLabelProps,
) {
  const theme = useTheme();
  const normalBorderColor = "rgba(0, 0, 0, 0.23)";
  const hoverBorderColor = "black";
  const focusPalettKey: keyof Palette = "secondary";
  const focusColor = theme.palette[focusPalettKey].main;
  const [borderColorState, setBorderColorState] = useState<string>(normalBorderColor);
  const labelRef = useRef<HTMLElement>();
  borderColor = borderColor || borderColorState;

  useEffect(() => {
    const element = labelRef.current;

    function onOut(ev: MouseEvent) {
      setBorderColorState(normalBorderColor);
    }

    function onHover(ev: MouseEvent) {
      console.debug("aaaa");
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
      margin={0} display={"block"} ref={labelRef} component={"fieldset"}
      borderColor={focused ? focusColor : borderColor} top={"-5px"}
      borderRadius={"4px"} overflow={"hidden"} boxSizing={"border-box"} padding={"0 8px"} {...props}
      sx={{
        pointerEvents: "none", borderStyle: "solid", cursor: "text", borderWidth: moved ? "2px" : "1px", ...sx,
      }}
    >
      <Box
        component={"legend"} width={moved ? "fit-content" : "0"} display={"block"} visibility={"hidden"}
        top={"0"} left={"0"} sx={{float: "unset"}} padding={0} height={"11px"}
      >
        <Typography component={"span"} zIndex={2} fontSize={"0.75em"} padding={"0 5px"}>{label}</Typography>
      </Box>
    </Box>
  );
}

export interface TextareaLabelProps extends OverrideProps<BoxTypeMap, any> {
  moved: boolean;
  focused: boolean;
  label: string | undefined;
}
