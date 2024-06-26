import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Section} from "../../_unit/_section/Section";
import {GachaContentRes} from "../../../api_clients";
import {GachaContent} from "./GachaContent";

export function GachaContents(
  {
    gachaId,
    contents,
    rateSum,
    ...props
  }: GachaContentsProps,
) {
  return (
    <Section {...props} sectionTitle={"内容"}>
      {contents.map(value => {
        return <GachaContent rateSum={rateSum} gachaId={gachaId} content={value} key={value.uid} margin={"30px 0"}/>;
      })}
    </Section>
  );
}

export interface GachaContentsProps extends OverrideProps<BoxTypeMap, any> {
  contents: GachaContentRes[];
  gachaId: number;
  rateSum: number
}
