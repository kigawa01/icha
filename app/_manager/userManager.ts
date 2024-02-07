import {useEffect, useMemo, useState} from "react";
import {LoginState, useLoginState} from "./loginManager";
import {getSelfUser} from "../_client/serverActionApi";
import {LoginRes} from "../../api_clients";
import {GlobalState} from "../_hook/globalState";

export interface User {
  name: string;
  email: string;
  uid: number;
}

const readyState = new GlobalState(false);
const userState = new GlobalState<User | undefined>(undefined);

export class UserManager {

  constructor() {
    getSelfUser().then(value => {
      if (value.value) {
        userState.set({email: value.value.email, name: value.value.name, uid: value.value.uid});
        return;
      }
      if (value.error) console.error(value.error);
      readyState.set(true);
    }).catch(reason => {
      console.error(reason);
      readyState.set(true);
    });
  }

  setLoginRes(postUserRes: LoginRes | undefined) {
    if (postUserRes == undefined) {
      userState.set(undefined);
      return;
    }
    userState.set({email: postUserRes.email, name: postUserRes.name, uid: postUserRes.uid});
  }
}

export interface UserState extends LoginState {
  userManager: UserManager;
  user: User | undefined;
  readyUser: boolean;
}

let userManager: UserManager | undefined = undefined;

export function useUserState(): UserState | undefined {
  const loginState = useLoginState();
  const user = userState.use();
  const ready = readyState.use();
  const [manager, setManager] = useState(userManager);

  useEffect(() => {
    if (manager != undefined) return;
    if (loginState == undefined) return;
    if (!loginState.readyLogin) return;

    if (userManager == undefined) userManager = new UserManager();
    setManager(userManager);
  }, [loginState]);

  return useMemo(() => {
    if (loginState == undefined) return undefined;
    if (userManager == undefined) return undefined;

    return {
      readyUser: ready,
      userManager: userManager,
      user: user,
      ...loginState,
    };
  }, [userManager, user, ready]);
}
