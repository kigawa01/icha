import {Main} from "../_unit/Main";
import {PageTitle} from "../_unit/PageTitle";
import {LoginForm} from "./LoginForm";

export default function Page(
  {}: {},
) {

  return <Main>
    <PageTitle pageTitle={"ログイン"}/>
    <LoginForm/>
  </Main>;
}