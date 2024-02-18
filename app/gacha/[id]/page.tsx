"use client";
import {TextSection} from "../../_unit/_section/TextSection";
import {Button} from "@mui/material";
import {redirect} from "next/navigation";
import {useFetch} from "../../_hook/useFetch";
import {useAuthClient} from "../../_manager/AuthApiProvider";
import {Img} from "../../_unit/Img";
import {ErrorMessage} from "../../_unit/ErrorMessage";
import {Main} from "../../_unit/Main";
import {LicenceSection} from "./LicenceSection";
import {GachaContents} from "./GachaContents";

export default function Page(
  {params}: { params: { id: string } },
) {
  const uid = parseInt(params.id);
  if (isNaN(uid)) redirect("/notfound");
  const clientState = useAuthClient();
  const client = clientState?.client;
  const gachaRes = useFetch(
    client && (() => client.getGacha(uid)),
    [client, uid],
  );
  if (clientState == undefined) return undefined;
  if (client == undefined) redirect("/login");
  if (gachaRes == undefined) return undefined;

  if (gachaRes.error != undefined) return <ErrorMessage error={gachaRes.error || "Error"}/>;
  const gacha = gachaRes.result;

  return <Main>
    <Img src={gacha.thumbnail.base64} alt={gacha.thumbnail.name} width={"100%"}/>
    <TextSection content={gacha.name} sectionTitle={"説明"}/>
    <Button variant={"contained"}>ガチャを引く</Button>
    <LicenceSection licence={gacha.licence}/>
    <GachaContents contents={gacha.contents}/>
  </Main>;
}