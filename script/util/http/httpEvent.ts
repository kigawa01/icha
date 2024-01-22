export interface HttpErrorEvent {
  setRetry: (retry: number) => void;
  retry: number;
}

export interface HttpStatusCodeErrorEvent<ERROR> extends HttpErrorEvent {
  response: Response;
  result: ERROR;
}
