import {useMemo} from "react";
import {useLoginState} from "./loginManager";
import {GlobalState} from "../../script/util/hook/globalState";
import {getSelfUser} from "../_client/serverActionApi";

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

}

export interface UserState {
  userManager: UserManager;
  user: User | undefined;
  ready: boolean;
}

let usermanager: UserManager | undefined = undefined;

export function useUserState(): UserState | undefined {
  const loginState = useLoginState();
  const user = userState.use();
  const ready = readyState.use();

  const userManager = useMemo(() => {
    if (loginState == undefined) return undefined;
    if (!loginState.ready) return undefined;
    if (usermanager != undefined) return usermanager;
    usermanager = new UserManager();

    return usermanager;
  }, [loginState]);

  return useMemo(() => {
    if (userManager == undefined) return undefined;

    return {
      ready: ready,
      userManager: userManager,
      user: user,
    };
  }, [userManager, user]);
}
