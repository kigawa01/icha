import {PageTitle} from "../../_unit/PageTitle";
import {Main} from "../../_unit/Main";
import {UserCreateForm} from "./UserCreateForm";
import {api} from "../../_client/api";
import {AxiosError} from "axios";

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
