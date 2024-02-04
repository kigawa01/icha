"use server";
import {api} from "./api";
import {AxiosError} from "axios";
import {ErrorRes} from "../../script/response/response";
import {UserRes} from "../../api_clients";

export async function createUser(email: string, password: string, username: string): Promise<Result<UserRes>> {
  return await api.defaultApi.createUserApiUserPost({
    email: email, name: username, password: password,
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