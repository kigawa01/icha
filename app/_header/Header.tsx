import {HeaderNav} from "./HeaderNav";
import {AppBar, Link, Toolbar, Typography} from "@mui/material";
import {OverrideProps} from "@mui/material/OverridableComponent";
import {AppBarTypeMap} from "@mui/material/AppBar/AppBar";

export interface HeaderPageProps extends OverrideProps<AppBarTypeMap, any> {
}

export function Header({...props}: HeaderPageProps) {
  return <AppBar
    {...props}
    component={"header"}
    sx={{alignContent: "center"}}
  >
    <Toolbar>
      <Link color={"text.primary"} href={"/"}><Typography variant={"h1"}>Icha</Typography></Link>
      <HeaderNav flex={1} margin={"0 10px"}/>
    </Toolbar>
  </AppBar>;

}