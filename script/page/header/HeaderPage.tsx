import {HTMLAttributes} from "react";
import {FlexBox} from "../../unit/box/FlexBox.tsx";
import {css} from "@emotion/react";
import {useStyle} from "../../util/style/styleHook.tsx";
import {Outlet} from "react-router";
import {HeaderNav} from "./HeaderNav.tsx";

export interface HeaderPageProps extends HTMLAttributes<any> {
}

export function HeaderPage(props: HeaderPageProps) {
  const {...parentProps} = props;
  const style = useStyle();
  return <FlexBox
    flexDirection={"column"}
    css={css`
      min-height: 100vh;
    `}
  >

    <FlexBox
      tag={"header"}
      {...parentProps}
      css={css`
        border-bottom: 2px solid ${style.line};
        padding: 5px 20px;
        
        h1{
          font-size: ${style.hFontSize2};
        }
        nav{
          flex: 1;
        }
      `}
    >

      <h1>Icha</h1>

      <HeaderNav/>

    </FlexBox>

    <Outlet/>

  </FlexBox>;
}