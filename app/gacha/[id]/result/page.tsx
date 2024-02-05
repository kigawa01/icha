import {Box} from "@mui/system";
import {GachaTopImage} from "../../GachaTopImage";
import {Button, Typography} from "@mui/material";
import {TextSection} from "../../../_unit/_section/TextSection";

export default function Page(
  {}: {},
) {


  return <Box>
    <Typography variant={"h2"}>ガチャ結果</Typography>
    <GachaTopImage/>
    <TextSection content={"ガチャ名"} sectionTitle={"説明"}/>
    <Button>もう一度引く</Button>
  </Box>;
}