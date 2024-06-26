"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {GachaContentRes} from "../../../api_clients";
import {Img} from "../../_unit/Img";
import {Button, Typography} from "@mui/material";
import {LabeledText} from "../../_unit/_labeled/LabeledText";
import {useUserState} from "../../_manager/UserProvider";
import {useResponsive} from "../../_hook/useMedia";
import {Property} from "csstype";


export function GachaContent(
  {
    content,
    gachaId,
    rateSum,
    ...props
  }: GachaContentProps,
) {
  const userState = useUserState();
  const user = userState?.userRes;

  const probability = rateSum == 0 ? 0 : Math.floor((content.rate / rateSum) * 100);

  const responsive = useResponsive<{
    flexDirection: Property.FlexDirection, imgWidth: string
  }>({
    def: {flexDirection: "row", imgWidth: "300px"},
    tablet: {flexDirection: "column", imgWidth: "100%"},
  });

  return (
    <Box
      {...props} display={"flex"} flexDirection={responsive.flexDirection}
    >
      <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} flex={"none"}>
        <Img
          width={responsive.imgWidth} aspectRatio={"16 / 9"} boxShadow={1} borderRadius={"5px"} src={content.image.base64}
          alt={content.image.name} flex={"none"} marginBottom={"15px"} border={"1px solid grey"}
        />
        {
          (content.pulled || content.postUserId == user?.uid) &&
          <Button sx={{flex: "none"}} href={`${gachaId}/content/${content.uid}`} variant={"contained"}>
            詳細
          </Button>
        }
      </Box>
      <Box marginLeft={"20px"} marginTop={"20px"}>
        <Typography variant={"h3"}>{content.title}</Typography>
        <Typography margin={"15px 5px"}>{content.description}</Typography>
        <LabeledText margin={"8px"} label={"確率"} text={`約${probability}%`}/>
        <LabeledText margin={"8px"} text={content.pulled ? "はい" : "いいえ"} label={"取得済み"}/>
      </Box>
    </Box>
  );
}

export interface GachaContentProps extends OverrideProps<BoxTypeMap, any> {
  content: GachaContentRes;
  gachaId: number;
  rateSum: number;
}
