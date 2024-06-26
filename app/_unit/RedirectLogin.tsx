"use client";
import {useUserState} from "../_manager/UserProvider";
import {redirect} from "next/navigation";
import {createURL} from "../util";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export function RequireLogin() {
  const userState = useUserState();
  if (userState == undefined || userState.userRes != undefined) return undefined;
  redirectLogin();
}

export function createLoginUrl(url: URL | string | undefined = undefined) {
  url = createURL(url || "");
  const redirectParams = new URLSearchParams();
  redirectParams.set("url", url.toString());
  return `/login?${redirectParams.toString()}`;
}

export function redirectLogin(url: URL | string | undefined = undefined): never {
  redirect(createLoginUrl(url));
}

export function redirectLoginRouter(router: AppRouterInstance, url: URL | string | undefined = undefined) {
  url = createURL(url || "");
  const redirectParams = new URLSearchParams();
  redirectParams.set("url", url.toString());
  router.push(`/login?${redirectParams.toString()}`);
}