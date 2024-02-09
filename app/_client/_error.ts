export class ErrorIds {
  static readonly ACCESS_TOKEN_EXPIRED = createErrorId("ACCESS_TOKEN_EXPIRED");
  static readonly NoLogin = createErrorId("NoLogin");
  static readonly UnknownError = createErrorId("Unknown");

  static createData(errorId: ErrorId, msg: string): ErrorData {
    return {error_id: errorId.name, message: msg};
  }

}

function createErrorId(name: string): ErrorId {
  return {
    name: name,
    createData(msg: string): ErrorData {
      return {error_id: name, message: msg};
    },
  };
}

export interface ErrorId {
  name: string;

  createData(msg: string): ErrorData;
}

export interface ErrorData {
  error_id: string;
  message: string;
}

export class ErrorDataException extends Error {
  readonly data: ErrorData;

  constructor(errorData: ErrorData) {
    super(errorData.message);
    this.data = errorData;
  }
}