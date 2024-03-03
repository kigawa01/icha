"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Img} from "../_unit/Img";
import {GachaListRes} from "../../api_clients";
import {Typography} from "@mui/material";
import {useRouter} from "next/navigation";

export function GachaListItem(
  {
    gachaListRes,
    ...props
  }: GachaListItemProps,
) {

  const router = useRouter();
  return (
    <Box
      {...props} boxSizing={"border-box"} padding={"10px 8px"}

    >
      <Box
        borderRadius={"5px"} border={"1px solid grey"} boxShadow={1} sx={{cursor: "pointer"}}
        onClick={_ => router.push(`/gacha/${gachaListRes.uid}`)}
      >
        <Img
          margin={"0"} src={gachaListRes.thumbnail.base64} alt={gachaListRes.thumbnail.name}
          width={"100&"} sx={{aspectRatio: "16 / 9"}} borderRadius={"5px"}
        />
        <Typography variant={"h3"} textOverflow={"ellipsis"} overflow={"hidden"} margin={"5px 15px"}>
          {gachaListRes.name}
        </Typography>
        <Typography textOverflow={"ellipsis"} overflow={"hidden"} margin={"5px 18px"}>
          {gachaListRes.description}
        </Typography>
        <Typography textOverflow={"ellipsis"} overflow={"hidden"} margin={"10px 20px"} textAlign={"right"}>
          {gachaListRes.creator.name}
        </Typography>

      </Box>
    </Box>
  );
}

export interface GachaListItemProps extends OverrideProps<BoxTypeMap, any> {
  gachaListRes: GachaListRes;
}
