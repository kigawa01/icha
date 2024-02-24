import {Typography} from "@mui/material";
import {Section, SectionProps} from "./Section";

export interface TextSectionProps extends SectionProps {
  content: string;
}

export function TextSection(
  {
    content,
    ...props
  }: TextSectionProps,
) {


  return (
    <Section
      {...props}
    >
      <Typography>{content}</Typography>
    </Section>
  );
}