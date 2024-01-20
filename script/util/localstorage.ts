export class Localstorage {
  private static readonly TOKEN_KEY = "refresh_token";
  private readonly storage = window.localStorage;

  get(key: string) {
    return this.storage.getItem(key);
  }

  getRefreshToken() {
    return this.get(Localstorage.TOKEN_KEY);
  }

  set(key: string, value: string | undefined) {
    if (value == undefined) this.storage.removeItem(key);
    else this.storage[key] = value;

  }

  setRefreshToken(value: string | undefined) {
    this.set(Localstorage.TOKEN_KEY, value);
  }
}

export const localStorage = new Localstorage();
