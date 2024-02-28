"use client";
import {Button, Typography} from "@mui/material";
import {TextSection} from "../../../../_unit/_section/TextSection";
import {redirect, useRouter} from "next/navigation";
import {Main} from "../../../../_unit/Main";
import {useClientState} from "../../../../_manager/AuthApiProvider";
import {redirectLogin} from "../../../../_unit/RedirectLogin";
import {useFetch} from "../../../../_hook/useFetch";
import {Img} from "../../../../_unit/Img";
import {ErrorMessage} from "../../../../_unit/ErrorMessage";
import {LoadableButton} from "../../../../_unit/_loading/LoadableButton";

export default function Page(
  {params}: { params: { gacha_id: string, content_id: string } },
) {
  const gachaId = parseInt(params.gacha_id);
  if (isNaN(gachaId)) redirect("/notfound");
  const contentId = parseInt(params.content_id);
  if (isNaN(contentId)) redirect("/notfound");
  const clientState = useClientState();
  const client = clientState?.client;
  if (clientState != undefined && client == undefined) redirectLogin();
  const content = useFetch(
    client && (() => client.getContent(gachaId, contentId)), [client, gachaId, contentId],
  );
  const router = useRouter();

  return <Main>
    <Typography variant={"h2"}>ガチャ結果</Typography>
    <ErrorMessage error={content?.error}/>
    <Typography variant={"h2"}>{content?.result?.title}</Typography>
    <Img width={"100%"} height={"300px"} src={content?.result?.image.base64} alt={content?.result?.image.name}/>
    <Typography variant={"h2"}>{content?.result?.title}</Typography>
    <TextSection content={content?.result?.description || ""} sectionTitle={"説明"}/>
    <LoadableButton
      download={content?.result?.image.name} loading={content == undefined} href={content?.result?.image.base64}
      fontSize={15}
    >ダウンロード</LoadableButton>
    <Button
      onClick={_ => router.push("../")} variant={"contained"}
    >ガチャトップへ</Button>
  </Main>;
}