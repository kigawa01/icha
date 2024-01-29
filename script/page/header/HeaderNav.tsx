import {HTMLAttributes} from "react";
import {FlexBox} from "../../unit/box/FlexBox.tsx";
import {Link} from "react-router-dom";
import {Input} from "../../unit/Input.tsx";
import {css} from "@emotion/react";
import {useStyle} from "../../util/style/styleHook.tsx";

export interface HeaderNavProps extends HTMLAttributes<any> {
}

export function HeaderNav(props: HeaderNavProps) {
  const {...parentProps} = props;
const style = useStyle()

  return <FlexBox
    {...parentProps}
    tag={"nav"}
    css={css`
      align-items: center;
      padding: 0 20px;
      
      a {
        margin: 0 15px;
        font-weight: bold;
        font-size: ${style.fontSize2};
      }
      input {
        margin: 0 25px;
        flex: 1;
      }
    `}
  >
    <Link to={"/"}>トップ</Link>
    <Link to={"/"}>投稿</Link>
    <Input placeholder={"検索"} />
    <Link to={"/"}>ログイン</Link>
    <Link to={"/"}>新規登録</Link>
  </FlexBox>;
}