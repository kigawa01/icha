import {HTMLAttributes} from "react";
import {Main} from "./_unit/Main";
import {GachaCarousel} from "./GachaCarousel";
import {TextSection} from "./_unit/_section/TextSection";

export interface PageProps extends HTMLAttributes<any> {
}

export default function Page() {
  return <Main>

    <GachaCarousel width={"100%"} height={"500px"}/>

    <TextSection
      sectionTitle={"Ichaとは？"}
      content={""}
    />

    <TextSection
      sectionTitle={"ガチャを探す"}
      content={""}
    />

    <TextSection
      sectionTitle={"ガチャを引く"}
      content={""}
    />

    <TextSection
      sectionTitle={"ガチャを投稿する"}
      content={""}
    />

  </Main>;
}
