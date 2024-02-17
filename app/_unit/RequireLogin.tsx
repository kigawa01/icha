"use client";
import {useUser} from "../_manager/UserProvider";
import {redirect} from "next/navigation";

export function RequireLogin() {
  const user = useUser();
  if (user == undefined) return undefined;
  if (user.userRes == undefined) return redirect("/login");
  return undefined;
}
