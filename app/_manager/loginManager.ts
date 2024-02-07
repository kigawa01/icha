import {TokensRes} from "../../api_clients";
import {LocalStorageManager, useLocalStorageManager} from "./localStorageManager";
import {clientConfig} from "../_client/api";
import {useEffect, useMemo, useState} from "react";
import {refresh} from "../_client/serverActionApi";
import {GlobalState} from "../_hook/globalState";

export interface TokenState {
  token: string,
  expire: Date
}

const STORAGE_TOKEN_KEY = "token";
const STORAGE_EXPIRE_KEY = "expire";

const accessState = new GlobalState<TokenState | undefined>(undefined);
const refreshState = new GlobalState<TokenState | undefined>(undefined);
const readyState = new GlobalState(false);

export class LoginManager {
  readonly localStorageManager: LocalStorageManager;
  private taskId: any | undefined = undefined;

  constructor(localStorageManager: LocalStorageManager) {
    this.localStorageManager = localStorageManager;

    this.refresh()
      .then(_ => readyState.set(true))
      .catch(reason => {
        console.error(reason);
        readyState.set(true);
      });
  }

  async refresh() {
    return await refresh().then(value => {
      if (value.value) {
        this.setTokensRes(value.value);
        return;
      }
      if (value.error) console.error(value.error);
    });
  }

  setTokensRes(tokens: TokensRes | undefined) {
    if (tokens == undefined) {
      refreshState.set(undefined);
      accessState.set(undefined);
      clientConfig.accessToken = undefined;
      return;
    }
    clientConfig.accessToken = tokens.access_token.token;
    const accessTokenState = {
      expire: new Date(tokens.access_token.expires_in),
      token: tokens.access_token.token,
    };
    accessState.set(accessTokenState);
    refreshState.set({expire: new Date(tokens.refresh_token.expires_in), token: tokens.refresh_token.token});
    this.localStorageManager.set(STORAGE_TOKEN_KEY, tokens.refresh_token.token);
    this.localStorageManager.set(STORAGE_EXPIRE_KEY, tokens.refresh_token.expires_in);

    this.refreshTask(accessTokenState);
  }

  private refreshTask(accessToken: TokenState) {
    if (this.taskId != undefined) {
      clearTimeout(this.taskId);
    }
    const current = new Date();
    const ms = accessToken.expire.getTime() - current.getTime();
    if (ms <= 0) {
      this.setTokensRes(undefined);
      return;
    }

    this.taskId = setTimeout(() => {
      this.taskId = undefined;
      this.refresh().catch(reason => console.error(reason));
    }, ms);
  }
}

let loginManager: LoginManager | undefined = undefined;

export interface LoginState {
  loginManager: LoginManager;
  readyLogin: boolean;
}

export function useLoginState(): LoginState | undefined {
  const localStorageManager = useLocalStorageManager();
  const [manager, setManager] = useState(loginManager);
  const ready = readyState.use();

  useEffect(() => {
    if (manager != undefined) return;
    if (localStorageManager == undefined) return;
    if (loginManager == undefined) loginManager = new LoginManager(localStorageManager);

    setManager(loginManager);
  }, [localStorageManager]);

  return useMemo(() => {
    if (manager == undefined) return undefined;
    return {
      loginManager: manager,
      readyLogin: ready,
    };
  }, [manager, ready]);
}

