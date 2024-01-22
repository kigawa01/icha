import {HttpMethod} from "../fetch/object";
import {HttpClientBase} from "./HttpClientBase";

export class HttpRequest<BODY = undefined> {
  protected _method: HttpMethod;
  protected _url: URL | string;
  protected _isAuthenticate: boolean = false;
  protected _token: string | undefined = undefined;
  protected _searchParams: URLSearchParams = new URLSearchParams();
  protected _body: BODY;

  constructor(body: BODY = undefined) {
    this._body = body;
  }

  createUrl(httpClient: HttpClientBase) {
    const url = httpClient.createURL(this._url);
    this._searchParams.forEach((value, key) => url.searchParams.set(key, value));
  }

  createInit() {

  }
}