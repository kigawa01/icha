"use client";
import {useEffect} from "react";
import {GlobalState} from "../_hook/globalState";
import LocalStorageProvider, {useLocalStorage} from "./LocalStorageProvider";
import {Configuration, DefaultApi, TokensRes} from "../../api_clients";
import {BASE_URL, fetchApi} from "../_client/api";

import {ErrorDataException, ErrorIds} from "../_client/_error";


const STORAGE_TOKEN_KEY = "token";
const STORAGE_EXPIRE_KEY = "expire";

export interface TokensState {
  tokens: TokensRes | undefined;
}


export function TokenProvider(
  {}: {},
) {
  const storage = useLocalStorage();

  useEffect(() => {
    if (storage == undefined) return;

    const expire = storage.getItem(STORAGE_EXPIRE_KEY);
    if (expire && new Date(expire) < new Date()) {
      setTokensState(undefined);
      return;
    }

    const refreshToken = storage.getItem(STORAGE_TOKEN_KEY);
    if (refreshToken == undefined) setTokensState(undefined);
    else tokenRefresh(refreshToken).catch(reason => {
      if (reason instanceof ErrorDataException) console.error(reason.message);
      else console.error(reason);
      setTokensState(undefined);
    });

  }, [storage]);

  const tokens = tokensState.use();
  useEffect(() => {
    if (storage == undefined) return;
    if (tokens == undefined) return;

    if (tokens.tokens == undefined) {
      storage.removeItem(STORAGE_TOKEN_KEY);
      storage.removeItem(STORAGE_EXPIRE_KEY);
    } else {
      storage.setItem(STORAGE_TOKEN_KEY, tokens.tokens.refreshToken.token);
      storage.setItem(STORAGE_EXPIRE_KEY, tokens.tokens.refreshToken.expiresIn.toString());
    }

  }, [storage, tokens]);

  return <LocalStorageProvider/>;
}

const tokensState = new GlobalState<TokensState | undefined>(undefined);

let taskId: any | undefined = undefined;

export async function tokenRefresh(refreshToken: string) {

  const res = await fetchApi(new DefaultApi(new Configuration({
    basePath: BASE_URL,
    accessToken: "Bearer " + refreshToken,
  }))
    .refreshTokenApiLoginRefreshPost());

  if (res.error) throw new ErrorDataException(res.error);
  const tokens = res.value;
  if (tokens == undefined)
    throw new ErrorDataException(ErrorIds.UnknownError.createData("response is undefined"));
  setTokensState(tokens);

  if (taskId != undefined) {
    clearTimeout(taskId);
  }
  const current = new Date();
  let ms = tokens.accessToken.expiresIn.getTime() - current.getTime();

  if (ms <= 0) ms = 0;
  taskId = setTimeout(() => {
    tokenRefresh(tokens.refreshToken.token)
      .catch(reason => {
        if (reason instanceof ErrorDataException) console.error(reason.message);
        else console.error(reason);
        setTokensState(undefined);
      });
    taskId = undefined;
  }, ms);
}

export function setTokensState(tokensRes: TokensRes | undefined) {
  tokensState.set({tokens: tokensRes});
}

export function useTokensState() {
  return tokensState.use();
}