import {HTMLAttributes} from "react";
import {FlexBox} from "./box/FlexBox.tsx";
import {Property} from "csstype";
import {css} from "@emotion/react";
import {useStyle} from "../util/style/styleHook.tsx";

export interface MainProps extends HTMLAttributes<any> {
  flexDirection?: Property.FlexDirection | undefined;
}

export function Main(props: MainProps) {
  const {
    flexDirection,
    ...parentProps
  } = props;
  const style = useStyle();
  return <FlexBox
    {...parentProps}
    flexDirection={flexDirection || "column"}
    tag={"main"}
    css={css`
      max-width: 900px;
      width: 99%;
      border-left: 2px solid ${style.line};
      border-right: 2px solid ${style.line};
      margin: 0 auto;
      padding: 50px 60px;
    `}
  />;
}