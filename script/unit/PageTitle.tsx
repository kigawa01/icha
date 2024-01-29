import {HTMLAttributes} from "react";
import {FlexBox} from "./box/FlexBox.tsx";
import {css} from "@emotion/react";
import {useStyle} from "../util/style/styleHook.tsx";

export interface PageTitleProps extends HTMLAttributes<any> {
  pageTitle: string;
}

export function PageTitle(props: PageTitleProps) {
  const {
    pageTitle,
    children,
    ...parentProps
  } = props;
  const style = useStyle()
  return <FlexBox
    {...parentProps}
    css={css`
      font-size: ${style.hFontSize1};
    `}
  >
    <h2>{pageTitle}</h2>
    {children}
  </FlexBox>;
}