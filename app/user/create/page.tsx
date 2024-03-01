import {PageTitle} from "../../_unit/PageTitle";
import {Main} from "../../_unit/Main";
import {UserCreateForm} from "../UserCreateForm";

export default function Page(
  {}: {},
) {

  return (
    <Main>
      <PageTitle pageTitle={"新規登録"}/>
      <UserCreateForm/>
    </Main>
  );
}
