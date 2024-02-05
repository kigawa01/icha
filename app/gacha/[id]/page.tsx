import {Box} from "@mui/system";
import {GachaTopImage} from "../GachaTopImage";
import {TextSection} from "../../_unit/_section/TextSection";
import {Button} from "@mui/material";
import {Section} from "../../_unit/_section/Section";

export default function Page(
  {}: {},
) {


  return <Box>
    <GachaTopImage/>
    <TextSection content={"ガチャ名"} sectionTitle={"説明"}/>
    <Button>ガチャを引く</Button>
    <TextSection content={"ライセンス"} sectionTitle={"本文"}/>
    <Section sectionTitle={"内容"}></Section>
  </Box>;
}