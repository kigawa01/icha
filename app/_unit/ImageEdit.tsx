import {Box} from "@mui/system";
import {ChangeEvent, useState} from "react";
import {Input} from "@mui/material";
import {Img} from "./Img";
import {InputProps} from "@mui/material/Input/Input";

export function ImageEdit(
  {
    color,
    textLabel,
    accept,
    ...props
  }: GachaTopImageEditProps,
) {
  const [imgUrl, setImgUrl] = useState("");

  return (
    <Box
      component={"label"}
    >
      <Img
        src={imgUrl}
        alt={"サムネイル"}
        width={"100%"}
      />
      <Input
        {...props}
        type={"file"}
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

export interface GachaTopImageEditProps extends InputProps {
  textLabel: string;
  accept?: string | undefined;
}
