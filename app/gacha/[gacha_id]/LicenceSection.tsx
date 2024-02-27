import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Section} from "../../_unit/_section/Section";
import {LicenceData} from "../../../api_clients";
import {LabeledText} from "../../_unit/_labeled/LabeledText";
import {Box} from "@mui/system";

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
      <Box
        padding={"10px"} component={"pre"} borderRadius={"5px"} boxShadow={1} bgcolor={"lightgrey"}
        border={"1px solid grey"} margin={"10px 0 30px 0"}
      >{licence?.text}</Box>
      <LabeledText
        labelProps={{width: "200px"}} borderBottom={"1px solid grey"} padding={"3px 10px"} margin={"10px 0"}
        text={licence?.business} label={"商用利用"}
      />
      <LabeledText
        labelProps={{width: "200px"}} borderBottom={"1px solid grey"} padding={"3px 10px"} margin={"10px 0"}
        text={licence?.post} label={"投稿"}
      />
      <LabeledText
        labelProps={{width: "200px"}} borderBottom={"1px solid grey"} padding={"3px 10px"} margin={"10px 0"}
        text={licence?.credit} label={"クレジット表記なし"}
      />
      <LabeledText
        labelProps={{width: "200px"}} borderBottom={"1px solid grey"} padding={"3px 10px"} margin={"10px 0"}
        text={licence?.distribution} label={"二次配布"}
      />
      <LabeledText
        labelProps={{width: "200px"}} borderBottom={"1px solid grey"} padding={"3px 10px"} margin={"10px 0"}
        text={licence?.material} label={"素材"}
      />
    </Section>
  );
}

export interface LicenceSectionProps extends OverrideProps<BoxTypeMap, any> {
  licence: LicenceData | undefined;
}
