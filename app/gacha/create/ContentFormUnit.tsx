import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ImageEdit} from "../../_unit/ImageEdit";
import {TextInput} from "../../_unit/TextInput";
import {Box} from "@mui/system";
import {Textarea} from "../../_unit/Textarea";

export function ContentFormUnit(
  {
    index,
    ...props
  }: ContentFormUnitProps,
) {


  return (
    <Box {...props} display={"flex"}>
      <ImageEdit
        flex={"none"} textLabel={"結果"} name={`content-thumbnail-${index}`} width={"300px"} height={"200px"}
      />
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
          label={"比率"}
          name={`content-rate-${index}`}
        />
      </Box>
    </Box>
  );
}

export interface ContentFormUnitProps extends OverrideProps<BoxTypeMap, any> {
  index: number;
}
