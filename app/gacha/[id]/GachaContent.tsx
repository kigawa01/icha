import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {GachaContentRes} from "../../../api_clients";
import {Img} from "../../_unit/Img";
import {Typography} from "@mui/material";
import {LabeledText} from "../../_unit/_labeled/LabeledText";

export function GachaContent(
  {
    content,
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
    </Box>
  );
}

export interface GachaContentProps extends OverrideProps<BoxTypeMap, any> {
  content: GachaContentRes;
}
