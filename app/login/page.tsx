import {Main} from "../_unit/Main";
import {PageTitle} from "../_unit/PageTitle";
import {LoginForm} from "./LoginForm";
import {Suspense} from "react";

export default function Page(
  {}: {},
) {

  return <Main>
    <PageTitle pageTitle={"ログイン"}/>
    <Suspense>
      <LoginForm/>
    </Suspense>
  </Main>;
}