import {HTMLAttributes} from "react";
import {Main} from "./_unit/Main";
import {GachaCarousel} from "./GachaCarousel";
import {TextSection} from "./_unit/_section/TextSection";
import {Box} from "@mui/system";

export interface PageProps extends HTMLAttributes<any> {
}

export default function Page() {
  return <Main paddingX={"0"}>

    <GachaCarousel margin={"10px 0"} width={"100%"} height={"500px"}/>
    <Box paddingX={"50px"}>
      <TextSection
        sectionTitle={"Ichaとは？"}
        content={"Icha(あいちゃ)とは、ユーザーによって投稿された画像のガチャをプレイできるサービスです。"}
      />

      {/*<TextSection*/}
      {/*  sectionTitle={"ガチャを探す"}*/}
      {/*  content={""}*/}
      {/*/>*/}

      <TextSection
        sectionTitle={"ガチャを引く"}
        content={"引きたいガチャの内容ページより、「ガチャを引く」ボタンから引くことができます"}
      />

      <TextSection
        sectionTitle={"ガチャを投稿する"}
        content={"投稿ページより、タイトル、サムネイル、説明、排出する画像、比率などを設定し、投稿することができます。"}
      />
    </Box>
  </Main>;
}
