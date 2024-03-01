"use client";
import {PageTitle} from "../../_unit/PageTitle";
import {Main} from "../../_unit/Main";
import {UserProfileForm} from "../UserProfileForm";
import {useUserState} from "../../_manager/UserProvider";
import {redirect} from "next/navigation";
import {apiClient} from "../../_client/api";
import {setTokensState} from "../../_manager/TokenProvider";
import {useState} from "react";
import {ErrorMessage} from "../../_unit/ErrorMessage";

export default function Page(
  {}: {},
) {
  const userState = useUserState();
  const [error, setError] = useState<string>();
  if (userState?.userRes) redirect("/");

  return (
    <Main>
      <PageTitle pageTitle={"新規登録"}/>
      <ErrorMessage error={error}/>
      <UserProfileForm
        loading={userState == undefined} postButtonLabel={"登録"}
        action={async (email, username, password, selfProduce) => {
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
      />
    </Main>
  );
}
