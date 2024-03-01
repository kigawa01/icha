import {OverrideProps} from "@mui/types";
import {Img} from "./_unit/Img";
import {Link, Typography} from "@mui/material";
import {GachaListRes} from "../api_clients";
import {LinkTypeMap} from "@mui/material/Link/Link";

export function GachaCarouselElement(
  {
    gachaListRes,
    ...props
  }: GachaCarouselElementProps,
) {


  return (
    <Link
      href={`/gacha/${gachaListRes.uid}`} position={"relative"} width={"100%"} height={"100%"} display={"block"}
      borderRadius={"5px"} overflow={"hidden"} {...props}
    >
      <Img
        margin={0} key={gachaListRes.uid} width={"100%"} height={"100%"} src={gachaListRes.thumbnail.base64}
        alt={gachaListRes.thumbnail.name} position={"absolute"} left={0} top={0}
      />
      <Typography
        variant={"h3"} position={"absolute"} left={"16px"} top={"7px"} bgcolor={"#666a"}
        textOverflow={"ellipsis"} overflow={"hidden"}
        maxWidth={"50%"} padding={"0 10px 2px 10px"} borderRadius={"5px"}
      >
        {gachaListRes.name}
      </Typography>
    </Link>
  );
}

export interface GachaCarouselElementProps extends OverrideProps<LinkTypeMap, any> {
  gachaListRes: GachaListRes;
}
