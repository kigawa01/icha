"use client";
import {Main} from "../../../_unit/Main";
import {Button, Typography} from "@mui/material";
import {redirect, useRouter} from "next/navigation";
import {redirectLogin, RequireLogin} from "../../../_unit/RedirectLogin";
import {useClientState} from "../../../_manager/AuthApiProvider";
import {LoadableButton} from "../../../_unit/_loading/LoadableButton";
import {useState} from "react";
import {PullGachaRes} from "../../../../api_clients";
import {ErrorMessage} from "../../../_unit/ErrorMessage";
import {useFetch} from "../../../_hook/useFetch";
import {Box} from "@mui/system";

export default function Page(
  {params}: { params: { gacha_id: string } },
) {
  const uid = parseInt(params.gacha_id);
  if (isNaN(uid)) redirect("/notfound");
  const router = useRouter();
  const clientState = useClientState();
  const [result, setResult] = useState<PullGachaRes>();
  const [err, setErr] = useState<string>();

  const client = clientState?.client;
  if (clientState != undefined && client == undefined) redirectLogin();
  const gacha = useFetch(
    client && (() => client.getGacha(uid)),
    [client, uid],
  );

  return (
    <Main>
      <RequireLogin/>
      <Typography variant={"h2"}>{gacha?.result?.name || "ロード中..."}</Typography>
      <ErrorMessage error={err}/>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Typography sx={{fontSize: "4.5rem"}}>&gt;&gt;</Typography>
        <LoadableButton
          loading={client == undefined} variant={"contained"}
          onClick={_ => {
            client?.pullGacha(uid).then(value => {
              if (value.value) {
                setResult(value.value);
                const contentId = value.value.contentId;
                router.push(`content/${contentId}`);
                return;
              }
              if (value.error) {
                setErr(value.error.message);
                return;
              }
              setErr("undefined result");
            }).catch(reason => {
              if (reason instanceof Error && reason.message) {
                setErr(reason.message);
                return;
              }
              setErr(reason.toString());
            });
          }} fontSize={30} sx={{height: "fit-content", margin: "0 10px"}}
        >
          {client == undefined ? "ロード中" : "ガチャを引く"}
        </LoadableButton>
        <Typography sx={{fontSize: "4.5rem"}}>&lt;&lt;</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"right"}>
        <Button
          sx={{color: "black",margin: "0 10px"}} variant={"outlined"}
          onClick={_=>router.push("./")}
        >
          ガチャトップへ戻る
        </Button>
        <LoadableButton
          loading={result == undefined} variant={"outlined"} sx={{color: "text.primary"}}
          onClick={_ => {
            if (result == undefined) return;
            const contentId = result.contentId;
            router.push(`content/${contentId}`);
          }} loadingLabel={"Skip"}
        >Skip</LoadableButton>
      </Box>
    </Main>
  );
}

