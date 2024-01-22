export class HttpStatusCodeError<T> {
  readonly response: Response;
  readonly result: Promise<T>;

  constructor(response: Response, result: Promise<T>) {
    this.response = response;
    this.result = result;
  }
}