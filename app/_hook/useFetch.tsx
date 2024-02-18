import {DependencyList, useEffect, useMemo, useState} from "react";
import {ApiResult} from "../_client/api";
import {ErrorIds} from "../_client/_error";


export function useFetch<T>(
  fetcher: (() => Promise<ApiResult<T>>) | undefined,
  deps: DependencyList = [],
  onFetch: ((value: T) => void) | undefined = undefined,
): UseFetchResult<T> | undefined {
  const [resultRes, setResultRes] = useState<T>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (fetcher == undefined) return;
    fetcher().then(value => {
      if (value.value) {
        onFetch && onFetch(value.value);
        setResultRes(value.value);
        setError(undefined)
      }else setError(value.error?.message || ErrorIds.UnknownError.name);
    }).catch(reason => {
      setError(reason.toString());
    });
  }, deps);

  return useMemo<UseFetchResult<T> | undefined>(() => {
    if (error != undefined) return {error: error, result: undefined};
    if (resultRes != undefined) return {error: undefined, result: resultRes};
    return undefined;
  }, [error, resultRes]);
}

export type UseFetchResult<T> = {
  error: string
  result: undefined
} | {
  error: undefined
  result: T
}

