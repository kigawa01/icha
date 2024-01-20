import {ApiError} from "./error.ts";

export function handleFetch<T>(
  serError: (message: string | undefined) => void,
  fetcher: () => Promise<T>,
  success?: ((value: T) => void) | undefined,
) {
  fetcher().then(value => {
    serError(undefined)
    if (success) success(value)
  }).catch(reason => {
    console.debug(reason)
    if (reason instanceof ApiError && reason.apiErrorResponse.message != "") {
      serError(reason.apiErrorResponse.message)
      return
    }
    if (reason instanceof Error && reason.message && reason.message != "") {
      serError(reason.message)
      return;
    }
    serError(reason.toString())
    return;
  })
}