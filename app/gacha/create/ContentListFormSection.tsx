"use client";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ContentFormUnit} from "./ContentFormUnit";
import {Button} from "@mui/material";
import {Section} from "../../_unit/_section/Section";
import {StateObject} from "../../util";

export function ContentListFormSection(
  {
    contentsState,
    ...props
  }: ContentFormSectionProps,
) {
  function addContent() {
    const list = contentsState.value;
    const newNum = contentsState.value.length == 0
      ? 0 : contentsState.value[contentsState.value.length - 1] + 1;
    list.push(newNum);
    contentsState.setValue([...list]);
  }

  return (
    <Section sectionTitle={"内容"} {...props}>
      {contentsState.value.map(num => <ContentFormUnit
        index={num} key={num} margin={"25px 0"}
        remove={() => contentsState.setValue(contentsState.value.filter(value => value != num))}
      />)}
      <Button
        onClick={_ => addContent()}
        variant={"contained"}
      >追加</Button>
    </Section>
  );
}

export interface ContentFormSectionProps extends OverrideProps<BoxTypeMap, any> {
  contentsState: StateObject<number[]>;
}
