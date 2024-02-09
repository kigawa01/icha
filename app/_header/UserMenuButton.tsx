"use client";
import {OverrideProps} from "@mui/types";
import {Button, Typography} from "@mui/material";
import {ButtonTypeMap} from "@mui/material/Button/Button";
import {useUser} from "../_manager/UserProvider";

export function UserMenuButton(
  {
    ...props
  }: UserMenuButtonProps,
) {
  const userState = useUser();
  if (userState == undefined) return undefined;
  if (userState.userRes == undefined) return undefined;

  return (
    <Button
      {...props}
    >
      <Typography>{userState.userRes.name}</Typography>
    </Button>
  );
}

export interface UserMenuButtonProps extends OverrideProps<ButtonTypeMap, any> {
}
