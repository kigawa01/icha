"use client";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ReactNode, useEffect, useState} from "react";
import {ContentFormUnit} from "./ContentFormUnit";
import {Button} from "@mui/material";
import {Section} from "../../_unit/_section/Section";

export function ContentListFormSection(
  {
    onChangeSize,
    ...props
  }: ContentFormSectionProps,
) {
  const [list, setList] = useState<ReactNode[]>([]);

  function addContent() {
    const element = <ContentFormUnit
      index={list.length} key={list.length} margin={"25px 0"}
      remove={() => setList(list.filter(value => value != element))}
    />;
    list.push(element);
    setList([...list]);
    onChangeSize(list.length);
  }

  useEffect(() => {
    if (list.length != 0) return;
    addContent();
  }, []);

  return (
    <Section sectionTitle={"内容"} {...props}>
      {list}
      <Button
        onClick={_ => addContent()}
        variant={"contained"}
      >追加</Button>
    </Section>
  );
}

export interface ContentFormSectionProps extends OverrideProps<BoxTypeMap, any> {
  onChangeSize(size: number): void;
}
