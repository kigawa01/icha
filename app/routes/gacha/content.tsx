import {Navigate, useNavigate, useParams} from "react-router";
import {Button, Typography} from "@mui/material";
import {TextSection} from "../../_unit/_section/TextSection";
import {Main} from "../../_unit/Main";
import {useClientState} from "../../_manager/AuthApiProvider";
import {redirectLogin} from "../../_unit/RedirectLogin";
import {useFetch} from "../../_hook/useFetch";
import {ErrorMessage} from "../../_unit/ErrorMessage";
import {LoadableButton} from "../../_unit/_loading/LoadableButton";
import {Box} from "@mui/system";
import {LoadableImg} from "../../_unit/_loading/LoadableImg";

export default function GachaContentPage() {
  const {gacha_id, content_id} = useParams<{gacha_id: string; content_id: string}>();
  const gachaId = parseInt(gacha_id || "NaN");
  if (isNaN(gachaId)) return <Navigate to="/notfound" replace/>;
  const contentId = parseInt(content_id || "NaN");
  if (isNaN(contentId)) return <Navigate to="/notfound" replace/>;
  const clientState = useClientState();
  const client = clientState?.client;
  if (clientState != undefined && client == undefined) return redirectLogin();
  const content = useFetch(
    client && (() => client.getContent(gachaId, contentId)), [client, gachaId, contentId],
  );
  const navigate = useNavigate();

  return <Main>
    <Typography variant={"h2"} margin={"10px 0"}>{content?.result?.title || "ロード中..."}</Typography>
    <ErrorMessage error={content?.error}/>
    <LoadableImg
      width={"100%"} aspectRatio={"16 / 9"} src={content?.result?.image.base64} alt={content?.result?.image.name}
      boxShadow={1} borderRadius={"5px"} margin={"30px 0"} loading={content == undefined}
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
        onClick={_ => navigate(`/gacha/${gachaId}`)} variant={"outlined"} sx={{color: "black"}}
      >ガチャトップへ</Button>
    </Box>
  </Main>;
}
