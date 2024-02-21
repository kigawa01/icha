import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Section} from "../../_unit/_section/Section";
import {LicenceData} from "../../../api_clients";
import {Typography} from "@mui/material";
import {LabeledText} from "../../_unit/_labeled/LabeledText";

export function LicenceSection(
  {
    licence,
    ...props
  }: LicenceSectionProps,
) {


  return (
    <Section
      {...props}
      sectionTitle={"ライセンス"}
    >
      <Typography>{licence?.text}</Typography>
      <LabeledText text={licence?.business} label={"商用利用"}/>
      <LabeledText text={licence?.post} label={"投稿"}/>
      <LabeledText text={licence?.credit} label={"クレジット表記なし"}/>
      <LabeledText text={licence?.distribution} label={"二次配布"}/>
      <LabeledText text={licence?.material} label={"素材"}/>
    </Section>
  );
}

export interface LicenceSectionProps extends OverrideProps<BoxTypeMap, any> {
  licence: LicenceData | undefined;
}
