export class HttpClientBase {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
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