"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Link, SxProps, Typography} from "@mui/material";
import {useUserState} from "../_manager/userManager";

export function UserNav(
  {
    ...props
  }: UserButtonProps,
) {
  const userManager = useUserState();
  const linkSx: SxProps = {
    color: "text.primary",
    margin: "0 15px",
  };

  if (userManager == undefined) return undefined;
  return (
    <Box
      {...props}
      display={"flex"}
    >
      <Link sx={linkSx} href={"/login"}><Typography>ログイン</Typography></Link>
      <Link sx={linkSx} href={"/user/create"}><Typography>新規登録</Typography></Link>
    </Box>
  );
}

export interface UserButtonProps extends OverrideProps<BoxTypeMap, any> {
}
