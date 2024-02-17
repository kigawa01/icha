import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ImageEdit} from "../../_unit/ImageEdit";
import {TextInput} from "../../_unit/TextInput";
import {Box} from "@mui/system";

export function ContentFormUnit(
  {
    index,
    ...props
  }: ContentFormUnitProps,
) {


  return (
    <Box {...props} >
      <ImageEdit
        textLabel={"結果"}
        name={`content-thumbnail-${index}`}
      />
      <TextInput
        label={"タイトル"}
        name={`content-title-${index}`}
      />
      <TextInput
        label={"説明"}
        name={`content-description-${index}`}
      />
      <TextInput
        label={"確率"}
        name={`content-rate-${index}`}
      />
    </Box>
  );
}

export interface ContentFormUnitProps extends OverrideProps<BoxTypeMap, any> {
  index: number;
}
