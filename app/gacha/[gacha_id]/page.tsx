"use client";
import {TextSection} from "../../_unit/_section/TextSection";
import {redirect, useRouter} from "next/navigation";
import {useFetch} from "../../_hook/useFetch";
import {Img} from "../../_unit/Img";
import {ErrorMessage} from "../../_unit/ErrorMessage";
import {Main} from "../../_unit/Main";
import {LicenceSection} from "./LicenceSection";
import {GachaContents} from "./GachaContents";
import {apiClient} from "../../_client/api";
import {useUserState} from "../../_manager/UserProvider";
import {redirectLoginRouter} from "../../_unit/RedirectLogin";
import {LoadableButton} from "../../_unit/_loading/LoadableButton";
import {useClientState} from "../../_manager/AuthApiProvider";
import {Box} from "@mui/system";
import {Button, Typography} from "@mui/material";

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

  return <Main>
    <Typography variant={"h2"} margin={"10px"}>{gacha?.name}</Typography>
    <Img
      src={gacha?.thumbnail.base64} alt={gacha?.thumbnail.name} width={"100%"} height={"500px"} borderRadius={"5px"}
      boxShadow={1} padding={"3px"}
    />
    <TextSection content={gacha?.name || ""} sectionTitle={gacha?.name || ""}/>
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Typography sx={{fontSize: "4.5rem"}}>&gt;&gt;</Typography>
      <LoadableButton
        loading={userState == undefined} variant={"contained"} onClick={() => {
        if (userState == undefined) return;
        if (userState.userRes == undefined) redirectLoginRouter(router, `/gacha/${uid}/run`);
        else router.push(`/gacha/${uid}/run`);
      }} disabled={userState == undefined} sx={{fontSize: "2rem", height: "fit-content", margin: "0 10px"}}
      >
        {userState?.userRes ? "ガチャを引く" : "ログインしてガチャを引く"}
      </LoadableButton>
      <Typography sx={{fontSize: "4.5rem"}}>&lt;&lt;</Typography>
    </Box>
    <LicenceSection licence={gacha?.licence}/>
    <GachaContents gachaId={gacha?.uid || 0} contents={gacha?.contents || []}/>
    <Box display={"flex"} justifyContent={"right"} margin={"30px 0 0 0"}>
      <Button variant={"contained"} onClick={_ => router.back()}>前に戻る</Button>
    </Box>
  </Main>;
}