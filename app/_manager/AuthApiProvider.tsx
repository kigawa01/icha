import {TokenProvider, useTokensState} from "./TokenProvider";
import {GlobalState} from "../_hook/globalState";
import {AuthApiClient} from "../_client/api";
import {useEffect} from "react";

export function AuthApiProvider(
  {}: {},
) {
  const tokens = useTokensState();
  console.debug("api", tokens);
  useEffect(() => {
    if (tokens == undefined) return;

    if (tokens.tokens == undefined)
      authClientState.set({client: undefined});
    else authClientState.set({client: new AuthApiClient(tokens.tokens.accessToken.token)});

  }, [tokens]);

  return <TokenProvider/>;
}

export interface AuthClientState {
  client: AuthApiClient | undefined;
}

const authClientState = new GlobalState<AuthClientState | undefined>(undefined);

export function useAuthClient() {
  return authClientState.use();
}