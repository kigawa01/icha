import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ImageEdit} from "../../_unit/_form/ImageEdit";
import {TextInput} from "../../_unit/_form/TextInput";
import {Box} from "@mui/system";
import {Textarea} from "../../_unit/_form/_textarea/Textarea";
import {Button} from "@mui/material";

export function ContentFormUnit(
  {
    index,
    remove,
    ...props
  }: ContentFormUnitProps,
) {


  return (
    <Box {...props} display={"flex"}>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
        <ImageEdit
          flex={"none"} textLabel={"画像"} name={`content-thumbnail-${index}`} width={"300px"} height={"200px"}
        />
        <Button onClick={_ => remove()} variant={"contained"}>削除</Button>
      </Box>
      <Box flex={1} marginLeft={"10px"}>
        <TextInput
          label={"タイトル"}
          name={`content-title-${index}`}
        />
        <Textarea
          label={"説明"}
          name={`content-description-${index}`}
        />
        <TextInput
          label={"比率"}  type={"number"}
          name={`content-rate-${index}`}
        />
      </Box>
    </Box>
  );
}

export interface ContentFormUnitProps extends OverrideProps<BoxTypeMap, any> {
  index: number;

  remove(): void;
}
