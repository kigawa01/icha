import {
  Configuration,
  ConfigurationParameters,
  DefaultApi,
  FetchParams,
  GachaBody,
  LoginRes,
  RequestContext,
  ResponseError,
  TokensRes,
  UserRes,
} from "../../api_clients";
import {ErrorData, ErrorIds} from "./_error";
import {DEBUG} from "../util";
import type {GachaRes} from "../../api_clients/models";


export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export class ApiClient {
  protected readonly api: DefaultApi;

  constructor(config: ConfigurationParameters) {
    this.api = new DefaultApi(new Configuration({
      basePath: config.basePath || BASE_URL,
      middleware: [
        {
          async pre(context: RequestContext): Promise<FetchParams | void> {
            context.init.mode = context.init.mode || "cors";
            return context;
          },
        },
        ...config.middleware || [],
      ],
      ...config,
    }));
  }

  async login(email: string, password: string): Promise<ApiResult<LoginRes>> {
    return await fetchApi(this.api.loginApiLoginPost({
      loginBody: {
        email: email, password: password,
      },
    }));
  }

  async createUser(email: string, password: string, username: string): Promise<ApiResult<LoginRes>> {
    return await fetchApi(this.api.createUserApiUserPost({
      userBody: {
        email: email, name: username, password: password,
      },
    }));
  }
}

export class AuthApiClient extends ApiClient {
  constructor(token: string) {
    super({accessToken: "Bearer " + token});
  }

  async refresh(): Promise<ApiResult<TokensRes>> {
    return await fetchApi(this.api.refreshTokenApiLoginRefreshPost());
  }

  async getSelfUser(): Promise<ApiResult<UserRes>> {
    return await fetchApi(this.api.getSelfUserApiUserSelfGet());
  }

  async createGacha(gachaBody: GachaBody): Promise<ApiResult<GachaRes>> {
    if (DEBUG) console.debug(gachaBody);
    return await fetchApi(this.api.createGachaApiGachaPost({gachaBody}));
  }
}

export async function fetchApi<R>(res: Promise<R>): Promise<ApiResult<R>> {
  return await res.then(value => {
    return {value: value};
  }).catch(async (fetchReason) => {

    if (fetchReason instanceof ResponseError) {
      if (DEBUG) console.debug(fetchReason.response);
      return await fetchReason.response.json().then((jsonValue: ErrorData | any) => {

        if (!jsonValue.message || !jsonValue.error_id) {
          console.error(jsonValue);
          return {error: ErrorIds.createData(ErrorIds.UnknownError, jsonValue.toString())};
        }
        return {error: jsonValue};

      }).catch(jsonReason => {

        if (jsonReason instanceof Error && jsonReason.message) {
          console.error(jsonReason.message);
          return {error: ErrorIds.createData(ErrorIds.UnknownError, jsonReason.message)};
        }
        console.error(jsonReason);
        return {error: ErrorIds.createData(ErrorIds.UnknownError, jsonReason.toString())};

      });
    }
    if (fetchReason instanceof Error && fetchReason.message) {
      console.error(fetchReason.message);
      return {error: ErrorIds.createData(ErrorIds.UnknownError, fetchReason.message)};
    }
    console.error(fetchReason);
    return {error: ErrorIds.createData(ErrorIds.UnknownError, fetchReason.toString())};


  });
}

export interface ApiResult<T> {
  error?: ErrorData | undefined;
  value?: T | undefined;
}

export const apiClient = new ApiClient({});