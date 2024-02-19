import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ReactNode} from "react";

export function SectionBar(
  {
    page,
    size,
    ...props
  }: SectionBarProps,
) {
  const pageElements: ReactNode[] = [];
  for (let i = 0; i < size; i++) {
    const totalWidth = 100 / size;
    pageElements.push(
      <Box
        borderRadius={"2px"} height={"3px"} width={`${totalWidth * 0.95}%`}
        key={i} sx={{opacity: page - 1 == i ? "99%" : "50%"}} bgcolor={"grey"}
      />,
    );
  }


  return (
    <Box
      {...props} display={"flex"} justifyContent={"space-around"}
    >
      {pageElements}
    </Box>
  );
}

export interface SectionBarProps extends OverrideProps<BoxTypeMap, any> {
  page: number;
  size: number;
}
