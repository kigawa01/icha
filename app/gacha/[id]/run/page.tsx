"use client";
import {Main} from "../../../_unit/Main";
import {Button, Typography} from "@mui/material";
import {redirect, useRouter} from "next/navigation";
import {redirectLogin, RequireLogin} from "../../../_unit/RedirectLogin";
import {useClientState} from "../../../_manager/AuthApiProvider";
import {LoadableButton} from "../../../_unit/LoadableButton";

export default function Page(
  {params}: { params: { id: string } },
) {
  const uid = parseInt(params.id);
  if (isNaN(uid)) redirect("/notfound");
  const router = useRouter();
  const clientState = useClientState();

  const client = clientState?.client;
  if (clientState != undefined && client == undefined) redirectLogin();
  return (
    <Main>
      <RequireLogin/>
      <Typography variant={"h2"}>ガチャ名</Typography>
      <LoadableButton loading={client == undefined} variant={"contained"}>
        {client == undefined ? "ロード中" : "ガチャを引く"}
      </LoadableButton>
      <Button variant={"outlined"} sx={{color: "text.primary"}} onClick={_ => {
        router.push("result");
      }}>Skip</Button>
    </Main>
  );
}

