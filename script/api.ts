import {FetchBuilder} from "./util/http/httpBuilder";
import {TokenRes} from "./response/response";
import {httpClient} from "./Main";

class Login {
  refresh(refreshToken: string) {
    return new FetchBuilder<TokenRes>(httpClient, `/api/login/refresh`)
      .token(refreshToken)
      .fetcher();
  }
}

class Api {
  login = new Login();
}

export const api = new Api();