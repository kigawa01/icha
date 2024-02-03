"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Button, SxProps, TextField} from "@mui/material";
import {PasswordTextField} from "../unit/PasswordTextField";
import {createUser} from "../client/serverActionApi";
import {useState} from "react";
import {ErrorMessage} from "../unit/ErrorMessage";
import {redirect} from "next/navigation";

export interface LoginFormProps extends OverrideProps<BoxTypeMap, any> {
}

export function LoginForm(
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
        });
    }}
  >
    <ErrorMessage error={error}/>
    <TextField
      sx={child}
      color={"secondary"}
      label={"ユーザー名"}
      name={"username"}
      required={true}
    />
    <TextField
      sx={child}
      color={"secondary"}
      label={"Eメール"}
      type={"email"}
      name={"email"}
      required={true}
    />
    <PasswordTextField
      sx={child}
      color={"secondary"}
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
