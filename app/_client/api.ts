import type {GachaRes, UserPutBody} from "../../api_clients";
import {
  Configuration,
  ConfigurationParameters,
  DefaultApi,
  FetchParams,
  GachaBody,
  GachaListRes,
  LoginRes,
  PullGachaRes,
  RequestContext,
  ResponseError,
  TokensRes,
  UserRes,
} from "../../api_clients";
import {ErrorData, ErrorIds} from "./_error";
import {DEBUG} from "../util";


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

  async createUser(email: string, password: string, username: string, selfProduce: string): Promise<ApiResult<LoginRes>> {
    return await fetchApi(this.api.createUserApiUserPost({
      userBody: {
        email: email, name: username, password: password, selfProduce: selfProduce,
      },
    }));
  }

  async getGacha(uid: number): Promise<ApiResult<GachaRes>> {
    return await fetchApi(this.api.getGachaApiGachaUidGet({uid}));
  }

  async getUser(userId: number): Promise<ApiResult<UserRes>> {
    return await fetchApi(this.api.getUserApiUserUserIdGet({userId}));
  }

  async getGachaList(
    order?: string, size?: number, page?: number, pulled?: boolean, search?: string,
  ): Promise<ApiResult<GachaListRes[]>> {
    return await fetchApi(this.api.getGachaListApiGachaGet({order, size, page, pulled, search}));
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

  async editUser(userPutBody: UserPutBody) {
    return await fetchApi(this.api.editUserApiUserSelfPut({userPutBody}));
  }

  async createGacha(gachaBody: GachaBody): Promise<ApiResult<GachaRes>> {
    return await fetchApi(this.api.createGachaApiGachaPost({gachaBody}));
  }

  async pullGacha(uid: number): Promise<ApiResult<PullGachaRes>> {
    return await fetchApi(this.api.pullGachaApiGachaUidPullPost({uid}));
  }

  async getContent(gachaId: number, contentId: number) {
    return await fetchApi(
      this.api.getContentsApiGachaGachaIdContentsContentIdGet({gachaId, contentId}),
    );
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