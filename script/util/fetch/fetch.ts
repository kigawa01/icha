import {HttpMethod} from "./object";
import {ApiError, JsonError, UrlError} from "./error";


const Access_Control_Allow_Origin = import.meta.env.VITE_CORS;

// const Access_Control_Allow_Origin = "127.0.0.1:5000"
// const BASE_URL = "http://127.0.0.1:5000/"


export async function fetchRest<RESULT = never, BODY = never>(
  url: URL | string,
  method: HttpMethod,
  body: BODY | undefined,
  isAuthenticate: boolean,
  defaultToken: string | undefined,
): Promise<unknown> {
  if (!isAuthenticate) return fetchJson(
    url,
    method,
    body,
    defaultToken,
  );
  let TokenManager;
  const token = defaultToken || TokenManager.instance.accessToken();
  if (token == undefined) return fetchRestSecond(
    url, method, body,
  );

  return fetchJson(
    url, method, body, token,
  ).catch(reason => {
    console.debug(reason);
    if (reason instanceof ApiError && reason.apiErrorResponse.error_id == ErrorIds.TOKEN_EXPIRED.name)
      return fetchRestSecond(
        url, method, body,
      );
    throw reason;
  });
}

async function fetchRestSecond<RESULT, BODY>(
  url: URL | string,
  method: HttpMethod,
  body: BODY | undefined,
): Promise<RESULT> {
  const token = TokenManager.instance.refreshToken();
  if (token == undefined)
    throw new ApiError({error_id: ErrorIds.NoLogin.name, message: "no login now"});

  return Auth.refresh(token).catch(reason => {
    TokenManager.instance.set(null);
    throw reason;
  }).then(value => {
    TokenManager.instance.set(value);
    return fetchJson(
      url, method, body, value.access_token,
    );
  });
}

export async function fetchJson<RESULT = never, BODY = never>(
  url: URL | string,
  method: HttpMethod,
  body: BODY | undefined,
  token: string | undefined,
): Promise<RESULT> {
  const urlObj = setUrlDefault(url);
  const initObj = createInit(body, method, token);

  const res = await fetch(urlObj, initObj);

  if (res == undefined) {
    throw new JsonError(urlObj, initObj, res, undefined);
  }
  if (!res.ok) {
    const result = await res.json();
    console.debug(res, result);
    throw new ApiError(result);
  }
  return await res.json().then(value => {
    console.debug(urlObj, value);
    return value;
  }).catch((reason) => {
    console.error(url, reason);
    throw new JsonError(urlObj, initObj, res, reason);
  });
}

function setUrlDefault(
  baseUrl: string | URL,
) {
  const url = createURL(baseUrl);
  if (url == undefined) {
    console.error("baseUrl is not valid");
    throw new UrlError(baseUrl.toString());
  }
  const currentUrl = createURL(window.location.href);

  if (currentUrl != undefined && url.host == currentUrl.host) {
    url.protocol = currentUrl.protocol;
  }

  return url;
}

function createInit<BODY = never>(
  body: BODY | undefined,
  method: "GET" | "POST" | "PUT",
  token: string | undefined,
) {
  const init: RequestInit = {};
  const headers: HeadersInit = {};

  if (token != undefined) headers["Authorization"] = `Bearer ${token}`;
  headers["Content-Type"] = "application/json";
  headers["Access-Control-Allow-Origin"] = getDefault(headers["Access-Control-Allow-Origin"], Access_Control_Allow_Origin);
  init.headers = headers;

  if (body != null) init.body = JSON.stringify(body);
  if (method != null) init.method = method;
  return init;
}
