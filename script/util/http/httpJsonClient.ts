import {HttpStatusCodeError} from "./httpError";
import {HttpClientBase} from "./HttpClientBase";
import {HttpStatusCodeErrorEvent} from "./httpEvent";

export class HttpJsonClient<ERROR = any> extends HttpClientBase {
  statusCodeErrorHandler: (event: HttpStatusCodeErrorEvent<ERROR>) => void = undefined;

  async fetchJson<RESULT>(url: URL, init: RequestInit) {
    return this._fetchJson<RESULT>(url, init);
  }

  private async _fetchJson<RESULT>(url: URL, init: RequestInit, retry: number = 0, retryCount: number = 0): Promise<RESULT> {
    retryCount++;
    const res = await fetch(url, init);

    try {

      return await res.json().catch((reason) => {
        console.error(url, reason);
        throw reason;
      }).then(value => {

        if (!res.ok) {
          this.statusCodeErrorHandler && this.statusCodeErrorHandler({
            response: res,
            retry: retry,
            result: value,
            setRetry: retry1 => retry = retry1,
          });
          throw new HttpStatusCodeError<ERROR>(res, value);
        }
        return value;

      });

    } catch (e) {
      if (retry < retryCount) throw e;
      return await this._fetchJson(url, init, retry, retryCount);
    }

  }
}
