import {HTMLAttributes} from "react";
import {css} from "@emotion/react";
import {PageTitle} from "../../unit/PageTitle.tsx";
import {Main} from "../../unit/Main.tsx";

export interface CreateUserPageProps extends HTMLAttributes<any> {
}

export function CreateUserPage(props: CreateUserPageProps) {
  const {
    ...parentProps
  } = props;
  return <Main
    {...parentProps}
    css={css`
      flex: 1;
    `}
  >
    <PageTitle pageTitle={"新規登録"}/>

  </Main>;
}