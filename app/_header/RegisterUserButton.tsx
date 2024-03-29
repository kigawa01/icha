"use client";
import {OverrideProps} from "@mui/types";
import {Link, Typography} from "@mui/material";
import {LinkTypeMap} from "@mui/material/Link/Link";
import {useUserState} from "../_manager/UserProvider";

export function RegisterUserButton(
  {
    ...props
  }: RegisterUserProps,
) {
  const userState = useUserState();
  if (userState == undefined) return undefined;
  if (userState.userRes != undefined) return undefined;

  return (
    <Link
      {...props}
      href={"/user/create"}
    ><Typography>新規登録</Typography></Link>
  );
}

export interface RegisterUserProps extends OverrideProps<LinkTypeMap, any> {
}
