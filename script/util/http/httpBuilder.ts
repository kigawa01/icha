import {HttpMethod} from "../fetch/object";
import {HttpJsonClient} from "./httpJsonClient";
import {HttpRequest} from "./httpRequest";

export class FetchBuilder<RESULT, BODY = undefined> extends HttpRequest<BODY> {

  protected constructor(url: string | URL, body: BODY = undefined) {
    super(body);
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

  fetch(httpClient: HttpJsonClient): Promise<RESULT> {
    return;
  }

  body(body: BODY) {
    this._body = body;
    return this;
  }
}