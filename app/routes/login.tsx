import {Main} from "../_unit/Main";
import {PageTitle} from "../_unit/PageTitle";
import {LoginForm} from "../login/LoginForm";
import {Suspense} from "react";

export default function LoginPage() {
  return <Main>
    <PageTitle pageTitle={"ログイン"}/>
    <Suspense>
      <LoginForm/>
    </Suspense>
  </Main>;
}
