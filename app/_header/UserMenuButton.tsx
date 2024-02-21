"use client";
import {OverrideProps} from "@mui/types";
import {Button, Menu, MenuItem, Typography} from "@mui/material";
import {ButtonTypeMap} from "@mui/material/Button/Button";
import {useUserState} from "../_manager/UserProvider";
import {Box} from "@mui/system";
import {setTokensState} from "../_manager/TokenProvider";
import {useState} from "react";

export function UserMenuButton(
  {
    ...props
  }: UserMenuButtonProps,
) {
  const userState = useUserState();
  const [menuAnchorElement, setMenuAnchorElement] = useState<HTMLElement>();
  if (userState == undefined) return undefined;
  if (userState.userRes == undefined) return undefined;

  return (
    <Box
      {...props}
      sx={{
        position: "relative",
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      <Button
        onClick={event => setMenuAnchorElement(menuAnchorElement ? undefined : event.currentTarget)}
        aria-controls={menuAnchorElement ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuAnchorElement ? "true" : undefined}
        sx={{color: "black"}}
      >
        <Typography>{userState.userRes.name}</Typography>
      </Button>
      <Menu
        open={menuAnchorElement != undefined}
        anchorEl={menuAnchorElement}
        onClose={_ => setMenuAnchorElement(undefined)}
      >
        <MenuItem onClick={_ => {
          setTokensState(undefined);
          setMenuAnchorElement(undefined);
        }}>ログアウト</MenuItem>
      </Menu>
    </Box>
  );
}

export interface UserMenuButtonProps extends OverrideProps<ButtonTypeMap, any> {
}
