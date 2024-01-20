import {ApiErrorData} from "./object.ts";

export class JsonError extends Error {
  url: URL | undefined;
  init: RequestInit | undefined;
  response: Response | undefined;
  reason: any | undefined;

  constructor(
    url: URL | undefined,
    init: RequestInit | undefined,
    response: Response | undefined,
    reason: any | undefined,
  ) {
    super();
    this.url = url;
    this.init = init;
    this.response = response;
    this.reason = reason;
  }
}

export class ApiError extends Error {
  readonly apiErrorResponse: ApiErrorData;

  constructor(apiErrorResponse: ApiErrorData) {
    super();
    this.apiErrorResponse = apiErrorResponse;
  }
}

export class UrlError extends Error {
  readonly str: string;

  constructor(str: string) {
    super();
    this.str = str;
  }
}