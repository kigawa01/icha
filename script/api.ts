import {FetchGetBuilder} from "./util/fetch/builder";

class Login {
  get() {
    return new FetchGetBuilder("");
  }
}

class Api {
  login = new Login();
}
