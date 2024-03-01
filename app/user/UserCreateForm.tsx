"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {PasswordTextField} from "../_unit/_form/PasswordTextField";
import {useState} from "react";
import {ErrorMessage} from "../_unit/ErrorMessage";
import {TextInput} from "../_unit/_form/TextInput";
import {redirect} from "next/navigation";
import {useUserState} from "../_manager/UserProvider";
import {apiClient} from "../_client/api";
import {setTokensState} from "../_manager/TokenProvider";
import {LoadableButton} from "../_unit/_loading/LoadableButton";
import {Textarea} from "../_unit/_form/Textarea";

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
      const email = data.get("identifier") as string;
      const username = data.get("username") as string;
      const password = data.get("password") as string;
      const selfProduce = data.get("selfProduce") as string;
      await apiClient.createUser(email, password, username, selfProduce)
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
    <Textarea name={"selfProduce"} label={"自己紹介"}/>
    <LoadableButton
      loading={userState == undefined} sx={{margin: "10px"}} variant={"contained"} type={"submit"}
    >登録</LoadableButton>
  </Box>);
}
