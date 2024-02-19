import {HTMLAttributes} from "react";
import {HeaderNav} from "./HeaderNav";
import {AppBar, Link, Toolbar, Typography} from "@mui/material";

export interface HeaderPageProps extends HTMLAttributes<any> {
}

export function Header({...parentProps}: HeaderPageProps) {
  return <AppBar
    component={"header"}
    sx={{alignContent: "center"}}
  >
    <Toolbar>
      <Link color={"text.primary"} href={"/"}><Typography variant={"h1"}>Icha</Typography></Link>
      <HeaderNav flex={1} margin={"0 10px"}/>
    </Toolbar>
  </AppBar>;

}