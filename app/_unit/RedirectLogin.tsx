"use client";
import {useUserState} from "../_manager/UserProvider";
import {redirect, usePathname, useSearchParams} from "next/navigation";

export function RequireLogin() {
  const userState = useUserState();
  const path = usePathname();
  const currentParams = useSearchParams();
  if (userState == undefined || userState.userRes != undefined) return undefined;
  redirectLogin();


  // useEffect(() => {
  //   if (userState == undefined || userState.userRes != undefined) return undefined;
  //   const url = new URL("/login", location.href);
  //   url.searchParams.set("url", path);
  //   console.log(url.toString());
  //   location.href = url.toString();
  // }, [userState]);
}

export function redirectLogin(path: string = location.pathname, currentParams: URLSearchParams | string | undefined = location.search) {
  const redirectParams = new URLSearchParams();
  if (currentParams != undefined) redirectParams.set("url", path + "?" + currentParams.toString());
  redirect(`/login?${redirectParams.toString()}`);
}