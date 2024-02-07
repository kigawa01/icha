"use server";
import {api} from "./api";
import {AxiosError, AxiosResponse} from "axios";
import {LoginRes, TokensRes, UserRes} from "../../api_clients";
import {ErrorIds, ErrorRes} from "./_error";

export async function createUser(email: string, password: string, username: string): Promise<Result<LoginRes>> {
  return await fetch(api.defaultApi.createUserApiUserPost({
    email: email, name: username, password: password,
  }));
}

export async function login(email: string, password: string): Promise<Result<LoginRes>> {
  return await fetch(api.defaultApi.loginApiLoginPost({
    email: email, password: password,
  }, {}));
}

export async function refresh(): Promise<Result<TokensRes>> {
  return await fetch(api.defaultApi.refreshTokenApiLoginRefreshPost());
}

export async function getSelfUser(): Promise<Result<UserRes>> {
  return await fetch(api.defaultApi.getSelfUserApiUserSelfGet());
}

async function fetch<R>(res: Promise<AxiosResponse<R>>): Promise<Result<R>> {
  return res.then(value => {
    return {value: value.data};
  }).catch((reason: AxiosError<ErrorRes | string>) => {
    const response = reason.response;
    if (response == undefined) {
      console.error(reason.message);
      return {error: ErrorIds.createResponse(ErrorIds.UnknownError, reason.message)};
    }
    if (typeof response.data == "string") {
      console.error(response.data);
      return {error: ErrorIds.createResponse(ErrorIds.UnknownError, response.data)};
    }
    return {error: response.data};
  });
}

interface Result<T> {
  error?: ErrorRes | undefined;
  value?: T | undefined;
}
