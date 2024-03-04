"use client";
import {HTMLAttributes} from "react";
import {Main} from "./_unit/Main";
import {GachaCarousel} from "./GachaCarousel";
import {TextSection} from "./_unit/_section/TextSection";
import {Box} from "@mui/system";
import {useResponsive} from "./_hook/useMedia";

export interface PageProps extends HTMLAttributes<any> {
}

export default function Page() {
  const responsive = useResponsive({
    def: {pad: 50},
    smartphone: {pad: 10},
  });

  return <Main paddingX={"0"}>

    <GachaCarousel margin={"10px 0"} width={"100%"} maxHeight={"500px"} aspectRatio={"16 / 8"}/>
    <Box paddingX={`${responsive.pad}px`}>
      <TextSection
        sectionTitle={"Ichaとは？"}
        content={"Icha(あいちゃ)とは、ユーザーによって投稿された画像のガチャをプレイできるサービスです。"}
      />

      <TextSection
        sectionTitle={"ガチャを探す"}
        content={"画面上部にある検索バーより、キーワードを使ってガチャを検索することができます。"}
      />

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
