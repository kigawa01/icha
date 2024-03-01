"use client";
import {Main} from "../../_unit/Main";
import {useFetch} from "../../_hook/useFetch";
import {apiClient} from "../../_client/api";
import {redirect} from "next/navigation";
import {useUserState} from "../../_manager/UserProvider";
import {Section} from "../../_unit/_section/Section";
import {LabeledItem} from "../../_unit/_labeled/LabeledItem";

export default function Page(
  {params}: { params: { userId: string } },
) {
  const userId = parseInt(params.userId);
  if (isNaN(userId)) redirect("/notfound");
  const user = useFetch(() => apiClient.getUser(userId));
  const selfUserState = useUserState();

  return <Main>
    <Section sectionTitle={user?.result?.name || "ロード中..."} marginTop={"20px"}>
      <LabeledItem label={"ユーザー名"}>{user?.result?.name || "ロード中..."}</LabeledItem>
      <LabeledItem label={"Email"}>{user?.result?.email || "ロード中"}</LabeledItem>
      <LabeledItem label={"パスワード(変更する場合のみ入力してください)"}></LabeledItem>
      <LabeledItem label={"自己紹介"}>
        {user?.result?.selfProduce === undefined ? "ロード中..." : user.result.selfProduce || "なし"}
      </LabeledItem>
    </Section>
  </Main>;
}