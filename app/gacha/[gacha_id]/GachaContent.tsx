import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {GachaContentRes} from "../../../api_clients";
import {Img} from "../../_unit/Img";
import {Button, Typography} from "@mui/material";
import {LabeledText} from "../../_unit/_labeled/LabeledText";

export function GachaContent(
  {
    content,
    gachaId,
    ...props
  }: GachaContentProps,
) {


  return (
    <Box
      {...props}
    >
      <Img src={content.image.base64} alt={content.image.name}/>
      <Typography variant={"h3"}>{content.title}</Typography>
      <Typography>{content.description}</Typography>
      <LabeledText label={"確率"} text={`${content.rate}%`}/>
      <LabeledText text={content.available ? "はい" : "いいえ"} label={"取得済み"}/>
      {content.available && <Button href={`${gachaId}/content/${content.uid}`} variant={"contained"}>詳細</Button>}
    </Box>
  );
}

export interface GachaContentProps extends OverrideProps<BoxTypeMap, any> {
  content: GachaContentRes;
  gachaId: number;
}
