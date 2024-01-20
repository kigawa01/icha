import {HttpMethod} from "./object.ts";
import {fetchRest} from "./fetch.ts";

abstract class FetchBuilderBase<RESULT> {
  protected readonly _method: HttpMethod;
  protected _url: URL | string;
  protected _isAuthenticate: boolean = false;
  protected _token: string | undefined = undefined;
  protected _params: URLSearchParams = new URLSearchParams()

  protected constructor(method: HttpMethod, url: string | URL) {
    this._method = method
    this._url = url
  }

  appendParams(key: string, value: any) {
    this._params.append(key, value.toString())
    return this
  }

  url(url: string) {
    this._url = url;
    return this;
  }


  authenticate() {
    this._isAuthenticate = true
    return this
  }

  token(token: string) {
    this._token = token
    return this
  }

  abstract fetch(): Promise<RESULT>
}

export class FetchGetBuilder<RESULT> extends FetchBuilderBase<RESULT> {
  constructor(url: string | URL) {
    super("GET", url);
  }

  fetch() {
    return fetchRest<RESULT>(
      this._url,
      this._method,
      undefined,
      this._isAuthenticate,
      this._token
    );
  }
}

abstract class FetchWithBodyBuilder<RESULT, BODY> extends FetchBuilderBase<RESULT> {
  private _body?: BODY | undefined;

  constructor(method: HttpMethod, url: string | URL, body: BODY) {
    super(method, url)
    this._body = body;
  }


  body(body: BODY | undefined) {
    this._body = body;
    return this;
  }


  fetch() {
    return fetchRest<RESULT, BODY>(
      this._url,
      this._method,
      this._body,
      this._isAuthenticate,
      this._token
    );
  }
}

export class FetchPostBuilder<RESULT, BODY> extends FetchWithBodyBuilder<RESULT, BODY> {
  constructor(url: string | URL, body: BODY) {
    super("POST", url, body);
  }
}

export class FetchPutBuilder<RESULT, BODY> extends FetchWithBodyBuilder<RESULT, BODY> {
  constructor(url: string | URL, body: BODY) {
    super("PUT", url, body);
  }
}