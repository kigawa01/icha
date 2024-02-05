import {Localstorage} from "../../../app/_manager/localStorageManager";

export class TokenManager {
  static readonly STORAGE_KEY = "refresh_token";
  refreshFetcher: ((refreshToken: string | undefined) => Promise<Tokens>) | undefined = undefined;
  private _accessToken: string | undefined = undefined;
  private _refreshToken: string | undefined;
  private localStorage: Localstorage;

  constructor(localStorage: Localstorage) {
    this._refreshToken = localStorage.get(TokenManager.STORAGE_KEY) || undefined;
    this.localStorage = localStorage;
  }

  getRefreshToken() {
    return this._refreshToken;
  }

  getAccessToken() {
    return this._accessToken;
  }

  async fetchRefresh() {
    this.refreshFetcher && this.refreshFetcher(this.getRefreshToken())
      .then(value => this.set(value));
  }

  set(tokens: Tokens | undefined) {
    this._accessToken = tokens?.accessToken;
    this._refreshToken = tokens?.refreshToken;
    this.localStorage.set(TokenManager.STORAGE_KEY, tokens?.refreshToken);
  }
}

export interface Tokens {
  accessToken: string | undefined,
  refreshToken: string | undefined
}