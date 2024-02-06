"use server";
import {api} from "./api";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorRes} from "../../script/response/response";
import {PostUserRes, TokensRes, UserRes} from "../../api_clients";

export async function createUser(email: string, password: string, username: string): Promise<Result<PostUserRes>> {
  return await fetch(api.defaultApi.createUserApiUserPost({
    email: email, name: username, password: password,
  }));
}

export async function login(email: string, password: string): Promise<Result<TokensRes>> {
  return await fetch(api.defaultApi.loginApiLoginPost({
    email: email, password: password,
  }));
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
  }).catch((reason: AxiosError<ErrorRes>) => {
    return {error: reason.response?.data};
  });
}

interface Result<T> {
  error?: ErrorRes | undefined;
  value?: T | undefined;
}
