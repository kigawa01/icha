"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {TextInput} from "../_unit/TextInput";
import {PasswordTextField} from "../_unit/PasswordTextField";
import {Button} from "@mui/material";
import {login} from "../_client/serverActionApi";
import {redirect} from "next/navigation";
import {useUserState} from "../_manager/userManager";
import {useState} from "react";
import {ErrorMessage} from "../_unit/ErrorMessage";

export function LoginForm(
  {
    ...props
  }: LoginFormProps,
) {
  const userState = useUserState();
  const [error, setError] = useState<string>();

  if (userState == undefined) return undefined;
  return (
    <Box
      {...props}
      component={"form"}
      action={async (data: FormData) => {
        const email = data.get("email");
        const password = data.get("password");
        if (typeof email !== "string") return;
        if (typeof password !== "string") return;
        await login(email, password)
          .then(value => {
            if (value.error) {
              setError(value.error.message);
              return;
            } else setError(undefined);
            userState.loginManager.setTokensRes(value.value?.tokens);
            userState.userManager.setLoginRes(value.value);
            redirect("/");
          });
      }}
    >
      <ErrorMessage error={error}/>
      <TextInput
        label={"Eメール"}
        type={"email"}
        name={"email"}
        required={true}
      />
      <PasswordTextField
        label={"パスワード"}
        name={"password"}
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
