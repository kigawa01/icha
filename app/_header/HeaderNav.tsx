"use client";
import {Input, Link, SxProps, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {OverrideProps} from "@mui/types";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {UserNav} from "./UserNav";
import {useRouter} from "next/navigation";

export function HeaderNav(
  {...props}: {} & OverrideProps<BoxTypeMap, any>,
) {
  const linkSx: SxProps = {
    color: "text.primary",
    margin: "0 15px",
  };
  const router = useRouter();
  return <Box
    display={"flex"}
    component={"nav"}
    {...props}
    alignItems={"center"}
    fontWeight={"bold"}
  >
    <Link sx={linkSx} href={"/"}><Typography>トップ</Typography></Link>
    <Link sx={linkSx} href={"/gacha/create"}><Typography>投稿</Typography></Link>
    <Box sx={{margin: "0 25px", flex: 1}} component={"form"} action={(formData: FormData) => {
      const searchParams = new URLSearchParams();
      searchParams.set("search", formData.get("search") as string);
      router.push(`/gacha?${searchParams.toString()}`);
    }}>
      <Input sx={{width: "100%"}} placeholder={"検索"} name={"search"}/>
    </Box>
    <UserNav/>
  </Box>;
}