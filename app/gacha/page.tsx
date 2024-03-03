"use client";
import {Main} from "../_unit/Main";
import {GachaListSection} from "./GachaListSection";
import {Suspense} from "react";

export default function Page(
  {}: {},
) {
  return <Main>
    <Suspense>
      <GachaListSection/>
    </Suspense>
  </Main>;
}