"use client";
import {AuthApiProvider, useAuthClient} from "./AuthApiProvider";
import {UserRes} from "../../api_clients";
import {GlobalState} from "../_hook/globalState";
import {useEffect} from "react";

export default function UserProvider(
  {}: {},
) {
  const client = useAuthClient();

  useEffect(() => {
    if (client == undefined) return;

    if (client.client == undefined) {
      userState.set({userRes: undefined});
      return;
    }
    client.client.getSelfUser().then(value => {
      if (value.error) {
        console.error(value.error.message);
        userState.set({userRes: undefined});
        return;
      }
      if (value.value == undefined) {
        console.error("user res is undefined");
        userState.set({userRes: undefined});
        return;
      }
      userState.set({userRes: value.value});
    });

  }, [client]);

  return <AuthApiProvider/>;
}

export interface UserState {
  userRes: UserRes | undefined;
}

const userState = new GlobalState<UserState | undefined>(undefined);

export function useUserState() {
  return userState.use();
}