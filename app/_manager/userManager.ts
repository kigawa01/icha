"use client";
import {GlobalState} from "../../script/util/hook/globalState";
import {PostUserRes} from "../../api_clients";

export interface User {
  name: string;
  email: string;
  uid: number;
}

export class UserManager {
  private userState = new GlobalState<User | undefined>(undefined);

  setPostUserRes(postUserRes: PostUserRes | undefined) {
    if (postUserRes == undefined) {
      this.userState.set(undefined);
      return;
    }
    this.userState.set({email: postUserRes.email, name: postUserRes.name, uid: postUserRes.uid});
  }
}

export const userManager = new UserManager();