import {Input, Link, SxProps, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {OverrideProps} from "@mui/types";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {UserNav} from "./UserNav";

export function HeaderNav(
  {...props}: {} & OverrideProps<BoxTypeMap, any>,
) {
  const linkSx: SxProps = {
    color: "text.primary",
    margin: "0 15px",
  };
  return <Box
    display={"flex"}
    component={"nav"}
    {...props}
    alignItems={"center"}
    fontWeight={"bold"}
  >
    <Link sx={linkSx} href={"/"}><Typography>トップ</Typography></Link>
    <Link sx={linkSx} href={"/gacha/create"}><Typography>投稿</Typography></Link>
    <Input sx={{
      margin: "0 25px",
      flex: 1,
    }} placeholder={"検索"}/>
    <UserNav/>
  </Box>;
}