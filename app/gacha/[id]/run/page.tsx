import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Main} from "../../../_unit/Main";
import {Button, Typography} from "@mui/material";

export default function Page(
  {}: PageProps,
) {


  return (
    <Main>
      <Typography variant={"h2"}>ガチャ名</Typography>
      <Button>止める</Button>
      <Button>Skip</Button>
    </Main>
  );
}

export interface PageProps extends OverrideProps<BoxTypeMap, any> {
}
