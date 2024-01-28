import {HttpMethod} from "../fetch/object";
import {HttpClient} from "./httpClient";
import {HttpRequest} from "./httpRequest";

export class FetchBuilder<RESULT, BODY = undefined> extends HttpRequest<BODY> {

  constructor(httpClient: HttpClient, url: string | URL, body: BODY = undefined) {
    super(httpClient, body);
    this._url = url;
  }

  appendParams(key: string, value: any) {
    this._searchParams.append(key, value.toString());
    return this;
  }

  url(url: string) {
    this._url = url;
    return this;
  }


  authenticate() {
    this._isAuthenticate = true;
    return this;
  }

  token(token: string) {
    this._token = token;
    return this;
  }

  method(method: HttpMethod) {
    this._method = method;
    return this;
  }

  fetchJson(): Promise<RESULT> {
    return this.httpClient.fetchJson(this.createUrl(), this.createInit());
  }

  fetcher(): ()=>Promise<RESULT> {
    return () => this.fetchJson();
  }

  body(body: BODY) {
    this._body = body;
    return this;
  }
}