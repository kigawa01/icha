import {HttpMethod} from "./object";
import {fetchRest} from "./fetch";


export class FetchPostBuilder<RESULT, BODY> extends FetchWithBodyBuilder<RESULT, BODY> {
  constructor(url: string | URL, body: BODY) {
    super("POST", url, body);
  }
}

export class FetchPutBuilder<RESULT, BODY> extends FetchWithBodyBuilder<RESULT, BODY> {
  constructor(url: string | URL, body: BODY) {
    super("PUT", url, body);
  }
}