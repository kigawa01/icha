import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Section} from "../../_unit/_section/Section";
import {GachaContentRes} from "../../../api_clients";
import {GachaContent} from "./GachaContent";

export function GachaContents(
  {
    contents,
    ...props
  }: GachaContentsProps,
) {


  return (
    <Section {...props} sectionTitle={"内容"}>
      {contents.map(value => {
        return <GachaContent content={value} key={value.uid}/>;
      })}
    </Section>
  );
}

export interface GachaContentsProps extends OverrideProps<BoxTypeMap, any> {
  contents: GachaContentRes[];
}
