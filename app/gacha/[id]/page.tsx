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
import {LoadableButton} from "../../_unit/LoadableButton";

export default function Page(
  {params}: { params: { id: string } },
) {
  const uid = parseInt(params.id);
  if (isNaN(uid)) redirect("/notfound");
  const userState = useUserState();
  const gachaRes = useFetch((() => apiClient.getGacha(uid)), [uid]);
  const router = useRouter();

  if (gachaRes && gachaRes.error != undefined) return <ErrorMessage error={gachaRes.error || "Error"}/>;
  const gacha = gachaRes?.result;

  return <Main>
    <Img src={gacha?.thumbnail.base64} alt={gacha?.thumbnail.name} width={"100%"}/>
    <TextSection content={gacha?.name || ""} sectionTitle={"説明"}/>
    <LoadableButton loading={userState == undefined} variant={"contained"} onClick={() => {
      if (userState == undefined) return;
      if (userState.userRes == undefined) redirectLoginRouter(router, `/gacha/${uid}/run`);
      else router.push(`/gacha/${uid}/run`);
    }} disabled={userState == undefined}
    >
      {userState?.userRes ? "ガチャを引く" : "ログインしてガチャを引く"}
    </LoadableButton>
    <LicenceSection licence={gacha?.licence}/>
    <GachaContents contents={gacha?.contents || []}/>
  </Main>;
}