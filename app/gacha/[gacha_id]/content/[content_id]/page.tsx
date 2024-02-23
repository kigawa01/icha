import {GachaTopImage} from "../../../GachaTopImage";
import {Button, Typography} from "@mui/material";
import {TextSection} from "../../../../_unit/_section/TextSection";
import {redirect} from "next/navigation";
import {Main} from "../../../../_unit/Main";

export default function Page(
  {params}: { params: { gacha_id: string } },
) {
  const uid = parseInt(params.gacha_id);
  if (isNaN(uid)) redirect("/notfound");

  return <Main>
    <Typography variant={"h2"}>ガチャ結果</Typography>
    <GachaTopImage/>
    <TextSection content={"ガチャ名"} sectionTitle={"説明"}/>
    <Button variant={"contained"}>もう一度引く</Button>
  </Main>;
}