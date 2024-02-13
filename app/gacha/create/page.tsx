import {Main} from "../../_unit/Main";
import {ImageEdit} from "../../_unit/ImageEdit";
import {Section} from "../../_unit/_section/Section";
import {Box} from "@mui/system";
import {TextInput} from "../../_unit/TextInput";
import {Button} from "@mui/material";

export default function Page(
  {}: {},
) {


  return <Main>
    <Box
      component={"form"}
    >


      <Section sectionTitle={"画像投稿"}>
        <ImageEdit/>
        <TextInput
          label={"ガチャ名"}
        />
        <TextInput
          label={"説明"}
        />
      </Section>


      <Section sectionTitle={"ライセンス"}>
        <Button
          variant={"contained"}
        >テンプレート1</Button>
        <TextInput
          label={"本文"}
        />
        <TextInput
          label={"商用利用"}
        />
        <TextInput
          label={"投稿"}
        />
        <TextInput
          label={"クレジット"}
        />
        <TextInput
          label={"二次配布"}
        />
        <TextInput
          label={"素材"}
        />
      </Section>

      <Section sectionTitle={"内容"}>
        <ImageEdit/>
        <TextInput
          label={"タイトル"}
        />
        <TextInput
          label={"説明"}
        />
        <TextInput
          label={"確率"}
        />
      </Section>


    </Box>
  </Main>;
}