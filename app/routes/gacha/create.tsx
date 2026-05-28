import {Main} from "../../_unit/Main";
import {CreateGachaForm} from "../../gacha/create/CreateGachaForm";
import {RequireLogin} from "../../_unit/RedirectLogin";

export default function GachaCreatePage() {
  return <Main>
    <RequireLogin/>
    <CreateGachaForm/>
  </Main>;
}
