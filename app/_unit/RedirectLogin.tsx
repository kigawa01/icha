import {Navigate} from "react-router";
import {createURL} from "../util";
import {useUserState} from "../_manager/UserProvider";
import type {NavigateFunction} from "react-router";
import type {JSX} from "react";

export function RequireLogin() {
  const userState = useUserState();
  if (userState == undefined || userState.userRes != undefined) return undefined;
  return redirectLogin();
}

export function createLoginUrl(url: URL | string | undefined = undefined) {
  url = createURL(url || "");
  const redirectParams = new URLSearchParams();
  redirectParams.set("url", url.toString());
  return `/login?${redirectParams.toString()}`;
}

export function redirectLogin(url: URL | string | undefined = undefined): JSX.Element {
  return <Navigate to={createLoginUrl(url)} replace/>;
}

export function redirectLoginRouter(navigate: NavigateFunction, url: URL | string | undefined = undefined) {
  url = createURL(url || "");
  const redirectParams = new URLSearchParams();
  redirectParams.set("url", url.toString());
  navigate(`/login?${redirectParams.toString()}`);
}
