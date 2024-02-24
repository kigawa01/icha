"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {PasswordTextField} from "../../_unit/PasswordTextField";
import {useState} from "react";
import {ErrorMessage} from "../../_unit/ErrorMessage";
import {TextInput} from "../../_unit/TextInput";
import {redirect} from "next/navigation";
import {useUserState} from "../../_manager/UserProvider";
import {apiClient} from "../../_client/api";
import {setTokensState} from "../../_manager/TokenProvider";
import {LoadableButton} from "../../_unit/_loading/LoadableButton";

export interface LoginFormProps extends OverrideProps<BoxTypeMap, any> {
}

export function UserCreateForm(
  {
    ...props
  }: LoginFormProps,
) {
  const [error, setError] = useState<string>();
  const userState = useUserState();
  if (userState?.userRes) redirect("/");

  return (<Box
    {...props}
    component={"form"}
    padding={"5px"}
    action={async (data: FormData) => {
      const email = data.get("identifier");
      const username = data.get("username");
      const password = data.get("password");
      if (typeof email !== "string") return;
      if (typeof password !== "string") return;
      if (typeof username !== "string") return;
      await apiClient.createUser(email, password, username)
        .then(value => {
          if (value.error) {
            setError(value.error.message);
            return;
          } else setError(undefined);
          setTokensState(value.value?.tokens);
          redirect("/");
        });
    }}
  >
    <ErrorMessage error={error}/>
    <TextInput
      color={"secondary"}
      label={"ユーザー名"}
      name={"username"}
      required={true}
    />
    <TextInput
      label={"Eメール"}
      type={"email"}
      autoComplete={"email"}
      name={"identifier"}
      required={true}
    />
    <PasswordTextField
      label={"パスワード"}
      name={"password"}
      autoComplete={"password"}
      required={true}
    />
    <LoadableButton
      loading={userState == undefined} sx={{margin: "10px"}} variant={"contained"} type={"submit"}
    >登録</LoadableButton>
  </Box>);
}
