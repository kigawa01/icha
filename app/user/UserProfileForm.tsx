"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {PasswordTextField} from "../_unit/_form/PasswordTextField";
import {TextInput} from "../_unit/_form/TextInput";
import {LoadableButton} from "../_unit/_loading/LoadableButton";
import {Textarea} from "../_unit/_form/_textarea/Textarea";
import {UserRes} from "../../api_clients";

export interface LoginFormProps extends OverrideProps<BoxTypeMap, any> {
  postButtonLabel: string;
  loading: boolean;
  user?: UserRes | undefined;

  action(email: string, username: string, password: string, selfProduce: string): Promise<void>;

  onFocus?(): void;
}

export function UserProfileForm(
  {
    postButtonLabel,
    loading,
    user,
    action,
    onFocus,
    ...props
  }: LoginFormProps,
) {

  return (<Box
    {...props}
    component={"form"}
    padding={"5px"}
    action={async (data: FormData) => {
      const email = data.get("identifier") as string;
      const username = data.get("username") as string;
      const password = data.get("password") as string;
      const selfProduce = data.get("selfProduce") as string;
      await action(email, username, password, selfProduce);
    }}
  >
    <TextInput
      label={"Eメール"} onFocus={onFocus}
      type={"email"}
      autoComplete={"email"}
      name={"identifier"}
      required={true} defaultValue={user?.email}
    />
    <PasswordTextField
      label={"パスワード"} onFocus={onFocus}
      name={"password"}
      autoComplete={"password"}
      required={true}
    />
    <TextInput
      color={"secondary"} onFocus={onFocus}
      label={`ユーザー名${user == undefined ? "" : "(変更する場合のみ入力してください)"}`}
      name={"username"}
      required={true} defaultValue={user?.name}
    />
    <Textarea
      name={"selfProduce"} label={"自己紹介"} minHeight={"30px"}
      defaultValue={user?.selfProduce == undefined ? "" : (user.selfProduce as string)}
      onFocus={onFocus}
    />
    <LoadableButton
      loading={loading} sx={{margin: "10px"}} variant={"contained"} type={"submit"} onClick={onFocus}
    >{postButtonLabel}</LoadableButton>
  </Box>);
}
