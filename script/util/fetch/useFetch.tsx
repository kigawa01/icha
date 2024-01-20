import {DependencyList, useEffect, useState} from "react";
import {handleFetch}                         from "./handle.ts";

export class FetchResult<T> {
  readonly error: string | undefined
  readonly value: T | undefined

  constructor(error: string | undefined, value: T | undefined) {
    this.error = error
    this.value = value
  }

  errorElementIf() {
    return this.error && <p><strong>{this.error}</strong></p>
  }
}

export function useFetch<T>(
  fetcher: (() => Promise<T>) | undefined,
  deps: DependencyList = [],
  onFetch: ((value: T) => void) | undefined = undefined,
) {
  const [result, setResult] = useState(
    new FetchResult<T>(undefined, undefined),
  )

  useEffect(() => {
    fetcher && handleFetch(
      message => setResult(new FetchResult<T>(message, undefined)),
      fetcher,
      value => {
        onFetch && onFetch(value)
        setResult(new FetchResult(undefined, value))
      },
    )
  }, deps);

  return result
}



