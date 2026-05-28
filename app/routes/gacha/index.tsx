import {Main} from "../../_unit/Main";
import {GachaListSection} from "../../gacha/GachaListSection";
import {Suspense} from "react";

export default function GachaPage() {
  return <Main>
    <Suspense>
      <GachaListSection/>
    </Suspense>
  </Main>;
}
