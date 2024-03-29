"use client";
import {OverrideProps} from "@mui/types";
import {Link, Typography} from "@mui/material";
import {LinkTypeMap} from "@mui/material/Link/Link";
import {useUserState} from "../_manager/UserProvider";

export function LoginButton(
  {
    ...props
  }: LoginButtonProps,
) {
  const userState = useUserState();
  if (userState == undefined) return undefined;
  if (userState.userRes != undefined) return undefined;

  return (
    <Link
      href={"/login"}
      {...props}
    ><Typography>ログイン</Typography></Link>
  );
}

export interface LoginButtonProps extends OverrideProps<LinkTypeMap, any> {
}
