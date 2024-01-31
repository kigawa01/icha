import {HTMLAttributes} from "react";
import {HeaderNav} from "./HeaderNav";
import {AppBar, Toolbar, Typography} from "@mui/material";

export interface HeaderPageProps extends HTMLAttributes<any> {
}

export function Header({...parentProps}: HeaderPageProps) {
  return <AppBar
    component={"header"}
    sx={{alignContent: "center"}}
  >
    <Toolbar>
      <Typography variant={"h1"}>Icha</Typography>
      <HeaderNav flex={1} margin={"0 10px"}/>
    </Toolbar>
  </AppBar>;

}