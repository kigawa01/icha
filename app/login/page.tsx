import {PageTitle} from "../unit/PageTitle";
import {Main} from "../unit/Main";
import {LoginForm} from "./LoginForm";

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