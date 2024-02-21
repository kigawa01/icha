"use client";
import {useUserState} from "../_manager/UserProvider";
import {redirect, usePathname, useSearchParams} from "next/navigation";
import {createURL} from "../util";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

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

export function redirectLogin(url: URL | string | undefined = undefined): never {
  url = createURL(url || "");
  const redirectParams = new URLSearchParams();
  redirectParams.set("url", url.toString());
  redirect(`/login?${redirectParams.toString()}`);
}

export function redirectLoginRouter(router: AppRouterInstance, url: URL | string | undefined = undefined) {
  url = createURL(url || "");
  const redirectParams = new URLSearchParams();
  redirectParams.set("url", url.toString());
  router.push(`/login?${redirectParams.toString()}`);
}