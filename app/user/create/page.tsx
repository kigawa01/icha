"use client";
import {PageTitle} from "../../_unit/PageTitle";
import {Main} from "../../_unit/Main";
import {UserProfileForm} from "../UserProfileForm";
import {useUserState} from "../../_manager/UserProvider";
import {redirect} from "next/navigation";

export default function Page(
  {}: {},
) {
  const userState = useUserState();
  if (userState?.userRes) redirect("/");

  return (
    <Main>
      <PageTitle pageTitle={"新規登録"}/>
      <UserProfileForm loading={userState == undefined} postButtonLabel={"登録"}/>
    </Main>
  );
}
