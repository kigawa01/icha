"use server";
import {api} from "./api";
import {AxiosError} from "axios";
import {ErrorRes} from "../../script/response/response";
import {PostUserRes, TokensRes} from "../../api_clients";

export async function createUser(email: string, password: string, username: string): Promise<Result<PostUserRes>> {
  return await api.defaultApi.createUserApiUserPost({
    email: email, name: username, password: password,
  }).then(value => {
    return {value: value.data};
  }).catch((reason: AxiosError<ErrorRes>) => {
    return {error: reason.response?.data};
  });
}

export async function login(email: string, password: string): Promise<Result<TokensRes>> {
  return await api.defaultApi.loginApiLoginPost({
    email: email, password: password,
  }).then(value => {
    return {value: value.data};
  }).catch((reason: AxiosError<ErrorRes>) => {
    return {error: reason.response?.data};
  });
}

interface Result<T> {
  error?: ErrorRes | undefined;
  value?: T | undefined;
}
