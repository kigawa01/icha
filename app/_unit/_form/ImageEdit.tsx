import {Box} from "@mui/system";
import {ChangeEvent, useState} from "react";
import {Input} from "@mui/material";
import {Img} from "../Img";
import {OverridableStringUnion, OverrideProps} from "@mui/types";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {InputBasePropsColorOverrides} from "@mui/material/InputBase/InputBase";
import {udevFont} from "../../Theme";

export function ImageEdit(
  {
    color,
    textLabel,
    name,
    accept,
    ...props
  }: GachaTopImageEditProps,
) {
  const [imgUrl, setImgUrl] = useState("");

  return (
    <Box
      sx={{cursor: "pointer"}} component={"label"} display={"flex"} flexDirection={"column"}{...props}
      margin={"15px 0"}
    >
      <Img
        boxShadow={1} borderRadius={"5px"} border={"1px solid grey"} src={imgUrl} alt={textLabel} width={"100%"}
        flex={1} fontSize={"2rem"} fontFamily={udevFont.style.fontFamily}
      />
      <Input
        type={"file"} sx={{margin: "5px 10px"}} name={name}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const url = event.currentTarget.files && event.currentTarget.files.length != 0
            ? event.currentTarget.files[0] : undefined;
          setImgUrl(url ? URL.createObjectURL(url) : "");
        }}
        color={color || "secondary"}
        inputProps={{accept: accept || "image/*"}}
      />
    </Box>
  );
}

export interface GachaTopImageEditProps extends OverrideProps<BoxTypeMap, any> {
  textLabel: string;
  accept?: string | undefined;
  color?: OverridableStringUnion<
    "primary" | "secondary" | "error" | "info" | "success" | "warning",
    InputBasePropsColorOverrides
  >;
  name: string
}
