"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {PasswordTextField} from "../_unit/_form/PasswordTextField";
import {useState} from "react";
import {ErrorMessage} from "../_unit/ErrorMessage";
import {TextInput} from "../_unit/_form/TextInput";
import {redirect} from "next/navigation";
import {apiClient} from "../_client/api";
import {setTokensState} from "../_manager/TokenProvider";
import {LoadableButton} from "../_unit/_loading/LoadableButton";
import {Textarea} from "../_unit/_form/_textarea/Textarea";
import {UserRes} from "../../api_clients";

export interface LoginFormProps extends OverrideProps<BoxTypeMap, any> {
  postButtonLabel: string;
  loading: boolean;
  user?: UserRes | undefined;
}

export function UserProfileForm(
  {
    postButtonLabel,
    loading,
    user,
    ...props
  }: LoginFormProps,
) {
  const [error, setError] = useState<string>();

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
      label={"Eメール"}
      type={"email"}
      autoComplete={"email"}
      name={"identifier"}
      required={true} defaultValue={user?.email}
    />
    <PasswordTextField
      label={"パスワード"}
      name={"password"}
      autoComplete={"password"}
      required={true}
    />
    <TextInput
      color={"secondary"}
      label={`ユーザー名${user == undefined ? "" : "(変更する場合のみ入力してください)"}`}
      name={"username"}
      required={true} defaultValue={user?.name}
    />
    <Textarea name={"selfProduce"} label={"自己紹介"} minHeight={"30px"} defaultValue={user?.selfProduce || ""}/>
    <LoadableButton
      loading={loading} sx={{margin: "10px"}} variant={"contained"} type={"submit"}
    >{postButtonLabel}</LoadableButton>
  </Box>);
}
