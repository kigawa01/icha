"use client";
import {TextSection} from "../../_unit/_section/TextSection";
import {redirect, useRouter} from "next/navigation";
import {useFetch} from "../../_hook/useFetch";
import {ErrorMessage} from "../../_unit/ErrorMessage";
import {Main} from "../../_unit/Main";
import {LicenceSection} from "./LicenceSection";
import {GachaContents} from "./GachaContents";
import {apiClient} from "../../_client/api";
import {useUserState} from "../../_manager/UserProvider";
import {useClientState} from "../../_manager/AuthApiProvider";
import {Box} from "@mui/system";
import {Button, Typography} from "@mui/material";
import {LoadableImg} from "../../_unit/_loading/LoadableImg";
import {BigButton} from "../../_unit/BigButton";
import {redirectLoginRouter} from "../../_unit/RedirectLogin";

export default function Page(
  {params}: { params: { gacha_id: string } },
) {
  const uid = parseInt(params.gacha_id);
  if (isNaN(uid)) redirect("/notfound");
  const userState = useUserState();
  const clientState = useClientState();
  const client = clientState?.client;
  const gachaRes = useFetch(
    clientState && (() => (client || apiClient).getGacha(uid)), [uid, clientState],
  );
  const router = useRouter();

  if (gachaRes && gachaRes.error != undefined) return <ErrorMessage error={gachaRes.error || "Error"}/>;
  const gacha = gachaRes?.result;
  let rateSum = 0;
  if (gacha == undefined) rateSum = -1;
  else gacha.contents.filter(value => !value.pulled)
    .forEach(value => rateSum += value.rate);


  return <Main>

    <Typography variant={"h2"} margin={"10px"}
                sx={{wordBreak: "break-word"}}>{gacha?.name || "ロード中..."}</Typography>
    <LoadableImg
      src={gacha?.thumbnail.base64} alt={gacha?.thumbnail.name} width={"100%"} maxHeight={"500px"} borderRadius={"5px"}
      boxShadow={1} loading={gachaRes == undefined} fontSize={50} margin={"30px 0"}
      aspectRatio={"16 / 9"} border={"1px solid grey"}
    />
    <TextSection
      content={gacha?.name || "ロード中..."}
      sectionTitle={gacha?.name || "ロード中..."}
    />
    <BigButton
      loading={userState == undefined} disabled={userState == undefined || rateSum == 0}
      onClick={() => {
        if (userState == undefined) return;
        if (userState.userRes == undefined) redirectLoginRouter(router, `/gacha/${uid}/run`);
        else router.push(`/gacha/${uid}/run`);
      }}
    >
      {userState?.userRes ? "ガチャを引く" : "ログインしてガチャを引く"}
    </BigButton>
    {rateSum == 0 && <Typography
      margin={"0 0 70px 0"} textAlign={"center"} variant={"h2"} display={"block"}
    >ガチャガチャをコンプリートしました！！</Typography>}
    <LicenceSection licence={gacha?.licence}/>
    <GachaContents rateSum={rateSum} gachaId={gacha?.uid || 0} contents={gacha?.contents || []}/>
    <Box display={"flex"} justifyContent={"right"} margin={"50px 0 0 0"}>
      <Button
        variant={"outlined"} onClick={_ => router.back()}
        sx={{color: "black"}}
      >前に戻る</Button>
    </Box>
  </Main>;
}