"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Button, SxProps, TextField} from "@mui/material";
import {PasswordTextField} from "../../_unit/PasswordTextField";
import {createUser} from "../../_client/serverActionApi";
import {useState} from "react";
import {ErrorMessage} from "../../_unit/ErrorMessage";
import {loginManager} from "../../_manager/LoginManager";
import {TextInput} from "../../_unit/TextInput";

export interface LoginFormProps extends OverrideProps<BoxTypeMap, any> {
}

export function UserCreateForm(
  {
    ...props
  }: LoginFormProps,
) {
  const child: SxProps = {
    width: "100%", margin: "10px 0",
  };
  const [error, setError] = useState<string>();
  return (<Box
    {...props}
    component={"form"}
    padding={"5px"}
    action={async (data: FormData) => {
      const email = data.get("email");
      const username = data.get("username");
      const password = data.get("password");
      if (typeof email !== "string") return;
      if (typeof password !== "string") return;
      if (typeof username !== "string") return;
      await createUser(email, password, username)
        .then(value => {
          if (value.error) {
            setError(value.error.message);
            return;
          } else setError(undefined);
          loginManager.setTokensRes(value.value?.tokens);
        });
    }}
  >
    <ErrorMessage error={error}/>
    <TextInput
      sx={child}
      color={"secondary"}
      label={"ユーザー名"}
      name={"username"}
      required={true}
    />
    <TextInput
      sx={child}
      label={"Eメール"}
      type={"email"}
      name={"email"}
      required={true}
    />
    <PasswordTextField
      sx={child}
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
    >登録</Button>
  </Box>);
}
