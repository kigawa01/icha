"use client";
import {Main} from "../../_unit/Main";
import {useFetch} from "../../_hook/useFetch";
import {apiClient} from "../../_client/api";
import {redirect} from "next/navigation";
import {useUserState} from "../../_manager/UserProvider";
import {Section} from "../../_unit/_section/Section";
import {UserProfile} from "./UserProfile";
import {UserProfileForm} from "../UserProfileForm";
import {Loadable} from "../../_unit/_loading/Loadable";

export default function Page(
  {params}: { params: { userId: string } },
) {
  const userId = parseInt(params.userId);
  if (isNaN(userId)) redirect("/notfound");
  const user = useFetch(() => apiClient.getUser(userId));
  const selfUserState = useUserState();

  return <Main>
    <Section sectionTitle={user?.result?.name || "ロード中..."} marginTop={"20px"}>
      <Loadable loading={user == undefined || selfUserState == undefined} fontSize={50}>
        {
          selfUserState?.userRes?.uid == user?.result?.uid
            ? <UserProfileForm loading={false} postButtonLabel={"保存"} user={user?.result}/>
            : <UserProfile user={user?.result}/>
        }
      </Loadable>
    </Section>
  </Main>;
}