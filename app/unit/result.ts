import {ErrorRes} from "../../script/response/response";


export class SuccessResult<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

export class ErrorResult {
  error: ErrorRes | undefined;

  constructor(error: ErrorRes | undefined) {
    this.error = error;
  }
}