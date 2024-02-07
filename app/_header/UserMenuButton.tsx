"use client";
import {OverrideProps} from "@mui/types";
import {Button, Typography} from "@mui/material";
import {ButtonTypeMap} from "@mui/material/Button/Button";
import {useUserState} from "../_manager/userManager";

export function UserMenuButton(
  {
    ...props
  }: UserMenuButtonProps,
) {
  const userState = useUserState();
  if (userState == undefined) return undefined;
  if (!userState.readyUser) return undefined;
  if (userState.user == undefined) return undefined;

  return (
    <Button
      {...props}
    >
      <Typography>{userState.user.name}</Typography>
    </Button>
  );
}

export interface UserMenuButtonProps extends OverrideProps<ButtonTypeMap, any> {
}
