export class ErrorIds {
  static readonly ACCESS_TOKEN_EXPIRED = createErrorId("ACCESS_TOKEN_EXPIRED");
  static readonly NoLogin = createErrorId("NoLogin");
}

function createErrorId(name: string): ErrorId {
  return {
    name: name,
  };
}

interface ErrorId {
  name: string;
}