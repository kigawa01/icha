"use client";
import {Main} from "../../../_unit/Main";
import {Button, Typography} from "@mui/material";
import {redirect, useRouter} from "next/navigation";
import {RequireLogin} from "../../../_unit/RedirectLogin";

export default function Page(
  {params}: { params: { id: string } },
) {
  const uid = parseInt(params.id);
  if (isNaN(uid)) redirect("/notfound");
  const router = useRouter();

  return (
    <Main>
      <RequireLogin/>
      <Typography variant={"h2"}>ガチャ名</Typography>
      <Button variant={"contained"}>止める</Button>
      <Button variant={"outlined"} sx={{color: "text.primary"}} onClick={_ => {
        router.push("result");
      }}>Skip</Button>
    </Main>
  );
}

