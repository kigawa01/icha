export class ErrorIds {
  static readonly ACCESS_TOKEN_EXPIRED = createErrorId("ACCESS_TOKEN_EXPIRED");
  static readonly NoLogin = createErrorId("NoLogin");
  static readonly UnknownError = createErrorId("Unknown");

  static createResponse(errorId: ErrorId, msg: string): ErrorRes {
    return {error_id: errorId.name, message: msg};
  }

}

function createErrorId(name: string): ErrorId {
  return {
    name: name,
  };
}

interface ErrorId {
  name: string;
}

export interface ErrorRes {
  error_id: string;
  message: string;
}
