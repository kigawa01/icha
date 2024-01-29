import {HTMLAttributes, ReactHTML} from "react";
import {SerializedStyles} from "@emotion/react";

export interface BoxProps extends HTMLAttributes<any> {
  tag?: keyof ReactHTML | undefined;
}

export function Box(props: BoxProps) {
  const {
    tag,
    ...divProps
  } = props;
  const styles: SerializedStyles[] = [];

  const Tag = tag || "div";

  return <Tag
    css={[
      ...styles,
    ]}
    {...divProps}
  />;
}
