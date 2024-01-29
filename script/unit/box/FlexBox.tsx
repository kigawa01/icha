import {Property} from "csstype";
import {css, SerializedStyles} from "@emotion/react";
import {Box, BoxProps} from "./Box.tsx";


export interface FlexBoxProps extends BoxProps {
  justifyContent?: Property.JustifyContent | undefined;
  flexDirection?: Property.FlexDirection | undefined;
  alignItems?: Property.AlignItems | undefined;
}

export function FlexBox(props: FlexBoxProps) {
  const {
    justifyContent,
    flexDirection,
    alignItems,
    ...divProps
  } = props;
  const styles: SerializedStyles[] = [];
  if (flexDirection == "column") styles.push(css`
    & > * {
      max-width: 100%;
      min-height: 0;
    }
  `);
  else styles.push(css`
    & > * {
      max-height: 100%;
      min-width: 0;
    }
  `);

  return <Box
    css={[
      {
        justifyContent: justifyContent,
        flexDirection: flexDirection,
        display: "flex",
        alignItems: alignItems,
      },
      ...styles,
    ]}
    {...divProps}
  />;
}
