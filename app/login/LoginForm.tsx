"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {TextInput} from "../_unit/_form/TextInput";
import {PasswordTextField} from "../_unit/_form/PasswordTextField";
import {Button} from "@mui/material";
import {ErrorMessage} from "../_unit/ErrorMessage";

import {useFormState} from "react-dom";
import {apiClient} from "../_client/api";
import {redirect, RedirectType, useSearchParams} from "next/navigation";
import {setTokensState} from "../_manager/TokenProvider";
import {useUserState} from "../_manager/UserProvider";

export function LoginForm(
  {
    ...props
  }: LoginFormProps,
) {
  const userState = useUserState();
  const searchParams = useSearchParams();
  const [error, action] = useFormState(async (_: string | undefined, data: FormData) => {
    const email = data.get("identifier");
    const password = data.get("password");
    if (typeof email !== "string") return "Eメールを入力してください";
    if (typeof password !== "string") return "パスワードを入力してください";

    const authResponse = await apiClient.login(email, password);
    if (authResponse.error) return authResponse.error.message;
    if (authResponse.value == undefined) return "token is undefined";

    setTokensState(authResponse.value.tokens);

    redirect(searchParams.get("url") || "/", RedirectType.replace);
  }, undefined);
  if (userState?.userRes) redirect(searchParams.get("url") || "/", RedirectType.replace);
  return (
    <Box
      {...props}
      component={"form"}
      action={action}
    >
      <ErrorMessage error={error}/>
      <TextInput
        label={"Eメール"}
        type={"email"}
        name={"identifier"}
        autoComplete={"email"}
        required={true}
      />
      <PasswordTextField
        label={"パスワード"}
        name={"password"}
        autoComplete={"password"}
        required={true}
      />
      <Button
        sx={{
          margin: "10px",
        }}
        variant={"contained"}
        type={"submit"}
      >ログイン</Button>
    </Box>
  );
}

export interface LoginFormProps extends OverrideProps<BoxTypeMap, any> {
}
