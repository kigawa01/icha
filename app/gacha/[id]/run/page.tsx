import {Main} from "../../../_unit/Main";
import {Button, Typography} from "@mui/material";

export default function Page(
  {}: {},
) {

  return (
    <Main>
      <Typography variant={"h2"}>ガチャ名</Typography>
      <Button>止める</Button>
      <Button>Skip</Button>
    </Main>
  );
}

