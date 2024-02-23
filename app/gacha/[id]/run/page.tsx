"use client";
import {Main} from "../../../_unit/Main";
import {Typography} from "@mui/material";
import {redirect, useRouter} from "next/navigation";
import {redirectLogin, RequireLogin} from "../../../_unit/RedirectLogin";
import {useClientState} from "../../../_manager/AuthApiProvider";
import {LoadableButton} from "../../../_unit/LoadableButton";
import {useState} from "react";
import {PullGachaRes} from "../../../../api_clients";
import {ErrorMessage} from "../../../_unit/ErrorMessage";

export default function Page(
  {params}: { params: { id: string } },
) {
  const uid = parseInt(params.id);
  if (isNaN(uid)) redirect("/notfound");
  const router = useRouter();
  const clientState = useClientState();
  const [result, setResult] = useState<PullGachaRes>();
  const [err, setErr] = useState<string>();

  const client = clientState?.client;
  if (clientState != undefined && client == undefined) redirectLogin();
  return (
    <Main>
      <RequireLogin/>
      <Typography variant={"h2"}>ガチャ名</Typography>
      <ErrorMessage error={err}/>
      <LoadableButton loading={client == undefined} variant={"contained"} onClick={_ => {
        client?.pullGacha(uid).then(value => {
          if (value.value) {
            setResult(value.value);
            router.push("result")
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
      }}>
        {client == undefined ? "ロード中" : "ガチャを引く"}
      </LoadableButton>
      <LoadableButton
        loading={result == undefined} variant={"outlined"} sx={{color: "text.primary"}}
        onClick={_ => router.push("result")} loadingLabel={"Skip"}
      >Skip</LoadableButton>
    </Main>
  );
}

