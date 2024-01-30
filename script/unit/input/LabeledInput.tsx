import {FlexBox} from "../box/FlexBox.tsx";
import {Input, InputProps} from "./Input.tsx";
import {css} from "@emotion/react";

export interface LabeledInputProps extends InputProps {
  label: string;
}

export function LabeledInput(props: LabeledInputProps) {
  const {
    label,
    ...parentProps
  } = props;
  return <FlexBox
    {...parentProps}
    tag={"label"}
    css={css`
      span {
        width: 200px;
      }
    ;
    `}
  >
    <span>{label}</span>
    <Input {...parentProps}/>
  </FlexBox>;
}