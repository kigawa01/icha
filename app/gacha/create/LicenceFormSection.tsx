import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Button} from "@mui/material";
import {TextInput} from "../../_unit/TextInput";
import {YesNoElse} from "../../_unit/YesNoElseInput";
import {Section} from "../../_unit/_section/Section";

export function LicenceFormSection(
  {
    ...props
  }: LicenceFormSectionProps,
) {


  return (
    <Section {...props} sectionTitle={"ライセンス"}>
      <Button
        variant={"contained"}
      >テンプレート1</Button>
      <TextInput
        label={"本文"}
        name={"licence_text"}
      />
      <YesNoElse
        name={"business"}
        label={"商用利用"}
      />
      <YesNoElse
        label={"投稿"}
        name={"post"}
      />
      <YesNoElse
        label={"クレジット"}
        name={"credit"}
      />
      <YesNoElse
        label={"二次配布"}
        name={"distribution"}
      />
      <YesNoElse
        label={"素材"}
        name={"material"}
      />
    </Section>
  );
}

export interface LicenceFormSectionProps extends OverrideProps<BoxTypeMap, any> {
}
