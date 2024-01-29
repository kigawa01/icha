import {HTMLAttributes} from "react";
import {FlexBox} from "../../unit/box/FlexBox.tsx";
import {css} from "@emotion/react";
import {Outlet} from "react-router";
import {useStyle} from "../../util/style/styleHook.tsx";

export interface FooterPageProps extends HTMLAttributes<any> {
}

export function FooterPage(props: FooterPageProps) {
  const {...parentProps} = props;
  const style = useStyle();
  const labelStyle = css`
    width: 100px;
  `;
  return <FlexBox
    {...parentProps}
    flexDirection={"column"}
    css={css`
      flex: 1;
      justify-content: space-between;
      footer {
        width: 100%;
        border-top: 2px solid ${style.line};
        flex: none;
        padding: 20px 10px;
        div {
          margin: 0 auto;
          padding: 10px 0;
        }
      }
    `}
  >
    <Outlet/>
    <footer>

      <div css={css`
        width: 300px;
        span {
          margin: 0 5px;
        }
        p{
          margin: 5px 0 0 0;
        }
      `}>
        <h2>Icha</h2>
        <p><span css={labelStyle}>contact</span>:<span>contact@kigawa.net</span></p>
      </div>

      <div css={css`
        border-top: 2px solid ${style.line};
        width: 500px;
        text-align: center;
      `}>
        copyright &copy; 2024 kigawa. All right reserved.
      </div>

    </footer>

  </FlexBox>;
}