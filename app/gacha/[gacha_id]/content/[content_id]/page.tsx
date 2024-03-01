"use client";
import {Button, Typography} from "@mui/material";
import {TextSection} from "../../../../_unit/_section/TextSection";
import {redirect, useRouter} from "next/navigation";
import {Main} from "../../../../_unit/Main";
import {useClientState} from "../../../../_manager/AuthApiProvider";
import {redirectLogin} from "../../../../_unit/RedirectLogin";
import {useFetch} from "../../../../_hook/useFetch";
import {ErrorMessage} from "../../../../_unit/ErrorMessage";
import {LoadableButton} from "../../../../_unit/_loading/LoadableButton";
import {Box} from "@mui/system";
import {LoadableImg} from "../../../../_unit/_loading/LoadableImg";

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
    <Typography variant={"h2"} margin={"10px 0"}>{content?.result?.title || "ロード中..."}</Typography>
    <ErrorMessage error={content?.error}/>
    <LoadableImg
      width={"100%"} height={"500px"} src={content?.result?.image.base64} alt={content?.result?.image.name}
      boxShadow={1} padding={"3px"} borderRadius={"5px"} margin={"30px 0"} loading={content == undefined}
      border={"1px solid grey"}
    />
    <TextSection content={content?.result?.description || "ロード中..."} sectionTitle={"説明"}/>
    <Box display={"flex"} justifyContent={"center"} margin={"50px 0"}>
      <LoadableButton
        download={content?.result?.image.name} loading={content == undefined} href={content?.result?.image.base64}
        fontSize={20}
      >ダウンロードする</LoadableButton>
    </Box>
    <Box display={"flex"} justifyContent={"right"}>
      <Button
        onClick={_ => router.push("../")} variant={"outlined"} sx={{color: "black"}}
      >ガチャトップへ</Button>
    </Box>
  </Main>;
}