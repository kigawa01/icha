import {Input, Link, SxProps, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {OverrideProps} from "@mui/types";
import {BoxTypeMap} from "@mui/system/Box/Box";

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
  >
    <Link sx={linkSx} href={"/"}><Typography>トップ</Typography></Link>
    <Link sx={linkSx} href={"/"}><Typography>投稿</Typography></Link>
    <Input sx={{
      margin: "0 25px",
      flex: 1,
    }} placeholder={"検索"}/>
    <Link sx={linkSx} href={"/"}><Typography>ログイン</Typography></Link>
    <Link sx={linkSx} href={"/"}><Typography>新規登録</Typography></Link>
  </Box>;
}