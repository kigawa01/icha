import {Main} from "../../_unit/Main";
import {CreateGachaForm} from "./CreateGachaForm";
import {RequireLogin} from "../../_unit/RedirectLogin";

export default function Page(
  {}: {},
) {
  return <Main>
    <RequireLogin/>
    <CreateGachaForm/>
  </Main>;
}