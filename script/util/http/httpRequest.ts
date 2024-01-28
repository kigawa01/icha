import {HttpMethod} from "../fetch/object";
import {getDefault} from "../util";
import {HttpClient} from "./httpClient";

export class HttpRequest<BODY = undefined> {
  protected _method: HttpMethod;
  protected _url: URL | string;
  protected _isAuthenticate: boolean = false;
  protected _token: string | undefined = undefined;
  protected _searchParams: URLSearchParams = new URLSearchParams();
  protected _body: BODY;
  protected httpClient: HttpClient;

  constructor(httpClient: HttpClient, body: BODY = undefined) {
    this._body = body;
    this.httpClient = httpClient;
  }

  createUrl() {
    const url = this.httpClient.createURL(this._url);
    this._searchParams.forEach((value, key) => url.searchParams.set(key, value));
    return url;
  }

  createInit() {
    const init: RequestInit = {};
    const headers: HeadersInit = {};

    if (this._token != undefined) headers["Authorization"] = `Bearer ${this._token}`;
    else if (this._isAuthenticate) headers["Authorization"] = `Bearer ${this.httpClient.tokenManager.getAccessToken()}`;
    headers["Content-Type"] = "application/json";
    headers["Access-Control-Allow-Origin"] =
      getDefault(headers["Access-Control-Allow-Origin"], this.httpClient.corsHost);
    init.headers = headers;

    if (this._body != null) init.body = JSON.stringify(this._body);
    if (this._method != null) init.method = this._method;
    return init;
  }
}