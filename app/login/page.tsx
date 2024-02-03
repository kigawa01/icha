import {PageTitle} from "../unit/PageTitle";
import {Main} from "../unit/Main";
import {LoginForm} from "./LoginForm";
import {api} from "../client/api";
import {AxiosError} from "axios";

export default function Page(
  {}: {},
) {

  return (
    <Main>
      <PageTitle pageTitle={"新規登録"}/>
      <LoginForm/>
    </Main>
  );
}
