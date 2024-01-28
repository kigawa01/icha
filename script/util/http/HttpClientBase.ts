import {TokenManager} from "../token/tokenManager";

export class HttpClientBase {
  readonly baseUrl: string;
  readonly corsHost: string;
  readonly tokenManager: TokenManager;

  constructor(baseUrl: string, corsHost: string, tokenManager: TokenManager) {
    this.baseUrl = baseUrl;
    this.corsHost = corsHost;
    this.tokenManager = tokenManager;
  }

  createURL(url: URL | string): URL {
    try {
      return new URL(url, this.baseUrl);
    } catch (e) {
      console.error(e);
      console.error(url);
      throw e;
    }
  }

}