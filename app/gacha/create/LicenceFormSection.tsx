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
        name={"licence_business"}
        label={"商用利用"}
      />
      <YesNoElse
        label={"投稿"}
        name={"licence_post"}
      />
      <YesNoElse
        label={"クレジット"}
        name={"licence_credit"}
      />
      <YesNoElse
        label={"二次配布"}
        name={"licence_distribution"}
      />
      <YesNoElse
        label={"素材"}
        name={"licence_material"}
      />
    </Section>
  );
}

export interface LicenceFormSectionProps extends OverrideProps<BoxTypeMap, any> {
}
