"use client";

import {GlobalState} from "../../script/util/hook/globalState";
import {TokensRes} from "../../api_clients";
import {localStorageManager, LocalStorageManager} from "./localStorageManager";

export interface Token {
  token: string,
  expire: Date
}

export class LoginManager {
  private readonly accessState = new GlobalState<Token | undefined>(undefined);
  private readonly refreshState = new GlobalState<Token | undefined>(undefined);
  private readonly ready = new GlobalState(false);
  private readonly STORAGE_TOKEN_KEY = "token";
  private readonly STORAGE_EXPIRE_KEY = "expire";
  private readonly localStorageManager: LocalStorageManager;

  constructor(localStorageManager: LocalStorageManager) {
    this.localStorageManager = localStorageManager;
    const expire = localStorageManager.get(this.STORAGE_EXPIRE_KEY);
    if (expire == undefined) {
      this.ready.set(true);
      return;
    }
  }

  setTokensRes(tokens: TokensRes | undefined) {
    if (tokens == undefined) {
      this.accessState.set(undefined);
      this.refreshState.set(undefined);
      return;
    }
    this.accessState.set({expire: new Date(tokens.access_token.expires_in), token: tokens.access_token.token});
    this.refreshState.set({expire: new Date(tokens.refresh_token.expires_in), token: tokens.refresh_token.token});
    this.localStorageManager.set(this.STORAGE_TOKEN_KEY, tokens.refresh_token.token);
    this.localStorageManager.set(this.STORAGE_EXPIRE_KEY, tokens.refresh_token.expires_in);
  }
}

export const loginManager = new LoginManager(localStorageManager);