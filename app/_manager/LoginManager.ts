"use client";

import {GlobalState} from "../../script/util/hook/globalState";
import {TokensRes} from "../../api_clients";

export interface Token {
  token: string,
  expire: Date
}

export class LoginManager {
  private accessState = new GlobalState<Token | undefined>(undefined);
  private refreshState = new GlobalState<Token | undefined>(undefined);


  setTokensRes(tokens: TokensRes | undefined) {
    if (tokens == undefined) {
      this.accessState.set(undefined);
      this.refreshState.set(undefined);
      return;
    }
    this.accessState.set({expire: new Date(tokens.access_token.expires_in), token: tokens.access_token.token});
    this.refreshState.set({expire: new Date(tokens.refresh_token.expires_in), token: tokens.refresh_token.token});
  }
}

export const loginManager = new LoginManager();