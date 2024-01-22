import {createContext, useMemo} from "react";

export class LoginState {

}

const Context = createContext<LoginState>(undefined);

export function LoginProvider() {
  const loginState = useMemo(() => {
    return new LoginState();
  }, []);

  return <Context.Provider value={loginState}>
  </Context.Provider>;
}
