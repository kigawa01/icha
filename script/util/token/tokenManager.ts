import {Localstorage} from "../localstorage/localstorage";

export class TokenManager {
  static readonly STORAGE_KEY = "refresh_token";
  refreshFetcher: (refreshToken: string | undefined) => Promise<Tokens>;
  private _accessToken: string | undefined = undefined;
  private _refreshToken: string | undefined;
  private localStorage: Localstorage;

  constructor(localStorage: Localstorage) {
    this._refreshToken = localStorage.get(TokenManager.STORAGE_KEY);
    this.localStorage = localStorage;
  }

  getRefreshToken() {
    return this._refreshToken;
  }

  getAccessToken() {
    return this._accessToken;
  }

  async fetchRefresh() {
    return this.refreshFetcher(this.getRefreshToken())
      .then(value => this.set(value));
  }

  set(tokens: Tokens | undefined) {
    this._accessToken = tokens.accessToken;
    this._refreshToken = tokens.refreshToken;
    this.localStorage.set(TokenManager.STORAGE_KEY, tokens.refreshToken);
  }
}

export interface Tokens {
  accessToken: string | undefined,
  refreshToken: string | undefined
}