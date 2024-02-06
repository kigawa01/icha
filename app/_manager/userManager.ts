"use client";
import {useMemo} from "react";
import {useLoginState} from "./loginManager";

export interface User {
  name: string;
  email: string;
  uid: number;
}

export function useUserState() {
  const loginState = useLoginState();

  return useMemo(() => {
    if (loginState == undefined) return undefined;
  }, []);
}
