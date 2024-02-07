import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {SxProps} from "@mui/material";
import {LoginButton} from "./LoginButton";
import {RegisterUserButton} from "./RegisterUserButton";
import {UserMenuButton} from "./UserMenuButton";

export function UserNav(
  {
    ...props
  }: UserButtonProps,
) {
  const linkSx: SxProps = {
    color: "text.primary",
    margin: "0 15px",
  };

  return (
    <Box
      {...props}
      display={"flex"}
    >
      <LoginButton sx={linkSx}/>
      <RegisterUserButton sx={linkSx}/>
      <UserMenuButton sx={linkSx}/>
    </Box>
  );
}

export interface UserButtonProps extends OverrideProps<BoxTypeMap, any> {
}
